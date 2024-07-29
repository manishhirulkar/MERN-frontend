"use client";
// export const metadata = {
//   title: "Sign Up - Mosaic",
//   description: "Page description",
// };

import Link from "next/link";
// import AuthHeader from "../auth-header";
// import AuthImage from "../auth-image";
import Banner from "@/components_new/ui/banner/banner";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import InputField from "@/components_new/ui/input/input";
import { useEffect, useState } from "react";
import { loginUserAsync, signUpUserAsync } from "@/lib/features/auth/authSlice";
import { redirect } from "next/navigation";

export default function SignUp() {
  const error = useAppSelector((state) => state.auth.error);
  const loading = useAppSelector((state) => state.auth.loading);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log(username, password);
    dispatch(
      signUpUserAsync({
        userName: username,
        password: password,
        name: name,
        email: email,
        confirmPassword: confirmPassword,
      })
    );
  }

  useEffect(() => {
    if (user) {
      redirect("/employees");
    }
  }, [user]);

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            {/* <AuthHeader /> */}

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">
                Create your Account
              </h1>
              {/* Form */}
              {error && error["non_field_error"] && (
                <Banner
                  key={error["non_field_error"]}
                  className="py-5"
                  type="error"
                >
                  {error["non_field_error"]}
                </Banner>
              )}
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <InputField
                    id="name"
                    label="Enter Name"
                    type="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    error={error?.name || undefined}
                  />
                  <InputField
                    id="username"
                    label="Enter User Name"
                    type="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    error={error?.username || undefined}
                  />
                  <InputField
                    id="email"
                    label="Enter Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error?.email || undefined}
                  />
                  <InputField
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={error?.password || undefined}
                  />
                  <InputField
                    id="confirmPassword"
                    label="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={error?.confirmPassword || undefined}
                  />
                </div>
                <div className="flex items-center justify-between mt-6">
                  {/* <div className="mr-1"></div> */}
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
                    {!loading ? " Sign Up " : "Loding..."}
                  </button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60">
                <div className="text-sm">
                  Have an account?{" "}
                  <Link
                    className="font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
                    href="/signin"
                  >
                    Sign In
                  </Link>
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
