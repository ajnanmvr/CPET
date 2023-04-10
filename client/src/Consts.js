import { Branch, Student, Teacher, Users } from "./pages";
import AdminPayDetails from "./pages/admin/AdminPayDetails";
import AdminProfile from "./pages/admin/AdminProfile";
import Admissions from "./pages/admin/Admissions";
import BranchPayments from "./pages/admin/BranchPayments";
import FileUpload from "./pages/admin/FileUpload";
import MyMessages from "./pages/admin/MyMessages";
import MyPayments from "./pages/admin/MyPayments";
import MyUploads from "./pages/admin/MyUploads";
import TransferStudent from "./pages/admin/TransferStudent";
import AdminHome from "./pages/AdminHome";
import CreateNews from "./pages/CreateNews";
import AdmissionRequests from "./pages/superAdmin/AdmissionRequests";
import AllSubjects from "./pages/superAdmin/AllSubjects";
import BranchStudents from "./pages/superAdmin/BranchStudents";
import ClassManagment from "./pages/superAdmin/ClassManagment";
import CourseStudents from "./pages/superAdmin/CourseStudents";
import CreateCourse from "./pages/superAdmin/CreateCourse";
import CreateExam from "./pages/superAdmin/CreateExam";
import CreateMessage from "./pages/superAdmin/CreateMessage";
import CreateNotification from "./pages/superAdmin/CreateNotification";
import CreatePaymentData from "./pages/superAdmin/CreatePaymentData";
import CreateSchedule from "./pages/superAdmin/CreateSchedule";
import EditCourse from "./pages/superAdmin/EditCourse";
import EditNews from "./pages/superAdmin/EditNews";
import EditPaymentData from "./pages/superAdmin/EditPayment";
import EditSubject from "./pages/superAdmin/EditSubject";
import PaymentDetails from "./pages/superAdmin/PaymentDetails";
import Settings from "./pages/superAdmin/Settings";
import TransferRequest from "./pages/superAdmin/TransferRequest";
import TransferVerify from "./pages/superAdmin/TransferVerify";
import UploadedFiles from "./pages/superAdmin/UploadedFiles";
import ViewTeacher from "./pages/ViewTeacher";

export const DISTRICT = [
  "MALAPPURAM",
  "ALAPPUZHA",
  "ERNAKULAM",
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
  "MANGLORE"
];
export const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];
export const YEARS = [
  "1970",
  "1971",
  "1972",
  "1973",
  "1974",
  "1975",
  "1976",
  "1977",
  "1978",
  "1979",
  "1980",
  "1981",
  "1982",
  "1983",
  "1984",
  "1985",
  "1986",
  "1987",
  "1988",
  "1989",
  "1990",
  "1991",
  "1992",
  "1993",
  "1994",
  "1995",
  "1996",
  "1997",
  "1998",
  "1999",
  "2000",
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
];
export const DATES = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
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
    route: "/all-subjects",
    component: <AllSubjects />,
    role: "superAdmin",
  },
  {
    route: "/edit-subject/:id",
    component: <EditSubject />,
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
    route: "/create-schedule",
    component: <CreateSchedule />,
    role: "superAdmin",
  },
  {
    route: "/admission-requests",
    component: <AdmissionRequests />,
    role: "superAdmin",
  },
  {
    route: "/settings",
    component: <Settings />,
    role: "superAdmin",
  },
  {
    route: "/class-management",
    component: <ClassManagment />,
    role: "superAdmin",
  },
  {
    route: "/create-news",
    component: <CreateNews />,
    role: "superAdmin",
  },
  {
    route: "/edit-news/:id",
    component: <EditNews />,
    role: "superAdmin",
  },
  {
    route: "/create-course",
    component: <CreateCourse />,
    role: "superAdmin",
  },
  {
    route: "/edit-course/:id",
    component: <EditCourse />,
    role: "superAdmin",
  },
  {
    route: "/all-courses",
    component: <CreateCourse />,
    role: "superAdmin",
  },
  {
    route: "/create-exam",
    component: <CreateExam />,
    role: "superAdmin",
  },
  {
    route: "/uploaded-files/:id",
    component: <UploadedFiles />,
    role: "superAdmin",
  },
  {
    route: "/all-students/:branchId/:classId",
    component: <BranchStudents />,
    role: "superAdmin",
  },
  {
    route: "/uploaded-files/:id",
    component: <UploadedFiles />,
    role: "superAdmin",
  },
  {
    route: "/course-students/:id",
    component: <CourseStudents />,
    role: "superAdmin",
  },
  {
    route: "/create-messages",
    component: <CreateMessage />,
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
    route: "/teacher/:id",
    component: <ViewTeacher />,
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
    route: "/transfer/:id",
    component: <TransferStudent />,
  },
  {
    route: "/transfers",
    component: <Branch.BranchTranfers />,
  },
  {
    route: "/transfer-verify/:id",
    component: <TransferVerify />,
  },
  {
    route: "/my-payments",
    component: <MyPayments />,
  },
  {
    route: "/profile",
    component: <AdminProfile />,
  },
  {
    route: "/my-uploads",
    component: <MyUploads />,
  },
  {
    route: "/file-upload/:referenceId",
    component: <FileUpload />,
  },  {
    route: "/my-messages",
    component: <MyMessages />,
  },
];
