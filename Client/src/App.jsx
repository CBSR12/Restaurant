// import { useState } from 'react'
// import MainPage from './Components/MainPage'
// import SignUp from './Components/SignUpPage'
// import ReservationDetail from './Components/ReservationDetail'
// import './App.css'

// function App() {
//   const [curPage, setCurPage] = useState("main")

//   return (
//     <> 
//      {curPage === "main" && (
//         <MainPage changeState={(nextPage) => setCurPage(nextPage)}/>
//      )} 
//      {curPage === "customer" && (
//       <div>
//           <p>Customer Page</p>
//           <button onClick={() => setCurPage("main")}>Go back to Main Page</button>
//       </div>
//      )}
//      {curPage === "login" && (
//         <div>
//           <LoginPage />
//           <button onClick={() => setCurPage("main")}>Go back to Main Page</button>
//       </div>
//      )}
//      {curPage === "reservation" && (
//         <div>
//           <ReservationDetail />
//           <button onClick={() => setCurPage("main")}>Go back to Main Page</button>
//       </div>
//      )}
//      {curPage === "signup" && (
//         <div>
//           <SignUp />
//           <button onClick={() => setCurPage("main")}>Go back to Main Page</button>
//           <button onClick={() => setCurPage("login")}>Have an account? Login</button>
//       </div>
//      )}
//     </>
//   )
// }

// export default App
import { useState } from 'react';
import MainPage from './Components/MainPage';
import SignUp from './Components/SignUpPage';
import ReservationDetail from './Components/ReservationDetail'; // Import ReservationPage
//import LoginPage from './Components/LoginPage'; // Import LoginPage
import './App.css';

function App() {
  const [curPage, setCurPage] = useState("main");
  const [pageData, setPageData] = useState({}); // Holds data for the next page

  return (
    <>
      {curPage === "main" && (
        <MainPage changeState={(nextPage) => setCurPage(nextPage)} />
      )}
      {curPage === "customer" && (
        <div>
          <p>Customer Page</p>
          <button onClick={() => setCurPage("main")}>Go back to Main Page</button>
        </div>
      )}
      {curPage === "login" && (
        <div>
          <button onClick={() => setCurPage("main")}>Go back to Main Page</button>
        </div>
      )}
      {curPage === "reservation" && (
        <div>
          <ReservationDetail 
            changeState={(nextPage, data = {}) => {
              setPageData(data);
              setCurPage(nextPage);
            }} 
            reservationData={pageData} 
          />
          <button onClick={() => setCurPage("main")}>Go back to Main Page</button>
        </div>
      )}
      {curPage === "signup" && (
        <div>
          <SignUp />
          <button onClick={() => setCurPage("main")}>Go back to Main Page</button>
          <button onClick={() => setCurPage("login")}>Have an account? Login</button>
        </div>
      )}
    </>
  );
}

export default App;
