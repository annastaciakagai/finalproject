# Shadcn-UI Template Usage Instructions

## technology stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

All shadcn/ui components have been downloaded under `@/components/ui`.

## File Structure

- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration file
- `tailwind.config.js` - Tailwind CSS configuration file
- `package.json` - NPM dependencies and scripts
- `src/app.tsx` - Root component of the project
- `src/main.tsx` - Project entry point
- `src/index.css` - Existing CSS configuration

## Components

- All shadcn/ui components are pre-downloaded and available at `@/components/ui`

## Styling

- Add global styles to `src/index.css` or create new CSS files as needed
- Use Tailwind classes for styling components

## Development

- Import components from `@/components/ui` in your React components
- Customize the UI by modifying the Tailwind configuration

## Note

The `@/` path alias points to the `src/` directory

# Commands

**Install Dependencies**

```shell
pnpm i
```

**Start Preview**

```shell
pnpm run dev
```

**To build**

```shell
pnpm run build
```
## 2. **Frontend (Client) React App Breakdown**

- **Entry Point:** `src/main.tsx` renders the root React component.
- **Routing:** Pages are organized in `src/pages/` (e.g., `HomePage.tsx`, `LoginPage.tsx`, `RegisterPage.tsx`, dashboards).
- **Authentication:** Forms in `src/components/auth/` handle login and registration, sending requests to the backend.
- **Dashboards:** Role-based dashboards in `src/components/dashboard/` and `src/pages/dashboards/`.
- **UI Components:** Reusable UI in `src/components/ui/` (buttons, forms, dialogs, etc.).
- **API Calls:** Centralized in `src/services/api.ts`—all data fetching and posting to backend endpoints.
- **State Management:** Likely uses React state/hooks; may use context or external state libraries for auth/session.
- **Styling:** Tailwind CSS (`tailwind.config.ts`, `App.css`).

---

## 3. **Step-by-Step Integration: Client, Server, Database, and Dataflow**

### **A. Database Setup**
- Backend uses MongoDB (see `server/config/db.js`).
- Ensure MongoDB is running locally or use a cloud provider (MongoDB Atlas).
- Connection string is set in `server/.env`.

### **B. Backend (Server) Setup**
- Express server (`server/server.js`) exposes RESTful API endpoints.
- Controllers handle business logic (auth, users, produce, events, transactions).
- Models define MongoDB schemas (User, Produce, etc.).
- Middleware handles authentication (JWT), error handling, and CORS.

### **C. Frontend (Client) Setup**
- React app sends HTTP requests to backend API (see `src/services/api.ts`).
- API base URL should match backend server (e.g., `http://localhost:5000`).

### **D. User Registration & Authentication Flow (with JWT)**

1. **User Registration**
    - User fills registration form (`RegistrationForm.tsx`).
    - Form data sent to backend `/api/users/register`.
    - Backend creates user in MongoDB, returns success or error.

2. **User Login**
    - User fills login form (`LoginForm.tsx`).
    - Credentials sent to backend `/api/users/login`.
    - Backend verifies credentials:
        - If valid, generates JWT token and returns it to frontend.
        - If invalid, returns error.

3. **JWT Token Handling**
    - Frontend stores JWT (usually in localStorage or cookies).
    - For protected routes/API calls, frontend includes JWT in `Authorization` header:
        ```
        Authorization: Bearer <token>
        ```
    - Backend middleware (`auth.js`) verifies JWT for protected endpoints.

4. **Authenticated Requests**
    - User accesses dashboard or performs actions (e.g., add produce, view events).
    - Frontend sends requests with JWT.
    - Backend validates token, processes request, and returns data.

### **E. API Routes Example**

- **User Registration:** `POST /api/users/register`
- **User Login:** `POST /api/users/login`
- **Get User Profile:** `GET /api/users/profile` (protected)
- **Add Produce:** `POST /api/produce` (protected)
- **Get Collection Events:** `GET /api/collection-events` (protected)

### **F. Dataflow Summary**

1. **Frontend** → **Backend**: Sends registration/login/data requests.
2. **Backend** → **Database**: Reads/writes user and produce data.
3. **Backend** → **Frontend**: Returns data or JWT token.
4. **Frontend**: Stores JWT, uses it for future requests.

---

