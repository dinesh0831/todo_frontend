// import "./app.css"
import { Box, Paper, TableContainer, TableBody, Table, TableHead, TableRow, TableCell, Container, Button } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react"

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Menubar from "./menuBar"
import { Url } from "./backend"
import axios from "axios";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom"
import login from "./images/img4.jpg"
function Homepage() {
  const [response, setData] = useState([])



  const history = useHistory()
  const getdata =useCallback( async () => {
    const token = localStorage.getItem("clone")
    if (token) {
      const decoded = jwt.decode(token)
      if (decoded.exp * 1000 >= Date.now()) {
        const { data } = await axios.get(`${Url.backendUrl}/post`, {
          headers: { clone: token }
        })
        console.log(data)
        setData(data)
      }
      else {
        history.push("/login")
      }

    }
    else {
      history.push("/login")
    }

  },[history])
  useEffect(() => {
    getdata()
  }, [getdata])
  const deleteItem=async(item)=>{
    console.log(item)
    const token = localStorage.getItem("clone")
    if (token) {
      const decoded = jwt.decode(token)
      if (decoded.exp * 1000 >= Date.now()) {
         await axios.delete(`${Url.backendUrl}/post/${item._id}`, {
          headers: { clone: token }
        })
        const { data } = await axios.get(`${Url.backendUrl}/post`, {
          headers: { clone: token }
        })
       
        
        setData(data)
      }
      else {
        history.push("/login")
      }

    }
    else {
      history.push("/login")
    }


  }



  return (
    <Box  >
      <Menubar />
      <Box sx={{display:"flex",justifyContent:"center"}}>
      <Box sx={{  position:"absolute",margin:10}} component={Container}>
        <TableContainer  component={Paper}>
        <Table  aria-label="customized table">
            <TableHead >
              <TableRow sx={{bgcolor:"gainsboro"}}>
                <TableCell sx={{fontWeight:"bold",fontSize:20}}>Title</TableCell>
                <TableCell align="center" sx={{fontWeight:"bold",fontSize:20}}>Date</TableCell>
                <TableCell align="center" sx={{fontWeight:"bold",fontSize:20}}>Time</TableCell>
                
                <TableCell align="center" sx={{fontWeight:"bold",fontSize:20}}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {response.map(item => {
                return (<TableRow key={item._id}

                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.title}
                  </TableCell>
                  <TableCell align="center">{item.date}</TableCell>
                  <TableCell align="center">{item.time}</TableCell>
                 
                  <TableCell align="center"><Button variant="outlined" color="secondary" onClick={()=>deleteItem(item)} startIcon={<DeleteForeverIcon />}>Delete</Button></TableCell>
                </TableRow>)

              })}


            </TableBody>
          </Table>
        </TableContainer>
        </Box>
        <img style={{ height:"100vh",width:"100%",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundAttachment:"fixed",}} alt="login" src={login}/>
      </Box>
      
    </Box>

  );
}

export default Homepage;
