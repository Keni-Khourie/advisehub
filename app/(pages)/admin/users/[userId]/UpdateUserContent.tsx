"use client"
import {useState, useEffect} from "react"
import AssignUserRole from "./AssignUserRole";
import CreateAdvisorProfile from "./CreateAdvisorProfile";
import CreateStudentProfile from "./CreateStudentProfile";
import PageHeader from "@/customUI/PageHeader";
import { useGetUserByIdQuery } from "@/redux/features/main/usersApiSlice";
import {Spinner} from "@/components/ui/spinner"

interface Props{
  userId:number
}
const UpdateUserContent = ({userId}:Props) => {
  const [refetchData, setRefetchData] = useState<boolean>(true)
  const {data:user, refetch, isLoading} = useGetUserByIdQuery(userId)
  useEffect(()=>{
    if(refetchData)
      refetch()
  }, [refetch, refetchData])
  return (
    <div>
      <PageHeader headerText="UPDATE USER DETAILS"/>
      {isLoading && (<div>
        <Spinner className="w-20 h-20 text-ahDeepBlue" type="arrow"/>
      </div>)}
      {user && (
        <div>
          {user && <div>
            <p>{`${user.firstName} ${user.lastName} - ${user.role} ${user.student?" has Student Profile":user.advisor?" haas Advisor Profile":user.admin?" has Admin Profile":" has no profile"}`}</p></div>}
        {user && <AssignUserRole userId={userId} setRefetch={setRefetchData} disableAssign={user.role!==null}/>}
        {user.role==="ADVISOR"  && <CreateAdvisorProfile userId={userId} disableAssign={user.advisor?true:false}/>}
        {user.role==="STUDENT"  && <CreateStudentProfile userId={userId} disableAssign={user.student?true:false}/>}
      </div>
      )}
    </div>
  )
}

export default UpdateUserContent