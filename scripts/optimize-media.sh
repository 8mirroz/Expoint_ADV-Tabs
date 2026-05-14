#!/bin/bash

set -e

echo "Starting image and video optimization..."

# Optimize JPEG images
echo "Optimizing JPEG images..."
find public/img -type f \( -name "*.jpg" -o -name "*.jpeg" \) -exec sh -c '
  for file; do
    echo "Processing: $file"
    /opt/homebrew/opt/mozjpeg/bin/cjpeg -quality 85 -optimize -outfile "$file.tmp.jpg" "$file" && mv "$file.tmp.jpg" "$file"
  done
' _ {} +

find public/portfolio -type f \( -name "*.jpg" -o -name "*.jpeg" \) -exec sh -c '
  for file; do
    echo "Processing: $file"
    /opt/homebrew/opt/mozjpeg/bin/cjpeg -quality 85 -optimize -outfile "$file.tmp.jpg" "$file" && mv "$file.tmp.jpg" "$file"
  done
' _ {} +

# Optimize PNG images
echo "Optimizing PNG images..."
find public -type f -name "*.png" -exec sh -c '
  for file; do
    echo "Processing: $file"
    oxipng -o max --strip all "$file"
  done
' _ {} +

# Optimize SVG images
echo "Optimizing SVG images..."
find public -type f -name "*.svg" -exec sh -c '
  for file; do
    echo "Processing: $file"
    svgo "$file"
  done
' _ {} +

# Optimize WebP images
echo "Optimizing WebP images..."
find public -type f -name "*.webp" -exec sh -c '
  for file; do
    echo "Processing: $file"
    cwebp -q 80 "$file" -o "$file.tmp.webp" && mv "$file.tmp.webp" "$file"
  done
' _ {} +

# Optimize videos
echo "Optimizing videos..."
find public/videos mp4 -type f \( -name "*.mp4" -o -name "*.webm" -o -name "*.ogg" \) -exec sh -c '
  for file; do
    echo "Processing: $file"
    ffmpeg -i "$file" -vcodec libx264 -crf 28 -preset veryslow -acodec aac -b:a 128k "$file.tmp.mp4" && mv "$file.tmp.mp4" "$file"
  done
' _ {} +

echo "Optimization complete!"