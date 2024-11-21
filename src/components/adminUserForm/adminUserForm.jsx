"use client"

import { addUser } from "@/library/actions"
import styles from "./adminUserForm.module.css"
import {useFormState} from "react-dom"
const AdminUserForm = () => {

    const [state, formAction] = useFormState(addUser, undefined)
    return (
        <form action={formAction} className={styles.container}>
        <h1>Add New User</h1>
        <input type="text" name="username" placeholder="User Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="text" name="img" placeholder="Image" />
        <select name="isAdmin" >
            <option value="false">Is Admin?</option>
            <option value="false">User</option>
            <option value="true">Admin</option>
        </select>
        <button>Add User</button>
        {state && state.error}
        </form>
    )
}


export default AdminUserForm