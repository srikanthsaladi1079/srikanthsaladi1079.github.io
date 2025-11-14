#!/usr/bin/env python3
"""
Build script to minify CSS and JavaScript files for performance optimization.
"""

import os
import cssmin
import jsmin

def minify_css(input_file, output_file):
    """Minify CSS file."""
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            css_content = f.read()

        minified_css = cssmin.cssmin(css_content)

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(minified_css)

        print(f"Minified CSS: {input_file} -> {output_file}")
        return True
    except Exception as e:
        print(f"Error minifying CSS: {e}")
        return False

def minify_js(input_file, output_file):
    """Minify JavaScript file."""
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            js_content = f.read()

        minified_js = jsmin.jsmin(js_content)

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(minified_js)

        print(f"Minified JS: {input_file} -> {output_file}")
        return True
    except Exception as e:
        print(f"Error minifying JS: {e}")
        return False

def main():
    """Main build function."""
    print("Starting build process...")

    # Minify CSS
    if os.path.exists('style1.css'):
        minify_css('style1.css', 'style1.min.css')
    else:
        print("Warning: style1.css not found")

    # Minify JS (if script.js exists)
    if os.path.exists('script.js'):
        minify_js('script.js', 'script.min.js')
    else:
        print("Warning: script.js not found (extract from website1.html first)")

    print("Build process completed!")

if __name__ == "__main__":
    main()
