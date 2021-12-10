// import "./app.css"
import { Box, Paper, TableContainer, TableBody, Table, TableHead, TableRow, TableCell, Container, Button } from "@material-ui/core";
import { useEffect, useState } from "react"

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Menubar from "./menuBar"
import { Url } from "./backend"
import axios from "axios";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom"
function Homepage() {
  const [response, setData] = useState([])



  const history = useHistory()
  const getdata = async () => {
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

  }
  useEffect(() => {
    getdata()
  },)
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
    <Box component={Container}>
      <Menubar />
      <Box sx={{ margin: 10 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
              <TableRow>
                <TableCell >Title</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Time</TableCell>
                
                <TableCell align="center">Delete</TableCell>
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
    </Box>

  );
}

export default Homepage;
