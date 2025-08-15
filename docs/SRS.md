# Software Requirements Specification (SRS)

## 1. Introduction

**Purpose:** Automate retail operations with GST billing, real-time inventory, CRM, analytics, and multi-store management.  

**Scope:** Streamline retail operations, reduce manual errors, and provide real-time insights.  

**Definitions:**  
- **CRM:** Customer Relationship Management  
- **GST:** Goods and Services Tax  
- **RBAC:** Role-Based Access Control  

---

## 2. Overall Description

**Product Perspective:** Cloud-based modular system integrating all retail functions.  

**Product Functions:**  
- User Authentication (Admin, Staff, Customer)  
- Billing  
- Inventory management  
- CRM  
- Analytics  
- Expense tracking  
- Role-based access  
- Multi-store support  

**User Classes:** Admin, Staff, Customer  

**Constraints:** Requires internet connection, browser-based  

---

## 3. Functional Requirements

1. GST billing and invoicing  
2. Inventory auto-update with alerts  
3. CRM and promotions  
4. Sales reporting  
5. Role-based access control  

---

## 4. Non-Functional Requirements

- **Security:** JWT & Firebase Auth  
- **Performance:** <2s API latency  
- **Scalability:** Multi-store  
- **Reliability:** 99.9% uptime  

---

## 5. External Interface Requirements

- **UI:** Responsive React.js interface  
- **API:** REST endpoints  
- **Hardware:** Barcode scanner, thermal printer  
- **Software:** Modern browser  

---

## 6. Database Design Overview

**Collections:**  
- users  
- products  
- sales  
- expenses  
- loyalty  

Each collection stores specific business data for operations.