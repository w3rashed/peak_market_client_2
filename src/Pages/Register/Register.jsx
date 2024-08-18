import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { FaGithubSquare, FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const Register = () => {
  const { googleLogin, githubLogin, createUser, updateUser, setLoad } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [confShowPassword, setConfShowPassword] = useState(false);
  const [regError, setRegError] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleReg = (e) => {
    const { name, photo, email, password } = e;

    // reset error message
    setRegError("");

    // create a new user
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        setLoad(true);
        // update profile
        updateUser(name, photo);
        toast.success("successfully Registered ", {
          position: "top-center",
        });
        navigate(from, { replace: true });
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setRegError(error.message);
        setLoad(false);
        // toast.error("This email already used ", {
        //   position: "top-center",
        // });
      });
  };

  // handle google log in
  const handleGoogleLogin = () => {
    googleLogin().then(() => {
      toast.success("successfully Google Registered ", {
        position: "top-center",
      });
      navigate(from, { replace: true });
    });
  };

  // handle Github reg
  const handleGithubLogin = () => {
    githubLogin().then(() => {
      navigate(from, { replace: true });
      toast.success("successfully Github signed in", {
        position: "top-center",
      });
    });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row w-3/4 mx-auto my-8 gap-6">
      <Helmet>
        <title>Register-Discover Haven</title>
      </Helmet>

      <div
        className="hero min-h-screen rounded-xl"
        style={{
          backgroundImage: "url(https://i.ibb.co/n8rx37J/image.png)",
        }}
      >
        <div className="hero-overlay bg-opacity-60 rounded-xl"></div>
        <div className=" text-white bg-white bg-opacity-50 rounded-xl p-10 my-10">
          {/* reg form */}
          <div className=" basis-[50%]">
            <div>
              <h3 className="text-[#006c70] text-lg font-semibold">Register</h3>
              {/* <Link state={{ from: location?.state?.from }} replace>
          </Link> */}
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
            <form onSubmit={handleSubmit(handleReg)} className="">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Name</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <p className="py-2 text-red-600">
                    Please enter your full name
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  {...register("photo")}
                  type="text"
                  placeholder="Enter your Photo URL"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* pass */}
              <div className="flex items-center justify-end ">
                <div className="form-control relative w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    {...register("password", {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="input input-bordered"
                  />
                </div>
                <p
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute  hover:cursor-pointer mr-3 mt-8"
                >
                  {showPassword ? (
                    <FaRegEye></FaRegEye>
                  ) : (
                    <FaRegEyeSlash></FaRegEyeSlash>
                  )}
                </p>
              </div>
              {errors?.password?.type === "pattern" && (
                <p className="py-2 text-red-600 ">
                  Requires at least one uppercase letter, at least one lowercase
                  letter,at least one digit , at least one special character
                  among @, $, !, %, *, ? , minimum length of 6 characters
                </p>
              )}
              {/* confirm pass */}
              <div className="flex items-center justify-end">
                <div className="form-control relative w-full">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    {...register("confirmPassword", {
                      validate: (data) => {
                        if (watch("password") !== data) {
                          return "password not match";
                        }
                      },
                    })}
                    type={confShowPassword ? "text" : "password"}
                    placeholder="Enter your confirm password"
                    className="input input-bordered"
                  />
                </div>
                <p
                  onClick={() => setConfShowPassword(!confShowPassword)}
                  className="absolute  hover:cursor-pointer mr-3 mt-8"
                >
                  {confShowPassword ? (
                    <FaRegEye></FaRegEye>
                  ) : (
                    <FaRegEyeSlash></FaRegEyeSlash>
                  )}
                </p>
              </div>
              <p className="py-2 text-red-600">
                {errors.confirmPassword?.message}
              </p>

              {regError && (
                <p className=" text-red-600">{regError.split(":")[1]}</p>
              )}
              <div className="form-control mt-6">
                <button
                  className="py-3 rounded-lg bg-[#ff5a5f] text-white hover:bg-transparent hover:text-[#ff5a5f]
           hover:border-2 hover:border-[#ff5a5f] duration-300"
                >
                  Register
                </button>
              </div>
              <div>
                <p className="text-center mt-4">
                  Already have an account{" "}
                  <Link
                    to="/login"
                    // state={{ from: location.state.from }}
                    replace
                    className="text-[#cf2e2e] font-semibold hover:border-b-2 border-[#ff5a5f] duration-100"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
