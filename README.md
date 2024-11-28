<br />
<div align="center">
  <h3 align="center">Travel Api</h3>

  <p align="center">
    A web application that provides APIs for eco-friendly travel management.
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

The "Travel Api" is a web application that provides the API for working with eco-friendly travels!

### Built With

- Node.js
- Express
- MongoDb


# Getting Started with Travel Api

This project uses Node.js and Express. Ensure you have them installed before proceeding.

## Prerequisites

- Node.js and npm installed on your machine.

## Installation

1. Clone the repository

   ```sh
   git clone https://github.com/djswalterix/orizon-api.git

   ```

2. Install NPM packages

   ```
   npm install
   ```

3. Start application
   ```
   node app.js
   ```


<!-- API DOCUMENTATION -->

## API Documentation

The "Orizon Api" provides the following APIs for eco-friendly travel management:

### Users API

- **Create a New User**

  - Endpoint: `/api/user/postUser`
  - Method: `POST`
  - Description: Create a new user for the eco-friendly travel platform.
    - Request Body:
    - **Name**: User's name.
    - **Surname**: User's surname.
    - **Email**: User's email address.

- **Get All Users**

  - Endpoint: `/api/user/getUser`
  - Method: `GET`
  - Description: Retrieve a list of all registered users.

- **Update User by Id**

  - Endpoint: `/api/user/:id`
  - Method: `PUT`
  - Description: Update user information based on their Id.
    - Request Body:
    - **Name**: User's name.
    - **Surname**: User's surname.
    - **Email**: User's email address.

- **Delete User by Id**
  - Endpoint: `/api/user/:id`
  - Method: `DELETE`
  - Description: Delete a user based on their email.

### Products API

- **Create a New Product**

  - Endpoint: `/api/products/postProduct`
  - Method: `POST`
  - Description: Create a new product.
    - Request Body:
    - **Name**: Product's name.

- **Get All Products**

  - Endpoint: `/api/products/getProduct`
  - Method: `GET`
  - Description: Retrieve a list of all products.

- **Update Product by Id**

  - Endpoint: `/api/products/:id`
  - Method: `PUT`
  - Description: Update product information based on its Id.
  - Request Body:
    - **Name**: Product's name.

- **Delete Product by Id**
  - Endpoint: `/api/products/:id`
  - Method: `DELETE`
  - Description: Delete a product based on its name.

### Orders API

- **Create a New Order**

  - Endpoint: `/api/order/postOrder`
  - Method: `POST`
  - Description: Create a new travel order.
  - Request Body:
    - **userID**: User's id.
    - **productID**: product id.

- **Get All Orders**

  - Endpoint: `/api/order/getOrder`
  - Method: `GET`
  - Description: Retrieve a list of all travel orders.

- **Get All Orders by Date**

  - Endpoint: `/api/order/filterOrders?startDate=YOURDATE&endDate=YOURDATE`
  - Method: `GET`
  - Description: Retrieve all travel orders filtered by a specific date.

- **Get Orders by Product**

  - Endpoint: `/api/order/filterOrders?productId=YOURIDPRODUCT`
  - Method: `GET`
  - Description: Retrieve all travel orders for a specific product.

- **Get Orders by Product and Date**

  - Endpoint: `/api/order/filterOrders?startDate=YOURDATE&endDate=YOURDATE&productId=YOURIDPRODUCT`
  - Method: `GET`
  - Description: Retrieve all travel orders for a specific product filtered by date.

- **Update Order by ID**

  - Endpoint: `/api/order/:id`
  - Method: `PUT`
  - Description: Update travel order based on its ID.
  - Request Body:
    - **userID**: User's id.
    - **productID**: product id.

- **Delete Order by ID**
  - Endpoint: `/api/order/:id`
  - Method: `DELETE`
  - Description: Delete an eco-friendly travel order based on its ID.

<!-- CONTACT -->

## Contact

- LinkedIn: [Davide Capuozzo](https://www.linkedin.com/in/davide-capuozzo-8468682a3/)

