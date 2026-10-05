import Image from "next/image";
import LoginForm from "./_components/LoginForm";


export default function Home() {
  return (
    <div className="flex h-screen font-inter">
      <div className="h-full w-1/3 bg-ahDarkGrey">
      <Image src="/advisehub-logo.png" alt="advisehub logo" width={500} height={500} className="w-40"/>
      </div>
      <div className="h-full w-2/3">
        <LoginForm/>
      </div>
    </div>
  )
}
