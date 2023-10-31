import React, { useContext } from 'react';
import { ColorButton } from '../login/Login';
import { API } from '../../global';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AppContext } from "../../contexts/AppState";


export const EvaluvateCode = () => {
    const { token } = useContext(AppContext);
    const { eventid } = useParams();
    const { studentid } = useParams();
    // const token = localStorage.getItem('token');

    const evalCode = (evalDetails) => {
        try {
            fetch(`${API}/admin/evaluvate/${eventid}/${studentid}`, {
                method: "PUT",
                body: JSON.stringify(evalDetails),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("userType");
                    navigate("/");
                }
                return navigate("/AdminParticipants")
            })
                .catch(error => navigate("/"));
        } catch (err) {
            console.log(err);
            navigate("/");
        };

    };


    const navigate = useNavigate();
    const eventValidationSchema = yup.object({
        mark: yup.number().required("Kindly fill marks for event"),
        comment: yup.string().required("Kindly fill evaluvation comment")
    });



    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            mark: "",
            comment: ""
        },
        validationSchema: eventValidationSchema,
        onSubmit: (evalDetails) => {
            evalCode(evalDetails);
        }
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
                display: "inline-block"
            }}
        >
            <form onSubmit={handleSubmit}
                className="add-user-form">
                <Typography
                    variant="h4"
                    pb={2}
                    sx={{
                        textAlign: "center"
                    }}
                >
                    Evaluvation Details
                </Typography>

                <TextField
                    className="add-user-name"
                    label="Mark for Event"
                    type="text"
                    value={values.mark}
                    name="mark"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.mark && errors.mark ? true : false}
                    helperText={touched.mark && errors.mark ? errors.mark : ""} />
                <TextField
                    className="add-user-name"
                    label="Evaluvation Comment"
                    type="text"
                    value={values.comment}
                    name="comment"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.comment && errors.comment ? true : false}
                    helperText={touched.comment && errors.comment ? errors.comment : ""} />


                <ColorButton className="add-user-btn"
                    type="submit"
                    variant="contained">Evaluvate</ColorButton>
            </form>
        </div>
    </div>;
};