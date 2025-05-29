# Node.js Product API

This project is a simple RESTful API for managing products using Node.js core modules. It supports CRUD operations, search and filtering, file-based persistence, validation, error handling, rate limiting, and logging.

## Features

- **CRUD for Products**
  - `GET /products`: List all products
  - `POST /products`: Add a new product
  - `PUT /products/:id`: Update product by ID
  - `DELETE /products/:id`: Delete product by ID

- **Search & Filtering**
  - Support query parameters like `?name=`, `?category=`, `?minPrice=`, `?maxPrice=`

- **File-Based Persistence**
  - Store and retrieve product data from a local JSON file

- **Validation & Error Handling**
  - Validate required fields (e.g., name, price, quantity)
  - Respond with appropriate HTTP status codes
  - Handle malformed requests gracefully

- **Rate Limiting**
  - Limit requests per IP (e.g., 100 requests/hour)

- **Logging**
  - Log each incoming request (method, URL, timestamp) to a log file

## Technical Requirements

- Built using Node.js core modules only (http, fs, url, path, etc.)
- No frameworks or external packages
- Uses native async operations (e.g., fs.promises)
- Proper modular structure (e.g., routing, controllers, services)

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd nodejs-product-api
   ```

2. Run the application:
   ```
   node src/index.js
   ```

3. The API will be available at `http://localhost:3000`.

## API Endpoints

- **List all products**
  - `GET /products`

- **Add a new product**
  - `POST /products`
  - Request body: `{ "name": "Product Name", "price": 100, "quantity": 10 }`

- **Update product by ID**
  - `PUT /products/:id`
  - Request body: `{ "name": "Updated Product Name", "price": 150, "quantity": 5 }`

- **Delete product by ID**
  - `DELETE /products/:id`

## Testing

A Postman collection is included in the `postman_collection.json` file for testing the API endpoints.

## Logging

All incoming requests are logged in the `src/logs/requests.log` file.

## License

This project is licensed under the MIT License.