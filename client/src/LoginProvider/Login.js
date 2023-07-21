import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { userContext } from "../App";
import axios from "axios";
import url from "../url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Loginn = () => {
  const { dispatch } = useContext(userContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const messageUpdate = async (token, id) => {
    try {
      const data = await axios.post(
        `${url}/api/provider/messageUpdate`,
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
      console.log(data);
      dispatch({ type: "messageUpdate", payload: data.data });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`${url}/api/provider/signin`, {
      email,
      password,
    });

    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    } else if (data.status === true) {
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(data.data)
      );
      dispatch({ type: "online", payload: 2 });
      dispatch({ type: "provider", payload: data });
      messageUpdate(data.token, data.id);
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
                        onClick={toggleShowPassword}
                      />
                    )}
                  </div>
                </label>
              </div>

              <div className="my-4">
                {
                  <input
                    className=" bg-sky-400 text-white py-3 w-24 rounded-full"
                    onClick={onSubmit}
                    type="submit"
                  />
                }
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
