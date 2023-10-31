import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../../global";
import { Typography } from "@mui/material";

import { AppContext } from "../../contexts/AppState";
import { ColorButton } from "../login/Login";

// const token = localStorage.getItem("token");

const registerValidationSchema = yup.object({
    frontendcode: yup.string().required("Kindly fill your frontend code"),
    backendcode: yup.string().required("Kindly fill your backend code"),
    frontenddeploy: yup.string().required("Kindly fill front end deployment link"),
    backenddeploy: yup
        .string()
        .required("Kindly fill backend deployment link "),
});
export function RegStudentForEvent() {
    const { token } = useContext(AppContext);
    const [studentDetail, setStudentDetail] = useState(null);
    const [event, setEvent] = useState(null);
    const { eventid } = useParams();
    const { email } = useParams();

    const navigate = useNavigate();

    const getEvent = useCallback((eventid) => {
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
    }, [token, navigate]);

    const getStudentDetail = useCallback((email) => {
        try {
            fetch(`${API}/admin/detail/${email}`, {
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
                .then((detail) => setStudentDetail(detail))
                .catch(error => navigate("/"))
        } catch (err) {
            console.log(err);
            navigate("/")
        };
    }, [token, navigate]);



    const addParticipantCode = (codeDetail) => {
        const participantCodeDetail = {
            studentId: studentDetail.id,
            studentName: studentDetail.name,
            studentEmail: studentDetail.email,
            studentCode: {
                frontendcode: codeDetail.frontendcode,
                backendcode: codeDetail.backendcode,
                frontenddeploy: codeDetail.frontenddeploy,
                backenddeploy: codeDetail.backenddeploy
            },
            mark: "Not evaluvated",
            comment: "Not evaluvated"
        }
        try {
            fetch(`${API}/admin/eventreister/${eventid}`, {
                method: "PUT",
                body: JSON.stringify(participantCodeDetail),
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`, // notice the Bearer before your token
                },
            })
                .then((res) => (navigate("/Studentregisteredevents")))
                .catch((e) => console.log(e));
        } catch (err) {
            console.log(err);
            navigate("/");
        }
    };
    useEffect(() => { getStudentDetail(email); getEvent(eventid); }, [email, eventid, getEvent, getStudentDetail]);


    const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
        useFormik({
            initialValues: {
                frontendcode: "",
                backendcode: "",
                frontenddeploy: "",
                backenddeploy: "",
            },
            validationSchema: registerValidationSchema,
            onSubmit: (codeDetail) => {
                console.log("onSubmit", codeDetail);
                getStudentDetail(email);
                addParticipantCode(codeDetail);
            },
        });

    return (event ?
        <div className="add-user-container">
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
                <form onSubmit={handleSubmit} className="add-user-form">
                    <Typography
                        variant="h4"
                        pb={2}
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        Event Details
                    </Typography>
                    {/* <Typography
            variant="h4"
            pb={2}
            sx={{
              textAlign: "center",
            }}
          > */}
                    <ColorButton
                        className="add-user-btn"
                        type="submit"
                        variant="contained"
                        onClick={() => { window.open(`${event.questionlink}`, "_blank") }}
                    >
                        Question Link
                    </ColorButton>
                    {/* </Typography> */}
                    <TextField
                        className="add-user-name"
                        label="Git link for frontend code"
                        type="text"
                        value={values.frontendcode}
                        name="frontendcode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.frontendcode && errors.frontendcode ? true : false}
                        helperText={
                            touched.frontendcode && errors.frontendcode ? errors.frontendcode : ""
                        }
                    />
                    <TextField
                        className="add-user-name"
                        label="Git link for backend code"
                        type="text"
                        value={values.backendcode}
                        name="backendcode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.backendcode && errors.backendcode ? true : false}
                        helperText={
                            touched.backendcode && errors.backendcode ? errors.backendcode : ""
                        }
                    />
                    <TextField
                        className="add-user-name"
                        label="Frontend deployment link"
                        type="text"
                        value={values.frontenddeploy}
                        name="frontenddeploy"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.frontenddeploy && errors.frontenddeploy ? true : false}
                        helperText={touched.frontenddeploy && errors.frontenddeploy ? errors.frontenddeploy : ""}
                    />

                    <TextField
                        className="add-user-name"
                        label="Backend deployment link"
                        type="text"
                        value={values.backenddeploy}
                        name="backenddeploy"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.backenddeploy && errors.backenddeploy ? true : false}
                        helperText={
                            touched.backenddeploy && errors.backenddeploy
                                ? errors.backenddeploy
                                : ""
                        }
                    />
                    <ColorButton
                        className="add-user-btn"
                        type="submit"
                        variant="contained"
                    >
                        Submit
                    </ColorButton>
                </form>
            </div>
        </div> : <h3>Loading.....</h3>
    );
}