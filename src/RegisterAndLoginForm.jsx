import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState("");
  2;
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");

  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const url = isLoginOrRegister === "register" ? "/register" : "/login";
    const { data } = await axios.post(url, { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  }
  return (
    <div className="bg-sky-100 h-screen items-center flex">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <div className="text-blue-600 font-bold flex gap-2 p-4">
          <div>
            {" "}
            <img src="/logo.png" alt="logo" className="mx-auto h-12 w-12" />
          </div>
          <div className="items-center flex">
            <p>Nimbus</p>
          </div>
        </div>
        <hr className="h-px mb-2  bg-sky-500 border-0" />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button className="bg-sky-500 text-white block w-full rounded-sm p-2 hover:bg-sky-400">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>

        {isLoginOrRegister === "register" && (
          <div className="text-center mt-2">
            Already got an Account{" "}
            <button onClick={() => setIsLoginOrRegister("login")}>
              {" "}
              Login here
            </button>
          </div>
        )}
        {isLoginOrRegister === "login" && (
          <div className="text-center mt-2">
            New to Nimbus?{" "}
            <button onClick={() => setIsLoginOrRegister("register")}>
              {" "}
              Register here
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
