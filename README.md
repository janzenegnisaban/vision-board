<<<<<<< HEAD
# vision-board
=======
# VisionBoard - Digital Interactive Information Board

VisionBoard is a digital interactive information board providing structured access based on user roles. It allows organizations to share announcements, events, and information with different levels of access control.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- shadcn/ui components
- JWT Authentication

## Features

- Role-based access control (User, Admin, SuperAdmin)
- Interactive announcements with various display types
- Event management
- Information sharing
- Dark/Light mode
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/visionboard.git
cd visionboard
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`
npm install --legacy-peer-deps

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
\`\`\`
DATABASE_URL="postgresql://username:password@localhost:5432/visionboard"
JWT_SECRET="janzenpogi111"
\`\`\`

4. Set up the database:
\`\`\`bash
npx prisma migrate dev --name init
npx prisma db seed
\`\`\`
npm install ts-node --legacy-peer-deps
npx prisma db seed

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Sample Accounts

### SuperAdmin
- Email: superadmin@example.com
- Password: password123

### Admin
- Email: admin@example.com
- Password: password123

### Regular User
- Email: user@example.com
- Password: password123

## Project Structure

- `/app` - Next.js App Router frontend
- `/app/api` - API routes
- `/components` - React components
- `/lib` - Utility functions
- `/prisma` - Prisma schema and migrations

## Database Schema

The database includes the following models:
- User: Stores user information and roles
- Announcement: Stores announcements with various display types
- Event: Stores event information

## API Endpoints

### Authentication
- POST /api/auth - Login, register, and logout

### Announcements
- GET /api/announcements - Get all announcements
- POST /api/announcements - Create a new announcement
- GET /api/announcements/:id - Get a specific announcement
- PUT /api/announcements/:id - Update an announcement
- DELETE /api/announcements/:id - Delete an announcement

### Events
- GET /api/events - Get all events
- POST /api/events - Create a new event
- GET /api/events/:id - Get a specific event
- PUT /api/events/:id - Update an event
- DELETE /api/events/:id - Delete an event

### Users
- GET /api/users - Get all users (admin only)
- POST /api/users - Create a new user (superadmin only)
- GET /api/users/:id - Get a specific user
- PUT /api/users/:id - Update a user
- DELETE /api/users/:id - Delete a user (superadmin only)

## License

This project is licensed under the MIT License.
\`\`\`

Let's create a package.json file with the necessary scripts:
>>>>>>> 6449387 (Initial project setup for VisionBoard)
