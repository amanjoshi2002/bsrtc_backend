# Project Name

This project is a Node.js application using Express.js as the server framework and MongoDB as the database. It provides various API endpoints for managing resources such as contact information, policies, and more.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB Atlas account or local MongoDB server

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   MONGODB_URI=mongodb+srv://sctaman21:hellohello@test.vg3iafi.mongodb.net/?retryWrites=true&w=majority&appName=test
   JWT_SECRET=your_jwt_secret
   PORT=5000
   CORS_ORIGIN=http://localhost:3000
   ```

   - Replace `your_jwt_secret` with a secure secret key for JWT authentication.

4. **Connect to MongoDB:**

   Ensure your MongoDB URI is correct and that your MongoDB server is running. If using MongoDB Atlas, ensure your IP is whitelisted and credentials are correct.

## Running the Application

1. **Start the server:**

   ```bash
   npm start
   ```

   The server will start on the port specified in the `.env` file (default is 5000).

2. **Access the API:**

   You can access the API endpoints at `http://localhost:5000/api`.

## API Endpoints

- `/api/contact` - Manage contact information
- `/api/phone-directory` - Access phone directory
- `/api/news` - Manage news items
- `/api/depots` - Manage depots
- `/api/policies` - Manage policies
- `/api/about-us` - About Us information
- `/api/auth` - Authentication routes
- `/api/faq` - Frequently Asked Questions
- `/api/popular-routes` - Popular routes
- `/api/tenders` - Manage tenders
- `/api/gallery` - Manage gallery
- `/api/tourist-destinations` - Tourist destinations
- `/api/booking-policy` - Booking policy management
- `/api/divisions` - Manage divisions
- `/api/contact-info` - Contact information
- `/api/privacy` - Privacy policies
- `/api/terms` - Terms and conditions
- `/api/flash-news` - Flash news
- `/api/gallery-events` - Gallery events
- `/api/cancellation-policy` - Cancellation policy
- `/api/about-profile` - About profile

## Middleware

- **CORS**: Configured to allow specific origins.
- **Morgan**: Used for logging HTTP requests.
- **Body-Parser**: Parses incoming request bodies in a middleware before your handlers.

## Error Handling

The application includes basic error handling middleware that logs errors and returns a 500 status code with a message.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)