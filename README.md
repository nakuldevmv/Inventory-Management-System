# **Inventory Management System**

This project includes a Node.js/Express backend and a React (Vite) frontend.
Follow the steps below to run it locally on any machine.

---

## **1. Requirements**

* Node.js (LTS recommended)
* npm
* MongoDB Atlas connection string

---

## **2. Backend Setup**

### **Step 1: Navigate to backend**

```bash
cd backend
```

### **Step 2: Install dependencies**

```bash
npm install
```

### **Step 3: Create `.env` file**

Inside `backend/`:

```
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
```

### **Step 4: Start backend**

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

## **3. Frontend Setup**

### **Step 1: Navigate to frontend**

```bash
cd frontend
```

### **Step 2: Install dependencies**

```bash
npm install
```

### **Step 3: Create `.env` file**

Inside `frontend/`:

```
VITE_API_URL=http://localhost:5000/api
```

### **Step 4: Start frontend**

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## **4. Running the Application**

1. Start backend (`backend/npm run dev`)
2. Start frontend (`frontend/npm run dev`)
3. Open browser → `http://localhost:5173`

You can now:

* Add new products
* Edit products
* Delete products
* View dashboard with low-stock highlighting

---
