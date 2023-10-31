import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ColorButton } from '../login/Login';
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import {
    Typography
} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import { API } from "../../global";
import { AppContext } from "../../contexts/AppState";


// const token = localStorage.getItem('token')


export const CodeDetails = () => {
    const { token } = useContext(AppContext);

    const navigate = useNavigate();
    const { eventid } = useParams();
    const { studentid } = useParams();

    const [code, setCode] = useState(null);


    const getCode = () => {
        fetch(`${API}/admin/event/code/${eventid}/${studentid}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            },
        }
        )
            .then((data) => {
                if (data.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("userType");
                    navigate("/");
                }
                return data.json()
            })
            .then((mv) => setCode(mv))
    }
    useEffect(() => getCode());


    return (code ?
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
                        Code Details
                    </Typography>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">Question Link</TableCell>
                                    <TableCell align="center">{code.questionlink}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell align="center"> Front-end Source Code</TableCell>
                                    <TableCell align="center">{code.frontendcode}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Back-end Source Code</TableCell>
                                    <TableCell align="center">{code.backendcode}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Front-end deployment</TableCell>
                                    <TableCell align="center">{code.frontenddeploy}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Back-end deployment</TableCell>
                                    <TableCell align="center">{code.backenddeploy}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>


                    <ColorButton
                        className="add-user-btn"
                        type="submit"
                        variant="contained"
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </ColorButton>
                </div>
            </div>
        </div>
        : <h3> Loading.....</h3>
    );
};