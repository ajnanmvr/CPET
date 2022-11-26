import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CourseAccountContext } from "../../context/courseAccount";

function CourseProtected({ children }) {
  const { courseAccount } = useContext(CourseAccountContext);
  const navigate = useNavigate();
  if (!courseAccount) {
    navigate("/");
  } else {
    return (
        <>
        {children}
        </>
    )
  }
}

export default CourseProtected;
