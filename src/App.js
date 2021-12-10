import { BrowserRouter,Route,Switch } from "react-router-dom";


import Homepage from "./homepage";
import Add from "./add";

import Forgot from "./forgotPassword";
import Login from "./login";
import Register from "./register";
import Reset from "./resetpassword"
function App(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route  path="/add" component={Add}/>
               
                <Route  path="/forgot_password" component={Forgot}/>
                <Route  path="/login" component={Login}/>
                <Route  path="/Register" component={Register}/>
                <Route  path="/reset" component={Reset}/>
            </Switch>
        </BrowserRouter>
    )

}
export default App