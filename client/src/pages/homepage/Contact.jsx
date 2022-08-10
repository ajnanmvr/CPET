import React from "react";

function Contact() {
  return (
    <section id="contact" className="h-screen mt-4">
      <h1 className="text-center font-bold text-5xl  uppercase">contact us</h1>
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <form action className="my-10">
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email address</p>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
              />
            </label>
            <label htmlFor="password">
              <p className="font-medium text-slate-700 pb-2">Name</p>
              <input
                name="username"
                type="text"
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter your name here"
              />
            </label>
            <label htmlFor="password">
              <p className="font-medium text-slate-700 pb-2">Message</p>
              <textarea
                name="message"
                type="text"
                className="w-full py-3 min-h-[100px] border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="type your message here"
              />
            </label>

            <button className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
              <span>send</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
