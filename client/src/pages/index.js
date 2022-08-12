import AddStudents from "../components/New Admission/AddStudents";
import ProtectedRoutes from "../ProtectRoutes";
import Restricted from "../Restricted";
import AllClasses from "./admin/AllClasses";
import AllTeachers from "./admin/AllTeachers";
import BranchTranfers from "./admin/BranchTranfers";
import CreateTeacher from "./admin/CreateTeacher";
import EditStudent from "./admin/EditStudent";
import EditTeacher from "./admin/EditTeacher";
import Login from "./Login";
import NotAllowed from "./NotAllowed";
import NotLoggedIn from "./NotLoggedIn";
import NotFound from "./Not_found";
import Profile from "./StudentProfile";
import AllBranchCard from "./superAdmin/AllBranchCard";
import AllBranches from "./superAdmin/AllBranches";
import AllStudents from "./superAdmin/AllStudents";
import AllUsers from "./superAdmin/AllUsers";
import BranchBasedDetails from "./superAdmin/BranchBasedDetails";
import BranchBasedTeachers from "./superAdmin/BranchBasedTeachers";
import CreateBranch from "./superAdmin/CreateBranch";
import EditBranch from "./superAdmin/EditBranch";
import ViewBranch from "./superAdmin/ViewBranch";

export const Teacher = {
  EditTeacher,
  AllTeachers,
  CreateTeacher,
  BranchBasedTeachers,
};
export const Auth = {
  Login,
  ProtectedRoutes,
  Restricted,
  NotAllowed,
  NotFound,
  NotLoggedIn,
};
export const Student = {
  AllStudents,
  EditStudent,
  AddStudents,
  Profile,
  AllClasses,
};
export const Branch = {
  AllBranches,
  EditBranch,
  CreateBranch,
  AllBranchCard,
  BranchBasedDetails,
  ViewBranch,
  BranchTranfers,
};
export const Users = {
  AllUsers,
};
