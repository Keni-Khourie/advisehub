import { cn } from "@/lib/utils";
import Image from "next/image";
const LoginFormHeader = () => {
  return (
    <div className={cn("w-full mb-5 flex flex-col items-center")}>
      <div className="w-full flex justify-center">
        <Image
          src="/advisehub-logo.png"
          alt="advisehub logo"
          width={500}
          height={500}
          className="w-80 "
          loading="eager"
        />
      </div>
      <div className="flex flex-col gap-y-2 justify-center">
        <h2 className="text-ahTextBlack text-6xl font-bold text-center mb-10">
          {"Welcome back"}
        </h2>

        <p className="text-ahTextGrey ps-1 font-light text-base text-center mb-10" >
          {
            "Sign in to access your appointments, advising notes, past meetings, and degree progress."
          }
        </p>
      </div>
    </div>
  );
};

export default LoginFormHeader;
