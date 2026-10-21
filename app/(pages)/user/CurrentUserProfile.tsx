"use client"
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useGetCurrentUserQuery } from "@/redux/features/authApiSlice";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {setUser} from "@/redux/features/userSlice"
const CurrentUserProfile = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {data:user, isLoading, isError, refetch} = useGetCurrentUserQuery()

    if (isLoading) return <p>Loading profile...</p>;
    if(user){
      dispatch(
        setUser({
          id:user.id,
          email:user.email,
          firstName:user.firstName,
          lastName:user.lastName,
          image:user.image,
          role:user.role,
        })
      )
    }

  if (isError) {
    return (
      <div>
        <p>Unable to load your profile.</p>
        <button onClick={() => void refetch()}>
          Try again
        </button>
      </div>
    );
  }
    if (!user) return <p>No user profile found.</p>;

  if (!user.role) {
    return(<div>
      <p>Hello, {user.firstName} {user.lastName} Please wait why the administrator finishes setting up your account.</p>
      <Avatar>
        <AvatarImage src={user.image?? undefined}/>
        <AvatarFallback></AvatarFallback>
      </Avatar>
    </div>)
  }

  if(user.role){
    router.push("/dashboard")
  }
   return (
    <div>
      <h2>
        Welcome, {user.firstName} {user.lastName}
      </h2>

      <p>Role: {user.role}</p>

      {user.student && (
        <p>Student ID: {user.student.studentId}</p>
      )}

      {user.advisor && (
        <p>Advisor ID: {user.advisor.advisorId}</p>
      )}
    </div>
  );
}

export default CurrentUserProfile