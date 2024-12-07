import React, { useState, useEffect } from "react";

function RestaurantPage({ changeState }) {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [results, setResults] = useState([]); 
  const [restaurants, setRestaurants] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 

  
  useEffect(() => {
    fetch("http://localhost:3000/Restaurant")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); 
        setRestaurants(data); // Store fetched data in restaurants state
        setResults(data); // Set initial search results to all fetched restaurants
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error); 
        setIsLoading(false); 
      });
  }, []); 

  // Function to handle search
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query); 

    // Filter restaurants based on search query
    const filteredResults = restaurants.filter((restaurant) =>
      restaurant.r_name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults); // Update results state with filtered data
  };

  // Function to navigate to reservation page
  const handleReservation = () => {
    console.log("Navigating to Reservation Page.....");
    changeState("reservation"); 
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {/* Title */}
      <h1 style={{ marginBottom: "10px", marginTop: "10px" }}>Restaurant Search</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Restaurant name..."
        value={searchQuery}
        onChange={handleSearch}
        style={{
          padding: "10px",
          width: "300px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      {/* Display filtered restaurant results */}
      <ul style={{ marginTop: "10px", 
        listStyleType: "none", 
        padding: "0", 
        maxHeight: "400px", 
        overflowY: "auto", 
        paddingRight: "100px",
        }}
        >
        {results.length > 0 ? (
          results.map((result, index) => (
            <li
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "5px",
                borderRadius: "5px",
                width: "120%",
                maxWidth: "800px",
              }}
            >
            <div style={{ fontWeight: "bold" }}>{result.r_name}</div>
              <div style={{ fontStyle: "italic", color: "#555" }}>
                <span style={{ fontWeight: "normal" }}>Cuisine Type: </span>
                {result.cuisine_type}
              </div>
              <div style={{ marginTop: '5px' }}>
                <span style={{ fontWeight: 'normal' }}>Average Rating: </span>
                 {result.average_rating || "N/A"} {/* Display "N/A" if there's no rating */}
              </div>

              {/* Button for reservation page */}
              <button
                onClick={() => changeState("reservation")}
                style={{
                  marginTop: "10px",
                  padding: "8px 15px",
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid black",
                  borderRadius: "2px",
                  cursor: "pointer",
                  fontSize: "10px",
                  width: "120px",
                  height: "30px",
                  fontWeight: "bold",
                }}
              >
                Go to Reservation
              </button>
            </li>
          ))
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </div>
  );
}

export default RestaurantPage;
