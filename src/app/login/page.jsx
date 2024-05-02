"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useAuth } from "@/authContext";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsLoggedIn(true);
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("User logged in successfully", response);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                type="text"
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <p className="text-center mt-2">
                Don't have an account? <Link href="/signup">Sign up here</Link>
              </p>
            </div>
          </form>
          {isLoggedIn && (
            <div className="toast">
              <div className="alert alert-info">
                <span>Logged In.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
