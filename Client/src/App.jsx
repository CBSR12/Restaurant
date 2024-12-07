import { useState } from 'react';
import MainPage from './Components/MainPage/MainPage'
import BookReservation from './Components/BookReservation/BookReservation';
import './App.css';
import LoginPage from './Components/LoginPage'; // Import LoginPage component
import CustomerPage from './Components/CustomerPage'; // Import CustomerPage component




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
          <p>Restaurant Page</p>
          <button onClick={() => setCurPage("main")}>Go back to Main Page</button>
      </div>
     )}
     {curPage === "party" && (
      <BookReservation changeState={(nextPage) => setCurPage(nextPage)}/>
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
        changeState={(nextPage, data = {}) => {
          console.log("Navigating to CustomerPage with data:", data); // Log data
          setPageData(data);
          setCurPage(nextPage);
        }}
        customerData={pageData}
        
      />          
     )}
     {/* {curPage === "party" && (
        <BookReservation 
        changeState={(nextPage) => setCurPage(nextPage)}/>
     )} */}
    </>
  );
}

export default App;