import Image from "next/image";
import LoginForm from "./_components/LoginForm";


export default function Home() {
  return (
    <div className={"flex justify-center md:justify-end p-8 h-screen font-inter bg-[url('/ah-landing.png')]"}>
      <div className="w-[40%]">
        <LoginForm/>
      </div>
    </div>
  )
}
