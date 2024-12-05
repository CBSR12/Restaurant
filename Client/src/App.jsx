import { useState } from 'react'
import MainPage from './Components/MainPage'
import './App.css'
import React from 'react';
import LoginPage from './Components/LoginPage'; // Import LoginPage component
import CustomerPage from './Components/CustomerPage'; // Import CustomerPage component


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



    </>
  )
}

export default App
