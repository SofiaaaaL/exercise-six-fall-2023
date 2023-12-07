import { useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "@/app/components/LoginForm";

export default function Login({isLoggedIn, loginUser}) {
    const router = useRouter();
    useEffect(() => {
        //if user is logged in, send them to the profile page
        if (isLoggedIn) router.push("/"); //changes the url
    }, [isLoggedIn])

    return(
        <main>
                <h1>Login</h1>
                <LoginForm loginUser={loginUser}/>
        </main>
    );
}