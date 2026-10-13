import { cn } from "@/lib/utils";

interface Props {
  headerText: string;
  subtitle?: string;
  additionalClass?: string;
}

const PageHeader = ({ headerText, subtitle, additionalClass }: Props) => {
  return (
    <div className={cn("flex flex-col gap-x-2 w-full mb-20", additionalClass)}>
      <h2 className="text-ahTextBlack text-4xl font-bold">{headerText}</h2>
      {subtitle && <p className="text-ahTextGrey ps-1">{subtitle}</p>}
    </div>
  );
};

export default PageHeader;
