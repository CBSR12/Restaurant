import { useState } from 'react'
import MainPage from './Components/MainPage/MainPage'
import BookReservation from './Components/BookReservation/BookReservation'
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
          <p>Restaurant Page</p>
          <button onClick={() => setCurPage("main")}>Go back to Main Page</button>
      </div>
     )}
     {curPage === "party" && (
      <BookReservation changeState={(nextPage) => setCurPage(nextPage)}/>
     )}
    </>
  )
}

export default App
