import { useState, useEffect } from "react";

export default function ReservationDetail({ changeState, customerData }) {
    const [restaurantName, setRestaurantName] = useState("");

    const [reservation, setReservation] = useState({
        party_id: customerData.party_id,
        restaurant_id: customerData.restaurant_id,
        table_number: Math.floor(Math.random() * 20) + 1,
        reservation_date: "",
        payment_method: "Credit",
        status: "Pending"
    });

    const [customer, setCustomer] = useState({
        c_name: customerData.c_name,
        phonenumber: customerData.phonenumber
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchRestaurantName = async () => {
            try {
                const res = await fetch(`http://localhost:3000/restaurant/${customerData.restaurant_id}`);
                if (res.ok) {
                    const data = await res.json();
                    setRestaurantName(data.restaurant_name);
                } else {
                    console.error("Failed to fetch restaurant name.");
                }
            } catch (err) {
                console.error("Error fetching restaurant name:", err);
            }
        };
        fetchRestaurantName();
    }, [customerData.restaurant_id]);
    

    const handleChange = (e) => {
        setReservation((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/reservation", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reservation)
            });

            if (res.ok) {
                console.log("Reservation successfully created!");
                const resp = await res.json();
                console.log(resp);
                alert("Reservation Confirmed!");
                changeState("main"); // Redirect to main page
            } else {
                const error = await res.json();
                console.error("Reservation creation failed:", error);
                alert("Failed to create reservation. Try again.");
            }
        } catch (err) {
            console.error("Error during reservation creation:", err);
        }
    };

    return (
        <div className="reservation-detail-container">
            <h1 className="reservation-detail-title">Reservation Details</h1>

            <form className="reservation-detail-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Restaurant Name:</label>
                    <p>{restaurantName || "Loading..."}</p>
                </div>

                <div className="form-group">
                    <label>Party Size:</label>
                    <p>{customerData.party_size}</p>
                </div>

                <div className="form-group">
                    <label>Table Number:</label>
                    <p>{reservation.table_number}</p>
                </div>

                <div className="form-group">
                    <label>Customer Name:</label>
                    <p>{customerData.c_name}</p>
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    <p>{reservation.status}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="reservation_date">Reservation Timestamp:</label>
                    <input
                        type="datetime-local"
                        id="reservation_date"
                        name="reservation_date"
                        value={reservation.reservation_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="payment_method">Payment Method:</label>
                    <select
                        id="payment_method"
                        name="payment_method"
                        value={reservation.payment_method}
                        onChange={handleChange}
                    >
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                    </select>
                </div>

                <div className="button-group">
                    <button type="submit" className="btn btn-primary">
                        Confirm Reservation
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => changeState("party", customerData)}
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
}