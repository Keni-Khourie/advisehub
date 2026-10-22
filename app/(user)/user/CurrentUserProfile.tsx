"use client"
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useGetCurrentUserQuery } from "@/redux/features/authApiSlice";
import {setUser} from "@/redux/features/userSlice"
import { Button } from "@/components/ui/button";
import { HiLogout } from "react-icons/hi";
import {clearUser} from "@/redux/features/userSlice"
import {signOutUser} from "@/lib/actions/auth"
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner"
const CurrentUserProfile = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {data:user, isLoading, isError, refetch} = useGetCurrentUserQuery()
    const signOut = ()=>{
    signOutUser()
    dispatch(clearUser())
   }

    if (isLoading) return (
      <div className="bg-ahBgBlue w-full h-screen flex flex-col items-center justify-center">
        <div className="">
          <Spinner className="w-20 h-20 text-ahDeepBlue" type="arrow"/>
          <p>Loading profile...</p>
        </div>
      </div>
    );
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
          <Button className="w-full bg-ahLightBlue hover:bg-ahBorderBlue cursor-pointer text-ahDeepBlue text-left font-semibold border border-stone-100" onClick={signOut}>
                        Logout <HiLogout/>
                    </Button>
      </div>
    );
  }
    if (!user) return <p>No user profile found.</p>;

  if (!user.role) {
    return(<div className="flex flex-col justify-center w-full h-screen items-center px-10 py-10 bg-ahBgBlue">
      <div className=" bg-white flex flex-col justify-between items-center gap-y-20 md:w-[60%] py-6 px-5 border border-stone-200 rounded-lg h-[90%]">
        
          <Image src="/advisehub-logo.png" alt="AdviseHub Logo" width={1000} height={1000} loading="eager" className="w-80"/>
       
        <div className="flex flex-col gap-y-6 items-center text-center">
          <p className="text-ahTextBlack">Hello, {user.firstName} {user.lastName} Please wait why the administrator finishes setting up your account.</p>
          <p>Apologies for the inconvenience</p>
          <p> - AdviseHub Team</p>
        </div>
      
        <div className="flex justify-center w-full">
                    <Button className="w-full bg-ahLightBlue hover:bg-ahBorderBlue cursor-pointer text-ahDeepBlue text-left font-semibold border border-stone-100" onClick={signOut}>
                        Logout <HiLogout/>
                    </Button>
                </div>
     
      </div>
    </div>)
  }

  if(user.role){
    router.push("/dashboard")
  }
   return
}

export default CurrentUserProfile