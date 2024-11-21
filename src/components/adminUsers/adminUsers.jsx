import { getUsers } from "@/library/data"
import styles from "./adminUsers.module.css"
import Image from "next/image"
import { deleteUser } from "@/library/actions";

const AdminUsers = async () => {
    const users = await getUsers();
    return (
        <div className={styles.container}>
        <h1>Users</h1>
        {users.map(user => (
            <div className={styles.user} key={user.id}>
                <div className={styles.details}>
                    <Image
                     src={user.img || "/noAvatar.png"}
                     alt="" 
                     width={50} 
                     height={50}/>
                    <span>{user.username}</span>
                </div>
                <form action={deleteUser}>
                    <input type="hidden" name="id" value={user.id}></input>
                    <button className={styles.button}>Delete</button>
                </form>
            </div>
        ))}
        </div>
    )
}

export default AdminUsers