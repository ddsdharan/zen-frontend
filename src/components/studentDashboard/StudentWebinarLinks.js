import React, { useState, useContext, useCallback } from 'react';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useEffect } from 'react'
import { ColorButton } from "../login/Login";
import { API } from "../../global";
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../contexts/AppState";


export const StudentWebinarLinks = () => {
    const { token } = useContext(AppContext)
    const navigate = useNavigate();
    // const token = localStorage.getItem("token");
    const email = localStorage.getItem('userEmail');
    const [partList, setPartList] = useState(null)

    const getUserParticipationDetails = useCallback(() => {
        try {
            fetch(`${API}/admin/getWebinarRegisterd/${email}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`, // notice the Bearer before your token
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
                .then((events) => setPartList(events))
                .catch(error => navigate("/"))
        } catch (err) {
            console.log(err);
            navigate("/")
        };
    }, [email, token, navigate])

    const handleCancelRegistration = (eventid, email) => {
        fetch(`${API}/admin/cancelRegistration/${eventid}/${email}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            },
        })
            .then((data) => {
                if (data.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("userType");
                    navigate("/");
                }
                return getUserParticipationDetails()
            })
            .catch(error => navigate("/"))
    }

    useEffect(() => getUserParticipationDetails(), [getUserParticipationDetails]);


    return (partList ?
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                <TableHead >
                    <TableRow >
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Topic</TableCell>
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Taken By</TableCell>
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Date</TableCell>
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Time</TableCell>
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Joining Link</TableCell>
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Cancellation</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {partList.map((event) => (
                        <TableRow key={event._id}>
                            <TableCell align="center">{event.eventTopic}</TableCell>
                            <TableCell align="center">{event.eventLecturer}</TableCell>
                            <TableCell align="center">{event.eventDate}</TableCell>
                            <TableCell align="center">{event.eventTime}</TableCell>
                            <TableCell align="center">
                                {event.joiningLink}</TableCell>
                            <TableCell align="center">
                                <ColorButton
                                    variant="contained"
                                    sx={{ marginRight: 1, marginBottom: 1 }}
                                    onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Do you really want to cancel registration?"
                                        )
                                        if (confirmBox === true) {
                                            handleCancelRegistration(event._id, email)
                                        }
                                    }}
                                > cancel
                                </ColorButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        : <h3>Loading...</h3>)
}
