import { FaCheckCircle } from "react-icons/fa";
interface Props {
  text: string;
}
const LandingCardOption = ({ text }: Props) => {
  return (
    <div className="flex items-center gap-x-3">
      <FaCheckCircle className="text-ahGreen bg-white rounded-full" size={28} />
      <p className="font-medium text-sm">{text}</p>
    </div>
  );
};

export default LandingCardOption;
