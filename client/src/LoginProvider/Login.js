import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { userContext } from "../App";
import axios from "axios";
import url from "../url";
import io from "socket.io-client";
import ENDPOINT from "../ENDPOINT";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logInRouteProvider } from "../routes/APIroute";

const Loginn = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const { dispatch } = useContext(userContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Enter all your information", toastOptions);
      return;
    }
    try {
      const { data } = await axios.post(logInRouteProvider, {
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
        return;
      } else {
        localStorage.setItem("id", data.id);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.fname);
        localStorage.setItem("onLine", 2);
        dispatch({ type: "online", payload: 2 });
        dispatch({ type: "provider", payload: data });
        messageUpdate(data.token, data.id);
      }
    } catch (e) {
      toast.error("Can't connect to server", toastOptions);
      return;
    }
  };

  const guest = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(logInRouteProvider, {
        email: "guest@gmail.com",
        password: "guest",
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
        return;
      } else {
        localStorage.setItem("id", data.id);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.fname);
        localStorage.setItem("onLine", 2);
        dispatch({ type: "online", payload: 2 });
        dispatch({ type: "provider", payload: data });
        messageUpdate(data.token, data.id);
      }
    } catch (e) {
      toast.error("Can't connect to server", toastOptions);
      return;
    }
  };

  const messageUpdate = async (token, id) => {
    try {
      const data = await axios.post(
        `${url}/api/provider/details`,
        {
          id: id,
        },
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "messageupdate", payload: data.data.message });
      const conn = io(ENDPOINT);
      dispatch({ type: "socket", payload: conn });
      conn.emit("setup", id);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full ">
        <div className="loginForm rounded-2xl flex flex-col  justify-items-center items-center w-full p-5">
          <div className="loginForm__title text-5xl font-medium">
            Professionals Login<span className=" text-sky-400">.</span>
          </div>

          <div className="loginForm__subtitle py-5 text-base">
            Don't have an account?
            <span className="ml-2 text-sky-400 font-medium">
              <Link to="/register">Register</Link>
            </span>
          </div>

          <div className="loginForm__form">
            <form method="POST" className=" flex flex-col justify-center">
              <div className="mb-3 w-80">
                <label className="block">
                  <span className="text-grey-700 text-lg">Email Address</span>
                  <input
                    type="email"
                    className="mt-1 p-2 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="jondoe@email.com"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>

              <div className="mb-3 w-80">
                <label className="block">
                  <span className="text-grey-700 text-lg">Password</span>
                  <div className=" flex ">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="mt-1 p-2 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {password && (
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="eye-icon -ml-6 mt-4"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    )}
                  </div>
                </label>
              </div>

              <div className="my-4">
                <input
                  className=" bg-sky-400 text-white py-3 w-24 rounded-full"
                  onClick={onSubmit}
                  type="submit"
                />
                <input
                  className=" bg-sky-400 text-white py-3 w-24 rounded-full ml-1 p-1"
                  onClick={guest}
                  type="submit"
                  value="LogIn Guest"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Loginn;
