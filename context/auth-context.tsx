import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      setUser(token == null ? null : "user");
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = () => {
    console.log("login");
    Cookies.set("token", "token", { expires: 60 });
    setUser("user");
  };

  const logout = () => {
    console.log("logging out");
    Cookies.remove("token");
    setUser(null);
  };

  const isAuth = () => {
    const token = Cookies.get("token");
    console.log(token);
    return token == null ? null : "user";
  };

  return (
    <AuthContext.Provider
      value={{ isAuth: isAuth, login: login, logout: logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// export const ProtectRoute = ({ children }) => {
//   const router = useRouter();
//   const { isAuth, login, logout } = useAuth();
//   if (!isAuth()) {
//     router.push({
//       pathname: "/",
//       query: { returnUrl: router.asPath },
//     });
//   }
//   return children;
// };

// export const isAuth = () => {
//     const token = Cookies.get("token");

//     console.log(token);
//     console.log(token != null || token != undefined)
//     return token != null || token != undefined;
// }
