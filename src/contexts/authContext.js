import React from "react";

export const AuthContext = React.createContext();

function AuthContextProvider(props) {
  const { currentUser, signOut, children } = props;

  return (
    <AuthContext.Provider value={{ currentUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
