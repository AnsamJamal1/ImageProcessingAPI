"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageProcessing_1 = require("../utils/imageProcessing");
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    if (!filename)
        return res.status(400).send('Missing filename parameter');
    if (!width || !height)
        return res.status(400).send('Missing width or height parameter');
    const w = parseInt(width);
    const h = parseInt(height);
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
        return res.status(400).send('Width and height must be positive numbers');
    }
    const inputPath = path_1.default.resolve(__dirname, '../../images', `${filename}.jpg`);
    const outputPath = path_1.default.resolve(__dirname, '../../images/thumb', `${filename}_${w}x${h}.jpg`);
    try {
        yield (0, imageProcessing_1.resizeImage)(inputPath, outputPath, w, h);
        return res.sendFile(outputPath);
    }
    catch (_a) {
        return res.status(404).send('Image not found or error processing image');
    }
}));
exports.default = router;
