"""
Ultra-Conservative Deposit Extractor
====================================

This script uses the most restrictive criteria to extract ONLY genuine deposits,
excluding any ambiguous transactions that could be withdrawals.
"""

import pdfplumber
import pandas as pd
import re
from datetime import datetime
from typing import List, Dict

def extract_only_clear_deposits():
    """
    Extract only the most obvious deposit transactions
    """
    
    print("Starting ultra-conservative deposit extraction...")
    
    # Extract PDF text
    with pdfplumber.open("05006402796350_Statement_09_12_2025_13_23_59 (1).pdf") as pdf:
        full_text = ""
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                full_text += page_text + "\n"
    
    lines = full_text.split('\n')
    deposits = []
    
    for i, line in enumerate(lines):
        line = line.strip()
        
        # Must start with a date
        if not re.match(r'\d{2}-[A-Za-z]{3}-\d{4}', line):
            continue
        
        # COLUMN-BASED DEPOSIT DETECTION using balance change
        # Format: Transaction date | Value date | Description | Reference | Withdrawal | Deposit | Balance
        
        is_valid_deposit = False
        transaction_type = ""
        
        # Extract the amounts and check balance change
        amounts = re.findall(r'\d{1,3}(?:,\d{3})*\.\d{2}', line)
        
        if len(amounts) >= 2:
            current_balance = float(amounts[-1].replace(',', ''))
            transaction_amount = float(amounts[-2].replace(',', ''))
            
            # Check if this is a deposit by comparing with previous balance
            # We'll track balance changes to determine deposit vs withdrawal
            balance_change = None
            if hasattr(extract_only_clear_deposits, 'previous_balance'):
                balance_change = current_balance - extract_only_clear_deposits.previous_balance
            
            # Store current balance for next iteration
            extract_only_clear_deposits.previous_balance = current_balance
            
            # Determine if this is a deposit based on balance change
            if balance_change is not None and balance_change > 0:
                # Balance increased = deposit
                is_valid_deposit = True
                
                # Determine deposit type
                if 'MMP/Mpesa' in line or 'MPESA' in line.upper():
                    transaction_type = "M-Pesa"
                elif 'CHQ' in line.upper():
                    transaction_type = "CHQ"
                elif re.search(r'\d{8,}/[a-zA-Z]', line):
                    transaction_type = "Account Deposit"
                else:
                    transaction_type = "Other Deposit"
            
            elif balance_change is None:
                # First transaction - use description-based detection as fallback
                if ('MMP/Mpesa' in line or 'MPESA' in line.upper() or 
                    'CHQ' in line.upper() or 
                    (re.search(r'\d{8,}/[a-zA-Z]', line) and 'From' in line)):
                    is_valid_deposit = True
                    
                    if 'MMP/Mpesa' in line or 'MPESA' in line.upper():
                        transaction_type = "M-Pesa"
                    elif 'CHQ' in line.upper():
                        transaction_type = "CHQ"
                    elif re.search(r'\d{8,}/[a-zA-Z]', line):
                        transaction_type = "Account Deposit"
                    else:
                        transaction_type = "Other Deposit"
        
        if not is_valid_deposit:
            continue
        
        # Get the complete multiline transaction text
        transaction_text = line
        
        # Look ahead for continuation lines (up to 4 lines for complex transactions)
        j = i + 1
        while j < len(lines) and j < i + 5:  # Look ahead max 5 lines
            next_line = lines[j].strip()
            
            # Stop if we hit the next transaction (starts with date)
            if re.match(r'\d{2}-[A-Za-z]{3}-\d{4}', next_line):
                break
            
            # Include lines with transaction details
            if any(keyword in next_line for keyword in ['Ref ', 'From ', 'S6', 'S7', 'S8', 'TH', 'NO0', 'CHQ']):
                transaction_text += " " + next_line
            elif next_line and not re.match(r'^\d', next_line) and len(next_line) > 3:
                transaction_text += " " + next_line
            else:
                break
            j += 1
        
        # Extract amounts from the main line (first line)
        amounts = re.findall(r'\b\d{1,3}(?:,\d{3})*\.\d{2}\b', line)
        if len(amounts) < 2:
            continue
        
        # First amount should be the deposit amount
        deposit_amount = float(amounts[0].replace(',', ''))
        
        # Must be a reasonable deposit (KES 200 minimum, KES 200,000 maximum)
        if deposit_amount < 200.0 or deposit_amount > 200000.0:
            continue
        
        # Parse the complete multiline transaction
        transaction = parse_clean_deposit(transaction_text, transaction_type, deposit_amount)
        if transaction:
            deposits.append(transaction)
    
    print(f"Found {len(deposits)} ultra-clean deposit transactions")
    
    # Create CSV
    sales_receipts = []
    for deposit in deposits:
        sales_receipts.append({
            '*SalesReceiptNo': deposit['receipt_no'],
            'Customer': deposit['customer'],
            '*SalesReceiptDate': deposit['formatted_date'],
            '*DepositAccount': 'I&M Bank',
            'Location': '',
            'Memo': f"{deposit['type']} transaction",
            'Item(Product/Service)': 'Jaba Juice',
            'ItemDescription': '',
            'ItemQuantity': '1',
            'ItemRate': str(deposit['amount']),
            '*ItemAmount': deposit['amount'],
            'Service Date': deposit['formatted_date']
        })
    
    # Save CSV
    df = pd.DataFrame(sales_receipts)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"deposits_ultra_clean_{timestamp}.csv"
    df.to_csv(filename, index=False)
    
    # Summary
    total_amount = sum(d['amount'] for d in deposits)
    with_customers = sum(1 for d in deposits if d['customer'].strip())
    
    print(f"\nULTRA-CLEAN DEPOSIT SUMMARY")
    print("="*40)
    print(f"Total deposits: {len(deposits)}")
    print(f"Total amount: KES {total_amount:,.2f}")
    print(f"With customer names: {with_customers} ({with_customers/len(deposits)*100:.1f}%)")
    
    # Show transaction types
    types = {}
    for d in deposits:
        t = d['type']
        types[t] = types.get(t, 0) + 1
    
    print(f"\nTransaction types:")
    for t_type, count in types.items():
        type_amount = sum(d['amount'] for d in deposits if d['type'] == t_type)
        print(f"- {t_type}: {count} transactions (KES {type_amount:,.2f})")
    
    # Show sample transactions
    print(f"\nFirst 5 transactions:")
    for i, d in enumerate(deposits[:5]):
        print(f"{i+1}. {d['type']} | {d['customer'][:20]:20} | KES {d['amount']:>8,.2f} | {d['receipt_no']}")
    
    print(f"\nCSV created: {filename}")
    return filename

