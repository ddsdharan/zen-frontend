import {
    Typography,
    Container,
    Grid,
    Paper,
    Box,
    Stack,
    IconButton,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { AppContext } from "../../contexts/AppState";
import { ColorButton } from "../login/Login";
import { API } from "../../global";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// const token = localStorage.getItem('token')

export const ViewWebinar = () => {
    const { token } = useContext(AppContext);
    const [webinarList, setWebinarList] = useState(null);
    const [show, setShow] = useState(true);

    const getWebinar = () => {
        fetch(`${API}/admin/getWebinar`, {
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
            .then((events) => setWebinarList(events))
    }

    const handleDelete = (deletionId) => {
        fetch(`${API}/admin/webinar/${deletionId}`, {
            method: "DELETE",
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
            return getWebinar()
        })
        console.log(deletionId);
    };


    const navigate = useNavigate();

    useEffect(() => {
        getWebinar();
    });
    return (webinarList ?
        <>
            <Typography variant="h4" pb={2} sx={{ textAlign: "center" }}>
                Webinar events
            </Typography>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    {webinarList.map((event) => (
                        <Grid key={event._id} item xs={12} sm={12} md={12}>
                            <Paper elevation={3} sx={{ display: "flex" }}>
                                <Box
                                    sx={{
                                        width: "40%",
                                        height: "100%",
                                        display: { xs: "none", md: "flex" },
                                    }}
                                >
                                    <Card
                                        sx={{
                                            maxWidth: "100%",
                                            marginRight: "10px",
                                            // padding: "10px",
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                maxWidth: "100%",
                                                maxHeight: "15rem",
                                                objectFit: "cover",
                                                // padding: "10px",
                                            }}
                                            image={event.eventposter}
                                            alt="event poster"
                                        />
                                    </Card>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "80%",
                                        margin: { xs: "10px 10px", md: "10px 10px" },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            height: "100%",
                                            width: "100%",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                textAlign: "start",
                                            }}
                                        >
                                            {event.eventTopic}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                textAlign: "start",
                                            }}
                                        >
                                            by  {event.eventLecturer} on {event.eventDate} at {event.eventTime}  for {event.duration} hrs
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                textAlign: "start",
                                            }}
                                        >
                                            About event:
                                            <IconButton aria-label="Movie Details" color="primary" onClick={() => setShow(!show)}>
                                                {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            </IconButton>
                                            {show ? <span style={{ color: "#5bc0de" }}>{event.eventsummary}</span> : null}
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                textAlign: "start",
                                            }}
                                        >
                                            Event Registration Fees: Rs. {event.eventFees}

                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                textAlign: "start",
                                            }}
                                        >
                                            Maximunm number of Participants: {event.maxParticipants}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Stack
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                paddingBottom: "10px",
                                            }}
                                        >
                                            <ColorButton
                                                variant="contained"
                                                sx={{ marginRight: "10px" }}
                                                onClick={() => navigate(`/EditWebinar/${event._id}`)}
                                            >
                                                Edit
                                            </ColorButton>
                                            <ColorButton
                                                variant="contained"
                                                onClick={() => handleDelete(event._id)}
                                            >
                                                Remove
                                            </ColorButton>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </> : <h3>Loading....</h3>
    );
};