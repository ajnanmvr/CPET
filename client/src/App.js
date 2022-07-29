import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdmissionCreated from "./components/New Admission/AdmissionCreated";
import { ProtectRoutes, RestrictedRoutes } from "./Consts";
import { UserAuthContext } from "./context/user";
import { Auth, Student } from "./pages";
import Homepage from "./pages/Homepage";
import NotificationView from "./pages/NotificationView";
import AllNotifications from "./pages/superAdmin/AllNotifications";

export default function App() {
  const { authData, checkUserLogin } = useContext(UserAuthContext);

  useEffect(() => {
    checkUserLogin();
  }, []);
  return (
    <>
      <div className="flex">
        {authData && <div className="lg:w-[300px]" />}
        <div className="w-full">
          <ToastContainer />
          <Routes>
            <Route path="*" element={<Auth.NotFound />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Auth.Login />} />
            <Route path="/admission-created" element={<AdmissionCreated />} />
            <Route path="/profile/:id" element={<Student.Profile />} />
            <Route path="/add-student" element={<Student.AddStudents />} />
            <Route path="/not-logged" element={<Auth.NotLoggedIn />} />
            <Route path="/not-allowed" element={<Auth.NotAllowed />} />
            <Route path="/all-notifications" element={<AllNotifications />} />
            <Route path="/notification/:id" element={<NotificationView />} />
            {ProtectRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.route}
                element={
                  <Auth.ProtectedRoutes>{route.component}</Auth.ProtectedRoutes>
                }
              />
            ))}
            {RestrictedRoutes.map((route, index) => (
              <Route
                path={route.route}
                key={index}
                element={
                  <Auth.Restricted role={route.role}>
                    {route.component}
                  </Auth.Restricted>
                }
              />
            ))}
          </Routes>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
}
