import { Branch, Student, Teacher, Users } from "./pages";
import AdminPayDetails from "./pages/admin/AdminPayDetails";
import Admissions from "./pages/admin/Admissions";
import BranchPayments from "./pages/admin/BranchPayments";
import TransferStudent from "./pages/admin/TransferStudent";
import AdminHome from "./pages/AdminHome";
import AllPayments from "./pages/superAdmin/AllPayments";
import AllSubjects from "./pages/superAdmin/AllSubjects";
import CreateNotification from "./pages/superAdmin/CreateNotification";
import CreatePaymentData from "./pages/superAdmin/CreatePaymentData";
import CreateSettings from "./pages/superAdmin/CreateSettings";
import EditPaymentData from "./pages/superAdmin/EditPayment";
import PaymentDetails from "./pages/superAdmin/PaymentDetails";
import Settings from "./pages/superAdmin/Settings";
import TransferRequest from "./pages/superAdmin/TransferRequest";
import TransferVerify from "./pages/superAdmin/TransferVerify";

export const DISTRICT = [
  "MALAPPURAM",
  "ALAPPUZHA",
  "ERNAMKULAM",
  "IDUKKI",
  "KANNUR",
  "CALICUT",
  "TRISSUR",
  "KOLLAM",
  "KASARAGOD",
  "KOTTAYAM",
  "PALAKKAD",
  "PATHANAMTHITTA",
  "TRIVANDRUM",
  "WAYANAD",
];

export const RestrictedRoutes = [
  {
    route: "/create-branch",
    component: <Branch.CreateBranch />,
    role: "superAdmin",
  },
  {
    route: "/all-branches",
    component: <Branch.AllBranches />,
    role: "superAdmin",
  },
  {
    route: "/edit-branch/:id",
    component: <Branch.EditBranch />,
    role: "superAdmin",
  },
  {
    route: "/all-users",
    component: <Users.AllUsers />,
    role: "superAdmin",
  },
  {
    route: "/edit-user/:id",
    component: <Users.EditUser />,
    role: "superAdmin",
  },
  {
    route: "/all-branch-students",
    component: <Branch.AllBranchCard />,
    role: "superAdmin",
  },
  {
    route: "/all-branch-teachers",
    component: <Branch.AllBranchCard />,
    role: "superAdmin",
  },
  {
    route: "/all-branch-students/:id",
    component: <Branch.BranchBasedDetails />,
    role: "superAdmin",
  },
  {
    route: "/all-branch-teachers/:id",
    component: <Teacher.BranchBasedTeachers />,
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
  {
    route: "/transfer-request",
    component: <TransferRequest />,
    role: "superAdmin",
  },
  {
    route: "/transfer-verify/:id",
    component: <TransferVerify />,
    role: "superAdmin",
  },
  {
    route: "/settings",
    component: <Settings />,
    role: "superAdmin",
  },
  {
    route: "/create-settings",
    component: <CreateSettings />,
    role: "superAdmin",
  },
];

export const ProtectRoutes = [
  {
    route: "/admin",
    component: <AdminHome />,
  },
  {
    route: "/all-students/:classId",
    component: <Student.AllStudents />,
  },
  {
    route: "/all-classes",
    component: <Student.AllClasses />,
  },
  {
    route: "/all-teachers",
    component: <Teacher.AllTeachers />,
  },
  {
    route: "/edit-student/:id",
    component: <Student.EditStudent />,
  },
  {
    route: "/edit-teacher/:id",
    component: <Teacher.EditTeacher />,
  },
  {
    route: "/create-teacher",
    component: <Teacher.CreateTeacher />,
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
    route: "/branch/:id",
    component: <Branch.ViewBranch />,
  },
  {
    route: "/transfer/:id",
    component: <TransferStudent />,
  },
];
