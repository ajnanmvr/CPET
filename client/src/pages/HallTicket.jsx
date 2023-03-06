import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import Axios from "../Axios";
import { useReactToPrint } from "react-to-print";
import moment from "moment/moment";

function HallTicket() {
  const [registerNo, setRegisterNo] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  console.log(data);
  const hallTicketRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => hallTicketRef.current,
  });
  const downloadHallTicket = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.post("/hall-ticket/download", { registerNo });
      setData(res.data);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      console.log(error.response);
    }
  };
  return (
    <div className="flex-1 items-center">
      <section
        ref={hallTicketRef}
        style={{ border: "2px", borderColor: "#000", marginBottom: 100 }}
      >
        <div
          style={{ width: 650, height: 900, marginRight: 10, marginTop: 10 }}
        >
          <div className="border border-gray-900">
            <div className=" border-b-2 border-gray-800 p-2 ">
              <div className="flex flex-wrap ">
                <div className="pr-4 pl-4 flex-1">
                  <h5 className="text-center font-bold">
                    جامعة دار الهدى الاسلامية, كيرلا, الهند{" "}
                  </h5>
                  <h5 className="text-center font-bold text-xl">
                    Centre for Public Education and Training (CPET)
                  </h5>
                  <p className="text-center">
                    Hidaya Nagar, Chemmad, Tirurangadi P.O, Malappuram Dt.,
                    Kerala, PIN: 676306 Ph: +91 494-2463155, 2464502, Fax: +91
                    494-2460575, cpet.dhiu.in
                  </p>
                </div>
              </div>
            </div>
            <h5 className="text-center border-b p-2 border-gray-800">
              DEGREE FOURTH SEMESTER EXAMINATION - MARCH 2023
            </h5>
            <div className="border-t mt-1 border-gray-800 p-3">
              <h5 className="font-semibold text-center">HALL TICKET</h5>
              <div className="border-[1px] border-gray-800 p-3">
                <p>
                  Exam Reg. No:{" "}
                  <span className="text-black font-semibold">210982</span>
                </p>
                <p>
                  Name Of The Student:{" "}
                  <span className="text-black font-semibold">210982</span>
                </p>
                <p>
                  Name of the Institution:{" "}
                  <span className="text-black font-semibold">210982</span>
                </p>
                <p>
                  Exam Reg. No:
                  <span className="text-black font-semibold">210982</span>
                </p>
              </div>
            </div>

            <div className=" border border-gray-900 mb-[100px] m-4 p-4 text-center mt-[100px] ">
              <div className="flex flex-wrap ">
                <div className="w-full pr-4 pl-4">
                  <table className="w-full  mb-4 bg-transparent table-border border-gray-900">
                    <thead>
                      <tr className="border border-gray-900">
                        <th>Sr. No.</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?._doc?.subjects?.map((subject, key) => (
                        <tr className="border border-gray-900">
                          <td>{key + 1}</td>
                          <td>{subject?.subjectId?.subjectName}</td>
                          <td>{moment(subject?.date).format("DD-MM-YYYY")}</td>
                          <td>{subject?.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="BoxE border border-gray-900 p-4 text-center">
            <div className="flex flex-wrap ">
              <div className="sm:w-full pr-4 pl-4">
                <h5>Centre for Public Education and Training (CPET)</h5>
                <p>
                  Darul Huda Islamic University, Hidaya Nagar, Chemmad,
                  Tirurangadi PO, Chemmad, Kerala 676306
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <p
        onClick={() => handlePrint(hallTicketRef)}
        className="text-center hover:cursor-pointer text-indigo-700 font-bold"
      >
        print
      </p>
      <div className="lg:flex items-center pl-3">
        <input
          type="text"
          onChange={(e) => setRegisterNo(e.target.value)}
          className="block w-full rounded-md border border-gray-900gp-4-300 pl-7 pr-12 focus:border border-gray-900ip-4-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Type your register number"
          value={registerNo}
        />
        <button
          onClick={(e) => downloadHallTicket(e)}
          className="bg-indigo-500 px-3 py-2 ml-2 text-white font-bold rounded-md"
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default HallTicket;
