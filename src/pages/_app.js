// this is the application wrapper
import { useCallback, useEffect, useState } from "react";
import Header from "@/app/components/Header";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/components/firebaseConfig";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

export default function MyApp({ Component, pageProps }){

    //1. use "is initialize" to track the firebase is initialized; initializing firebase app
    const [appInitialized, setAppInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false); //we don't want them loggeed in in the first load
    const [userInformation, setUserInformation] = useState(null); //what we are going to pass down
    const [error, setError] = useState(null);

    const createUser = useCallback((e) => {
        //create account in auth
        //add user info in firebase datastore
        e.preventDefault(); //saying do not use default html form 
        //assign email and to varaibels from form
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            //succeeced to then
            .then((userCredential) => {
                const user = userCredential.user; //this is a value i 
                setIsLoggedIn(true); //since the user is true, set logged in
                setUserInformation(user);
                setError(null);

            })
            //fail to catch
            .catch((error) => {
                const errorCode = error.errorCode
                const errorMessage = error.message;
                console.warn({ error, errorCode, errorMessage });
                setError(errorMessage)
            })
    }, [setError, setIsLoggedIn, setUserInformation]);

    const loginUser = useCallback((e) => {
        e.preventDefault();

        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            //succeeced to then
            .then((userCredential) => {
                const user = userCredential.user; //this is a value i 
                setIsLoggedIn(true); //since the user is true, set logged in
                setUserInformation(user);
                setError(null);

            })
            //fail to catch
            .catch((error) => {
                const errorCode = error.errorCode
                const errorMessage = error.message;
                console.warn({ error, errorCode, errorMessage });
                setError(errorMessage)
            })
        
    }, []);

    const logoutUser = useCallback(() => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                setUserInformation(null);
                setIsLoggedIn(false);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.warm({ error, errorCode, errorMessage})
                setError(errorMessage)
            })
    }, [signOut, setError, setIsLoggedIn, setUserInformation]);

    //initialize firebase
    useEffect(() => {
        initializeApp(firebaseConfig);
        setAppInitialized(true);
    }, []);

    //User had loaded page, check their status and set state according 
    useEffect(() => {
        if (appInitialized) {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    //user is signed in, see docs for a list of available pro
                    setUserInformation(user);
                    setIsLoggedIn(true);
                } else {
                    //user is signed out
                    setUserInformation(null);
                    setIsLoggedIn(false);
                }
                //setLoading to false when everything is complete
                setIsLoading(false);
            })
        }
    }, [appInitialized])

    if (isLoading) return null;

    return (
        <>
            <Header isLoggedIn={isLoggedIn} logoutUser={logoutUser}/>
            <Component
                {...pageProps}
                createUser={createUser}
                isLoggedIn={isLoggedIn}
                loginUser={loginUser}
                userInformation={userInformation}
            />
            <p>{error}</p>
        </>
    );


}