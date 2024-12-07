import { useState } from "react";

export default function LoginPage({ changeState }) {
  const [credentials, setCredentials] = useState({ login_id: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCredentials({ ...credentials, [name]: value });
  };


  const handleLogin = async () => {
      try {
          const res = await fetch("http://localhost:3000/login", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials),
          });
          const data = await res.json();
          console.log("API response from login:", data);

          if (res.ok) {
              console.log("Login successful, data received:", data);
              changeState("main", data);
          } else {
              const errData = await res.json();
              console.error("Login failed:", errData);
              setError(errData.error || "Login failed");
          }
      } catch (err) {
          console.error("Error during login:", err);
          setError("An error occurred during login");
      }
  };
  
  
  return (
      <>
          <h1>Login Page</h1>
          {error && <p className="error">{error}</p>}
          <div>
              <label>
                  Login ID:
                  <input
                      type="text"
                      name="login_id"
                      value={credentials.login_id}
                      onChange={handleInputChange}
                      placeholder="Enter your login ID"
                  />
              </label>
          </div>
          <div>
              <label>
                  Password:
                  <input
                      type="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                  />
              </label>
          </div>
          <button onClick={handleLogin}>Login</button>
          <button onClick={() => changeState("main")}>Back to Main Page</button>
      </>
  );
}