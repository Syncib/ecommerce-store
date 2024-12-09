import { createContext, useEffect, useReducer, useState } from "react";

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
    setIsLoading(false); // Set loading to false after checking localStorage
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
