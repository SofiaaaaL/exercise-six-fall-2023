import { useEffect } from "react";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app"; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "@/app/components/firebaseConfig";
import UserProfileCard from "@/app/components/UserProfileCard";

export default function UserProfile({ isLoggedIn, userInformation }) {
    const router = useRouter();

    useEffect(() => {
        //is user is not logged in, send them to login page
        if (!isLoggedIn) router.push("/login");
    }, [isLoggedIn]);

    return(
        //the brackets are fragment, reason to use is that to make sure at the parent level of the component, everything is wrapped in a single element
        <main>
                <h1>User Profile</h1>
                <UserProfileCard user={userInformation} />
        </main>
    );
}

