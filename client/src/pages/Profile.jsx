import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../Axios";

function Profile() {
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
      let res = await Axios.patch("/student/" + id, { verified: true });
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
      <div className="w-full ml-6">
        {showAlert && ConfirmAlert()}

        <section className="bg-white p-6">
          <div className="mt-4 absolute top-3 right-3">
            <div className="px-4 sm:px-0">
              {!loading ? (
                <>
                  {!student.verified && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowAlert(true);
                      }}
                      className="w-full  bg-purple-700 hover:bg-purple-900 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase"
                    >
                      Verify
                    </button>
                  )}
                </>
              ) : (
                <h1 className="text-white text-center w-full  bg-indigo-900 hover:bg-indigo-800  font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase">
                  Processing..
                </h1>
              )}
            </div>
          </div>{" "}
          <div className="max-w-screen-xl mx-auto">
            <h3 className="text-4xl font-bold text-blue-900 uppercase my-4">
              STUDENT PROFILE
            </h3>
            <form>
              <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Student Name
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={student.studentName}
                    />
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Admission Number
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={student?.admissionNo}
                    />
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Father's Name
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={student.fatherName}
                    />
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Mother's Name
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={student.motherName}
                    />
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Guardian
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={student.guardian}
                    />
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      House Name
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={student.houseName}
                    />
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Aadhar Number
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={student.aadhar}
                    />
                  </div>
                </div>{" "}
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Phone
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={student.phone}
                    />
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Place
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={student.place}
                    />
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Post Office
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={student.postOffice}
                    />
                  </div>
                </div>{" "}
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Pin Code
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={student.pinCode}
                    />
                  </div>
                </div>{" "}
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      District
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={student.district}
                    />
                  </div>
                </div>{" "}
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      State
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={student.state}
                    />
                  </div>
                </div>{" "}
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      DOB
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={moment(student.dob).format("DD-MM-YYYY")}
                    />
                  </div>
                </div>{" "}
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Branch
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={student.branch?.branchName}
                    />
                  </div>
                </div>
              </div>
              {student.class === "mahdiyya-third-year" && (
                <div className="grid grid-cols-3 my-6">
                  <img
                    className="object-cover h-48 w-96"
                    src={student?.certificateOne}
                    alt=""
                  />
                  <img
                    className="object-cover h-48 w-96"
                    src={student?.certificateTwo}
                    alt=""
                  />
                  <img
                    className="object-cover h-48 w-96"
                    src={student?.certificateThree}
                    alt=""
                  />
                </div>
              )}
            </form>
          </div>
        </section>
        {student.verified && (
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
        )}
      </div>
    </>
  );

  function ConfirmAlert() {
    return (
      <div className="bg-gray-200 w-1/4 h-32  top-2 right-1/4 fixed">
        <div
          className="modal fade  outline-none overflow-x-hidden overflow-y-auto"
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

export default Profile;
