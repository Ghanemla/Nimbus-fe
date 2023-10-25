import { useState } from "react";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-sky-100 h-screen items-center flex">
      <form className="w-64 mx-auto mb-12">
        <div className="text-blue-600 font-bold flex gap-2 p-4">
          <div>
            {" "}
            <img src="/logo.png" alt="logo" className="mx-auto h-12 w-12" />
          </div>
          <div className="items-center flex">
            <p>Nimbus</p>
          </div>
        </div>
        <hr class="h-px mb-2  bg-sky-500 border-0" />
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
