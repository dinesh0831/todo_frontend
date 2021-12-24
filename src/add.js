import { Container, Box, TextField, Button,Typography } from "@mui/material"
import { DatePicker, TimePicker, LocalizationProvider,  } from "@mui/lab"
import Menubar from "./menuBar";
import React from "react"

import jwt from "jsonwebtoken"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import axios from "axios";
import {useHistory} from "react-router-dom"
import { Url } from "./backend"

function Add() {
    const [time, setTime] = React.useState("");
    const [date, setDate] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [message,setMessage]=React.useState("")

  const history=useHistory()

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("clone")
        if (token) {
            const decoded = jwt.decode(token)
            if (decoded.exp * 1000 >= Date.now()) {
                console.log(decoded.user.email)
                const { data } = await axios.post(`${Url.backendUrl}/post`, {
                    date:date.toLocaleDateString(),
                    time: time.toLocaleTimeString(),
                    title,
                    email:decoded.user.email
                },{
                    headers:{ clone:token}
                })
               setMessage(data.message)
                setTime("")
                setDate("")
                setTitle("")
            }
            else{
            history.push("/login")
            }

        }
        else{
            history.push("/login")
        }
        

    }


    return (
        <Box component={Container}>
            <Menubar />

            <Box component={Container} sx={{ margin: 5 }}>
                <h1>Title of your ToDo:</h1><TextField sx={{ marginLeft: 15 }} id="standard-basic" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} variant="outlined" />
                <h1>Date:</h1>
                <Box sx={{ marginLeft: 15 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date"
                            value={date}

                            minDate={new Date()}

                            onChange={(newValue) => {
                                console.log(typeof newValue)

                                setDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <h1>Time:</h1>
                <Box sx={{ marginLeft: 15 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}  >
                        <TimePicker
                            value={time}
                            onChange={(newValue => {
                                console.log(newValue)
                                setTime(newValue)
                            })}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography sx={{ color:"green"}}>{message}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button onClick={handleSubmit} color="success" variant="contained">submit</Button>
                </Box>
            </Box>
        </Box>
    )
}
export default Add
