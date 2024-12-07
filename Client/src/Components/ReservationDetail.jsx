// import React, { useState } from 'react';

// export default function ReservationPage() {
//     const [customerName, setCustomerName] = useState('');
//     const [customerPhone, setCustomerPhone] = useState('');
//     const [partySize, setPartySize] = useState(1);
//     const [restaurantName, setRestaurantName] = useState('');
//     const [restaurantAddress, setRestaurantAddress] = useState('');
//     const [reservationDate, setReservationDate] = useState('');
//     const [paymentMethod, setPaymentMethod] = useState('debit');
//     const [tableId, setTableId] = useState(Math.floor(Math.random() * 30) + 1);
//     const [status] = useState('pending'); // Status is hardcoded as 'pending'

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const reservationData = {
//             customerName:"",
//             customerPhone:"",
//             partySize:"",
//             restaurantName:"",
//             restaurantAddress:"",
//             reservationDate,
//             paymentMethod,
//             tableId,
//             status,
//         };

//         try {
//             const response = await axios.post('http://localhost:3000/reservation', reservationData);
//             console.log('Reservation created successfully', response.data);
//         } catch (error) {
//             console.error('Error creating reservation', error);
//         }
//     };

//     return (
//         <div className="reservation-detail">
//             <h1>Reservation Details</h1>
//             <form onSubmit={handleSubmit}>
//                 <h2>Customer Information</h2>
//                 <p>Name: {customerName}</p>
//                 <p>Phone Number: {customerPhone}</p>


//                 <h2>Restaurant Information</h2>
//                 <p>Name: {restaurantName}</p>
//                 <p>Address: {restaurantAddress}</p>

//                 <p>Party Size: {partySize}</p>

//                 <div className="form-group">
//                     <label>Reservation Date</label>
//                     <input
//                         type="datetime-local"
//                         value={reservationDate}
//                         onChange={(e) => setReservationDate(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Status</label>
//                     <input
//                         type="text"
//                         value={status}
//                         disabled
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Payment Method</label>
//                     <select
//                         value={paymentMethod}
//                         onChange={(e) => setPaymentMethod(e.target.value)}
//                     >
//                         <option value="debit">Debit</option>
//                         <option value="credit">Credit</option>
//                     </select>
//                 </div>

//                 <div className="form-group">
//                     <label>Table ID</label>
//                     <input
//                         type="number"
//                         value={tableId}
//                         disabled
//                     />
//                 </div>
//                 <br></br>

//                 <button type="submit">Submit Reservation</button>
//             </form>
//         </div>
//     );
// }


// import { useState, useEffect } from "react";

// export default function ReservationPage({ changeState, reservationData }) {
//   const [reservationDetails, setReservationDetails] = useState(null);
//   const [customer, setCustomer] = useState({
//     user: {
//       customer_id: "",
//       c_name: "",
//       allergies: "",
//       phonenumber: "",
//       pastreservation: "",
//       upcomingreservation: "",
//     },
//   });
//   const [editMode, setEditMode] = useState(false);

//   // Fetch reservation and customer details on component mount
//   useEffect(() => {
//     if (reservationData?.party_id && reservationData?.customer_id) {
//       fetchReservationDetails(reservationData.party_id, reservationData.customer_id);
//     }
//   }, [reservationData]);

//   // Fetch reservation details and customer information
//   const fetchReservationDetails = async (partyId, customerId) => {
//     try {
//       const response = await fetch(`http://localhost:3000/reservation/${partyId}/${customerId}`);
//       if (response.ok) {
//         const data = await res.json();
//         console.log("Fetched Customer Data:", data); // Debugging line
//         setCustomer(data);
//         } else {
//         console.error("Failed to fetch customer data");
//         }
//     } catch (err) {
//         console.error("Error fetching customer data:", err);
//     }
//     };

//   const handleSave = async () => {
//     try {
//       const res = await fetch(`http://localhost:3000/reservation/${reservation.user.customer_id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(customer.user),
//       });
//       if (res.ok) {
//         setEditMode(false);
//         console.log("Customer details updated successfully");
//       } else {
//         console.error("Failed to update customer details");
//       }
//     } catch (err) {
//       console.error("Error updating customer details:", err);
//     }
//   };

//   return (
//     <>
//       <h1>Reservation Details</h1>
//       {reservationDetails ? (
//         <div>
//           <h2>Customer Information</h2>
//           {editMode ? (
//             <>
//               <label>
//                 Name:
//                 <input
//                   type="text"
//                   value={customer.user.c_name}
//                   onChange={(e) =>
//                     setCustomer({
//                       ...customer,
//                       user: { ...reservation.user, c_name: e.target.value },
//                     })
//                   }
//                 />
//               </label>
//               <label>
//                 Phone Number:
//                 <input
//                   type="text"
//                   value={reservation.user.phonenumber}
//                   onChange={(e) =>
//                     setCustomer({
//                       ...customer,
//                       user: { ...reservation.user, phonenumber: e.target.value },
//                     })
//                   }
//                 />
//               </label>
//               <label>
//                 Allergies:
//                 <input
//                   type="text"
//                   value={reservation.user.allergies}
//                   onChange={(e) =>
//                     setCustomer({
//                       ...customer,
//                       user: { ...reservation.user, allergies: e.target.value },
//                     })
//                   }
//                 />
//               </label>
//               <button onClick={handleSave}>Save</button>
//               <button onClick={() => setEditMode(false)}>Cancel</button>
//             </>
//           ) : (
//             <>
//               <p>Name: {reservation.user.c_name || "None"}</p>
//               <p>Phone Number: {reservation.user.phonenumber || "None"}</p>
//               <p>Allergies: {reservation.user.allergies || "None"}</p>
//               <p>Past Reservation: {reservation.user.pastreservation ? new Date(reservation.user.pastreservation).toLocaleString() : "None"}</p>
//               <p>Upcoming Reservation: {reservation.user.upcomingreservation ? new Date(reservation.user.upcomingreservation).toLocaleString() : "None"}</p>
//               <button onClick={() => setEditMode(true)}>Edit Details</button>
//             </>
//           )}

//           <h2>Reservation Information</h2>
//           <p>Reservation ID: {reservationDetails.reservationID}</p>
//           <p>Party Size: {reservationDetails.size}</p>
//           <p>Reservation Date: {new Date(reservationDetails.reservation_date).toLocaleString()}</p>
//           <p>Status: {reservationDetails.status}</p>
//           <p>Payment Method: {reservationDetails.payment_method || "N/A"}</p>
//         </div>
//       ) : (
//         <p>Loading reservation details...</p>
//       )}
//       <button onClick={() => changeState("main")}>Back to Main Page</button>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";

export default function ReservationPage({ changeState, reservationData }) {
  const [reservationDetails, setReservationDetails] = useState(null);
  const [customer, setCustomer] = useState({
    user: {
      customer_id: "",
      c_name: "",
      allergies: "",
      phonenumber: "",
      pastreservation: "",
      upcomingreservation: "",
    },
  });
  const [editMode, setEditMode] = useState(false);

  // Fetch reservation and customer details on component mount
  useEffect(() => {
    if (reservationData?.party_id && reservationData?.customer_id) {
      fetchReservationDetails(reservationData.party_id, reservationData.customer_id);
    }
  }, [reservationData]);

  // Fetch reservation details and customer information using fetch API
  const fetchReservationDetails = async (partyId, customerId) => {
    try {
      const response = await fetch(`http://localhost:3000/reservation/${partyId}/${customerId}`);
      if (response.ok) {
        const data = await response.json(); // Parse JSON response
        console.log("Fetched Customer Data:", data); // Debugging line
        setCustomer(data);
        setReservationDetails(data.reservation);
      } else {
        console.error("Failed to fetch customer data");
      }
    } catch (err) {
      console.error("Error fetching customer data:", err);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:3000/reservation/${customer.user.customer_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer.user),
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
      <h1>Reservation Details</h1>
      {reservationDetails ? (
        <div>
          <h2>Customer Information</h2>
          {editMode ? (
            <>
              <label>
                Name:
                <input
                  type="text"
                  value={customer.user.c_name}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      user: { ...customer.user, c_name: e.target.value },
                    })
                  }
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  value={customer.user.phonenumber}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      user: { ...customer.user, phonenumber: e.target.value },
                    })
                  }
                />
              </label>
              <label>
                Allergies:
                <input
                  type="text"
                  value={customer.user.allergies}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      user: { ...customer.user, allergies: e.target.value },
                    })
                  }
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

          <h2>Reservation Information</h2>
          <p>Reservation ID: {reservationDetails.reservationID}</p>
          <p>Party Size: {reservationDetails.size}</p>
          <p>Reservation Date: {new Date(reservationDetails.reservation_date).toLocaleString()}</p>
          <p>Status: {reservationDetails.status}</p>
          <p>Payment Method: {reservationDetails.payment_method || "N/A"}</p>
        </div>
      ) : (
        <p>Loading reservation details...</p>
      )}
      <button onClick={() => changeState("main")}>Back to Main Page</button>
    </>
  );
}