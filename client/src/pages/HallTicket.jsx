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
    <div>
      <section
        ref={hallTicketRef}
        style={{ border: "2px", borderColor: "#000", marginBottom: 100 }}
      >
        <div
          style={{ width: 650, height: 900, marginRight: 10, marginTop: 100 }}
        >
          <div className="border border-gray-900">
            <div className=" p-4">
              <div className="flex ">
                <div className="pr-4 pl-4">
                  <h5 className="uppercase">{data?._doc?.exam?.examName}</h5>

                  <p>{data?._doc?.exam?.academicYear}</p>
                </div>

                <div></div>
              </div>
            </div>
            <div className=" border m-4 border-gray-900 p-4 ">
              <div className="flex flex-wrap ">
                <div className="pr-4 pl-4 flex-1">
                  <h5 className="text-center">Hall Ticket</h5>
                </div>
              </div>
            </div>
            <div className=" border border-gray-900 m-4 p-4">
              <div className="flex flex-wrap ">
                <div className="sm:w-4/5 pr-4 pl-4">
                  <table className="w-full max-w-full mb-4">
                    <tbody>
                      <tr>
                        <td>ENROLLMENT NO : {data?.data?.registerNo}</td>
                      </tr>
                      <tr>
                        <td>Student Name: {data?.data?.studentName}</td>
                      </tr>
                      <tr>
                        <td>Class: {data?.data?.class?.className}</td>
                      </tr>
                      <tr>
                        <td>Institution: {data?.data?.branch?.branchName}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
                          <td>{key+1}</td>
                          <td>{subject?.subjectId?.subjectName}</td>
                          <td>{moment(subject?.date).format('DD-MM-YYYY')}</td>
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
