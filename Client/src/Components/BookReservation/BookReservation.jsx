import { useState, useEffect } from "react";
import './BookReservation.css';

export default function BookReservation({changeState}) {
    const [party, setParty] = useState({
        cId: 1,
        handicap: "No",
        seatPref: "Indoor",
        numKids: 0,
        totPeople: 0,
        allergies: "none"
    })

    const testInsert = async () => {
        try {
            const res = await fetch("http://localhost:3000/party", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(party)
            });
            if(res.ok) {
                console.log("Party Successfully Inserted!")
                changeState("main")
            } else {
                console.error("Party Insert Failed: ", await res.json())
            }    
        } catch (err) {
           console.error("Error while fetching the route: ", err) 
        }
    }

    return (
        <>

            <h1>Please Set the Details of the Party This Reservation Will Be For!</h1>

            <button onClick={() => testInsert() }> Confirm Booking</button>
            <button onClick={() => changeState("main")}>Back</button>
        </>
    )
}