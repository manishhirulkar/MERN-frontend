"use client";
import { selectLoggedInUser, signOut } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function Logout() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(signOut());
    redirect("/signin");
  });

  // but useEffect runs after render, so we have to delay navigate part
  // return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
  return <div>logging you out</div>;
}

export default Logout;
