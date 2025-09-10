import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

export const resizeImage = async (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number,
) => {

  if (fs.existsSync(outputPath)) {
    return;

  }


  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await sharp(inputPath).resize(width, height).toFile(outputPath);
  
};
