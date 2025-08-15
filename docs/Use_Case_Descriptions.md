# Use Case Descriptions

## 1. Admin: Manage Inventory
**Actors:** Admin  
**Preconditions:** Admin logged in  
**Postconditions:** Inventory updated  

**Main Flow:**  
- Navigate to Inventory Module  
- Add/Edit/Delete product  
- Save changes  

**Alternative Flows:**  
- If product exists, update instead of adding  

---

## 2. Staff: Generate Invoice
**Actors:** Staff  
**Preconditions:** Staff logged in, products exist  
**Postconditions:** Invoice generated, stock updated  

**Main Flow:**  
- Scan product barcode  
- Add products to invoice  
- Generate invoice  

**Alternative Flows:**  
- Apply discounts if applicable  

---

## 3. Customer: View Purchase History
**Actors:** Customer  
**Preconditions:** Customer logged in  
**Postconditions:** Purchase history displayed  

**Main Flow:**  
- Navigate to My Orders  
- Select date range  
- View/download invoices  

**Alternative Flows:**  
- Show empty state if no purchase history  

---

# Use Case Diagram (Text-Based)

	          +-------------+
	          |   Admin     |
	          +-------------+
	          /    |    \
	 Manage Inventory CRM Analytics

	          +-------------+
	          |   Staff     |
	          +-------------+
	             |    \
	       Inventory  Billing
	
	          +-------------+
	          | Customer    |
	          +-------------+
	             |
       View Purchase History
