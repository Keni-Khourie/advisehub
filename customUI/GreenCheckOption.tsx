
import GreenCheck from "./GreenCheck";
interface Props {
  text: string;
}

const GreenCheckOption = ({ text }: Props) => {
  return (
    <div className="flex items-center gap-x-3">
      <GreenCheck/>
      <p className="font-medium text-sm">{text}</p>
    </div>
  );
};

export default GreenCheckOption;
