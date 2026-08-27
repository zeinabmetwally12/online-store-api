# Online Store Product Module

## Entity

The entity chosen for this module is **Product** because products are an important part of the Online Store project.

The Product model contains the following fields:

* name
* price
* category
* stock

## API Routes

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/api/v1/products`     | Create a new product |
| GET    | `/api/v1/products`     | Get all products     |
| GET    | `/api/v1/products/:id` | Get a product by ID  |
| PATCH  | `/api/v1/products/:id` | Update a product     |
| DELETE | `/api/v1/products/:id` | Delete a product     |

## Technologies

* Node.js
* Express.js
* MongoDB
* Mongoose

## How to Run Locally

1. Install the project dependencies:

```bash
npm install
```

2. Create a `.env` file and add the MongoDB connection information:

```text
MONGODB_URI=your_mongodb_connection_string
DB_NAME=online-store
```

3. Start the server:

```bash
npm start
```

4. The API will run on:

```text
http://localhost:5000
```

## Postman Testing

The five Product CRUD routes were tested using Postman:

* Create Product
* Get All Products
* Get Product By ID
* Update Product
* Delete Product


### New Features

* Product image upload using Multer
* Image validation for JPG, JPEG, and PNG files
* Maximum image size of 5 MB
* Product images are stored in the `uploads/products` folder
* Uploaded image filename is saved in MongoDB
* Product images can be accessed through the API
* Product image can be replaced when updating a product
* Old product image is deleted when a new image is uploaded
* Product image is deleted when the product is deleted

### How to Run the Project

1. Install the project dependencies using `npm install`.
2. Create a `.env` file and add the MongoDB connection string.
3. Start the server using `npm start`.
4. The API runs on port 5000.

### API Usage Examples

#### Create Product with Image

Use `POST /api/v1/products` with `multipart/form-data`.

Send the product information such as name, price, category, and stock, together with an image file using the `image` field.

#### Get All Products

Use `GET /api/v1/products` to retrieve all products.

#### Get Product by ID

Use `GET /api/v1/products/:id` to retrieve a specific product.

#### Update Product with Image

Use `PATCH /api/v1/products/:id` with `multipart/form-data` to update product information and optionally upload a new image.

When a new image is uploaded, the previous product image is removed.

#### Delete Product

Use `DELETE /api/v1/products/:id` to delete a product.

If the product has an uploaded image, the image file is also removed.

#### Access Product Image

Uploaded images can be accessed through:

`/uploads/products/<image-filename>`

## Authentication

### Authentication Features

The Online Store API now includes authentication using bcryptjs and JSON Web Tokens (JWT).

### User Roles

The system supports two user roles:

- Customer
- Admin

New users are registered as Customer by default.

### User Fields

Users contain:

- Name
- Email
- Password
- Phone
- Role

Passwords are hashed using bcryptjs before being stored in MongoDB.

### Authentication Routes

#### Register

POST `/api/v1/auth/register`

Example request:

```json
{
    "name": "Zainab",
    "email": "zainab@example.com",
    "password": "12345678",
    "phone": "01012345678"
}


##Authentication & Authorization

### Authentication

The Online Store API uses JWT authentication and bcryptjs password hashing.

### User Roles

The system supports two roles:

- Customer
- Admin

New users are registered as Customer by default.

### User Fields

Users contain:

- Name
- Email
- Password
- Phone
- Role

Passwords are hashed using bcryptjs before being stored in MongoDB.

### Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/v1/auth/register | Register a new customer |
| POST | /api/v1/auth/login | Login and receive JWT |
| GET | /api/v1/auth/me | Protected route |

### Product Authorization

Public routes:

- GET /api/v1/products
- GET /api/v1/products/:id

Admin-only routes:

- POST /api/v1/products
- PATCH /api/v1/products/:id
- DELETE /api/v1/products/:id

### Authorization

JWT tokens are sent using:

Authorization: Bearer <token>

Customers cannot create, update, or delete products.

Admins can manage products.

### How to Run

npm install

Create a .env file containing:

MONGODB_URI=your_mongodb_connection_string
DB_NAME=online-store
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d

Start the server:

npm start

The API runs on:

http://localhost:5000