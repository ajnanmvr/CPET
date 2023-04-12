import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../Axios";

function StudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const getStudent = async () => {
    try {
      let { data } = await Axios.get("/student/" + id);
      setStudent(data);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/student/admission/verify/" + id);
      if (res.status === 200) {
        setLoading(false);
        toast.success("Student Verified Successfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
        navigate(-1);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error.response);
    }
  };
  useEffect(() => {
    getStudent();
  }, []);
  return (
    <>
      <div className="w-full bg-gray-200">
        {showAlert && ConfirmAlert()}

        <section className="p-6">
          <div className="bg-gray-100">
            {/* End of Navbar */}
            <div className="container mx-auto my-5 p-5">
              <div className="md:flex no-wrap md:-mx-2 ">
                {/* Left Side */}

                {/* Right Side */}
                <div className="w-full mx-2 h-64">
                  {/* Profile tab */}
                  {/* About Section */}
                  <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                      <span clas="text-green-500">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">Student Profile</span>
                    </div>
                    <div className="text-gray-700">
                      <div className="grid md:grid-cols-2 text-sm">
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Student Name
                          </div>
                          <div className="px-4 py-2">{student.studentName}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Register Number
                          </div>
                          <div className="px-4 py-2">{student.registerNo}</div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            House Name
                          </div>
                          <div className="px-4 py-2">{student.houseName}</div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Father Name
                          </div>
                          <div className="px-4 py-2">{student.fatherName}</div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Phone</div>
                          <div className="px-4 py-2">+91 {student.phone}</div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Date Of Birth
                          </div>
                          <div className="px-4 py-2">
                            {moment(student.dob).format("DD-MM-YYYY")}
                          </div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Place</div>
                          <div className="px-4 py-2">{student.place}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Post Office
                          </div>
                          <div className="px-4 py-2">{student.postOffice}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Pincode</div>
                          <div className="px-4 py-2">{student.pinCode}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            District
                          </div>
                          <div className="px-4 py-2">{student.district}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">State</div>
                          <div className="px-4 py-2">{student.state}</div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Study Center</div>
                          <div className="px-4 py-2">
                            {student?.branch?.branchName}
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Class</div>
                          <div className="px-4 py-2">
                            {student.class?.className}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End of profile tab */}
                  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Status</span>
                      <span className="ml-auto">
                        {student?.verified ? (
                          <span className="bg-green-400 py-1 px-2 rounded text-white text-sm">
                            Active
                          </span>
                        ) : (
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              setShowAlert(true);
                            }}
                            className="bg-red-400 cursor-pointer py-1 px-2 rounded text-white text-sm"
                          >
                            Not Verified
                          </span>
                        )}
                      </span>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* {student.verified && (
          <div className="max-w-screen-xl mx-auto">
            <h3 className="text-4xl font-bold text-gray-800 uppercase my-4">
              TRANSFER STUDENT
            </h3>
            <Link to={`/transfer/${student._id}`}>
              <button className="bg-gray-800 px-4 py-3 font-bold text-white hover:bg-gray-600 transition">
                Go To Transfer Page
                <FontAwesomeIcon className="mx-3" icon={faArrowRight} />
              </button>
            </Link>
          </div>
        )} */}
      </div>
    </>
  );

  function ConfirmAlert() {
    return (
      <div className="bg-gray-200 w-1/4 h-32  top-2 right-1/4 fixed">
        <div
          className="outline-none overflow-x-hidden overflow-y-auto"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5
                  className="text-xl font-medium leading-normal text-gray-800"
                  id="exampleModalLabel"
                >
                  Do you want to verify this student?
                </h5>
              </div>
              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button
                  type="button"
                  className="inline-block px-6 py-2.5 bg-orange-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out"
                  data-bs-dismiss="modal"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAlert(false);
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                  className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentProfile;
