import { BrowserRouter,Route,Switch } from "react-router-dom";


import Homepage from "./homepage";
import Add from "./add";


import Login from "./login";
import Register from "./register";

function App(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route path="/add" component={Add}/>
               
                
                <Route  path="/login" component={Login}/>
                <Route  path="/Register" component={Register}/>
                
            </Switch>
        </BrowserRouter>
    )

}
export default App