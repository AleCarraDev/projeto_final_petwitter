import { createContext, useState, useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import { setInStorage, login } from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const toast = useToast();
  const userStored = localStorage.getItem("user");
  const [user, setUser] = useState(userStored ? JSON.parse(userStored) : null);

  const signin = async (data) => {
    try {
      const response = await login(data);
      const user = {
        accessToken: response.data.accessToken,
        ...response.data.user,
      };

      setInStorage("user", user);
      setUser(user);
    } catch (error) {
      toast({
        title: "Login negado.",
        description: "Senha ou email incorreto",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const signout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }) {
  let auth = useAuth();

  let location = useLocation();

  if (!auth.user?.accessToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
