import {
    IconButton,
} from "@mui/material";
import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useEffect } from 'react';
import { useContext } from "react";
import { useCallback } from 'react';
import { AppContext } from '../../contexts/AppState'
import { useNavigate } from 'react-router-dom'
import { API } from "../../global"
import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from '@mui/icons-material/Drafts';

export const AdminResult = () => {
    const { token } = useContext(AppContext);
    const navigate = useNavigate();

    // const token = localStorage.getItem("token");
    const [evaluvatedList, setEvaluvatedList] = useState(null);

    const getUsersEvaluvatedDetails = useCallback(() => {
        fetch(`${API}/admin/evaluvatedList`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((data) => {
                if (data.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("userType");
                    navigate("/");
                }
                return data.json()
            })
            .then((events) => setEvaluvatedList(events))
    }, [token, navigate]);

    useEffect(() => {
        getUsersEvaluvatedDetails();
    }, [getUsersEvaluvatedDetails]);


    useEffect(() => getUsersEvaluvatedDetails(), [getUsersEvaluvatedDetails]);
    return (evaluvatedList ?
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                <TableHead >
                    <TableRow >
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Event Title</TableCell>
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Participant Mail ID</TableCell>
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Marks</TableCell>
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Comments</TableCell>
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Result Status</TableCell>
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Email result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {evaluvatedList.map((evalEvent, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{evalEvent.eventname}</TableCell>
                            <TableCell align="center">{evalEvent.studentEmail}</TableCell>
                            <TableCell align="center">{evalEvent.mark}</TableCell>
                            <TableCell align="center">{evalEvent.comment}</TableCell>
                            <TableCell align="center">{evalEvent.result}</TableCell>
                            {evalEvent.result === "Not Sent" ?
                                <TableCell align="center">
                                    <IconButton
                                        aria-label="Event Details"
                                        color="warning"
                                        onClick={() => navigate(`/SendResult/${evalEvent.eventid}/${evalEvent.studentId}`)}
                                    >
                                        <EmailIcon />
                                    </IconButton>
                                </TableCell>
                                :
                                <TableCell align="center">
                                    <IconButton
                                        aria-label="Event Details"
                                        color="info"
                                        onClick={() => window.alert("Result was already mailed to student")}
                                    >
                                        <DraftsIcon />
                                    </IconButton>
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <h3>Loading.......</h3>
    )
}
