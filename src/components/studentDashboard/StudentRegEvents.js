import React, { useState, useContext, useCallback } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useEffect } from 'react'
import { API } from "../../global";
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../contexts/AppState";
import { ColorButton } from '../login/Login'


export const StudentRegEvents = () => {
    const { token } = useContext(AppContext)
    const navigate = useNavigate();
    // const token = localStorage.getItem("token");
    const email = localStorage.getItem('userEmail');
    const [partList, setPartList] = useState(null)

    const getUserParticipationDetails = useCallback(() => {
        try {
            fetch(`${API}/admin/events/part/${email}`, {
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

    useEffect(() => getUserParticipationDetails(), [getUserParticipationDetails]);


    return (partList ?
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                <TableHead >
                    <TableRow >
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Event Title</TableCell>
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Participant Name</TableCell>
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Marks</TableCell>
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Mentor Comment</TableCell>
                        <TableCell align="center" style={{ fontSize: "20px", fontWeight: "500", fontStyle: "bold" }}>Code Submitted</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {partList.map((event) => (
                        <TableRow key={event.eventid}>
                            <TableCell align="center">{event.eventname}</TableCell>
                            <TableCell align="center">{event.studentName}</TableCell>
                            <TableCell align="center">{event.mark}</TableCell>
                            <TableCell align="center">{event.comment}</TableCell>
                            <TableCell align="center">
                                <ColorButton
                                    variant="contained"
                                    sx={{ marginRight: 1, marginBottom: 1 }}
                                    onClick={() => navigate(`/student/code/${event.eventid}/${event.studentId}`)}
                                > View Code
                                </ColorButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        : <h3>Loading...</h3>)
}