def parse_clean_deposit(transaction_text: str, transaction_type: str, amount: float) -> Dict:
    """
    Parse a clean deposit transaction (can be multiline)
    """
    # Extract date from the first line
    date_match = re.search(r'(\d{2}-[A-Za-z]{3}-\d{4})', transaction_text)
    date_str = date_match.group(1) if date_match else ""
    
    customer_name = ""
    sales_receipt_no = ""
    
    if transaction_type == "M-Pesa":
        # Extract reference from the main transaction text
        ref_match = re.search(r'(S\d+)', transaction_text)
        if ref_match:
            sales_receipt_no = ref_match.group(1)
        
        # Extract customer name - look for "From" followed by name
        # This can appear anywhere in the multiline transaction text
        from_match = re.search(r'From\s+(.+?)(?:\s+Transaction|\s+Ref|\s+S\d|\s+\d+\.\d+|$)', 
                             transaction_text, re.IGNORECASE)
        if from_match:
            name_part = from_match.group(1).strip()
            # Clean up thoroughly
            name_part = re.sub(r'\s+S\d+.*$', '', name_part)
            name_part = re.sub(r'\s+\d+\.\d+.*$', '', name_part)
            name_part = re.sub(r'\s+Transaction.*$', '', name_part, re.IGNORECASE)
            name_part = re.sub(r'\s+Ref.*$', '', name_part, re.IGNORECASE)
            name_part = re.sub(r'\s+TH\d+.*$', '', name_part, re.IGNORECASE)
            
            # Take only the first reasonable name parts
            words = name_part.split()
            clean_words = []
            for word in words:
                if word.isalpha() and len(word) >= 2:
                    clean_words.append(word)
                elif len(clean_words) > 0:  # Stop if we have names and hit non-alpha
                    break
            
            if clean_words:
                customer_name = ' '.join(clean_words[:4])  # Max 4 name parts
    
    elif transaction_type == "CHQ":
        # Extract CHQ number
        chq_match = re.search(r'CHQ\s+(\d+)', transaction_text, re.IGNORECASE)
        if chq_match:
            sales_receipt_no = chq_match.group(1)
        
        # Extract customer name after NO + digits
        customer_match = re.search(r'NO\d+\s+(.+?)(?:\s+\d+\.\d+|$)', transaction_text, re.IGNORECASE)
        if customer_match:
            customer_name = customer_match.group(1).strip()
            # Clean up
            customer_name = re.sub(r'\s+\d+\.\d+.*$', '', customer_name)
            customer_name = re.sub(r'\s+S\d+.*$', '', customer_name)
    
    elif transaction_type == "Account Deposit":
        # Extract reference number if available
        ref_match = re.search(r'(S\d+)', transaction_text)
        if ref_match:
            sales_receipt_no = ref_match.group(1)
        
        # Extract customer name after slash in long number
        slash_match = re.search(r'\d{8,}/([a-zA-Z][a-zA-Z0-9]*)', transaction_text)
        if slash_match:
            customer_name = slash_match.group(1).strip()
    
    elif transaction_type == "Other Deposit":
        # Extract reference number if available
        ref_match = re.search(r'(S\d+)', transaction_text)
        if ref_match:
            sales_receipt_no = ref_match.group(1)
        
        # Try to extract customer name from various patterns
        # Look for names after numbers or slashes
        name_patterns = [
            r'/([a-zA-Z][a-zA-Z\s]+?)(?:\s+S\d+|\s+\d+\.\d+|$)',
            r'(\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+S\d+',
            r'(\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+\d+\.\d+'
        ]
        
        for pattern in name_patterns:
            match = re.search(pattern, transaction_text)
            if match:
                customer_name = match.group(1).strip()
                break
        
        # If no customer name found, use generic
        if not customer_name:
            customer_name = "Unknown Customer"
    
    # Generate receipt number if needed
    if not sales_receipt_no:
        sales_receipt_no = f"AUTO{datetime.now().strftime('%H%M%S')}"
    
    # Format date
    try:
        date_obj = datetime.strptime(date_str, '%d-%b-%Y')
        formatted_date = date_obj.strftime('%d/%m/%Y')
    except:
        formatted_date = date_str
    
    return {
        'date': date_str,
        'formatted_date': formatted_date,
        'amount': amount,
        'type': transaction_type,
        'customer': customer_name,
        'receipt_no': sales_receipt_no,
        'full_line': transaction_text
    }

if __name__ == "__main__":
    extract_only_clear_deposits()