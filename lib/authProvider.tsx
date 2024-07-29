"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { store } from "./store";
import { setUser } from "./features/auth/authSlice"; // Import your Redux action

export function AuthProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route path

  useEffect(() => {
    const userCookie = Cookies.get("user");

    // List of routes where redirection should be skipped
    const authExcludedRoutes = ["/signin", "/signup"];

    if (userCookie) {
      // Parse the user cookie and dispatch it to Redux
      const user = JSON.parse(userCookie);
      store.dispatch(setUser(user)); // Adjust this to your actual action

      // Redirect to home or another authenticated route if on excluded route
      if (authExcludedRoutes.includes(pathname)) {
        router.push("/");
      }
    } else {
      // Redirect to login if no user is found and current route is not excluded
      if (!authExcludedRoutes.includes(pathname)) {
        router.push("/signin");
      }
    }
  }, [router, pathname]);

  return <Provider store={store}>{children}</Provider>;
}

export default AuthProviders;
