import { useAuth } from "../context/auth-context";

const isBrowser = () => typeof window !== "undefined";

export const ProtectedRoute = ({ router, children }) => {
  const { isAuth, login, logout } = useAuth();
  if (!isAuth()) {
    if (isBrowser() && router.pathname != "/") {
      router.push({
        pathname: "/",
        query: { returnUrl: router.asPath },
      });
    }
  }
  return children;
};
