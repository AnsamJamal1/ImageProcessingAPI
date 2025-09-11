import { resizeImage } from '../utils/imageProcessing';
import path from 'path';
import fs from 'fs';
import logger from '../utils/logger';

describe('Image Processing Utility', () => {
  const inputImage = path.resolve(__dirname, '../../images/image1.jpg');
  const outputDir = path.resolve(__dirname, '../../images/thumb');
  const outputImage = path.resolve(outputDir, 'image1_200x200.jpg');
  beforeAll(() => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      logger.info(`Created output directory: ${outputDir}`);
    }
  });

  afterEach(() => {
    if (fs.existsSync(outputImage)) {
      fs.unlinkSync(outputImage);
      logger.info(`Deleted test output image: ${outputImage}`);
    }
  });

  it('should resize an existing image correctly', async () => {
    await expectAsync(resizeImage(inputImage, outputImage, 200, 200)).toBeResolved();
    expect(fs.existsSync(outputImage)).toBeTrue();
    logger.info('Test passed: Resized image exists');
  });

  it('should throw error if input image does not exist', async () => {
    const fakeInput = path.resolve(__dirname, '../../images/nonexistent.jpg');
    const fakeOutput = path.resolve(outputDir, 'nonexistent_200x200.jpg');

    await expectAsync(resizeImage(fakeInput, fakeOutput, 200, 200)).toBeRejected();
    logger.warn('Test passed: resizeImage rejected for nonexistent image');
  });

  it('should throw error if width or height is invalid', async () => {
    await expectAsync(resizeImage(inputImage, outputImage, -100, 200)).toBeRejected();

    await expectAsync(resizeImage(inputImage, outputImage, 200, 0)).toBeRejected();
    logger.warn('Test passed: resizeImage rejected for invalid dimensions');
  });

  it('should overwrite existing output image', async () => {
    await resizeImage(inputImage, outputImage, 200, 200);
    expect(fs.existsSync(outputImage)).toBeTrue();

    await expectAsync(resizeImage(inputImage, outputImage, 200, 200)).toBeResolved();
    logger.info('Test passed: resizeImage overwrote existing file');
  });
});
