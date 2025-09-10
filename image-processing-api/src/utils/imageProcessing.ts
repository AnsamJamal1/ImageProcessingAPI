import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

export const resizeImage = async (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number,
): Promise<void> => {

  if (fs.existsSync(outputPath)) {
    console.log(`Serving cached image: ${outputPath}`);
    return;

  }


  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory for thumbnails: ${dir}`);
  }

  await sharp(inputPath).resize(width, height).toFile(outputPath);
  console.log(`Processed and saved image: ${outputPath}`);
  
};
