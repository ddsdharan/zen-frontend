import React, { useState, useContext, useCallback } from "react";
import { StudentEventDisplay } from "./StudentEventDisplay";
import { useEffect } from "react";
import "./studentDashboard.css";
import { API } from "../../global";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/AppState";

// const token = localStorage.getItem("token");
const email = localStorage.getItem('userEmail');

export function StudentEvents() {
    const navigate = useNavigate();
    const [nonPartList, setNonPartList] = useState(null)
    const { token } = useContext(AppContext);
    const getEventsNotParticipated = useCallback(() => {
        try {
            fetch(`${API}/admin/events/${email}`, {
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
                .then((events) => setNonPartList(events))
                .catch(error => navigate("/"))
        } catch (err) {
            console.log(err);
            navigate("/")
        };
    }, [token, navigate]);

    useEffect(() => getEventsNotParticipated(), [getEventsNotParticipated]);
    return (nonPartList ?
        <div className="movie-list">
            {nonPartList.map((disp) => (
                <StudentEventDisplay
                    key={disp._id}
                    eventname={disp.eventname}
                    eventposter={disp.eventposter}
                    eventsummary={disp.eventsummary}
                    eventenddate={disp.eventenddate}
                    id={disp._id}
                    email={email}
                />
            ))}
        </div>
        : <h3>Loading....</h3>
    );
}