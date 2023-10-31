import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { API } from "../../global";
import "./adminDashboard.css"
import { AppContext } from "../../contexts/AppState";

// const token = localStorage.getItem('token')
export function EventTrailer() {
    const { token } = useContext(AppContext);
    const { eventid } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState({});


    const getEvent = () => {
        try {
            fetch(`${API}/admin/event/${eventid}`, {
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
                .then((mv) => setEvent(mv))
                .catch(error => navigate("/"))
        } catch (err) {
            console.log(err);
            navigate("/")
        };
    }
    useEffect(() => getEvent());
    return (event ? <div className="movie-detail-container">
        <iframe
            width="100%"
            height="650"
            src={event.eventtrailer}
            title="Youtube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
        <div className="movie-detail-container">
            <div className="movie-specs">
                <h2 className="movie-name">{event.eventname}</h2>
                <p className="movie-rating"></p>
            </div>
            <p className="movie-summary">{event.eventsummary}</p>
            <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => navigate(-1)}>
                BACK
            </Button>

        </div>
    </div> : <h3>Loading.....</h3>);


}