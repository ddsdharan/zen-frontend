import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Register } from "./components/register/Register";
import { Login } from "./components/login/Login.js";
import { NotFound } from "./components/pageNotFound/NotFound";
import { ForgetPassword } from "./components/forgetPassword/ForgetPassword";
import { ChangePassword } from "./components/forgetPassword/ChangePassword";
import React from "react";
import { MiniDrawer } from "./MiniDrawer";
import { Appstate } from "./contexts/AppState";
import { AdminLogin } from "./components/adminLogin/AdminLogin";

function App() {
  return (
    <div className="App">
      <Appstate>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Adminlogin" element={<AdminLogin />} />

          <Route
            path="/Studentevents"
            element={<MiniDrawer flow="StudentEvents" user="student" />}
          />
          <Route
            path="/Studentregisteredevents"
            element={<MiniDrawer flow="StudentRegEvents" user="student" />}
          />
          <Route
            path="/Adminevents"
            element={<MiniDrawer flow="AdminEvents" user="admin" />}
          />
          <Route
            path="/AdminParticipants"
            element={<MiniDrawer flow="Participants" user="admin" />}
          />
          <Route
            path="/Adminnewevents"
            element={<MiniDrawer flow="AdminNewEvent" user="admin" />}
          />
          <Route
            path="/EditEvents/:eventid"
            element={<MiniDrawer flow="EditEvents" user="admin" />}
          />
          <Route
            path="/events/:eventid"
            element={<MiniDrawer flow="EventTrailer" user="admin" />}
          />
          <Route
            path="/events/student/:eventid"
            element={<MiniDrawer flow="EventTrailer" user="student" />}
          /><Route
            path="/code/:eventid/:studentid"
            element={<MiniDrawer flow="CodeDetails" user="admin" />}
          />
          <Route
            path="/student/code/:eventid/:studentid"
            element={<MiniDrawer flow="CodeDetails" user="student" />}
          />
          <Route
            path="/evaluvate/:eventid/:studentid"
            element={<MiniDrawer flow="EvaluvateCode" user="admin" />}
          />
          <Route
            path="/AdminResult"
            element={<MiniDrawer flow="AdminResult" user="admin" />}
          />
          <Route
            path="/SendResult/:eventid/:studentId"
            element={<MiniDrawer flow="SendResult" user="admin" />}
          />
          <Route
            path="/AdminNewWebinar"
            element={<MiniDrawer flow="AdminNewWebinar" user="admin" />}
          />
          <Route
            path="/AdminWebinar"
            element={<MiniDrawer flow="ViewWebinar" user="admin" />}
          />

          <Route
            path="/EditWebinar/:eventid"
            element={<MiniDrawer flow="EditWebinar" user="admin" />}
          />
          <Route
            path="/RegisterEvents/:eventid/:email"
            element={<MiniDrawer flow="RegStudentForEvent" user="student" />}
          />
          <Route
            path="/StudentWebinar"
            element={<MiniDrawer flow="StudentWebinar" user="student" />}
          />
          <Route
            path="/Studentdashboard"
            element={<MiniDrawer flow="StudentDashboard" user="student" />}
          />
          <Route
            path="/RegisterWebinar/:eventid/:email"
            element={<MiniDrawer flow="RegisterWebinar" user="student" />}
          />
          <Route
            path="/StudentWebinarLinks"
            element={<MiniDrawer flow="StudentWebinarLinks" user="student" />}
          />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/" element={<Navigate replace to="/Login" />} />
          <Route path="/404-Page" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404-Page" />} />
          <Route path="/reset-password/:id/:token" element={<ChangePassword />} />
        </Routes>
      </Appstate>
    </div>
  );
}

export default App;

