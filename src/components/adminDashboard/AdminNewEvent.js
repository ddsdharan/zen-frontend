import React, { useContext } from "react";
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../../global";
import "./adminDashboard.css"

import { AppContext } from "../../contexts/AppState";
import { ColorButton } from "../login/Login";


// const token = localStorage.getItem('token')



export function AdminNewEvent() {
    const { token } = useContext(AppContext);

    const addEvent = (newEvent) => {

        fetch(`${API}/admin/newevent`, {
            method: "POST",
            body: JSON.stringify(newEvent),
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
            return navigate("/Adminevents")
        })
    };


    const navigate = useNavigate();
    const eventValidationSchema = yup.object({
        eventname: yup.string().required("Kindly fill the Event Name input field"),
        eventposter: yup.string().required("Kindly fill Event Poster input field").min(5, "Need a bigger poster"),
        eventsummary: yup.string().required("Kindly give some input about the event").min(20, "Need a bigger summary"),
        eventenddate: yup.date().required("Kindly provide event Date"),
        eventtrailer: yup.string().required("Kindly fill event trailer"),
        questionlink: yup.string().required("Kindly fill link for question of event"),
    })



    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            eventname: "",
            eventposter: "",
            eventsummary: "",
            eventenddate: "",
            eventtrailer: "",
            questionlink: "",
        },
        validationSchema: eventValidationSchema,
        onSubmit: (newEvent) => {
            addEvent(newEvent);
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
                    Event Details
                </Typography>

                <TextField
                    className="add-user-name"
                    label="Event Name"
                    type="text"
                    value={values.eventname}
                    name="eventname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.eventname && errors.eventname ? true : false}
                    helperText={touched.eventname && errors.eventname ? errors.eventname : ""}
                />
                <TextField
                    className="add-user-name"
                    label="Event Poster"
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
                    label="About event"
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
                    label="Event End Date"
                    type="date"
                    value={values.eventenddate}
                    name="eventenddate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.eventenddate && errors.eventenddate ? true : false}
                    helperText={touched.eventenddate && errors.eventenddate ? errors.eventenddate : ""}
                    focused
                />
                <TextField
                    className="add-user-name"
                    label="Event trailer"
                    type="text"
                    value={values.eventtrailer}
                    name="eventtrailer"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.eventtrailer && errors.eventtrailer ? true : false}
                    helperText={touched.eventtrailer && errors.eventtrailer ? errors.eventtrailer : ""}
                />

                <TextField
                    className="add-user-name"
                    label="Question Link"
                    type="text"
                    value={values.questionlink}
                    name="questionlink"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.questionlink && errors.questionlink ? true : false}
                    helperText={touched.questionlink && errors.questionlink ? errors.questionlink : ""}
                />

                <ColorButton className="add-user-btn"
                    type="submit"
                    variant="contained">ADD EVENT</ColorButton>
            </form>
        </div>
    </div>;
}