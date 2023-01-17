import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import React from "react";
import './ViewUsers.css';

function ViewUsers() {

    const [users, setUsers] = React.useState([]);

    async function usuariosGet() {
        const res = await axios.get('http://localhost:3001/api/v1/users')
        setUsers(res.data);
    }

    React.useEffect(() => {
        usuariosGet();
    }, [])

    return(
        <TableContainer className="TableContainer">
            <Table>
                <TableHead>
                    <TableRow className="TableRow">
                        <TableCell align="center">Dni</TableCell>
                        <TableCell align="center">Apellido</TableCell>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Username</TableCell>
                        <TableCell align="center">Contraseña</TableCell>
                        <TableCell align="center">Ventas</TableCell>
                        <TableCell align="center">Rol</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => {
                        return(
                            <TableRow key={user.dni}>
                                <TableCell align="center">{user.dni}</TableCell>
                                <TableCell align="center">{user.lastName}</TableCell>
                                <TableCell align="center">{user.firstName}</TableCell>
                                <TableCell align="center">{user.username}</TableCell>
                                <TableCell align="center">{user.password}</TableCell>
                                <TableCell align="center">{user.sales}</TableCell>
                                <TableCell align="center">{user.role.name}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export { ViewUsers };
