import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import logger from './logger';

export const resizeImage = async (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number,
): Promise<void> => {
  if (fs.existsSync(outputPath)) {
    logger.info(`Serving cached image: ${outputPath}`);
    return;
  }

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    logger.info(`Created directory for thumbnails: ${dir}`);
  }

  await sharp(inputPath).resize(width, height).toFile(outputPath);
  logger.info(`Processed and saved image: ${outputPath}`);
};
