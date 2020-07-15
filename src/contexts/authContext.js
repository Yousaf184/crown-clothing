import React from "react";

export const AuthContext = React.createContext();

function AuthContextProvider(props) {
  const { signOut, children } = props;

  return (
    <AuthContext.Provider value={{ signOut }}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
