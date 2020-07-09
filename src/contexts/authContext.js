import React from "react";

export const AuthContext = React.createContext();

function AuthContextProvider(props) {
  const { currentUser, setCurrentUser, signOut, children } = props;

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
