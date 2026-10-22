import AdminLoginForm from "./AdminLoginForm";

const AdminLoginPage = () => {
  return (
    <div
      className={
        "flex justify-center md:justify-end p-8 h-screen font-inter bg-[url('/ah-landing.png')]"
      }
    >
      <div className="md:w-[40%]">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLoginPage;
