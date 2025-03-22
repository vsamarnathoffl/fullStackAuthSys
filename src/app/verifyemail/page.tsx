"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isDisabled,setIsDisabled]= useState(false);
  
  useEffect(()=>{
    if(token.trim()!==""&&token.length>0){
        setIsDisabled(false);
    }else{
        setIsDisabled(true);
    }
  },[token])

  const onVerify = async()=>{
    try{
        const response:any= await axios.post("/api/users/verifyEmail",{token});
        console.log(response);
        if(response.data.success){
            toast.success("Email is verified successfully!");
            router.push("/login");
        }else if(response.status===202){
            setToken("");
            toast.error(response.data.message,{duration:30000});
        }
    }catch(error:any){
        console.log(error);
        if(error.response.status===400)
        toast.error("Invalid token. Please enter a valid token.", {
          duration: 30000,
        });
        if(error.response.status===500)
        toast.error("Something went wrong, Try again.");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-3 p-6 ">
        <h2 className="text-2xl font-bold text-center mb-4">
          Verify Your Email
        </h2>
        <label htmlFor="verify" className="">
          Please paste the exact text content that was sent to your email here
        </label>
        <input
          type="text"
          id="verify"
          value={token}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="off"
          onChange={(e)=>{setToken(e.target.value)}}
        />
        <button className={`p-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${isDisabled?"cursor-not-allowed":"cursor-pointer"}`}
        disabled = {isDisabled}
        onClick={onVerify}>
          Verify
        </button>
      </div>
    </div>
  );
}
