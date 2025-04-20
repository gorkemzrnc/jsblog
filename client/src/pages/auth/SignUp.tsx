import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../../lib/api";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[] | undefined>();
  const redirectUrl = location.state?.redirectUrl || "/";

  const signInHandler = async () => {
    setIsPending(true);
    setIsError(false);
    try {
      await register({ email, password, username });
      navigate(redirectUrl, { replace: true });
    } catch (error: any) {
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
                <Link to="/login" className="text-blue-700 underline">Sign In</Link>
              </div>
            </div>
            <div className="w-full px-4 py-3">
              <a
                href="http://localhost:8000/auth/google"
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#dce0e5] bg-white px-4 py-3 text-sm font-medium text-[#111418] transition-colors hover:bg-[#f8f9fa]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </a>
            </div>

            <div className="flex justify-center mx-auto w-full">
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
