import { Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'
import { API } from '../../global';
import { useState } from 'react';
import { AppContext } from "../../contexts/AppState";
import { ColorButton } from '../login/Login';

export function AdminLogin() {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    // const entry=()=>navigate("/Adminevents");

    const loginUser = (userDetail) => {
        fetch(`${API}/admin/login`, {
            method: "POST",
            body: JSON.stringify(userDetail),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((content) => {
                if (content.message === "ok") {
                    let userData = content.user;
                    localStorage.setItem("token", content.data);
                    localStorage.setItem('userEmail', userData.Email);
                    localStorage.setItem('userType', "admin");
                    setToken(content.data)
                    return navigate("/Adminevents")
                }
                else {
                    setErrorMsg(content.message)
                }
            })
            .catch((err) => console.error);
    };
    const initialValues = {
        Email: 'admin@gmail.com',
        Password: '1234',
    }
    const userValidationSchema = Yup.object({
        Email: Yup.string().email().required('Required'),
        Password: Yup.string().required('Required'),
    })

    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: userValidationSchema,
        onSubmit: (userDetail) => {
            setErrorMsg("");
            loginUser(userDetail);
        },
    });

    return <div className="add-user-container">
        <div
            className="wrapper"
            style={{
                position: "relative",
                textAlign: "center",
                borderStyle: "solid",
                borderWidth: "5px",
                display: "inline-block",
            }}
        >
            <form
                onSubmit={handleSubmit}
                className="add-user-form" >
                <Typography variant="h4" pb={2}
                    sx={{
                        textAlign: 'center',
                    }}>
                    Admin Login Details
                </Typography>

                <TextField
                    className="add-user-name"
                    label="User Name - Email"
                    type="Email"
                    value={values.Email}
                    name="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.Email && errors.Email ? true : false}
                    helperText={touched.Email && errors.Email ? errors.Email : ""}
                />
                <TextField
                    className="add-user-name"
                    label="Password"
                    type="password"
                    value={values.Password}
                    name="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.Password && errors.Password ? true : false}
                    helperText={touched.Password && errors.Password ? errors.Password : ""}
                />
                <ColorButton className="add-user-btn"
                    type="submit"
                    variant="contained">Login</ColorButton>
                <div className="text-center" style={{ color: "red" }}>
                    {errorMsg}
                </div>
            </form>
        </div>
    </div>;
}