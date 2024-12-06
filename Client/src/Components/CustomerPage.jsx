import { useState, useEffect } from "react";

export default function CustomerPage({ changeState, customerData }) {
  const [customer, setCustomer] = useState(
    {
    user :{
        customer_id: "",
        c_name: "",
        allergies: "",
        phonenumber: "",
        pastreservation: "",
        upcomingreservation: ""
    }
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    console.log("Customer Data received in CustomerPage:", customerData); // Log the received data
    setCustomer(customerData);
  }, [customerData]);

  const fetchCustomerData = async (customerId) => {
    try {
      const res = await fetch(`http://localhost:3000/customer/${customerId}`);
      if (res.ok) {
        const data = await res.json();
        console.log("Fetched Customer Data:", data); // Debugging line
        setCustomer(data);
      } else {
        console.error("Failed to fetch customer data");
      }
    } catch (err) {
      console.error("Error fetching customer data:", err);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:3000/customer/${customer.customer_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });
      if (res.ok) {
        setEditMode(false);
        console.log("Customer details updated successfully");
      } else {
        console.error("Failed to update customer details");
      }
    } catch (err) {
      console.error("Error updating customer details:", err);
    }
  };

  return (
    <>
      <h1>Customer Page</h1>
      {editMode ? (
        <>
          <label>
            Name:
            <input
              type="text"
              value={customer.c_name}
              onChange={(e) => setCustomer({ ...customer, c_name: e.target.value })}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              value={customer.phoneNumber}
              onChange={(e) => setCustomer({ ...customer, phoneNumber: e.target.value })}
            />
          </label>
          <label>
            Allergies:
            <input
              type="text"
              value={customer.allergies}
              onChange={(e) => setCustomer({ ...customer, allergies: e.target.value })}
            />
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p>Name: {customer.user.c_name || "None"}</p>
          <p>Phone Number: {customer.user.phonenumber || "None"}</p>
          <p>Allergies: {customer.user.allergies || "None"}</p>
          <p>Past Reservation: {customer.user.pastreservation ? new Date(customer.user.pastreservation).toLocaleString() : "None"}</p>
          <p>Upcoming Reservation: {customer.user.upcomingreservation ? new Date(customer.user.upcomingreservation).toLocaleString() : "None"}</p>
          <button onClick={() => setEditMode(true)}>Edit Details</button>
        </>
      )}
      <button onClick={() => changeState("main")}>Back to Main Page</button>
      {/* <button onClick={() => changeState("party")}>Book Reservation</button> */}

    </>
  );
}
