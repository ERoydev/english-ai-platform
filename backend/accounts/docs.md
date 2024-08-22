# API Documentation

## Authentication Endpoints

### `POST auth/login/`
- **Description**: Authenticates a user and returns a token.
- **Body Parameters**:
  - `email`: string, required
  - `password`: string, required
- **Response**: Returns a token object and user.

### `POST auth/signup/`
- **Description**: Signup a user.
- **Body Parameters**:
  - `email`: string, required
  - `password`: string, required
- **Response**: Returns a token object and user.

### `GET auth/test_token/`
- **Description**: Token verification.
- **Response**: Success message for user email.
