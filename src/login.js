import React from "react";
import {TextField,Grid,Box,Typography} from "@mui/material"
import login from "./images/img5.jpg"
import axios from "axios"
import {Link} from "react-router-dom"

import {Url} from "./backend"
class Login extends React.Component{
    constructor(){
        super()
        this.state={
            message:"",
            email:"",
            password:""
           


        }
    }
     logIn=async()=>{
         const {email,password}=this.state
       const {data}=await axios.post(`${Url.backendUrl}/users/login`,{
            email,password

        })
        console.log(data)
        this.setState({message:data.message})
        if(data.message==="*successfully loggedIn")
        {   
           
            
            await localStorage.setItem("clone",data.token)
            window.location.href="/"
            
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault()
      this.logIn()
    }
    
    handleChange=({target:{name,value}})=>{
        this.setState({[name]:value})
        console.log(value)
        
    }


    render(){
        return (
            <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
             <Grid sx={{ position: "absolute", backgroundColor: "white", borderRadius: 5, padding: 2,width:"auto" ,maxWidth:300}} item>
            <form  onSubmit={this.handleSubmit} >
               
                <Typography sx={{fontSize:24,fontWeight:"bold"}}>Login</Typography>
                 <TextField size="small" sx={{ margin: 2 }} variant="outlined" label="Email" type="string" name="email" value={this.state.email}  onChange={this.handleChange} ></TextField>
                 <TextField size="small" sx={{ margin: 2 }} variant="outlined" label="Password" type="Password" name="password" value={this.state.password}  onChange={this.handleChange} ></TextField>
           
                 <Box sx={{display:"flex", justifyContent:"center",}}>
                     <Typography sx={{color:"red"}}>{this.state.message}</Typography>
                 </Box>
                 <Box sx={{display:"flex", justifyContent:"center",}}>
                     
                 <button>submit</button>
               
                 </Box>
                 <Box sx={{display:"flex", justifyContent:"center",}}><Typography sx={{textAlign:"center"}}>If you don't have account
                 <Link style={{margin:5}} to="/register">click here</Link>to register</Typography>
                 </Box>
                
                 

            </form>
</Grid>
            <img style={{height:"100vh",width:"100%",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundAttachment:"fixed",}} alt="login" src={login}/> 
            </Grid>
        )
    }
}
export default Login
