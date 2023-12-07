import styles from './components.module.css';


const CreateUserForm = ({ createUser }) => {
    return(
        <div>
            <h2>Create User Form</h2>
            {/* when the form is submitted will run this callback */}
            <form className={styles.Form} onSubmit={(e) => createUser(e)}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" />

                <button type="submit">Create User</button>
            </form>
        </div>
    )
}

export default CreateUserForm;