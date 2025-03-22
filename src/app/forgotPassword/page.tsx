"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [loading,setLoading] = useState(false);  
  const [nextVerify,setNextVerify] = useState(false);
  const [sendButton,setSendButton] = useState(false);
  const [email, setEmail] = useState("");
  const [verify, setVerify] = useState(false);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState(false);
  const router = useRouter();
  const [verifyButtonDisabled, setVerifyButtonDisabled] = useState(false);
  useEffect(() => {
    if (token.length > 0 && token.trim() !== "") {
      setVerifyButtonDisabled(false);
    } else {
      setVerifyButtonDisabled(true);
    }
  }, [token]);

  useEffect(() => {
    if (
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      password === confirmPassword
    ) {
      setMatchPassword(true);
    } else {
      setMatchPassword(false);
    }
  }, [confirmPassword]);

  useEffect(()=>{
    if(email.trim()!==""&& email.length>0){
        setSendButton(true);
    }else{
        setSendButton(false);
    }
  },[email])

  const onVerify = async () => {
    try {
      setLoading(true);
      setToken(token.trim());
      await axios.post("/api/users/forgotPassword", { token });
      toast.success("Token is verified, Now you can change password");
      setVerify(true);
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.error("Invalid Token");
      } else {
        toast.error("Something went wrong");
      }
    }finally{
        setLoading(false);
    }
  };

  const onSendEmail = async() =>{
    try{
        setLoading(true);
        await axios.post("api/users/emailPasswordToken",{email})
        toast.success("Token is sent to mail, check it.")
        setNextVerify(true);
    }catch(error:any){
        if(error.response.status===400){
            toast.error("Email is incorrect");
        }else{
            toast.error("Server Error");
        }
    }finally{
        setLoading(false);
    }
  }

  const onReset = async () => {
    try {
        setLoading(true);
      setPassword(password.trim());
      setConfirmPassword(password.trim());
      if (password === confirmPassword) {
        await axios.post("/api/users/updatePassword", { email,password });
        toast.success("Password is updated successfully");
        router.push("/login");
      } else {
        toast.error("Password and Confirm Password are mismatched");
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col gap-3">
        <h2 className="text-center text-2xl font-bold">
          {loading ? "Processing" : "Reset Your Password"}
        </h2>
        <div className={`${verify ? "hidden" : "flex flex-col gap-3"}`}>
          <div className="grid grid-cols-[5fr_1fr] gap-2">
            <label htmlFor="email" className="col-span-2 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button
              className={`p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${
                sendButton ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              disabled={!sendButton}
              onClick={onSendEmail}
            >
              send
            </button>
          </div>

          <label htmlFor="verify" className="text-sm">
            Please paste the exact text content that was sent to your email here
          </label>
          <input
            type="text"
            id="verify"
            className={`p-2 border border-gray-300 rounded-md ${
              nextVerify ? "cursor-text" : "cursor-not-allowed"
            }`}
            placeholder={`${
              !nextVerify
                ? "Enter your email above to receive the token via mail."
                : "Token received via email. Please enter it."
            }`}
            onChange={(e) => {
              setToken(e.target.value);
            }}
            autoComplete="off"
            readOnly={!nextVerify}
          />
          <button
            className={`bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition ${
              verifyButtonDisabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={onVerify}
          >
            {verify ? "Verified" : "Verify"}
          </button>
        </div>
        <p>
          {verify ? "Your token is verified. Please reset your password." : ""}
        </p>
        <div className="flex flex-col gap-3 mt-4">
          <label htmlFor="security" className="text-sm">
            Password
          </label>
          <input
            type="password"
            id="security"
            placeholder={
              !verify
                ? "Get verified to change password"
                : "Enter the confirm password"
            }
            className={`p-2 border border-gray-300 rounded-md ${
              verify ? "cursor-text" : "cursor-not-allowed"
            }`}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            readOnly={!verify}
          />
          <label htmlFor="confirm" className="text-sm">
            Confirm Password 
            {verify && confirmPassword.trim() !== ""
              ? matchPassword
                ? " ( Matched )"
                : " ( Not Matched )"
              : ""}
            
          </label>
          <input
            type="password"
            id="confirm"
            placeholder={
              !verify
                ? "Get verified to change password"
                : "Enter the confirm password"
            }
            className={`p-2 border border-gray-300 rounded-md ${
              verify ? "cursor-text" : "cursor-not-allowed"
            }`}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            readOnly={!verify}
          />
          <button
            className={`bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition  ${
              matchPassword ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            disabled={!matchPassword}
            onClick={onReset}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
