"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("User signed up successfully", response);
      router.push("/login");
    } catch (error) {
      console.error("Sign Up failed:", error);
      toast.error("Sign Up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSignUp}>
            <div className="form-control">
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                className="input input-bordered"
                required
                value={user.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
                value={user.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
              <p className="text-center mt-2">
                Have an account? <Link href="/login">Login here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
