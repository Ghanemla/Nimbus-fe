import { useEffect, useState } from "react";

export default function Chat() {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:9000");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
  }, []);

  function showOnlinePeople(peopleArray) {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  }
  function handleMessage(e) {
    const messageData = JSON.parse(e.data);

    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    }
  }
  return (
    <div className="flex h-screen">
      <div className="bg-cyan-100 w-1/3 pl-4 pt-4">
        <div className="text-sky-500 font-bold flex gap-2 ">
          <div>
            {" "}
            <img src="/logo.png" alt="logo" className="mx-auto h-12 w-12" />
          </div>
          <div className="items-center flex">
            <p>Nimbus</p>
          </div>
        </div>

        {Object.keys(onlinePeople).map((userId) => (
          <div key={userId} className="border-b border-gray-200 py-2">
            <div className="w-4 h-4 bg-red-300"></div>
            {onlinePeople[userId]}
          </div>
        ))}
      </div>
      <div className="flex flex-col bg-sky-300 w-2/3 p-2">
        <div className="flex-grow"> messages with person</div>
        <div className="flex gap-2 ">
          <input
            className="bg-white border p-2 rounded-xl flex-grow"
            type="text"
            placeholder="Type a message.."
          />
          <button className="bg-sky-500 p-2 text-white rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
