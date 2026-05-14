const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = './public/img';
const PORTFOLIO_DIR = './public/portfolio';
const VIDEOS_DIR = './public/videos';
const MP4_DIR = './mp4';

function runCommand(cmd) {
  try {
    execSync(cmd, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error executing: ${cmd}`);
    console.error(error.message);
    return false;
  }
}

function optimizeJpeg(file) {
  const mozjpegPath = '/opt/homebrew/opt/mozjpeg/bin/cjpeg';
  const tempFile = file + '.tmp.jpg';
  
  // Convert to mozjpeg optimized format
  const cmd = `${mozjpegPath} -quality 85 -optimize -outfile "${tempFile}" "${file}"`;
  if (runCommand(cmd)) {
    // Replace original with optimized version
    fs.renameSync(tempFile, file);
    console.log(`Optimized JPEG: ${file}`);
    return true;
  }
  return false;
}

function optimizePng(file) {
  const cmd = `oxipng -o max --strip all "${file}"`;
  if (runCommand(cmd)) {
    console.log(`Optimized PNG: ${file}`);
    return true;
  }
  return false;
}

function optimizeSvg(file) {
  const cmd = `svgo "${file}"`;
  if (runCommand(cmd)) {
    console.log(`Optimized SVG: ${file}`);
    return true;
  }
  return false;
}

function optimizeWebp(file) {
  const tempFile = file + '.tmp.webp';
  const cmd = `cwebp -q 80 "${file}" -o "${tempFile}"`;
  if (runCommand(cmd)) {
    fs.renameSync(tempFile, file);
    console.log(`Optimized WebP: ${file}`);
    return true;
  }
  return false;
}

function optimizeVideo(file) {
  const tempFile = file + '.tmp.mp4';
  const cmd = `ffmpeg -i "${file}" -vcodec libx264 -crf 28 -preset veryslow -acodec aac -b:a 128k "${tempFile}"`;
  if (runCommand(cmd)) {
    fs.renameSync(tempFile, file);
    console.log(`Optimized Video: ${file}`);
    return true;
  }
  return false;
}

function processImagesInDir(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} does not exist, skipping...`);
    return;
  }
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    
    if (fs.statSync(filePath).isDirectory()) {
      processImagesInDir(filePath);
      continue;
    }
    
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        optimizeJpeg(filePath);
        break;
      case '.png':
        optimizePng(filePath);
        break;
      case '.svg':
        optimizeSvg(filePath);
        break;
      case '.webp':
        optimizeWebp(filePath);
        break;
      case '.mp4':
      case '.webm':
      case '.ogg':
        optimizeVideo(filePath);
        break;
      default:
        // Skip unknown formats
        break;
    }
  }
}

// Run optimization
console.log('Starting image and video optimization...');
processImagesInDir(IMAGES_DIR);
processImagesInDir(PORTFOLIO_DIR);
processImagesInDir(VIDEOS_DIR);
processImagesInDir(MP4_DIR);
console.log('Optimization complete!');