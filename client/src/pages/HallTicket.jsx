import React from "react";

function HallTicket() {
  return (
    <div>
      <section class="container">
        <div class="bg-white rounded p-6">
          <div class="flex">
            <div class="w-1/3 p-3">
              <h5 class="text-lg font-medium">MEWAR UNIVERSITY</h5>
              <p class="text-sm">
                NH - 79 Gangrar Chittorgarh - 312901 <br /> RAJASTHAN, INDIA
              </p>
            </div>
            <div class="w-1/3 p-3 text-center">
              <img
                src="http://peoplehelp.in/mewaruni/assets/images/mewaruniversity.jpg"
                width="100px;"
              />
            </div>
            <div class="w-1/3 p-3 text-right">
              <h5 class="text-lg font-medium">Admit Card</h5>
              <p class="text-sm">B.Tech - 2019</p>
            </div>
          </div>
          <div class="border border-black p-3 mt-6">
            <h5 class="text-lg font-medium">Enrollment No : 9910101</h5>
          </div>
          <div class="border border-black p-3 mt-6">
            <table class="w-full">
              <tbody>
                <tr class="border border-black">
                  <td class="p-3">
                    <b>ENROLLMENT NO : 9910101</b>
                  </td>
                  <td class="p-3">
                    <b>Course: </b> B.TECH
                  </td>
                </tr>
                <tr class="border border-black">
                  <td class="p-3">
                    <b>Student Name: </b>Vinod Sharma
                  </td>
                  <td class="p-3">
                    <b>Sex: </b>M
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HallTicket;
