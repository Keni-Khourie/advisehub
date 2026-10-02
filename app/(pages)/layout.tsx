import { ReactNode} from "react";
interface Props {
  children: ReactNode;
}

const PagesLayout = ({ children }: Props) => {
  return (
    <div className="font-inter">
        <div>{children}</div>
    </div>
  )
}

export default PagesLayout