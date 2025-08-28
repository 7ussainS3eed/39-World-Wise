/*eslint-disable*/

import { useAuth } from "../contexts/AuthContex";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

export default ProtectRoutes;
