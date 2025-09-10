# Image Processing API
An API built with Node.js, Express, and TypeScript to resize images dynamically using URL parameters. The API also caches resized images to improve performance.

## Table of Contents
- [Image Processing API](#image-processing-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoint](#api-endpoint)
  - [Dependencies](#dependencies)
  - [Testing](#testing)

## Installation
1. Clone the repository:
   git clone (https://github.com/AnsamJamal1/ImageProcessingAPI.git)
2. Navigate to the project folder:
   cd image-processing-api
3. Install dependencies:
   npm install
4. Build the project:
   npm run build

## Usage
- Start the server in development mode:
   npm run dev
- Start the server in production mode:
  npm start
## API Endpoint
- Resize images by specifying filename, width, and height as query parameters:
  GET /api/images?filename=<image-name>&width=<width>&height=<height>
- Example:
  http://localhost:3000/api/images?filename=image1&width=200&height=200

Resized images are stored in images/thumb/ and reused for future requests with the same dimensions to improve performance.

## Dependencies

express - Web framework

sharp - Image processing library

supertest - Testing HTTP endpoints

typescript - TypeScript support

ts-node-dev - Run TypeScript directly in dev

## Testing
All tests are located in src/tests/

- Run tests:
   npm test
