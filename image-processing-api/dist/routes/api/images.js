'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const imageProcessing_1 = require('../../utils/imageProcessing');
const path_1 = __importDefault(require('path'));
const router = express_1.default.Router();
router.get('/', async (req, res) => {
  const { filename, width, height } = req.query;
  if (!filename) return res.status(400).send('Missing filename parameter');
  if (!width || !height) return res.status(400).send('Missing width or height parameter');
  const w = parseInt(width);
  const h = parseInt(height);
  if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
    return res.status(400).send('Width and height must be positive numbers');
  }
  const inputPath = path_1.default.join(__dirname, '../../../images', `${filename}.jpg`);
  const outputPath = path_1.default.join(
    __dirname,
    '../../../images/thumb',
    `${filename}_${w}x${h}.jpg`,
  );
  try {
    await (0, imageProcessing_1.resizeImage)(inputPath, outputPath, w, h);
    res.sendFile(outputPath);
  } catch (err) {
    res.status(404).send('Image not found or error processing image');
  }
});
exports.default = router;
