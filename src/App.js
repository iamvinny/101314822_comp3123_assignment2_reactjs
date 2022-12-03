import React, {useState} from 'react';
import LoginForm from './components/LoginForm';

function App() {
  // Fetch the user from the API
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }

  // Get the user from the local storage
  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  // This function will be called when the user clicks the login button
  // It will check if the user and password is valid before grainting access
  const Login = details => {
    console.log(details);

    if (details.email == adminUser.email && details.password == adminUser.password) {
      console.log("Logged in!");
      setUser({
        name: details.name,
        email: details.email
      });
    } else {
      console.log("Details do not match!");
      setError("Details do not match!"); // Pass error to LoginForm.js and display it to the user
    }

  }

  const Logout = () => {
    console.log("Logout");
    setUser({
      name: "",
      email: ""
    });
  }

  // If the user is logged in, return the page below with the logout button
  return (
      <div className="App">
        {(user.email != "") ? (
          <div className="welcome">  
            <h2>Welcome, <span>{user.email}</span></h2>
            <button onClick={Logout}>Logout</button>
          </div>
        ) : (
          <LoginForm Login={Login} error={error} />
        )}
      </div>
    );
  }

export default App;
