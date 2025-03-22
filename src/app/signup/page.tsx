"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      if(!user.email.includes('@') || !user.email.includes('.')){
        setButtonDisabled(true);
        toast.error("Email must include '@' and '.'");
        return;
      }
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Successfully SignedUp",{duration:1000});
      // setTimeout(() => router.push("/login"), 1000);
      setTimeout(() => {
        console.log("Redirecting to /verifyemail...");
        router.push("/verifyemail");
      }, 1000);

    } catch (error: any) {
      if(error.response.status===409){
        toast.error("User Already Exists",{duration:2000});
      }else{
        toast.error("Something went wrong with server",{duration:2000});
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-2 w-80">
        <h2 className="text-center text-2xl font-bold mb-4">
          {loading ? "Processing" : "Signup"}
        </h2>

        <label htmlFor="username" className="font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          autoComplete="off"
          onChange={(e) => {
            setUser((prev) => ({ ...prev, username: e.target.value }));
          }}
        />

        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          autoComplete="off"
          onChange={(e) => {
            setUser((prev) => ({ ...prev, email: e.target.value }));
          }}
        />

        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          autoComplete="off"
          onChange={(e) => {
            setUser((prev) => ({ ...prev, password: e.target.value }));
          }}
        />

        <button
          className={`mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${buttonDisabled?"cursor-not-allowed":"cursor-pointer"}`}
          onClick={onSignup}
          disabled = {buttonDisabled}
        >Sign Up
        </button>

        <Link
          href="/login"
          className="text-center text-blue-500 mt-2 hover:underline"
        >
          Visit Login Page
        </Link>
      </div>
    </div>
  );
}
