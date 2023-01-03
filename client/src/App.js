import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdmissionCreated from "./components/New Admission/AdmissionCreated";
import FileDataPage from "./components/New Admission/FileDataPage";
import { ProtectRoutes, RestrictedRoutes } from "./Consts";
import { CourseAccountProvider } from "./context/courseAccount";
import { UserAuthContext } from "./context/user";
import { Auth, Student } from "./pages";
import AllCourses from "./pages/courses/AllCourses";
import CourseDetails from "./pages/courses/CourseDetails";
import EmailSent from "./pages/courses/EmailSent";
import Downloads from "./pages/Downloads";
import Homepage from "./pages/homepage/Homepage";
import Navbar from "./pages/homepage/Navbar";
import NotificationView from "./pages/NotificationView";
import Signup from "./pages/Signup";
import CourseResetPassword from "./pages/student/CourseResetPassword";
import ForgetPassword from "./pages/student/ForgetPassword";
import ForgetRegisterNumber from "./pages/student/ForgetRegister";
import StudentLogin from "./pages/student/StudentLogin";
import UnprotectedRoute from "./pages/student/Unprotected";
import AllNotifications from "./pages/superAdmin/AllNotifications";
import ViewBranch from "./pages/superAdmin/ViewBranch";
import CourseProtected from "./pages/student/CourseProtected";
import MyCourses from "./pages/student/MyCourses";
import ReactGA from "react-ga";

export default function App() {
  ReactGA.initialize("G-K5QQWRHM78");
  ReactGA.send("pageview");
  const { checkUserLogin } = useContext(UserAuthContext);
  const [navOpened, setNavOpened] = useState(false);


  useEffect(() => {
    checkUserLogin();
  }, []);
 

  return (
    <>
      <div className="flex">
        <CourseAccountProvider>
          <div className="w-full">
            <ToastContainer />
            <Navbar setNavOpened={setNavOpened} navOpened={navOpened} />
            <Routes>
              <Route path="*" element={<Auth.NotFound />} />
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Auth.Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/student-login" element={<StudentLogin />} />
              <Route path="/admission-created" element={<AdmissionCreated />} />
              <Route path="/course-details/:id" element={<CourseDetails />} />
              <Route path="/all-courses" element={<AllCourses />} />
              <Route path="/email-sent/:email" element={<EmailSent />} />
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

              <Route
                path="/my-courses"
                element={
                  <CourseProtected>
                    <MyCourses />
                  </CourseProtected>
                }
              />
              <Route
                path="/forgot-registerNo"
                element={
                  <UnprotectedRoute>
                    <ForgetRegisterNumber />
                  </UnprotectedRoute>
                }
              />
              <Route
                path="/course/resetPassword/:token"
                element={
                  <UnprotectedRoute>
                    <CourseResetPassword />
                  </UnprotectedRoute>
                }
              />
              <Route
                path="/forgot-password/"
                element={
                  <UnprotectedRoute>
                    <ForgetPassword />
                  </UnprotectedRoute>
                }
              />
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
            <Routes></Routes>
          </div>
        </CourseAccountProvider>
      </div>
      {/* <Footer/> */}
    </>
  );
}
