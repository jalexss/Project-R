import { Navigate } from "react-router-dom";

export const CheckingAuth = ({ children, status = "", userStatus = "" }) => {
  if (status === "authenticated") return children;

  // if (userStatus === "pending") {
  //   return <Navigate to="/auth/confirmEmail" replace />;
  // }

  return <Navigate to="/auth/login" replace />;
};
