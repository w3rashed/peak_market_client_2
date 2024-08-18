import { useContext, useState } from "react";
import {
  FaGithubSquare,
  FaGoogle,
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  const { signInUser, googleLogin, githubLogin, setLoad } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    // reset error message
    setError("");

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    console.log(email, password);

    // sign in email and password
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        setLoad(true);
        navigate(from, { replace: true });
        toast.success("Successfully signed in", {
          position: "top-center",
        });
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setError(error.message.split(":")[1]);
        toast.error(`Email or password is not valid`, {
          position: "top-center",
        });
      });
  };

  // handle google log in
  const handleGoogleLogin = () => {
    googleLogin().then(() => {
      toast.success("successfully google signed in", {
        position: "top-center",
      });
      navigate(from, { replace: true });
    });
  };

  // handle Github log in
  const handleGithubLogin = () => {
    githubLogin().then(() => {
      navigate(from, { replace: true });
      toast.success("successfully Github signed in", {
        position: "top-center",
      });
    });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row w-3/4 mx-auto my-8 container">
      <Helmet>
        <title>Login-Discover Haven</title>
      </Helmet>
      <div
        className="hero min-h-screen rounded-xl"
        style={{
          backgroundImage: "url(https://i.ibb.co/J3pLkNr/image.png)",
        }}
      >
        <div className="hero-overlay bg-opacity-60 rounded-xl"></div>
        <div className="hero-content ">
          <div className="max-w-md">
            <div className="card-body bg-white bg-opacity-60 rounded-xl my-10">
              <div>
                <h3 className="text-[#006c70] text-lg font-semibold fon">
                  Login
                </h3>
                <button onClick={handleGoogleLogin} className="btn w-full mt-4">
                  <FaGoogle></FaGoogle>
                  Login With Google
                </button>
                <button onClick={handleGithubLogin} className="btn w-full my-4">
                  <FaGithubSquare></FaGithubSquare>
                  Login With Git hub
                </button>
                <div className="border-b my-4"></div>
              </div>
              <form onSubmit={handleLogin} className="">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="flex items-center justify-end">
                  <div className="form-control w-full relative">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      className="input input-bordered"
                      required
                    />
                    <label className="label">
                      <a href="#" className="label-text-alt link link-hover">
                        Forgot password?
                      </a>
                    </label>
                  </div>
                  <p
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute  hover:cursor-pointer mr-3"
                  >
                    {showPassword ? (
                      <FaRegEye></FaRegEye>
                    ) : (
                      <FaRegEyeSlash></FaRegEyeSlash>
                    )}
                  </p>
                </div>
                <p className="text-[#cf2e2e]">{error}</p>

                <div className="form-control mt-6">
                  <button
                    className="py-3 rounded-lg bg-[#ff5a5f] text-white hover:bg-transparent hover:text-[#ff5a5f]
           hover:border-2 hover:border-[#ff5a5f] duration-300"
                  >
                    Login
                  </button>
                </div>
                <div>
                  <p className="text-center mt-4">
                    Dont you have an account?{" "}
                    <Link
                      to="/register"
                      // state={{ from: location.state.from }}
                      replace
                      className="text-[#cf2e2e] font-semibold hover:border-b-2 border-[#ff5a5f] duration-100"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
