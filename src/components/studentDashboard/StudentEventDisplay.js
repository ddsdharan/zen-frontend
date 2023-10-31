import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React from "react";
import "./studentDashboard.css";

import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { ColorButton } from "../login/Login";

export function StudentEventDisplay({ eventname, eventposter, eventsummary, eventenddate, id, email }) {

    const [show, setShow] = useState(true);

    const navigate = useNavigate();

    return (<Card className="movie-container" sx={{ height: "min-content" }}>
        <img className="movie-poster" src={eventposter} alt={eventname} />
        <CardContent>
            <div className="movie-specs" >
                <h3 className="movie-name">
                    {eventname}

                    <IconButton aria-label="Movie Details" color="primary" onClick={() => setShow(!show)}>
                        {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </h3>
            </div>
            {show ? <p className="movie-summary" > {eventsummary}</p> : null}
            <h6 style={{ display: "inline" }}>End Date:</h6><span> {eventenddate}</span><br />
            <h6 style={{ display: "inline" }}>Event Trailer:</h6> <span> <IconButton
                aria-label="Event Details"
                color="warning"
                onClick={() => navigate(`/events/student/${id}`)}
            >
                <InfoIcon />
            </IconButton></span><br />
        </CardContent>
        <CardActions>
            <div className="movie-counter-del" style={{ margin: "auto" }}>
                <ColorButton className="reg-btn"
                    type="submit"
                    variant="contained"
                    onClick={() => navigate(`/RegisterEvents/${id}/${email}`)}
                >Participate</ColorButton>
            </div>
        </CardActions>
    </Card>
    );
}