import React from "react";
import axios from "axios";

import { useRouter } from "next/navigation";

export const logout = async () => {
  try {
    await axios.get("/api/users/logout");
    alert("Logged Out");
  } catch (error) {
    console.log(error.message);
  }
};
