import express from 'express';
import imagesRouter from './routes/images';
import logger from './utils/logger';

const app = express();
const port = 3000;

app.use('/api/images', imagesRouter);

app.get('/', (req, res) => {
  res.send('Welcome to Image Processing API! Try /api/images?filename=image1&width=200&height=200');
});

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});

export default app;
