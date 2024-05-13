# Multi-Level Marketing API

## Overview

This Node.js API manages users in a multi-level marketing network and distributes earnings according to predefined rules.

## Installation

1. Clone the repository.

2. Navigate to the project directory.

3. Install dependencies.

4. Start the server by using npm start.

The server will start running on `http://localhost:8080`.

## Endpoints

### Create a New User

- **URL:** `/users`
- **Method:** POST
- **Body Parameters:**
- `name` (string): Name of the user.
- `parentId` (optional string): ID of the parent user. If not provided, the user will be added at Level 0.
- `earnings` (optional number): Initial earnings of the user. Defaults to 0.

### Distribute Earnings

- **URL:** `/distribute`
- **Method:** POST
- **Body Parameters:**
- `userId` (string): ID of the user whose earnings are to be distributed.
- `earnings` (number): Total earnings to distribute among the user's hierarchy.

### Get All Users

- **URL:** `/users`
- **Method:** GET
- **Response:** Array of user objects.

## Distribution Rules

- If a Level 8 user earns Rs. 1000, 40% of it will be distributed among all users above Level 8 according to the specified percentages.
- If a Level 2 user earns Rs. 1000, 20% will be distributed to Level 1 and 10% will be distributed to Level 0.
