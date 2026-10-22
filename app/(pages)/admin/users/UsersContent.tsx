"use client"

import { useGetAllUsersQuery } from "@/redux/features/main/usersApiSlice";
import Link from "next/link";
import {Button} from "@/components/ui/button"
import PageHeader from "@/customUI/PageHeader"
const UsersContent = () => {
    const {data:users} = useGetAllUsersQuery()
  return (
    <div>
        <PageHeader headerText="USERS"/>
        <div className="bg-white">
        {users && (
            <table>
                <thead>
                    <tr>
                        <td>User</td>
                        <td>Role</td>
                        <td>Assign</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=>(
                        <tr key={user.id}>
                            <td>{`${user.firstName} ${user.lastName}`}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link href={`/admin/users/${user.id}`}>
                                <Button>UPDATE</Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
    </div>
  )}

export default UsersContent