# VunaHub - Transforming Africa's Produce Pipeline

VunaHub is a platform designed to streamline the collection, trading, and logistics of agricultural produce in Africa. It connects farmers, traders, drivers, and administrators to create an efficient, transparent, and scalable produce supply chain.

---

## 📊 System Architecture

```mermaid
flowchart TD
    subgraph Frontend (React)
        A[User: Farmer/Trader/Driver/Admin]
        B[Login/Register]
        C[Dashboards & Features]
    end
    subgraph Backend (Node.js/Express)
        D[API Endpoints]
        E[Controllers]
        F[Models (MongoDB)]
        G[Auth (JWT)]
    end
    subgraph Database
        H[(MongoDB)]
    end

    A --> B
    B --> D
    C --> D
    D --> E
    E --> F
    F --> H
    E --> G
    G --> F
    D <--> G
```

---

## 🚀 Getting Started

### **1. Clone the Repository**
```sh
git clone https://github.com/annastaciakagai/VunaHub.git
cd VunaHub
```

### **2. Install Dependencies**

#### Backend
```sh
cd server
pnpm install   # or npm install
```

#### Frontend
```sh
cd ../client
pnpm install   # or npm install
```

### **3. Set Up Environment Variables**

- **Backend:** Create a `.env` file in `server/` with your MongoDB URI and JWT secret:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```
- **Frontend:** (Optional) Set API base URL in `.env` or directly in `src/services/api.ts`.

### **4. Start the Servers**

#### Backend
```sh
cd server
node server.js   # or npm start
```

#### Frontend
```sh
cd client
pnpm dev         # or npm start
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

---




## **Summary Table**

| Step                | Folder      | Command/Action                        |
|---------------------|-------------|---------------------------------------|
| Install backend deps| `server/`   | `pnpm install`                        |
| Start backend       | `server/`   | `node server.js` or `pnpm start`      |
| Install frontend    | `client/`   | `pnpm install`                        |
| Start frontend      | `client/`   | `pnpm dev`                            |
| Set API URL         | `client/src/services/api.ts` or `.env` | Use backend URL         |
| Enable CORS         | `server/server.js` | Use `cors` middleware         |
| (Optional) Proxy    | `client/vite.config.ts` | Set up `/api` proxy      |


