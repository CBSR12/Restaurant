import { useState } from 'react'
import MainPage from './Components/MainPage'
import RestaurantPage from './Components/RestaurantPage'
import ReservationPage from './Components/TestReservationPage'
import './App.css'

function App() {
  const [curPage, setCurPage] = useState("main")

  return (
    <> 
     {curPage === "main" && (
        <MainPage changeState={(nextPage) => setCurPage(nextPage)}/>
     )} 
     {curPage === "customer" && (
      <div>
          <p>Customer Page</p>
          <button onClick={() => setCurPage("main")}>Go back to Main Page</button>
      </div> 
     )}

     {curPage === "restaurant" && (
        <div>
          <RestaurantPage changeState={setCurPage} />
          <button onClick={() => setCurPage("main")}
            style={{      // Place the button in the top right corner
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "10px 15px",
              backgroundColor: "white",
              color: "black",
              border: "2px solid black",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            >
            Go back to Main Page</button>
      </div>
     )}
      {curPage == "reservation" && (
        <div>
          <ReservationPage />
        </div>
     )}
    </>
  )
}

export default App