# Guestara Node.js Assignment

This is a Node.js assignment developed by Sagar Kapoor. The project demonstrates various backend technologies and practices for building a robust application.
- [Video Overview](#video-overview)
- [Live Demo](#live-demo)
- [GitHub Repository](#github-repository)
  
## Table of Contents
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Features](#features)
- [Optimization and Performance](#optimization-and-performance)
- [Routes](#routes)

## Tech Stack

- TypeScript
- MongoDB
- Redis
- Express
- Mongoose
- Node.js

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/SagarKapoorin/Guestara-Nodejs-Assignment
   ```

2. Navigate to the project directory:
   ```bash
   cd Guestara-Nodejs-Assignment
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Before running the application, ensure to set the following environment variables in a `.env` file:

```
PORT=<your_port>
MONGO_URL=<your_mongo_db_connection_string>
REDIS_URL=<your_redis_connection_string>
```

## Features

- CRUD operations for categories, items, and subcategories.
- Caching with Redis for improved performance.
- Rate limiting using Redis.
- MongoDB indexing on the name field for optimized queries.
- Clustering with PM2 for better load handling.
- Type safety using Zod and TypeScript.
- Aggregation pipeline setup for advanced data manipulation.
- Inline comments and proper error handling for maintainability.

## Optimization and Performance

This project employs several strategies for optimization and performance:

1. **Redis for Caching**: Reduces database load by caching frequently accessed data.
2. **Redis for Rate Limiting**: Prevents abuse of the API by limiting the number of requests.
3. **MongoDB Indexing**: Enhances query performance by indexing the `name` field.
4. **PM2 Clustering**: Allows the application to utilize multiple CPU cores effectively.
5. **Zod for Type Safety**: Ensures the integrity of data throughout the application.
6. **Aggregation Pipeline Setup**: Enables complex data retrieval and transformation.
7. **Inline Comments and Proper Error Handling**: Improves code readability and maintainability.

## Routes

The application supports the following routes:

- **Add Category**: `/category`
- **Add Item**: `/items`
- **Add Subcategory**: `/subcategory`

## Video Overview

Watch the project overview video [here](https://drive.google.com/file/d/1hWzdUOpjjio75zLE-ZwBPebHCPI2PDKL/view?usp=sharing).

## Live Demo

You can try the live application [here](https://guestara-nodejs-assignment-1.onrender.com).

## GitHub Repository

For the complete source code, visit the [GitHub repository](https://github.com/SagarKapoorin/Guestara-Nodejs-Assignment).
