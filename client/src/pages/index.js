import AddStudents from "../components/New Admission/AddStudents";
import ProtectedRoutes from "../ProtectRoutes";
import AllTeachers from "./admin/AllTeachers";
import CreateTeacher from "./admin/CreateTeacher";
import EditStudent from "./admin/EditStudent";
import EditTeacher from "./admin/EditTeacher";
import Login from "./Login";
import NotAllowed from "./NotAllowed";
import NotFound from "./Not_found";
import Profile from "./Profile";
import AllBranches from "./superAdmin/AllBranches";
import AllStudents from "./superAdmin/AllStudents";
import CreateBranch from "./superAdmin/CreateBranch";
import EditBranch from "./superAdmin/EditBranch";
import EditUser from "./superAdmin/EditUser";
import Restricted from "../Restricted";
import AllBranchCard from "./superAdmin/AllBranchCard";
import BranchBasedDetails from "./superAdmin/BranchBasedDetails";
import NotLoggedIn from "./NotLoggedIn";
import AllUsers from "./superAdmin/AllUsers";
import AllClasses from "./admin/AllClasses";

export {
  Login,
  Profile,
  NotAllowed,
  NotFound,
  AllBranches,
  AllStudents,
  EditBranch,
  EditStudent,
  EditUser,
  EditTeacher,
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
};
