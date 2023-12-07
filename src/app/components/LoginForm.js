import styles from './components.module.css'

const LoginForm = ({ loginUser }) => {
    //e represents the Element that the function called on 
    //in this case it is the entire form. we will use this to
    //reference the values of the inputs in the form.
    return (
        <div>
            <h2>Login Form</h2>
            <form className={styles.Form} onSubmit={(e) => loginUser(e)}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" />

                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default LoginForm;