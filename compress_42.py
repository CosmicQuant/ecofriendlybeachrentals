#!/usr/bin/env python3
"""
Compress Enhanced Image 42 for EcoFriendly Beach Rentals
"""

import os
from PIL import Image, ImageOps

def compress_image_42():
    """Compress the enhanced 42 image"""
    input_file = '42_enhanced.png'
    output_file = '42_compressed.jpg'
    quality = 95
    max_width = 1920
    
    try:
        print(f"Processing: {input_file}")
        
        with Image.open(input_file) as img:
            # Get original size
            original_size = os.path.getsize(input_file) / (1024 * 1024)  # MB
            print(f"  Original size: {original_size:.2f} MB ({img.size[0]}x{img.size[1]})")
            
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            # Resize if width is larger than max_width
            if img.size[0] > max_width:
                ratio = max_width / img.size[0]
                new_height = int(img.size[1] * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                print(f"  Resized to: {img.size[0]}x{img.size[1]}")
            
            # Apply any EXIF orientation
            img = ImageOps.exif_transpose(img)
            
            # Save as optimized JPEG
            img.save(output_file, 
                    'JPEG', 
                    quality=quality, 
                    optimize=True,
                    progressive=True)
            
            # Get compressed size
            compressed_size = os.path.getsize(output_file) / (1024 * 1024)  # MB
            compression_ratio = (1 - compressed_size / original_size) * 100
            
            print(f"  Compressed size: {compressed_size:.2f} MB")
            print(f"  Compression: {compression_ratio:.1f}% reduction")
            print(f"  Saved as: {output_file}")
            
    except Exception as e:
        print(f"Error processing {input_file}: {str(e)}")

if __name__ == "__main__":
    print("Compressing Enhanced Image 42...")
    print("=" * 40)
    compress_image_42()
    print("\nDone! Ready to update HTML to use 42_compressed.jpg")