
import TestUserLoginForm from "./TestUserLoginForm";


const TestUserLoginPage = () => {
  return (
    <div
      className={
        "flex justify-center md:justify-end p-8 h-screen font-inter bg-[url('/ah-landing.png')]"
      }
    >
      <div className="  md:w-[40%]">
        <TestUserLoginForm/>
      </div>
    </div>
  )
}

export default TestUserLoginPage