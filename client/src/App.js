import React, { useEffect } from "react";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import AdmissionCreated from "./components/New Admission/AdmissionCreated";
import FileDataPage from "./components/New Admission/FileDataPage";
import Sidebar from "./components/Sidebar";
import { UserAuthContext } from "./context/user";
import BranchPayments from "./pages/admin/BranchPayments";

import Home from "./pages/Home";
import {
  Login,
  AllBranches,
  EditBranch,
  EditStudent,
  EditUser,
  EditTeacher,
  AllStudents,
  NotFound,
  NotAllowed,
  Profile,
  AddStudents,
  AllTeachers,
  CreateBranch,
  CreateTeacher,
  ProtectedRoutes,
  Restricted,
  AllBranchCard,
  BranchBasedDetails,
  NotLoggedIn,
  AllUsers,
  AllClasses,
} from "./pages/index";
import AllPayments from "./pages/superAdmin/AllPayments";
import CreatePaymentData from "./pages/superAdmin/CreatePaymentData";
import EditPaymentData from "./pages/superAdmin/EditPayment";

export default function App() {
  const { authData, checkUserLogin } = useContext(UserAuthContext);

  const ProtectRoutes = [
    {
      route: "/",
      component: <Home />,
    },
    {
      route: "/all-students/:classId",
      component: <AllStudents />,
    },
    {
      route: "/all-classes",
      component: <AllClasses />,
    },
    {
      route: "/all-teachers",
      component: <AllTeachers />,
    },

    {
      route: "/edit-student/:id",
      component: <EditStudent />,
    },
    {
      route: "/edit-teacher/:id",
      component: <EditTeacher />,
    },
    {
      route: "/create-teacher",
      component: <CreateTeacher />,
    },
    {
      route: "/branch-payment",
      component: <BranchPayments />,
    },
  ];
  const RestrictedRoutes = [
    {
      route: "/create-branch",
      component: <CreateBranch />,
      role: "superAdmin",
    },
    {
      route: "/all-branches",
      component: <AllBranches />,
      role: "superAdmin",
    },
    {
      route: "/edit-branch/:id",
      component: <EditBranch />,
      role: "superAdmin",
    },
    {
      route: "/all-users",
      component: <AllUsers />,
      role: "superAdmin",
    },
    {
      route: "/edit-user/:id",
      component: <EditUser />,
      role: "superAdmin",
    },
    {
      route: "/all-branch-students",
      component: <AllBranchCard />,
      role: "superAdmin",
    },
    {
      route: "/all-branch-students/:id",
      component: <BranchBasedDetails />,
      role: "superAdmin",
    },
    {
      route: "/all-payments",
      component: <AllPayments />,
      role: "superAdmin",
    },
    {
      route: "/create-payment",
      component: <CreatePaymentData />,
      role: "superAdmin",
    },
    {
      route: "/edit-payment/:id",
      component: <EditPaymentData />,
      role: "superAdmin",
    },
  ];
  useEffect(() => {
    checkUserLogin();
  }, []);
  return (
    <>
      <div className="flex">
        {authData && (
          <div className="lg:w-[300px]">
            <Sidebar />
          </div>
        )}
        <div className="w-full">
          <ToastContainer />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admission-created" element={<AdmissionCreated />} />
            <Route path="/mahdiyya-third/:aadhar" element={<FileDataPage />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/add-student" element={<AddStudents />} />
            <Route path="/not-logged" element={<NotLoggedIn />} />
            <Route path="/not-allowed" element={<NotAllowed />} />
            {ProtectRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.route}
                element={<ProtectedRoutes>{route.component}</ProtectedRoutes>}
              />
            ))}
            {RestrictedRoutes.map((route, index) => (
              <Route
                path={route.route}
                key={index}
                element={
                  <Restricted role={route.role}>{route.component}</Restricted>
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
