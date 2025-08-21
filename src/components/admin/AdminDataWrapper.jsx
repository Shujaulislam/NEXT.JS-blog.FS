import AdminPosts from "@/components/adminPosts/adminPosts"
import AdminUsers from "@/components/adminUsers/adminUsers"

// Simple wrapper components (no Suspense needed for client components)
export const AdminPostsWrapper = () => <AdminPosts />
export const AdminUsersWrapper = () => <AdminUsers />
