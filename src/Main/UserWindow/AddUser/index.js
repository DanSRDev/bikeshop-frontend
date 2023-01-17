import { TextField } from "@mui/material";
import React from "react";
import './AddUser.css';

function AddUser () {
    return (
        <form>
            <TextField label="Dni de usuario" variant="filled" />        </form>
    )
}

export { AddUser };