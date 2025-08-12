# Under Revamp :
- Re-wiring UI 
- Enhancing UX
- Auth behaviour corrections

**As of 10/08/2025 will update the readme once done** 

Feel free to contact me on shujaulisl@gmail.com
<!-- 
# Next.js Blog Platform

A modern, full-stack blog platform built with Next.js 14+, featuring user authentication, blog post management, and admin capabilities.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Authentication**: NextAuth.js with GitHub OAuth and Credentials Provider
- **Database**: MongoDB with Mongoose ODM
- **Styling**: CSS Modules
- **State Management**: Server Actions and React Server Components

## 📁 Project Structure

```
src/
├── app/                    # App router pages and API routes
│   ├── api/               # API endpoints
│   ├── admin/             # Admin dashboard
│   ├── blog/              # Blog pages
│   └── login/             # Authentication pages
├── components/            # Reusable React components
├── library/              # Core functionality
│   ├── actions.js        # Server actions
│   ├── auth.js           # Authentication configuration
│   ├── models.js         # MongoDB schemas
│   ├── data.js           # Data fetching utilities
│   └── utils.js          # Helper functions
└── middleware.js         # NextAuth middleware
```

## 🔑 Key Features

1. **Authentication**
   - GitHub OAuth integration
   - Custom credentials (username/password)
   - Protected routes and admin access
   - Session management

2. **Blog Management**
   - Create, read, update, and delete blog posts
   - Slug-based routing for blog posts
   - Rich text editing
   - Image uploads

3. **User Management**
   - User registration and login
   - Admin dashboard for user management
   - Role-based access control

4. **Admin Features**
   - User management dashboard
   - Blog post management
   - Analytics and monitoring

## 🔌 API Endpoints

### Blog API
- `GET /api/blog` - Fetch all blog posts
- `GET /api/blog/[slug]` - Fetch single blog post
- `DELETE /api/blog/[slug]` - Delete a blog post

### Authentication API
- `POST /api/auth/[...nextauth]` - Authentication endpoints

## 🛠 Server Actions

Located in `library/actions.js`:

### User Management
- `register()` - User registration
- `login()` - User authentication
- `addUser()` - Admin user creation
- `deleteUser()` - User deletion

### Blog Management
- `addPost()` - Create new blog post
- `deletePost()` - Delete blog post
- `handleGithubLogin()` - GitHub OAuth login
- `handleGithubLogout()` - User logout

## 💾 Database Schema

### User Model
```javascript
{
    username: String,    // Required, unique
    email: String,       // Required, unique
    password: String,    // Optional (for credentials auth)
    img: String,         // Optional profile image
    isAdmin: Boolean,    // Default: false
    timestamps: true     // Created/Updated at
}
```

### Post Model
```javascript
{
    title: String,       // Required
    description: String, // Required
    img: String,        // Optional post image
    userId: String,     // Required, author reference
    slug: String,       // Required, unique URL identifier
    timestamps: true    // Created/Updated at
}
```

## 🔒 Authentication Flow

1. **Credentials Authentication**
   - User submits username/password
   - Server validates credentials
   - JWT session created on success

2. **GitHub OAuth**
   - User clicks GitHub login
   - Redirected to GitHub for authorization
   - Account created/linked on successful OAuth
   - Session created automatically

## 🚦 Middleware

The middleware (`middleware.js`) handles:
- Route protection
- Admin access control
- Authentication state
- Redirect rules

## 🔧 Environment Variables

Required environment variables:
```
MONGO=your_mongodb_uri
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret
NEXTAUTH_URL=your_app_url
NEXTAUTH_SECRET=your_nextauth_secret
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3. Set up environment variables
4. Run development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
     
-->

## 🌐 Deployment

The application is not yet! optimized for deployment on Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

This project is licensed under the MIT License.
