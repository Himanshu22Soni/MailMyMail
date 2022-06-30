import React from "react";
import "./App.css";
import Gmail from "./component/Gmail";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "./component/Login";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL?authUser.photoURL:"https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
            displayName: authUser.displayName
              ? authUser.displayName
              : authUser.email,

            email: authUser.email,
            emailVerified: authUser.emailVerified,
          })
        );
      }else{
        dispatch(logout());
      }
      console.log(authUser);
    });
  }, [dispatch]);

  return <div className="App">{user ? <Gmail /> : <Login />}</div>;
}

export default App;
