const sharp = require('sharp');
const fs = require('fs');

async function generateIcons() {
  const svgBuffer = fs.readFileSync('assets/logo.svg');

  await sharp(svgBuffer).resize(1024, 1024).png().toFile('assets/icon.png');
  await sharp(svgBuffer).resize(1024, 1024).png().toFile('assets/adaptive-icon.png');
  await sharp(svgBuffer).resize(48, 48).png().toFile('assets/favicon.png');
  
  // Create a splash icon with more padding
  await sharp({
    create: {
      width: 2048,
      height: 2048,
      channels: 4,
      background: { r: 139, g: 171, b: 62, alpha: 1 }
    }
  })
  .composite([{ input: await sharp(svgBuffer).resize(1024, 1024).toBuffer() }])
  .png()
  .toFile('assets/splash-icon.png');

  console.log('All icons generated successfully.');
}

generateIcons().catch(err => console.error(err));
