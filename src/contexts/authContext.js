import React from "react";
import { useHistory } from "react-router-dom";

import { saveNewUser } from "../utils/firebase";

export const AuthContext = React.createContext();

function AuthContextProvider(props) {
  const { currentUser, setCurrentUser, signOut, children, setIsSignUp } = props;
  const routerHistory = useHistory();

  const onUserSignup = (newUser) => {
    saveNewUser(newUser)
      .then(() => {
        setCurrentUser(newUser);
        routerHistory.replace("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, onUserSignup, signOut, setIsSignUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
