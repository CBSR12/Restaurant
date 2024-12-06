import { useState } from "react";
import './MainPage.css';


export default function MainPage({ changeState }) {
    return (
        <>
            <h1>Welcome to the Main Page! Please Navigate to the Page You Would Like to Visit.</h1>
            <div>
                <button onClick={() => changeState("customer")}>Customer Page</button>
                <button onClick={() => changeState("restaurant")}>Restaurant Page</button>
                <button onClick={() => changeState("party")}>Party</button>
            </div>
        </>
    )
}