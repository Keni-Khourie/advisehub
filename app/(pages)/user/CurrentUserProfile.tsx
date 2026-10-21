"use client"

import { useGetCurrentUserQuery } from "@/redux/features/authApiSlice";

const CurrentUserProfile = () => {
    const {data:user, isLoading, isError, refetch} = useGetCurrentUserQuery()
    if (isLoading) return <p>Loading profile...</p>;

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
    return <p>Hello, {user.firstName} {user.lastName} Please wait why the administrator finishes setting up your account.</p>;
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