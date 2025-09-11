import express from 'express';
import { resizeImage } from '../utils/imageProcessing';
import path from 'path';
import logger from '../utils/logger';

const router = express.Router();

router.get('/', async (req, res) => {
  const { filename, width, height } = req.query;
  if (!filename) {
    logger.warn('Missing filename parameter');
    return res.status(400).send('Missing filename parameter');
  }
  if (!width || !height) {
    logger.warn('Missing width or height parameter');
    return res.status(400).send('Missing width or height parameter');
  }

  const w = parseInt(width as string);
  const h = parseInt(height as string);
  if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
    logger.warn(`Invalid dimensions: width=${width}, height=${height}`);
    return res.status(400).send('Width and height must be positive numbers');
  }

  const inputPath = path.resolve(__dirname, '../../images', `${filename}.jpg`);
  const outputPath = path.resolve(__dirname, '../../images/thumb', `${filename}_${w}x${h}.jpg`);
  try {
    await resizeImage(inputPath, outputPath, w, h);
    logger.info(`Image processed: ${filename} resized to ${w}x${h}`);
    return res.sendFile(outputPath);
  } catch (error) {
    logger.error(`Error processing image: ${filename}, details: ${(error as Error).message}`);
    return res.status(404).send('Image not found or error processing image');
  }
});

export default router;
