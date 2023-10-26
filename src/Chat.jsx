import { useEffect, useState, useContext } from "react";
import Avatar from "./Avatar";
import Logo from "./Logo";
import { UserContext } from "./UserContext";
import { uniqBy } from "lodash";

export default function Chat() {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessageText, setNewMessageText] = useState(null);
  const [messages, setMessages] = useState([]);
  const { username, id } = useContext(UserContext);
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
    console.log(e, messageData);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      setMessages((prev) => [...prev, { isOur: false, ...messageData }]);
    }
  }

  function sendMessage(e) {
    e.preventDefault();

    ws.send(
      JSON.stringify({
        recipient: selectedUserId,
        text: newMessageText,
      })
    );
    setNewMessageText("");
    setMessages((prev) => [
      ...prev,
      {
        text: newMessageText,
        sender: id,
        recipient: selectedUserId,
        id: Date.now(),
      },
    ]);
  }

  const onlinePeopleExclOurUser = { ...onlinePeople };
  delete onlinePeopleExclOurUser[id];

  const messagesWithoutDupes = uniqBy(messages, "id");

  return (
    <div className="flex h-screen">
      <div className="bg-cyan-100 w-1/3 ">
        <Logo />
        {Object.keys(onlinePeopleExclOurUser).map((userId) => (
          <div
            onClick={() => setSelectedUserId(userId)}
            key={userId}
            className={
              "border-b border-gray-200 flex items-center gap-2 cursor-pointer " +
              (userId === selectedUserId ? "bg-sky-200" : "")
            }
          >
            {userId === selectedUserId && (
              <div className="w-1  bg-sky-500 h-12 rounded-r-md"></div>
            )}
            <div className="flex gap-2 py-2 pl-4 items-center">
              <Avatar username={onlinePeople[userId]} userId={userId} />
              <span className="text-gray-800">{onlinePeople[userId]}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col bg-sky-300 w-2/3 p-2">
        <div className="flex-grow">
          {!selectedUserId && (
            <div className="h-full flex items-center justify-center">
              <div className="text-zinc-500 font-bold text-xl">
                {" "}
                &larr;Select a conversation to the left{" "}
              </div>
            </div>
          )}
          {!!selectedUserId && (
            <div className="overflow-y-scroll">
              {messagesWithoutDupes.map((message) => (
                <div
                  key={message._id}
                  className={message.sender === id ? "text-right" : "text-left"}
                >
                  <div
                    className={
                      " text-left inline-block p-2 my-2 rounded-md text-sm " +
                      (message.sender === id
                        ? "bg-cyan-500"
                        : "bg-white text-zinc-800")
                    }
                  >
                    sender: {message.sender}
                    <br />
                    my id: {id}
                    <br />
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {!!selectedUserId && (
          <form onSubmit={sendMessage} className="flex gap-2 ">
            <input
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              className="bg-white border p-2 rounded-xl flex-grow"
              type="text"
              placeholder="Type a message.."
            />
            <button
              type="submit"
              className="bg-sky-500 p-2 text-white rounded-xl"
            >
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
          </form>
        )}
      </div>
    </div>
  );
}
