import express from 'express';
import { resizeImage } from '../utils/imageProcessing';
import path from 'path';


const router = express.Router();

router.get('/', async (req, res) => {
  const { filename, width, height } = req.query;
  if (!filename) return res.status(400).send('Missing filename parameter');
  if (!width || !height) return res.status(400).send('Missing width or height parameter');

  const w = parseInt(width as string);
  const h = parseInt(height as string);
  if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
    return res.status(400).send('Width and height must be positive numbers');
  }

  const inputPath = path.resolve(__dirname, '../../images', `${filename}.jpg`);
  const outputPath = path.resolve(__dirname, '../../images/thumb', `${filename}_${w}x${h}.jpg`);
  try {
    await resizeImage(inputPath, outputPath, w, h);
    return res.sendFile(outputPath);
  } catch {
    return res.status(404).send('Image not found or error processing image');
  }
  
});

export default router;
