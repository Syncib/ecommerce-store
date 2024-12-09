import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useUserContext();
  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://ecommerce-server-ten-phi.vercel.app/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        setError(data.error);
      }
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { signup, isLoading, error };
};
