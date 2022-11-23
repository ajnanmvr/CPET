import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdmissionCreated from "./components/New Admission/AdmissionCreated";
import FileDataPage from "./components/New Admission/FileDataPage";
import { ProtectRoutes, RestrictedRoutes } from "./Consts";
import { CourseAccountProvider } from "./context/couseAccount";
import { UserAuthContext } from "./context/user";
import { Auth, Student } from "./pages";
import CourseDetails from "./pages/courses/CourseDetails";
import Downloads from "./pages/Downloads";
import Homepage from "./pages/homepage/Homepage";
import NotificationView from "./pages/NotificationView";
import Signup from "./pages/Signup";
import StudentLogin from "./pages/student/StudentLogin";
import AllNotifications from "./pages/superAdmin/AllNotifications";
import ViewBranch from "./pages/superAdmin/ViewBranch";

export default function App() {
  const { checkUserLogin } = useContext(UserAuthContext);

  useEffect(() => {
    checkUserLogin();
  }, []);
  return (
    <>
      <div className="flex">
        <CourseAccountProvider>
          <div className="w-full">
            <ToastContainer />
            <Routes>
              <Route path="*" element={<Auth.NotFound />} />
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Auth.Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/student-login" element={<StudentLogin />} />
              <Route path="/admission-created" element={<AdmissionCreated />} />
              <Route path="/course-details/:id" element={<CourseDetails />} />
              <Route path="/mahdiyya-third-year" element={<FileDataPage />} />
              <Route path="/branch/:id" element={<ViewBranch />} />
              <Route path="/profile/:id" element={<Student.Profile />} />
              <Route path="/add-student" element={<Student.AddStudents />} />
              <Route path="/not-logged" element={<Auth.NotLoggedIn />} />
              <Route path="/not-allowed" element={<Auth.NotAllowed />} />
              <Route path="/all-notifications" element={<AllNotifications />} />
              <Route path="/notification/:id" element={<NotificationView />} />
              {/* <Route path="/launch" element={<LaunchBtn />} /> */}
              <Route path="/downloads" element={<Downloads />} />
              {ProtectRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.route}
                  element={
                    <Auth.ProtectedRoutes>
                      {route.component}
                    </Auth.ProtectedRoutes>
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
        </CourseAccountProvider>
      </div>
      {/* <Footer/> */}
    </>
  );
}
