import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ColorButton } from '../login/Login';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import {
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../../global";
import { AppContext } from "../../contexts/AppState";


// const token = localStorage.getItem('token')


export const SendResult = () => {
    const { token } = useContext(AppContext);

    const navigate = useNavigate();
    const { eventid } = useParams();
    const { studentId } = useParams();
    const [resultDetail, setResultDetail] = useState(null)



    const getStudentResultDetail = () => {
        try {
            fetch(`${API}/admin/resultDetail/${eventid}/${studentId}`, {
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
                    return data.json();
                })
                .then((events) => setResultDetail(events))
                .catch(error => navigate("/"))
        } catch (err) {
            console.log(err);
            navigate("/")
        };
    }

    const sendMail = () => {
        try {
            fetch(`${API}/admin/newEmail`, {
                method: "POST",
                body: JSON.stringify(resultDetail),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`, // notice the Bearer before your token
                },
            }).then((res) => {
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("userType");
                    navigate("/");
                }
                return navigate("/AdminResult")
            })
                .catch(error => navigate("/"))
        } catch (err) {
            console.log(err);
            navigate("/")
        };
    }



    useEffect(() => getStudentResultDetail());


    return (resultDetail ?
        <div className="add-user-container">
            <div
                className="wrapper"
                style={{
                    position: "relative",
                    textAlign: "center",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    display: "inline-block"
                }}
            >
                <div className="add-user-form">
                    <Typography
                        variant="h4"
                        pb={2}
                        sx={{
                            textAlign: "center"
                        }}
                    >
                        Mailing Details
                    </Typography>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">Student Email</TableCell>
                                    <TableCell align="center">{resultDetail.studentEmail}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Event Name</TableCell>
                                    <TableCell align="center">{resultDetail.eventname}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Question Link</TableCell>
                                    <TableCell align="center">{resultDetail.questionlink}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell align="center"> Front-end Source Code</TableCell>
                                    <TableCell align="center">{resultDetail.frontendcode}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Back-end Source Code</TableCell>
                                    <TableCell align="center">{resultDetail.backendcode}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Front-end deployment</TableCell>
                                    <TableCell align="center">{resultDetail.frontenddeploy}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Back-end deployment</TableCell>
                                    <TableCell align="center">{resultDetail.backenddeploy}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Mark</TableCell>
                                    <TableCell align="center">{resultDetail.mark}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Evaluvation comment</TableCell>
                                    <TableCell align="center">{resultDetail.comment}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>


                    <ColorButton
                        className="add-user-btn"
                        type="submit"
                        variant="contained"
                        onClick={() => sendMail()}
                    >
                        Send Mail
                    </ColorButton>
                </div>
            </div>
        </div>
        : <h3> Loading.....</h3>
    );
};