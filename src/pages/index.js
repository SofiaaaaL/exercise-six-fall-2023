import Header from "@/app/components/Header";

export default function UserProfile() {
    return(
        //the brackets are fragment, reason to use is that to make sure at the parent level of the component, everything is wrapped in a single element
        <>
            <Header />
            <main>
                <h1>User Profile</h1>
            </main>
        </>
    );
}