import { useState } from "react";
export default function Signup({ changeState }) {
    const [user, setUser] = useState({
        name: "",
        phoneNumber:"",
        loginId: "",
        password: "",
    });

    const handleChange = (e) => {
        setUser((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const validateInputs = () => {
        if (!user.name.trim() || !user.phoneNumber.trim() || !user.loginId.trim() || !user.password.trim()) {
            alert("All fields are required!");
            return false;
        }
        return true;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        console.log("Signup Request Body:", user);

        try {
            const res = await fetch("http://localhost:3000/signup", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (res.ok) {
                console.log("Signup Successful!");
                changeState("login"); // Navigate to login page
            } else {
                const error = await res.json();
                console.error("Signup Failed: ", error);
                alert(error.error || "Signup failed. Please try again.");
            }
        } catch (err) {
            console.error("Error during signup:", err);
            //alert("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="signup-container">
            <h1 className="signup-title">Create an Account</h1>

            <form className="signup-form" onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="loginId">Username:</label>
                    <input
                        type="text"
                        id="loginId"
                        name="loginId"
                        value={user.loginId}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
            </form>
        </div>
    );
}