import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdmissionCreated from "./components/New Admission/AdmissionCreated";
import FileDataPage from "./components/New Admission/FileDataPage";
import Sidebar from "./components/Sidebar";
import { UserAuthContext } from "./context/user";
import AdminPayDetails from "./pages/admin/AdminPayDetails";
import AdmissionClassStudents from "./pages/admin/AdmissionClasses";
import Admissions from "./pages/admin/Admissions";
import BranchPayments from "./pages/admin/BranchPayments";

import AdminHome from "./pages/AdminHome";
import Homepage from "./pages/Homepage";
import {
  AddStudents,
  AllBranchCard,
  AllBranches,
  AllClasses,
  AllStudents,
  AllTeachers,
  AllUsers,
  BranchBasedDetails,
  CreateBranch,
  CreateTeacher,
  EditBranch,
  EditStudent,
  EditTeacher,
  EditUser,
  Login,
  NotAllowed,
  NotFound,
  NotLoggedIn,
  Profile,
  ProtectedRoutes,
  Restricted,
} from "./pages/index";
import NotificationView from "./pages/NotificationView";
import AllNotifications from "./pages/superAdmin/AllNotifications";
import AllPayments from "./pages/superAdmin/AllPayments";
import AllSubjects from "./pages/superAdmin/AllSubjects";
import CreateNotification from "./pages/superAdmin/CreateNotification";
import CreatePaymentData from "./pages/superAdmin/CreatePaymentData";
import EditPaymentData from "./pages/superAdmin/EditPayment";
import PaymentDetails from "./pages/superAdmin/PaymentDetails";
import ViewBranch from "./pages/superAdmin/ViewBranch";

export default function App() {
  const { authData, checkUserLogin } = useContext(UserAuthContext);

  const ProtectRoutes = [
    {
      route: "/admin",
      component: <AdminHome />,
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
    {
      route: "/admin-payment-details/:id",
      component: <AdminPayDetails />,
    },
    {
      route: "/admissions",
      component: <Admissions />,
    },
    {
      route: "/admissions/:id",
      component: <AdmissionClassStudents />,
    },
    {
      route: "/branch/:id",
      component: <ViewBranch />,
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
      route: "/all-subjects",
      component: <AllSubjects />,
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
      route: "/create-notification",
      component: <CreateNotification />,
      role: "superAdmin",
    },
    {
      route: "/edit-payment/:id",
      component: <EditPaymentData />,
      role: "superAdmin",
    },
    {
      route: "/payment-details/:id",
      component: <PaymentDetails />,
      role: "superAdmin",
    },
  ];
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
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admission-created" element={<AdmissionCreated />} />
            <Route path="/mahdiyya-third/:id" element={<FileDataPage />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/add-student" element={<AddStudents />} />
            <Route path="/not-logged" element={<NotLoggedIn />} />
            <Route path="/not-allowed" element={<NotAllowed />} />
            <Route path="/all-notifications" element={<AllNotifications />} />
            <Route path="/notification/:id" element={<NotificationView />} />
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
