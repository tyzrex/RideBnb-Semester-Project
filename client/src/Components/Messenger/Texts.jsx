import React from "react";

const Texts = () => {
  return (
    <div>
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-col h-full w-full ">
          <div className="flex flex-row items-center py-4 px-6 rounded-2xl shadow">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
              T
            </div>
            <div className="flex flex-col ml-3">
              <div className="font-semibold text-sm">helo</div>
            </div>
          </div>
          <div className="h-[60vh] overflow-auto chatBox" ref={chatBox}>
            {messages.map((message) => (
              <div className="overflow-hidden ">
                <div className="h-full overflow-y-auto">
                  <div className="grid grid-cols-12 gap-y-2">
                    {message.sender_id === user.customer_id ? (
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {message.sender_name[0]}
                          </div>

                          <div className="flex-col flex justify-center items-end gap-1">
                            <div className="flex flex-col mr-5">
                              <div className="text-sm font-semibold">
                                {message.sender_name}
                              </div>
                            </div>

                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                              <div>{message.message_text}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {message.sender_name[0]}
                          </div>

                          <div className="flex-col flex justify-center items-start gap-1">
                            <div className="flex flex-col ml-5">
                              <div className="text-sm font-semibold">
                                {message.sender_name}
                              </div>
                            </div>

                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                              <div>{message.message_text}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-row items-center ">
            <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
              <div className="w-full">
                <input
                  type="text"
                  className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
                  placeholder="Type your message...."
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
              </div>
            </div>
            <div className="ml-6">
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 "
              >
                <svg
                  className="w-5 h-5 transform rotate-90 -mr-px"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Texts;
