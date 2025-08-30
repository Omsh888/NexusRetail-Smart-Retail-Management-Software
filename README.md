# Nexus Retail – Smart Retail Management Software

Nexus Retail is a comprehensive, cloud-based retail management solution designed to automate and streamline the day-to-day operations of retail businesses. It integrates key functionalities like GST-compliant billing, real-time inventory tracking, customer relationship management (CRM), and sales analytics into a single, user-friendly platform.

## 🚀 Project Features

- **GST-Compliant Billing & Invoicing**: Generate invoices that are compliant with GST regulations.
- **Real-time Inventory Tracking & Alerts**: Keep track of inventory in real-time and get alerts for low stock.
- **CRM (Customer Relationship Management)**: Manage customer data and implement a loyalty program.
- **WhatsApp/SMS Notifications**: Send notifications to customers via WhatsApp and SMS.
- **Sales Analytics & Auto-Generated Reports**: Get insights into sales data with automatically generated reports.
- **Expense Management**: Track and manage all your business expenses.
- **Barcode Scanning and Printing**: Easily scan and print barcodes for your products.
- **Multi-store / Branch Management**: Manage multiple stores or branches from a single dashboard.
- **Secure Role-Based Access Control**: Assign roles to your staff with specific permissions.
- **eCommerce Integration**: Integrate with your online store for seamless online sales.

## 🛠️ Tech Stack

- **Frontend:** React.js, Context API, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** Firebase Authentication & JWT
- **Deployment**:
  - Frontend: Vercel
  - Backend: Render
  - Database: MongoDB Atlas
  - Authentication: Firebase

## 🏃 How to Run Locally

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB account (for connection URI)
- Firebase project set up

### Backend Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/Omsh888/NexusRetail-Smart-Retail-Management-Software.git](https://github.com/Omsh888/NexusRetail-Smart-Retail-Management-Software.git)
    cd NexusRetail-Smart-Retail-Management-Software/backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file in the `backend` directory and add the following:**

    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    FIREBASE_API_KEY=your_firebase_api_key
    FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    FIREBASE_PROJECT_ID=your_firebase_project_id
    FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    FIREBASE_APP_ID=your_firebase_app_id
    ```

4.  **Start the backend server:**
    ```bash
    npm start
    ```

### Frontend Setup

1.  **Navigate to the `frontend` directory:**

    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file in the `frontend` directory and add the following:**

    ```
    REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
    ```

4.  **Start the frontend development server:**
    ```bash
    npm start
    ```

## 👥 Team Roles

- **Om Sharma**: Backend, Inventory Module
- **Shivansh Pratap Singh**: CRM, Billing Module, DB Integration
- **Tilak Saini**: Frontend, UI/UX
- **Harsh Mishra**: Testing, Documentation, Sales Report

## 📦 GitHub Collaboration Setup

- **Branching Strategy**:
  - `main`: Production-ready code.
  - `develop`: Integration branch for features.
  - `feature/<feature-name>`: For developing new features (e.g., `feature/billing`).
  - `bugfix/<bug-name>`: For fixing bugs (e.g., `bugfix/login-error`).
- **Pull Requests**: All changes to `develop` and `main` must be made through pull requests.
- **Code Reviews**: At least one team member must review and approve a pull request before it can be merged.
- **GitHub Projects/Issues**: Use GitHub Issues to track tasks and bugs. GitHub Projects can be used to manage the project timeline and progress.
