import React, { useState, useContext } from "react";
import { userSignup, login as apiLogin } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthTabs(){
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  // login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // signup state
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suMsg, setSuMsg] = useState("");

  const doLogin = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await apiLogin(email, password);
      login({ token: res.token, roles: res.roles });
      navigate("/"); // Redirect to home page after successful login
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data?.error || "Login failed");
    } finally { setLoading(false); }
  };

  const doSignup = async (e) => {
    e.preventDefault();
    setSuMsg(""); setLoading(true);
    try {
      await userSignup({ username: suName, email: suEmail, password: suPassword });
      setSuMsg("Registration successful! You can now sign in with your credentials.");
      // Clear the signup form
      setSuName("");
      setSuEmail("");
      setSuPassword("");
      // Switch to login tab after a short delay
      setTimeout(() => {
        setTab("login");
      }, 2000);
    } catch (err) {
      setSuMsg(err?.response?.data?.error || "Signup failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {tab === "login" ? "Welcome Back" : "Create Account"}
      </h2>
      
      <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
        <button 
          className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
            tab === "login"
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`} 
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button 
          className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
            tab === "signup"
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`} 
          onClick={() => setTab("signup")}
        >
          Sign up
        </button>
      </div>

      {tab === "login" ? (
        <form onSubmit={doLogin} className="space-y-6">
          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              placeholder="Enter your password"
            />
          </div>
          <div className="pt-2">
            <button 
              disabled={loading} 
              className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                loading 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={doSignup} className="space-y-6">
          {suMsg && (
            <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
              {suMsg}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              value={suName} 
              onChange={e => setSuName(e.target.value)} 
              required 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              placeholder="Choose a username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email"
              value={suEmail} 
              onChange={e => setSuEmail(e.target.value)} 
              required 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={suPassword} 
              onChange={e => setSuPassword(e.target.value)} 
              required 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              placeholder="Create a password"
            />
          </div>
          <div className="pt-2">
            <button 
              disabled={loading} 
              className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                loading 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
