import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../lib/api";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const redirectUrl = location.state?.redirectUrl || "/";

  const signInHandler = async () => {
    setIsPending(true);
    setIsError(false);
    try {
      await register({ email, password, username });
      navigate(redirectUrl, { replace: true });
    } catch (error) {
      setIsError(true);
      setErrorMessage([error.message, error.details]);
      console.error("Sign in failed:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: "Work Sans, Noto Sans, sans-serif" }}>
      <div className="layout-container w-full min-w-[440px] sm:w-4/5 md:w-[60%] lg:w-[600px] h-full flex flex-col justify-center mx-auto">
        <header className="flex items-center whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3 w-full">
          <div className="flex items-center gap-4 text-[#111418]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              </svg>
            </div>
            <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">GJS</h2>
          </div>
        </header>
        <div className="px-5 sm:px-10 flex flex-1 justify-center py-5 w-full">
          <div className="layout-content-container flex flex-col w-full py-5 flex-1">
            <h3 className="text-[#111418] tracking-light text-2xl font-bold leading-tight px-4 text-center pb-2 pt-5">Welcome Back</h3>
            <p className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">Please enter your email and password to continue</p>
            <div className="flex w-full flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#111418] text-base font-medium leading-normal pb-2">Email</p>
                <input
                  placeholder="Email"
                  className="form-input flex w-full flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="flex w-full flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#111418] text-base font-medium leading-normal pb-2">Username</p>
                <input
                  placeholder="Username"
                  className="form-input flex w-full flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#111418] text-base font-medium leading-normal pb-2">Password</p>
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="flex justify-between px-4 text-sm text-center items-center">
              <div className="flex gap-1">
                <span className="text-slate-600">Already have an account?</span>
                <Link to="/signup" className="text-blue-700 underline">Sign In</Link>
              </div>
            </div>

            <div className="flex justify-center mx-auto w-full px-4 py-3">
              <button
                disabled={isPending}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                onClick={signInHandler}
              >
                <span className="truncate">{isPending ? "Signing In..." : "Sign In"}</span>
              </button>
            </div>
            {isError && <p className="text-red-500 text-center mt-2">Sign up failed. Please try again.</p>}
            {isError && errorMessage?.map((i)=><p className="text-red-500 text-center mt-2">{i}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
