"use client";
import Link from "next/link";
import React,{useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password:""
    })

    const[loading,setLoading] = useState(false);
    const[buttonDisabled,setButtonDisabled] = useState(false);

    const onLogin = async()=>{
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log(response);
        toast.success("LoggedIn Successfully",{duration:500});
        setTimeout(()=>{router.push("/profile")},500)
      } catch (error: any) {
        if(error.response.status===404){
          toast.error(error.response.data.error)
        }else if(error.response.status===401){
          toast.error(error.response.data.error)
        }else if(error.response.status===400){
          toast.error(error.response.data.error);
          router.push("/verifyemail")
        }else{
          toast.error(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    }

    useEffect(()=>{
      if(user.email.length>0 && user.password.length>0){
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true);
      }
    },[user])
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col gap-2 w-80 ">
          <h2 className="text-center text-2xl font-bold mb-4">
            {loading ? "Processing" : "Log In"}
          </h2>

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
          <Link href="/forgotPassword" className="underline text-blue-400">
            Forgot Password?
          </Link>

          <button
            className={`mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${
              buttonDisabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={buttonDisabled}
            onClick={onLogin}
          >
            Login
          </button>

          <Link
            href="/signup"
            className="text-center text-blue-500 mt-2 hover:underline"
          >
            Visit Signup Page
          </Link>
        </div>
      </div>
    );
}