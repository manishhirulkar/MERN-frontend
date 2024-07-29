"use client";
// export const metadata = {
//   title: 'Sign In - Mosaic',
//   description: 'Page description',
// }

import Link from "next/link";
// import AuthHeader from "../auth-header";
// import AuthImage from "../auth-image";
import { RootState, store, useAppDispatch, useAppSelector } from "@/lib/store";
import { loginUserAsync } from "@/lib/features/auth/authSlice";

import { useEffect, useState } from "react";
import { error } from "console";
import Banner from "@/components_new/ui/banner/banner";
import InputField from "@/components_new/ui/input/input";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export default function SignIn() {
  // const data = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);
  const dispatch = useAppDispatch();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(event: any) {
    event.preventDefault();
    console.log(username, password);
    dispatch(loginUserAsync({ userName: username, password: password }));
  }

  useEffect(() => {
    if (user) {
      redirect("/employees");
    }
  }, [user]);

  console.log(Cookies.get("user"), "cookie data");
  console.log(error);

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            {/* <AuthHeader /> */}

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">
                Welcome back!
              </h1>
              <div className="space-y-3">
                {error && error["non_field_error"] && (
                  <Banner
                    key={error["non_field_error"]}
                    className="py-5"
                    type="error"
                  >
                    {error["non_field_error"]}
                  </Banner>
                )}
              </div>
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input w-full"
                      type="email"
                    />
                    {error && error["email"] && (
                        {error["email"]}
                    )}
                  </div> */}
                  <InputField
                    id="username"
                    label="Enter User Name"
                    type="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    error={error?.username || undefined}
                  />
                  <InputField
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={error?.password || undefined}
                  />
                  {/* <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input w-full"
                      type="password"
                      autoComplete="on"
                    />
                    {error && error["password"] && (
                      <Banner
                        key={error["password"]}
                        className="py-5"
                        type="error"
                      >
                        {error["password"]}
                      </Banner>
                    )}
                  </div> */}
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link
                      className="text-sm underline hover:no-underline"
                      href="/reset-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-3 disabled:opacity-75"
                  >
                    {!loading ? " Sign In " : "Loding..."}
                  </button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60">
                <div className="text-sm">
                  Don't you have an account?{" "}
                  <Link
                    className="font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
                    href="/signup"
                  >
                    Sign Up
                  </Link>
                </div>
                {/* Warning */}
                <div className="mt-5">
                  <div className="bg-yellow-500/20 text-yellow-700 px-3 py-2 rounded-lg">
                    <svg
                      className="inline w-3 h-3 shrink-0 fill-current mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    <span className="text-sm">
                      To support you during the pandemic super pro features are
                      free until March 31st.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <AuthImage /> */}
      </div>
    </main>
  );
}
