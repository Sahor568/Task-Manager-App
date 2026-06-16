# Task Manager App

A full-featured task management single-page application built with **Angular 21** and **PrimeNG**. Manage your tasks, track progress, and organize work with categories — all powered by local storage with no backend required.

> Built as a 2-week learning and development project to explore modern Angular (standalone components, signals, reactive forms) and PrimeNG UI components.

---

## Features

### Authentication
- User registration with name, email, password, and confirm password
- Login with email/password validation
- Session persistence via `localStorage`
- Auth-guarded routes — all main pages require login
- Logout clears session

### Dashboard Analytics
- Total tasks, completed, pending, and completion rate %
- Tasks due today and overdue counts
- Tasks created in the last 7 days
- Per-category completion stats with visual color indicators
- Attention-needed warning for overdue tasks

### Task Management (Full CRUD)
- Create tasks with title, category, due date, status, and description
- View all tasks in a filterable, searchable table
- Edit existing tasks with pre-populated forms
- View task details with full information
- Delete tasks with one click
- Three statuses: **Pending**, **In Progress**, **Completed**
- Search by title or category (case-insensitive)
- Filter by category or status

### Category Management (Full CRUD)
- Create categories with a name and color (PrimeNG ColorPicker)
- Edit and delete existing categories
- Categories are user-scoped

### Responsive Layout
- Sidebar navigation with active route highlighting
- Header with personalized greeting ("Welcome back, {username}!")
- Footer
- Clean, modern UI with PrimeNG Aura theme


## Project Structure

```
src/
├── app/
│   ├── app.ts                    # Root component with layout shell
│   ├── app.config.ts             # App config (router, PrimeNG theme)
│   ├── app.routes.ts             # Route definitions
│   ├── app.html                  # Root template (header/sidebar/footer outlet)
│   ├── app.scss                  # Global layout styles
│   ├── app.spec.ts               # Root component test
│   ├── auth-guard.ts             # Route guard for authenticated access
│   ├── categories/               # Category CRUD with dialog modal
│   ├── dashboard/                # Analytics overview dashboard
│   ├── footer/                   # Footer component
│   ├── header/                   # Header with user greeting
│   ├── login/                    # Login form
│   ├── register/                 # Registration form
│   ├── sidebar/                  # Sidebar navigation
│   ├── tasks/                    # Task list with search/filter
│   ├── tasks-new/                # Create task form
│   ├── tasks-edit/               # Edit task form
│   ├── tasks-detail/             # Task detail view
│   └── ...
├── index.html
├── main.ts
├── styles.scss
└── ...
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= 18
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Sahor568/Task-Manager-App.git

# Navigate to the project directory
cd Task-Manager-App

# Install dependencies
npm install
```

### Development Server

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

### Build

```bash
npm run build
# or
ng build
```

Build artifacts are stored in the `dist/` directory.

### Running Tests

```bash
npm test
# or
ng test
```
---

## Usage

1. **Register** a new account
2. **Create categories** (e.g., Work, Personal, Shopping) with custom colors
3. **Add tasks** with titles, categories, due dates, and descriptions
4. **Track progress** on the dashboard with real-time analytics
5. **Filter and search** tasks in the All Tasks view
6. **Edit or delete** tasks as needed

---
