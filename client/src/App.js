import React, { useEffect } from "react";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudents from "./components/New Admission/AddStudents";
import AdmissionCreated from "./components/New Admission/AdmissionCreated";
import FileDataPage from "./components/New Admission/FileDataPage";
import Sidebar from "./components/Sidebar";
import { UserAuthContext } from "./context/user";
import AllTeachers from "./pages/admin/AllTeachers";
import AllClasses from "./pages/admin/AllClasses";
import CreateTeacher from "./pages/admin/CreateTeacher";
import EditStudent from "./pages/admin/EditStudent";
import EditTeacher from "./pages/admin/EditTeacher";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotAllowed from "./pages/NotAllowed";
import NotLoggedIn from "./pages/NotLoggedIn";
import NotFound from "./pages/Not_found";
import Profile from "./pages/Profile";
import AllBranches from "./pages/superAdmin/AllBranches";
import AllStudents from "./pages/superAdmin/AllStudents";
import AllUsers from "./pages/superAdmin/AllUsers";
import BranchBasedDetails from "./pages/superAdmin/BranchBasedDetails";
import AllBranchCard from "./pages/superAdmin/BranchBasedFilter";
import CreateBranch from "./pages/superAdmin/CreateBranch";
import CreateUser from "./pages/superAdmin/CreateUser";
import EditBranch from "./pages/superAdmin/EditBranch";
import EditUser from "./pages/superAdmin/EditUser";
import ProtectedRoutes from "./ProtectRoutes";
import Restricted from "./Restricted";

export default function App() {
  const { authData, checkUserLogin } = useContext(UserAuthContext);
  console.log(authData);

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
    </>
  );
}
