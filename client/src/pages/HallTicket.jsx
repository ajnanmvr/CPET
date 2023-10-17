import moment from "moment/moment";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Axios from "../Axios";
import { toast } from "react-toastify";

function HallTicket() {
  const [registerNo, setRegisterNo] = useState("");
  const [data, setData] = useState(null);
  // console.log(data.data);
  const [error, setError] = useState(null);

  const hallTicketRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => hallTicketRef.current,
  });

  const downloadHallTicket = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.post("/hall-ticket/download", { registerNo });
      console.log(res.data);
      setData(res.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setData(null); // Clear any previous data
      setError(error.response.data.message);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000,
      });
      console.log(error.response);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      {!data ? (
        <>
          <h1 className="text-center font-semibold text-indigo-900 my-8 text-3xl">
            Download Hall Ticket
          </h1>
          <div className="mb-4 mt-6">
            <input
              type="text"
              onChange={(e) => setRegisterNo(e.target.value)}
              className="block w-full rounded-md border border-gray-900 pl-7 pr-12 focus:border-gray-900 focus:ring-indigo-500 sm:text-sm"
              placeholder="register number"
              value={registerNo}
            />
          </div>
          <div className="mb-4">
            <button
              onClick={(e) => downloadHallTicket(e)}
              className="bg-indigo-500 px-3 py-2 text-white font-bold rounded-md"
            >
              Download
            </button>
          </div>
        </>
      ) : (
        <div className="my-4">
          <button
            onClick={() => handlePrint(hallTicketRef)}
            className="bg-indigo-500 px-3 py-2 text-white font-bold rounded-md"
          >
            Print
          </button>
        </div>
      )}

      {error && (
        <div className="text-red-500 mb-4">
          {/* Display error message here */}
        </div>
      )}
      {data && (
        <div>
          <section
            ref={hallTicketRef}
            style={{ border: "2px", borderColor: "#000", marginBottom: 100 }}
          >
            <div
              style={{
                width: 650,
                height: 900,
                marginRight: 10,
                marginTop: 10,
              }}
            >
              <div className="border border-gray-900">
                <div className=" border-b-2 border-gray-800 p-2 ">
                  <div className="flex flex-wrap ">
                    <div className="pr-4 pl-4 flex-1">
                      <img
                        src="/images/logo.png"
                        className="h-36 mx-auto"
                        alt=""
                      />
                      {/* <h5 className="text-center font-bold">
                        جامعة دار الهدى الاسلامية, كيرلا, الهند{" "}
                      </h5>
                      <h5 className="text-center font-bold text-xl uppercase">
                        Centre for Public Education and Training (CPET)
                      </h5> */}
                    </div>
                  </div>
                </div>
                <h5 className="text-center border-b p-2 border-gray-800">
                  CMS, MAHDIYYA ODD SEMESTER EXAMINATION, OCT 2023
                </h5>
                <div className="border-t mt-1 border-gray-800 p-3">
                  <h5 className="font-semibold text-center">HALL TICKET</h5>
                  <div className="flex justify-between">
                    {data?.data && (
                      <div className="border-[1px] w-full mr-3  border-gray-800 p-3">
                        <p>
                          Exam Reg. No:{" "}
                          <span className="text-black font-semibold">
                            {data?.data?.registerNo}
                          </span>
                        </p>
                        <p>
                          Name Of The Student:{" "}
                          <span className="text-black font-semibold">
                            {data?.data?.studentName}
                          </span>
                        </p>
                        <p className="text-[13px]">
                          Name of the Institution:{" "}
                          <span className="text-black font-semibold font-sans text-[11px]">
                            {data?.data?.branchName}
                          </span>
                        </p>
                      </div>
                    )}
                    <div className="w-24 h-24 border border-black">
                      <p className="text-[10px] leading-3 mt-5 text-gray-700 text-center">
                        Paste your passport size photo here
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" border border-gray-900 mb-2 m-4 p-4 text-center mt-2 ">
                  <div className="flex flex-wrap ">
                    <div className="w-full pr-4 pl-4">
                      <table className="w-full  mb-4 bg-transparent table-border border-gray-900">
                        <thead>
                          <tr className="border text-sm border-gray-900">
                            <th className=" border-r border-black">Date</th>
                            <th className=" border-r border-black">Subject</th>
                            <th className=" border-r border-black">Code</th>
                            <th className=" border-r border-black">Time</th>
                            <th className=" border-r border-black">
                              Sign of invigilator
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.subjects?.map((subject, key) => (
                            <tr key={key} className="border border-gray-900">
                              <td className="text-sm  border-r border-black ">
                                {moment(subject?.date).format("DD-MM-YYYY")}
                              </td>
                              <td className="text-sm  border-r border-black">
                                {subject?.subjectId?.subjectName}
                              </td>
                              <td className="text-sm  border-r border-black">
                                {subject?.subjectId?.subjectCode}
                              </td>
                              <td className="text-sm  border-r text-[12px] border-black">
                                {subject?.time}
                              </td>
                              <td className="text-sm  border-r border-black">
                                {"            "}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className=" border  border-gray-900 m-4 p-4  mt-2 mb-2">
                  <h5 className="text-center bg-gray-900 text-white rounded-[30px] font-bold uppercase mb-4">
                    Rules and Regulations
                  </h5>
                  <p className="text-black  text-[12px]">
                    1. Hall Ticket shall be produced in the examination hall
                    failing which the candidate will not be allowed to write the
                    exam.
                  </p>
                  <p className="text-black  text-[12px]">
                    2. All exams would be for 2 hours as mentioned in the Time
                    Table.
                  </p>
                  <p className="text-black  text-[12px]">
                    3. The candidate shall carry into the examination hall only
                    (I) Blue/ Black ball point pen (ii) Hall Ticket.
                  </p>
                  <p className="text-black  text-[12px]">
                    4. Carrying of Cell phones, bags, any other electronic
                    gadgets and loose of papers into the examination hall is
                    strictly prohibited.
                  </p>
                  <p className="text-black  text-[12px]">
                    5. The candidate shall produce the Hall Ticket at the
                    entrance of DHIU Exam of ice for any matter related with
                    this exam.
                  </p>
                  <p className="text-black  text-[12px]">
                    6. Follow all other rules of DHIU Examination Board which
                    will be announced on time.
                  </p>
                </div>

                <p className="text-center text-black p-3">
                  Hidaya Nagar, Chemmad, Tirurangadi P.O, Malappuram Dt.,
                  Kerala, PIN: 676306 Ph: +91 494-2463155, 2464502, Fax: +91
                  494-2460575, cpetdhiu.in
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default HallTicket;
