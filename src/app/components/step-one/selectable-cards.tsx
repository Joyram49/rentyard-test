import { Card } from "@/components/ui/card";

type SelectableCardsProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  selected: boolean;
  onClick: () => void;
};
export default function SelectableCards({
  icon,
  title,
  value,
  description,
  selected,
  onClick,
}: SelectableCardsProps) {
  return (
    <Card
      className={`rounded-[12px] custom-border p-5 cursor-pointer transition-all ${
        selected ? "custom-border-blue shadow-lg" : ""
      }`}
      onClick={onClick}
      data-value={value}
    >
      <div className='w-full flex justify-start items-center space-x-4'>
        <div className='p-3.5 bg-[#F9FBFF] rounded-[8px]'>{icon}</div>
        <div className='flex-1 flex flex-col justify-center items-start space-y-2'>
          <h3 className='font-[600]  text-[#272B35]'>{title}</h3>
          <p className='font-medium text-sm text-[#777980]'>{description}</p>
        </div>
      </div>
    </Card>
  );
}
