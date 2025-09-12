#!/usr/bin/env python3
"""
Image Compression Script for EcoFriendly Beach Rentals
Compresses the 4 enhanced landing images to reduce file sizes while maintaining quality
"""

import os
from PIL import Image, ImageOps
import sys

def compress_image(input_path, output_path, quality=85, max_width=1920):
    """
    Compress an image with specified quality and maximum width
    
    Args:
        input_path (str): Path to input image
        output_path (str): Path to save compressed image
        quality (int): JPEG quality (1-100, higher = better quality)
        max_width (int): Maximum width in pixels
    """
    try:
        print(f"Processing: {input_path}")
        
        # Open and process image
        with Image.open(input_path) as img:
            # Get original size
            original_size = os.path.getsize(input_path) / (1024 * 1024)  # MB
            print(f"  Original size: {original_size:.2f} MB ({img.size[0]}x{img.size[1]})")
            
            # Convert to RGB if necessary (for JPEG)
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            # Resize if width is larger than max_width
            if img.size[0] > max_width:
                # Calculate new height maintaining aspect ratio
                ratio = max_width / img.size[0]
                new_height = int(img.size[1] * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                print(f"  Resized to: {img.size[0]}x{img.size[1]}")
            
            # Apply any EXIF orientation
            img = ImageOps.exif_transpose(img)
            
            # Save as optimized JPEG
            img.save(output_path, 
                    'JPEG', 
                    quality=quality, 
                    optimize=True,
                    progressive=True)
            
            # Get compressed size
            compressed_size = os.path.getsize(output_path) / (1024 * 1024)  # MB
            compression_ratio = (1 - compressed_size / original_size) * 100
            
            print(f"  Compressed size: {compressed_size:.2f} MB")
            print(f"  Compression: {compression_ratio:.1f}% reduction")
            print(f"  Saved as: {output_path}")
            
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")

def main():
    """Main compression function"""
    # Enhanced images to compress
    enhanced_images = [
        'Landing1_enhanced.png',
        'Landing2_enhanced.png',
        'Landing3_enhanced.png',
        'Landing4_enhanced.png'
    ]
    
    # Compression settings
    quality = 95  # JPEG quality (95 for minimal quality loss)
    max_width = 1920  # Maximum width in pixels
    
    print("EcoFriendly Beach Rentals - Image Compression Tool")
    print("=" * 50)
    print(f"Quality setting: {quality}% (High Quality)")
    print(f"Maximum width: {max_width}px")
    print()
    
    total_original = 0
    total_compressed = 0
    
    for image_name in enhanced_images:
        if os.path.exists(image_name):
            # Create output filename (replace .png with .jpg)
            output_name = image_name.replace('_enhanced.png', '_compressed.jpg')
            
            # Track sizes for summary
            original_size = os.path.getsize(image_name) / (1024 * 1024)
            total_original += original_size
            
            # Compress the image
            compress_image(image_name, output_name, quality, max_width)
            
            # Track compressed size
            if os.path.exists(output_name):
                compressed_size = os.path.getsize(output_name) / (1024 * 1024)
                total_compressed += compressed_size
            
            print()
        else:
            print(f"Warning: {image_name} not found!")
    
    # Summary
    print("=" * 50)
    print("COMPRESSION SUMMARY:")
    print(f"Total original size: {total_original:.2f} MB")
    print(f"Total compressed size: {total_compressed:.2f} MB")
    if total_original > 0:
        total_reduction = (1 - total_compressed / total_original) * 100
        print(f"Total reduction: {total_reduction:.1f}%")
    print()
    print("Compressed files created:")
    for image_name in enhanced_images:
        output_name = image_name.replace('_enhanced.png', '_compressed.jpg')
        if os.path.exists(output_name):
            print(f"  ✓ {output_name}")
    
    print("\nNext steps:")
    print("1. Test the compressed images in your website")
    print("2. If quality is good, replace the enhanced images with compressed ones")
    print("3. Update HTML files to use .jpg extensions if needed")

if __name__ == "__main__":
    main()