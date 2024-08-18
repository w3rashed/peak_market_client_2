import {
    GithubAuthProvider,
    GoogleAuthProvider,
    TwitterAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import PropTypes from "prop-types";
  import { createContext, useEffect, useState } from "react";
  import app from "../Firebase/Firebase.config";
  
  export const AuthContext = createContext(null);
  
  const googleProvier = new GoogleAuthProvider();
  const twitterProvider = new TwitterAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const auth = getAuth(app);
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [load, setLoad] = useState(false);
  
    // google loogin
    const googleLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvier).then(() => {});
    };
    // twitter login
    const twitterLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, twitterProvider).then(() => {});
    };
  
    // github login
    const githubLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, githubProvider).then(() => {});
    };
  
    // create a new user
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    // sign in user
    const signInUser = async (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
    // update user
    const updateUser = async (name, photo) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      }).then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setLoad(true);
        setLoading(true);
      });
    };
  
    // sign out user
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    // set current user
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log("user in the auth state changes", currentUser);
        setUser(currentUser);
        setLoading(false);
        setLoad(true);
      });
      return unsubscribe;
    }, [load]);
  
    const authInfo = {
      loading,
      googleLogin,
      twitterLogin,
      githubLogin,
      createUser,
      updateUser,
      signInUser,
      user,
      logOut,
      setLoad,
    };
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
  };
  
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  export default AuthProvider;
  