import { useState } from 'react'
import MainPage from './Components/MainPage'
import SignUp from './Components/SignUpPage'
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
     {curPage === "login" && (
        <div>
          <LoginPage />
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
  )
}

export default App
