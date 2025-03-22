"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Unsuccessful logout");
    }
  };
  const dataFromUser = async () => {
    try {
      const response:any = await axios.get("/api/users/me");
      const {username,email} = response.data.user;
      setUser({ ...user, username,email });
    } catch (error) {
      console.log(error);
    }
   };
  dataFromUser();
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-2 text-center">
        <p className="text-3xl">Profile</p>
        <p className="text-3xl">Username:{user.username}</p>
        <p className="text-3xl">Email:{user.email}</p>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
