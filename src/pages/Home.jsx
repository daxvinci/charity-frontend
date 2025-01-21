import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [userData, setUserData] = useState(null); // State to store user data
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check for JWT token in localStorage
        const token = localStorage.getItem("token");
        console.log("Token found:", token);

        const response = await fetch('https://charity-backend-rfj9.onrender.com/home', {
          method:'GET',
          headers:{
            ...(token && { Authorization: `Bearer ${token}` }),
            // "Access-Control-Allow-Headers" : "Content-Type",
            // "Access-Control-Allow-Origin": "http://localhost:5173",
            // "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
          },
          credentials: "include", // Include cookies for session-based authentication
        });
        const result = await response.json();
        // Set the user data to state
        setUserData(result);
      } catch (error) {
        console.error("Authentication error: ", error.response?.error || error.message);
        navigate("/loginRegister"); // Redirect to login on failure
      } finally {
        setIsLoading(false); // End loading state
      }
    };

    fetchUserData(); // Call the function inside useEffect
  }, [navigate]);

  // Conditionally render based on loading state and user data
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>Unauthorized access. Redirecting...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <motion.div
        className="text-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <motion.h1
          className="text-4xl font-bold text-white mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          Welcome, {userData.username}!
        </motion.h1>
        <motion.p
          className="text-lg text-gray-200 mb-10"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          Email: {userData.email}
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.7,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfP5i847bpQtBqaqQnTWSKNpydsT4HoUZif1Fss6sPsJ5OlhA/viewform?embedded=true"
            width="700"
            height="520"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            className="rounded-lg shadow-lg"
            title="Google Form"
          >
            Loading…
          </iframe>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.7,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
        paypal section    
        </motion.div>
      </motion.div>
    </div>
  );
};


export default Home;

