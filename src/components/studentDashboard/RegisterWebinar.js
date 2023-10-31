import React, { useState, useEffect, useContext, useCallback } from 'react';
import { ColorButton } from '../login/Login';
import { API } from '../../global';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { AppContext } from "../../contexts/AppState";

// const token = localStorage.getItem('token');

export const RegisterWebinar = () => {
    const { token } = useContext(AppContext);
    const { eventid } = useParams();
    const { email } = useParams();
    const [reachedMax, setReachedMax] = useState(null);

    const navigate = useNavigate();

    const getWebinarById = useCallback(() => {
        fetch(`${API}/admin/getWebinar/${eventid}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
            .then((event) => {
                if ((event.participantlist.length) < event.maxParticipants)
                    setReachedMax(false);
                else
                    setReachedMax(true);
            })
    }, [eventid, token, navigate]);

    useEffect(() => {
        getWebinarById();
    }, [getWebinarById]);

    return (reachedMax ? <MaximumParticipants /> : <EditWebinarForm eventid={eventid} email={email} />);
}

const eventValidationSchema = yup.object({
    cardNumber: yup.number().required("Kindly fill 16 digit card number").min(16),
    cvvNumber: yup.number().required("Kindly fill cvv number").min(3),
    nameOnCard: yup.string().required("Kindly fill name as printed on the card"),
    expiryDate: yup.string().required("Kindly the expiry month and date"),

})


function EditWebinarForm({ eventid, email }) {
    const { token } = useContext(AppContext);

    const navigate = useNavigate();
    const registerWebinar = (cardDetail) => {

        fetch(`${API}/admin/regWebinar/${eventid}/${email}`, {
            method: "PUT",
            body: JSON.stringify(cardDetail),
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
            return navigate("/StudentWebinarLinks")
        })
    };


    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            cardNumber: "",
            cvvNumber: "",
            nameOnCard: "",
            expiryDate: "",
        },
        validationSchema: eventValidationSchema,
        onSubmit: (cardDetail) => {
            console.log("onSubmit", cardDetail);
            registerWebinar(cardDetail);
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
                    Payment Details
                </Typography>

                <TextField
                    className="add-user-name"
                    label="16 digit card number"
                    type="text"
                    value={values.cardNumber}
                    name="cardNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.cardNumber && errors.cardNumber ? true : false}
                    helperText={touched.cardNumber && errors.cardNumber ? errors.cardNumber : ""}
                />
                <TextField
                    className="add-user-name"
                    label="CVV Number"
                    type="text"
                    value={values.cvvNumber}
                    name="cvvNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.cvvNumber && errors.cvvNumber ? true : false}
                    helperText={touched.cvvNumber && errors.cvvNumber ? errors.cvvNumber : ""}
                />
                <TextField
                    className="add-user-name"
                    label="Name as printed on card"
                    type="text"
                    value={values.nameOnCard}
                    name="nameOnCard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.nameOnCard && errors.nameOnCard ? true : false}
                    helperText={touched.nameOnCard && errors.nameOnCard ? errors.nameOnCard : ""}
                />
                <TextField
                    className="add-user-name"
                    label="Expiration MM/YYYY"
                    type="text"
                    value={values.expiryDate}
                    name="expiryDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.expiryDate && errors.expiryDate ? true : false}
                    helperText={touched.expiryDate && errors.expiryDate ? errors.expiryDate : ""}
                />
                <ColorButton className="add-user-btn"
                    type="submit"
                    variant="contained">Pay for Webinar</ColorButton>
            </form>
        </div>
    </div>;
}

function MaximumParticipants() {
    const navigate = useNavigate();
    return <div
        className="add-user-container">
        <div
            className="wrapper"
            style={{
                position: "relative",
                textAlign: "center",
                display: "inline-block",
            }}

        >
            <Typography
                variant="h4"
                pb={2}
                sx={{
                    textAlign: "center",
                }}
            >
                Maximum participant count reached. You can register only if someone else cancel their registration.
                Sorry for the inconvenience!
            </Typography>

            <ColorButton
                className="add-user-btn"
                type="submit"
                variant="contained"
                startIcon={<ArrowBackIosIcon />}
                onClick={() => navigate(-1)}
            >
                Back
            </ColorButton>



        </div>

    </div>
}