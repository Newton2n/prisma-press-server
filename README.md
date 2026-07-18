# Prisma Press

A modern, scalable **Blog Platform Backend API** built with **Express.js 5**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and **Stripe**.

Prisma Press provides a production-ready REST API featuring secure JWT authentication, role-based authorization, blog management, comments, Stripe-powered subscriptions, and a modular architecture designed for scalability and maintainability.

---

## 🚀 Features

- 🔐 JWT Authentication (Access & Refresh Tokens)
- 🍪 Secure HTTP-only Cookie Authentication
- 👤 User Registration & Profile Management
- 📝 Blog Post CRUD Operations
- 💬 Comment System
- 🔍 Search, Filter & Pagination
- 📊 Admin Dashboard Statistics
- 💳 Stripe Subscription Checkout
- 👥 Automatic Stripe Customer Creation
- 🔄 Stripe Webhook Synchronization
- 📅 Subscription Expiration Tracking
- 🔁 Automatic Subscription Status Updates
- 🛡 Role-Based Authorization
- ⚡ Prisma ORM + PostgreSQL
- 📦 Modular Architecture
- ✅ Request Validation with Zod
- ❌ Global Error Handling
- 🔒 Password Hashing with bcrypt
- 📄 Standardized API Responses

---

# 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js 5 |
| Database | PostgreSQL |
| ORM | Prisma 7.x |
| Authentication | JWT + bcrypt |
| Payment | Stripe |

---
---

### 📦 Key Dependencies

This project relies on the following core dependencies:

| Category | Packages |
| :--- | :--- |
| **Core** | `express`, `typescript`, `tsup` |
| **Database** | `prisma`, `@prisma/client`, `pg` |
| **Auth** | `jsonwebtoken`, `bcryptjs`, `cookie-parser` |
| **Payment** | `stripe` |
| **Validation** | `zod` |
| **Utilities** | `dotenv`, `http-status-codes`, `cors` |

---

# 📁 Project Structure

```text
src
├── config
├── generated
├── lib
├── middleware
├── module
│   ├── admin
│   ├── auth
│   ├── comment
│   ├── post
│   ├── subscription
│   └── user
├── routes
├── utils
├── app.ts
└── server.ts

prisma
├── migrations
└── schema.prisma
```

The project follows a feature-based modular architecture. Each module contains its own controller, service, route, validation, and related business logic.

---

# 📦 Modules

| Module | Description |
|---------|-------------|
| Auth | Login and Refresh Token |
| User | Registration and Profile Management |
| Post | CRUD, Search, Filter and Statistics |
| Comment | CRUD and Moderation |
| Subscription | Stripe Checkout and Subscription Management |

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000

DATABASE_URL="postgresql://..."

APP_URL="http://localhost:3000"

BCRYPT_SALT_ROUNDS=10

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

STRIPE_SECRET_KEY=sk_...

STRIPE_PRODUCT_PRICE_ID=price_...

STRIPE_WEBHOOK_SECRET=whsec_...
```

---

# 🚀 Installation

Clone the repository.

```bash
git clone https://github.com/Newton2n/prisma-press-server

cd prisma-press-server
```

Install dependencies.

```bash
npm install
```

Generate Prisma Client.

```bash
npx prisma generate
```

Run database migrations.

```bash
npx prisma migrate dev
```

Start the development server.

```bash
npm run dev
```

---

# 📜 Available Scripts

| Command | Description |
|---------|-------------|
| npm run dev | Start development server |
| npm run build | Build the project |
| npm start | Start production server |
| npm run stripe:webhook | Start Stripe CLI webhook listener |
| npx prisma generate | Generate Prisma Client |
| npx prisma migrate dev | Apply database migrations |
| npx prisma studio | Open Prisma Studio |

---

# 🔐 Authentication

Authentication is implemented using **JWT Access & Refresh Tokens** stored in secure **HTTP-only cookies**.

### Roles

- USER
- ADMIN
- AUTHOR

Protected routes require a valid authenticated session.

---

# 💳 Subscription System

Prisma Press integrates **Stripe Billing** to manage premium subscriptions.

### Checkout Flow

- Creates a Stripe Customer if one does not already exist.
- Creates a Stripe Checkout Session.
- Redirects users to Stripe's secure hosted payment page.
- Stores the Stripe Customer ID for future subscriptions.

### Webhook Events

The backend automatically handles:

- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

### Automatic Subscription Management

When Stripe sends a webhook event, Prisma Press automatically:

- Creates or updates the user's subscription.
- Stores the Stripe Customer ID.
- Stores the Stripe Subscription ID.
- Tracks the subscription expiration date.
- Synchronizes subscription status with Stripe.
- Updates subscription status to:
  - ACTIVE
  - CANCELED
  - EXPIRED

---

# 🔑 Stripe Webhook Configuration

## Local Development

Start the Stripe CLI listener.

```bash
npm run stripe:webhook
```

Use the generated webhook secret.

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxx
```

> The webhook secret changes every time the Stripe CLI is restarted.

---

## Production

Create a webhook endpoint in your Stripe Dashboard.

```
https://your-domain.com/api/subscriptions/webhook
```

Copy the generated webhook secret into your production environment variables.

---

# 📄 Standard API Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": {}
}
```

---

# ❌ Error Response

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation Error",
  "errors": [
    {
      "path": "email",
      "message": "Email is required"
    }
  ]
}
```

---

# 📚 API Overview

## Authentication

- Login
- Refresh Access Token

## Users

- Register
- Get Profile
- Update Profile

## Posts

- Create Post
- Get All Posts
- Get Single Post
- Get My Posts
- Update Post
- Delete Post
- Search Posts
- Post Statistics (Admin)

## Comments

- Create Comment
- Get Comment
- Get Comments by Author
- Update Comment
- Delete Comment
- Moderate Comment (Admin)

## Subscription

- Create Checkout Session
- Stripe Webhook
- Automatic Subscription Sync


---

# 🛡 Security

- JWT Authentication
- HTTP-only Cookies
- Password Hashing with bcrypt
- Global Error Handling
- Environment Variable Configuration
- Role-Based Authorization
- Secure Stripe Webhooks

---

# 🌐 Live API

```
https://prisma-press-lime.vercel.app/
```

---

# 🚀 Deployment

The application can be deployed on:

- Vercel
- Railway
- Render
- DigitalOcean
- AWS

---

# 🤝 Contributing

1. Fork the repository.

2. Create a feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push your branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Newton Bepari**

GitHub: https://github.com/Newton2n

Portfolio: https://newtondev.vercel.app/

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
