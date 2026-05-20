import { useState, useContext, createContext, Children } from "react";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);
export const StoreContextProvider = ({ children }) => {
  const [user, setUser] = useState("null");
  const [token, setToken] = useState("null");
  const navigate = useNavigate();
  const url = 'http://localhost:4000';
  const clearAuth = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    } catch (error) {
      console.log("error from clearAuth :", error);
    }
    setUser(null);
    setToken(null);
  };

  const logOut = () => {
    clearAuth();
    navigate("/login");
  };

  const contextValue = {
    user,
    setUser,
    token,
    setToken,
    logOut,
    url
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
