"use client"
import {useState, useEffect} from "react"
import AssignUserRole from "./AssignUserRole";
import CreateAdvisorProfile from "./CreateAdvisorProfile";
import CreateStudentProfile from "./CreateStudentProfile";
import PageHeader from "@/customUI/PageHeader";
import { useGetUserByIdQuery } from "@/redux/features/main/usersApiSlice";

interface Props{
  userId:number
}
const UpdateUserContent = ({userId}:Props) => {
  const [refetchData, setRefetchData] = useState<boolean>(true)
  const {data:user, refetch} = useGetUserByIdQuery(userId)
  useEffect(()=>{
    if(refetchData)
      refetch()
  }, [refetch, refetchData])
  return (
    <div>
      <PageHeader headerText="UPDATE USER DETAILS"/>
      {user && (
        <div>
          {user && <div>
            <p>{`${user.firstName} ${user.lastName} - ${user.role}`}</p></div>}
        {user && <AssignUserRole userId={userId} setRefetch={setRefetchData} disableAssign={user.role!==null}/>}
        {user.role==="ADVISOR"  && <CreateAdvisorProfile userId={userId}/>}
        {user.role==="STUDENT"  && <CreateStudentProfile userId={userId}/>}
      </div>
      )}
    </div>
  )
}

export default UpdateUserContent