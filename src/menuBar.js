
import { useEffect, useState, } from "react";
import { Button, Typography, } from "@mui/material"

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import MenuIcon from '@mui/icons-material/Menu';

import { Link, useHistory } from "react-router-dom"

import jwt from "jsonwebtoken"
import HomeIcon from '@mui/icons-material/Home';

import LoginIcon from '@mui/icons-material/Login';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

function Menubar() {

    const [state, setState] = useState({

        left: false,

    });
    const [users, setUsers] = useState({});

    const navigate = useHistory()
    const getUser = () => {
        const token = localStorage.getItem("clone")
        if (token) {
            const decoded = jwt.decode(token)

            if (decoded.exp * 1000 > Date.now()) {


                setUsers(decoded)
            }
        }
    }

    const logout = () => {

        if (localStorage.getItem("clone")) {
            localStorage.removeItem("clone")
            navigate.push("/login")

        } else {
            navigate.push("/login")
       }
    }

    useEffect(() => {
        getUser()
    }, [])



  

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>


                <ListItem button component={Link} to="/" >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                </ListItem>

                <ListItem button component={Link} to="/add ">
                    <ListItemIcon>
                        <ShoppingBagIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Add "} />
                </ListItem>



                <ListItem button onClick={logout}>
                    <ListItemIcon>
                        <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary={users.exp * 1000 > Date.now() && localStorage.getItem("clone") ? "logout" : "login"} />
                </ListItem>



            </List>


        </Box>
    );
    return (
        <div>
            <Box sx={{ bgcolor: "blue", height: 50, display: "flex", alignItems: "center", }}>

                <Button sx={{ margin: 3 }} onClick={toggleDrawer("left", true)}><MenuIcon sx={{ fontSize: 24, color: "white", }} /></Button>
                <SwipeableDrawer
                    anchor={"left"}
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                    onOpen={toggleDrawer("left", true)}
                >
                    {list("left")}
                </SwipeableDrawer>
                <Typography sx={{ color: "white", fontWeight: "bold", fontSize: 24, flexGrow: 1 }} >To-Do</Typography>



            </Box>


        </div>

    )
}
export default Menubar