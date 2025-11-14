from PIL import Image
import os

def optimize_image(input_path, output_path, quality=85, max_width=1200):
    """Optimize image for web by resizing and compressing"""
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (for PNG with transparency)
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")

            # Resize if too large
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

            # Save with optimization
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            print(f"Optimized {input_path} -> {output_path}")

    except Exception as e:
        print(f"Error optimizing {input_path}: {e}")

def main():
    static_dir = 'static'
    optimized_dir = 'static/optimized'

    # Create optimized directory if it doesn't exist
    os.makedirs(optimized_dir, exist_ok=True)

    # Process all JPEG and PNG files
    for filename in os.listdir(static_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            input_path = os.path.join(static_dir, filename)
            output_path = os.path.join(optimized_dir, filename.replace('.png', '.jpg'))

            optimize_image(input_path, output_path)

if __name__ == "__main__":
    main()
