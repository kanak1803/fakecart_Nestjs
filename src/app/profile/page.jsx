"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/users/profile");
      console.log(response.data);
      setUserData(response.data._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  //logout logic i had moved it to helper file
  // const logout = async () => {
  //   try {
  //     await axios.get("/api/users/logout");
  //     alert("Logged Out");
  //     router.push("/login");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  return <div>profile page</div>;
};

export default Profile;
