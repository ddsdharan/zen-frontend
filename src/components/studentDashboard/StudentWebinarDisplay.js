import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React from "react";
import "./studentDashboard.css";

export function StudentWebinarDisplay({ eventTopic, eventLecturer, eventposter, eventsummary, eventDate, eventTime, duration, eventFees, registerIcon }) {

    const [show, setShow] = useState(true);

    return (<Card className="movie-container" sx={{ height: "min-content" }}>
        <img className="movie-poster" src={eventposter} alt={eventTopic} />
        <CardContent>
            <div className="movie-specs" >
                <h3 className="movie-name">
                    {eventTopic}<br />
                    <h6>
                        by {eventLecturer}

                        <IconButton aria-label="Movie Details" color="primary" onClick={() => setShow(!show)}>
                            {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton></h6>

                </h3>

            </div>
            {show ? <p style={{ color: "#5bc0de" }} className="movie-summary" > {eventsummary}</p> : null}
            <p>Webinar is on  {eventDate} at {eventTime} for {duration}hrs </p>
            <h5 style={{ display: "inline" }}>Registration Fee: {eventFees}</h5>
        </CardContent>
        <CardActions>
            <div className="movie-counter-del" style={{ margin: "auto" }}>
                {registerIcon}
            </div>
        </CardActions>
    </Card>
    );
}