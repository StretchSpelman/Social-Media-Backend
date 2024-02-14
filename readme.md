# Social Media Backend

## Overview

The Social Media Backend is a robust API designed to power a social networking platform. It provides a suite of features that enable users to interact with each other through posts, comments, and reactions.

## Features

- **User Management**: Create, read, update, and delete user profiles.
- **Thought Management**: Post, view, update, and delete thoughts.
- **Reaction Management**: React to thoughts with various emojis.
- **Friend Management**: Add and remove friends, manage friend lists.

## Installation & Setup

To get started with the Social Media Backend, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install all dependencies.
4. Ensure you have MongoDB installed and running.
5. Start the server by running `npm start`.

## Usage

The API uses standard HTTP methods for CRUD operations. Here are some examples of how to use the API with Insomnia:

### Users

- **GET** `/api/users`: Retrieve a list of all users.
- **GET** `/api/users/:id`: Get a single user by ID.
- **POST** `/api/users`: Create a new user.
- **PUT** `/api/users/:id`: Update a user's information.
- **DELETE** `/api/users/:id`: Delete a user.

### Thoughts

- **GET** `/api/thoughts`: Retrieve a list of all thoughts.
- **GET** `/api/thoughts/:id`: Get a single thought by ID.
- **POST** `/api/thoughts`: Create a new thought.
- **PUT** `/api/thoughts/:id`: Update a thought.
- **DELETE** `/api/thoughts/:id`: Delete a thought.

### Reactions

- **POST** `/api/thoughts/:thoughtId/reactions`: Add a reaction to a thought.
- **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought.

### Friends

- **POST** `/api/users/:userId/friends/:friendId`: Add a friend to a user's friend list.
- **DELETE** `/api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list.


## License

This project is licensed under the [MIT License](LICENSE).