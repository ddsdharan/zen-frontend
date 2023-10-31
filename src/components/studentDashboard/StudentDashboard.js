import { CardDashboard } from "./CardDashboard"

import { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { API } from "../../global";
import { AppContext } from "../../contexts/AppState";

export function StudentDashboard() {
    const { token } = useContext(AppContext);
    const navigate = useNavigate();
    const email = localStorage.getItem('userEmail');
    const [userData, setUserData] = useState(null);

    const getDashboardDetails = useCallback(() => {
        try {
            fetch(`${API}/admin/dashboardDetail/${email}`, {
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
                .then((data1) => setUserData(data1))
                .catch(error => navigate("/"))
        } catch (err) {
            console.log(err);
            navigate("/")
        };
    }, [token, email, navigate]);

    useEffect(() => {
        getDashboardDetails();
    }, [getDashboardDetails]);

    return (userData ?
        <>
            <div className="d-sm-flex align-items-center mb-4">
                <h1 className="h3 mb-0 text-black-800">Dashboard</h1>
            </div>
            <div className="row">
                <CardDashboard detail="Total number of Events" value={userData.totalEvents} symbol={"fas fa-calendar fa-2x text-gray-300"} />
                <CardDashboard detail="Total number of Events Participated" value={userData.participatedEvents} symbol={"fas fa-calendar-check fa-2x text-gray-300"} />
                <CardDashboard detail="Total marks" value={userData.totalMarks} symbol={"fas fa-star fa-2x text-gray-300"} />
                <CardDashboard detail="Events not Evaluated" value={userData.taskNotEval} symbol={"fas fa-window-close fa-2x text-gray-300"} />
            </div>
            {/* <ChartDashboard userData={userData} /> */}
            {/* <ProjectIllustration/> */}
        </> : <h3>Loading.....</h3>
    );
}
