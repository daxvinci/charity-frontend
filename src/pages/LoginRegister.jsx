import { useState } from "react";
import { motion } from "framer-motion";
import {Google as GoogleIcon} from '@mui/icons-material'; // Optional: Material UI for icon
import { useNavigate } from "react-router";

const LoginRegister = () => {
  const baseUrl = "https://charity-backend-rfj9.onrender.com"
  const [isLogin, setIsLogin] = useState(true) // Toggle between login and register
  const [isLoading, setIsLoading] = useState(false) // Toggle between login and register
  const navigate = useNavigate()

  const handleToggle = () => setIsLogin(!isLogin)

  const handleGoogleLogin = async () => {
    // Redirect to the backend Google OAuth route
    setIsLoading(true)
    window.location.href = `${baseUrl}/form/auth/google`
    localStorage.removeItem("token");
    setIsLoading(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setIsLoading(true)
    const url = isLogin ? "login" : "register"; // Endpoint
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
  
    if (!isLogin) {
      data.username = e.target.username?.value; // Add username only for registration
    }
  
    try {
      const response = await fetch(`${baseUrl}/form/${url}`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          // "Access-Control-Allow-Headers" : "Content-Type",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      console.log('response: ',response)
      const result = await response.json();
      if (response.ok) {
        console.log("Success:", result);
  
        // Example: Save JWT token to local storage (if provided by backend)
        if (result.token) {
          localStorage.setItem("token", result.token)
          alert("Login successful!")
          navigate('/')
        }else{
          alert(result.error)
        }
      setIsLoading(false)
      } else {
        console.error("Error:", response.statusText);
        alert(result.error || "Something went wrong");
        setIsLoading(false)
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Failed to connect to the server");
      setIsLoading(false)
    }
  };
  

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500">
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-96 bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {isLogin ? "Welcome Back!" : "Create an Account"}
        </h2>
        <p className="text-center text-gray-500 mb-6">
          {isLogin ? "Login to your account" : "Sign up to get started"}
        </p>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block text-gray-600">Username</label>
              <input
              name="username"
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
          )}

          <div>
            <label className="block text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <motion.button
            {...(!isLoading && {
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 },
              })}
            disabled={isLoading}
            className={`w-full ${isLoading ? 'bg-blue-300' : 'bg-blue-500'} text-white py-2 rounded-lg ${isLoading ? 'hover:bg-blue-300' : 'hover:bg-blue-600'} focus:outline-none transition duration-300`}
          >
            {isLogin ? "Login" : "Register"}
          </motion.button>
        </form>

        {/*Google */}
        <div className="mt-6">
        <motion.button
            {...(!isLoading && {
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 },
              })}
            disabled={isLoading}
            className={`w-full ${isLoading ? 'bg-red-300': 'bg-red-500'} text-white py-2 rounded-lg ${isLoading ? 'hover:bg-red-300':'hover:bg-red-600'} focus:outline-none transition duration-300`}
            onClick={handleGoogleLogin}
          >
            <GoogleIcon className="mr-2" />
            Continue with Google
          </motion.button>
        </div>

        {/* Toggle */}
        <div className="text-center mt-4">
          <p className="text-gray-500">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={handleToggle}
              className="text-blue-500 font-semibold hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginRegister;
