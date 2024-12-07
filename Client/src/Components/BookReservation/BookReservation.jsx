import { useState } from "react";
import './BookReservation.css';

export default function BookReservation({ changeState, customerData }) {
    const [party, setParty] = useState({
        cId: customerData.customer_id,
        handicap: "No",
        seatPref: "Indoor",
        numKids: 0,
        totPeople: 1,
        allergies: "None"
    });

    const handleChange = (e) => {
        setParty((state) => ({
            ...state,
            [e.target.name]: 
                ["numKids", "totPeople"].includes(e.target.name) 
                ? Number(e.target.value) 
                : e.target.value,
        }));
    };

    const propValues = () => {
        if (party.numKids < 0 || party.totPeople < 1) {
            alert("Invalid number of kids or total people. Please check your inputs!");
            return false;
        }
        return true;
    };

    const partyInsert = async (e) => {
        e.preventDefault();
        if (!propValues()) return;

        console.log("Request Body:", party);

        try {
            const res = await fetch("http://localhost:3000/party", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(party),
            });

            if (res.ok) {
                console.log("Party Successfully Inserted!");
                const resp = await res.json()
                console.log(resp);
                changeState("reservation", {customer_id: customerData.customer_id, restaurant_id: customerData.restaurant_id, party_id: resp.party_id});
            } else {
                const error = await res.json();
                console.error("Party Insert Failed: ", error);
            }
        } catch (err) {
            console.error("Error while fetching the route: ", err);
        }
    };

    return (
        <div className="reservation-container">
            <h1 className="reservation-title">
                Set Party Details for Reservation
            </h1>

            <form className="reservation-form" onSubmit={partyInsert}>
                <div className="form-group">
                    <label htmlFor="handicap">Handicap:</label>
                    <select
                        id="handicap"
                        name="handicap"
                        value={party.handicap}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="seatPref">Seat Preference:</label>
                    <select
                        id="seatPref"
                        name="seatPref"
                        value={party.seatPref}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="Indoor">Indoor</option>
                        <option value="Outdoor">Outdoor</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="numKids">Number of Kids:</label>
                    <input
                        type="number"
                        id="numKids"
                        name="numKids"
                        value={party.numKids}
                        min="0"
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="totPeople">Total People:</label>
                    <input
                        type="number"
                        id="totPeople"
                        name="totPeople"
                        value={party.totPeople}
                        min="1"
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="allergies">
                        Allergies [Please enter comma-separated (ex. "Fish,Dairy,Gluten")]:
                    </label>
                    <input
                        type="text"
                        id="allergies"
                        name="allergies"
                        value={party.allergies}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="btn btn-primary">
                        Confirm Booking
                    </button>
                    <button
                        type="button"
                        onClick={() => changeState("main", customerData)}
                        className="btn btn-secondary"
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
}
