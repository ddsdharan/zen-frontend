import React from "react";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Typography } from '@mui/material';
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../../global";

import { AppContext } from "../../contexts/AppState";
import { ColorButton } from "../login/Login";

// const token = localStorage.getItem('token');

export function EditWebinar() {
    const { token } = useContext(AppContext);
    const { eventid } = useParams();
    const [webinar, setWebinar] = useState(null);

    const navigate = useNavigate();

    const getWebinarById = () => {
        fetch(`${API}/admin/getWebinar/${eventid}`, {
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
            .then((event) => setWebinar(event))
    }

    useEffect(() => getWebinarById());

    return (webinar ? <EditForm webinar={webinar} /> : <h3>Loading...</h3>);
}
const eventValidationSchema = yup.object({
    eventTopic: yup.string().required("Kindly fill the Event Topic input field"),
    eventLecturer: yup.string().required("Kindly fill details of person speaking out in Webinar"),
    eventposter: yup.string().required("Kindly fill Event Poster input field").min(5, "Need a bigger poster"),
    eventsummary: yup.string().required("Kindly give some input about the event").min(20, "Need a bigger summary"),
    eventDate: yup.date().required("Kindly provide event Date"),
    eventTime: yup.string().required("Kindly fill event Time"),
    duration: yup.number().required("Kindly fill event duration"),
    joiningLink: yup.string().required("Kindly fill joining link for event"),
    eventFees: yup.number().required("Kindly mention event fees"),
    maxParticipants: yup.string().required("Kindly fill maximum allowed participants"),
})


function EditForm({ webinar }) {
    const { token } = useContext(AppContext);

    const navigate = useNavigate();

    const editWebinar = (updatedEvent) => {

        fetch(`${API}/admin/editWebinar/${webinar._id}`, {
            method: "PUT",
            body: JSON.stringify(updatedEvent),
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
            return navigate("/AdminWebinar")
        })
    };


    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            eventTopic: webinar.eventTopic,
            eventLecturer: webinar.eventLecturer,
            eventposter: webinar.eventposter,
            eventsummary: webinar.eventsummary,
            eventDate: webinar.eventDate,
            eventTime: webinar.eventTime,
            duration: webinar.duration,
            joiningLink: webinar.joiningLink,
            eventFees: webinar.eventFees,
            maxParticipants: webinar.maxParticipants,
        },
        validationSchema: eventValidationSchema,
        onSubmit: (updatedEvent) => {
            console.log("onSubmit", updatedEvent);
            editWebinar(updatedEvent);
        },
    });

    return <div
        className="add-user-container">
        <div
            className="wrapper"
            style={{
                position: "relative",
                textAlign: "center",
                borderStyle: "solid",
                borderWidth: "2px",
                display: "inline-block",
            }}
        >
            <form onSubmit={handleSubmit}
                className="add-user-form" >
                <Typography
                    variant="h4"
                    pb={2}
                    sx={{
                        textAlign: "center",
                    }}
                >
                    Webinar Details
                </Typography>

                <TextField
                    className="add-user-name"
                    label="Webinar Topic"
                    type="text"
                    value={values.eventTopic}
                    name="eventTopic"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.eventTopic && errors.eventTopic ? true : false}
                    helperText={touched.eventTopic && errors.eventTopic ? errors.eventTopic : ""}
                />
                <TextField
                    className="add-user-name"
                    label="Name of Webinar Lecturer"
                    type="text"
                    value={values.eventLecturer}
                    name="eventLecturer"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.eventLecturer && errors.eventLecturer ? true : false}
                    helperText={touched.eventLecturer && errors.eventLecturer ? errors.eventLecturer : ""}
                />
                <TextField
                    className="add-user-name"
                    label="Webinar Poster"
                    type="text"
                    value={values.eventposter}
                    name="eventposter"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.eventposter && errors.eventposter ? true : false}
                    helperText={touched.eventposter && errors.eventposter ? errors.eventposter : ""}
                />
                <TextField
                    className="add-user-name"
                    label="About Webinar"
                    type="text"
                    value={values.eventsummary}
                    name="eventsummary"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.eventsummary && errors.eventsummary ? true : false}
                    helperText={touched.eventsummary && errors.eventsummary ? errors.eventsummary : ""}
                />

                <TextField
                    className="add-user-name"
                    label="Webinar Date"
                    type="date"
                    value={values.eventDate}
                    name="eventDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.eventDate && errors.eventDate ? true : false}
                    helperText={touched.eventDate && errors.eventDate ? errors.eventDate : ""}
                    focused
                />
                <TextField
                    className="add-user-name"
                    label="Webinar Time"
                    type="time"
                    value={values.eventTime}
                    name="eventTime"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.eventTime && errors.eventTime ? true : false}
                    helperText={touched.eventTime && errors.eventTime ? errors.eventTime : ""}
                    focused
                />
                <TextField
                    className="add-user-name"
                    label="Webinar Duration in hours"
                    type="text"
                    value={values.duration}
                    name="duration"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.duration && errors.duration ? true : false}
                    helperText={touched.duration && errors.duration ? errors.duration : ""}
                />

                <TextField
                    className="add-user-name"
                    label="Joining Link"
                    type="text"
                    value={values.joiningLink}
                    name="joiningLink"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.joiningLink && errors.joiningLink ? true : false}
                    helperText={touched.joiningLink && errors.joiningLink ? errors.joiningLink : ""}
                />

                <TextField
                    className="add-user-name"
                    label="Webinar Fee"
                    type="text"
                    value={values.eventFees}
                    name="eventFees"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.eventFees && errors.eventFees ? true : false}
                    helperText={touched.eventFees && errors.eventFees ? errors.eventFees : ""}
                />

                <TextField
                    className="add-user-name"
                    label="Maximum Allowed Participants"
                    type="text"
                    value={values.maxParticipants}
                    name="maxParticipants"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.maxParticipants && errors.maxParticipants ? true : false}
                    helperText={touched.maxParticipants && errors.maxParticipants ? errors.maxParticipants : ""}
                />

                <ColorButton className="add-user-btn"
                    type="submit"
                    variant="contained">Edit Webinar</ColorButton>
            </form>
        </div>
    </div>;
}