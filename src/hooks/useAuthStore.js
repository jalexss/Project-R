import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useRegisterMutation,
  useGetDataUserMutation,
} from "../store/api/authApi";

import {
  onChecking,
  onLogin,
  onLogout,
  authenticated,
  loadedUser,
} from "../store";
import { useEffect, useState } from "react";

export const useAuthStore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userIsLoading, setUserIsLoading] = useState(true);
  const { status, user } = useSelector((state) => state.auth);
  const [login, loginResult] = useLoginMutation();
  const [register, registerResult] = useRegisterMutation();
  const [getDataUser] = useGetDataUserMutation();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      if (user) {
        setUserIsLoading(false);
      }
    }

    return () => {
      ignore = true;
    };
  }, [user]);

  const startLogin = async (data) => {
    //dispatch(onChecking());
    login(data)
      .unwrap()
      .then((fulfilled) => {
        localStorage.setItem("token", fulfilled.token);
        const { email, avatar, id, role, status, username, token } = fulfilled;

        if (status === "pending") {
          dispatch(onLogout());
          return navigate("/auth/confirmEmail");
        }

        dispatch(
          onLogin({
            user: {
              email,
              avatar,
              id,
              role,
              status,
              username,
            },
            token,
          })
        );
        navigate("/", { replace: true });
      });
  };

  const startRegister = async (data) => {
    register(data);
  };

  const checkAuthToken = async () => {
    // dispatch(onChecking());
    const token = localStorage.getItem("token");

    if (token === null) return dispatch(onLogout());

    dispatch(authenticated(token));
  };

  const onLoadUser = async () => {
    // dispatch(onChecking());
    getDataUser()
      .unwrap()
      .then((fulfilled) => {
        dispatch(loadedUser(fulfilled));
      })
      .catch(() => dispatch(loadedUser(null)));
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };
  return {
    //propertys
    registerResult,
    loginResult,
    status,
    user,
    userIsLoading,

    //methods
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
    onLoadUser,
  };
};
