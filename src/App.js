import Login from "./Login";
import Header from "./Header";
import Register from "./Register";
import NewEmployee from "./NewEmployee";
import { CheckUser } from "./CheckUser";
import ViewEmployee from "./ViewEmployee";
import ListEmployees from "./ListEmployees";
import { UserMiddleware } from "./UserMiddleware";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

function App() {

    return (
        <UserMiddleware>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={ <CheckUser> <Header/> <ListEmployees/> </CheckUser>} />
                    <Route path="/new" element={ <CheckUser> <Header/> <NewEmployee/> </CheckUser>} />
                    <Route path="/edit/:id" element={ <CheckUser> <Header/> <NewEmployee type="edit" /> </CheckUser>} />                    
                    <Route path="/view/:id" element={ <CheckUser> <Header/> <ViewEmployee/> </CheckUser>} />
                </Routes>
            </BrowserRouter>
        </UserMiddleware>
    );

}

export default App;