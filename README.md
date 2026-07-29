# Coffee Explorer

Coffee Explorer is a full-stack e-commerce project for coffee products and accessories.  
It includes a customer storefront, authentication, cart flow, checkout, order creation, and a small admin area.

### Link
https://coffeeshop-exam.vercel.app/

## Tech Stack

### Frontend (`client`)
- React + Vite
- React Router
- SCSS
- i18next (EN/LT)
- Context API (Auth/Cart)
- Framer Motion

### Backend (`server`)
- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication
- CORS + dotenv

---

## Features

- Product catalog (coffee + accessories)
- Category and search flow
- Product details page
- Add to cart / remove from cart
- User authentication (login/register)
- Profile page with user orders
- Checkout page with multiple payment method UI
- Guest checkout support (`/api/orders/guest`)
- Order success page
- Multilanguage support (English / Lithuanian)
- Responsive design for desktop/tablet/mobile

---

## Project Structure

```bash
coffee-exam/
  client/   # React frontend
  server/   # Express API
```

---

## Run Locally

### 1) Configure environment variables

Create `server/.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
```

> Use your own MongoDB connection string (Atlas or local MongoDB).

Create `client/.env`:

```env
VITE_API_URL=http://localhost:3000
```

### 2) Configure and start backend
```bash
cd server
npm install
nodemon server.js
```

### 3) Configure and start frontend
```bash
cd client
npm install
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:3000`

---

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/articles`
- `GET /api/cart` (auth)
- `POST /api/cart` (auth)
- `POST /api/orders` (auth)
- `POST /api/orders/guest` (public)
- `GET /api/orders` (auth)

---

## Notes

- Payment methods are mock/demo UI (no real payment gateway integration).
- Order is completed only from the final checkout “Pay” button.
- Guest and authenticated order flows are both supported.

---

## Author

Exam project built by Vitalijus Lazarev for Vilniaus Coding School. For learning and portfolio purposes.
