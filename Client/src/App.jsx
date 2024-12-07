import { useState } from 'react';
import MainPage from './Components/MainPage/MainPage'
import BookReservation from './Components/BookReservation/BookReservation';
import LoginPage from './Components/LoginPage'; // Import LoginPage component
import CustomerPage from './Components/CustomerPage'; // Import CustomerPage component
import RestaurantPage from './Components/RestaurantPage'
import './App.css';

function App() {
  const [curPage, setCurPage] = useState("login")
  const [pageData, setPageData] = useState({}); // Holds data for the next page

  
  return (
    <> 
     {curPage === "main" && (
        <MainPage changeState={(nextPage) => setCurPage(nextPage)}/>
     )} 

     {curPage === "restaurant" && (
        <div>
          <RestaurantPage 
          changeState={(nextPage, data) => {
            setPageData(data);
            setCurPage(nextPage);
          }}
          customerData={pageData}
           />
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
     {curPage === "party" && (
      <BookReservation 
      changeState={(nextPage, data = {}) => {
        setPageData(data)
        setCurPage(nextPage)
      }}
      customerData={pageData}
      />
     )}
     {curPage === "login" && (
        <LoginPage
        changeState={(nextPage, data = {}) => {
          setPageData(data);
          setCurPage(nextPage);
        }}
      />
     )}
     {curPage === "customer" && (
        <CustomerPage
        changeState={(nextPage, data) => {
          setPageData(data);
          setCurPage(nextPage);
        }}
        customerData={pageData}
        
      />          
     )}
      {curPage == "reservation" && (
        <>
          <p>HIIII</p>
          <p>Here is the party_id just made: {pageData.party_id}</p>
        </>
     )}
    </>
  );
}

export default App
