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
const imageProcessing_1 = require("../utils/imageProcessing");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
describe('Image Processing Utility', () => {
    const inputImage = path_1.default.resolve(__dirname, '../../images/image1.jpg');
    const outputDir = path_1.default.resolve(__dirname, '../../images/thumb');
    const outputImage = path_1.default.resolve(outputDir, 'image1_200x200.jpg');
    beforeAll(() => {
        if (!fs_1.default.existsSync(outputDir)) {
            fs_1.default.mkdirSync(outputDir, { recursive: true });
        }
    });
    afterEach(() => {
        if (fs_1.default.existsSync(outputImage)) {
            fs_1.default.unlinkSync(outputImage);
        }
    });
    it('should resize an existing image correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, imageProcessing_1.resizeImage)(inputImage, outputImage, 200, 200)).toBeResolved();
        expect(fs_1.default.existsSync(outputImage)).toBeTrue();
    }));
    it('should throw error if input image does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeInput = path_1.default.resolve(__dirname, '../../images/nonexistent.jpg');
        const fakeOutput = path_1.default.resolve(outputDir, 'nonexistent_200x200.jpg');
        yield expectAsync((0, imageProcessing_1.resizeImage)(fakeInput, fakeOutput, 200, 200)).toBeRejected();
    }));
    it('should throw error if width or height is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, imageProcessing_1.resizeImage)(inputImage, outputImage, -100, 200)).toBeRejected();
        yield expectAsync((0, imageProcessing_1.resizeImage)(inputImage, outputImage, 200, 0)).toBeRejected();
    }));
    it('should overwrite existing output image', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, imageProcessing_1.resizeImage)(inputImage, outputImage, 200, 200);
        expect(fs_1.default.existsSync(outputImage)).toBeTrue();
        yield expectAsync((0, imageProcessing_1.resizeImage)(inputImage, outputImage, 200, 200)).toBeResolved();
    }));
});
