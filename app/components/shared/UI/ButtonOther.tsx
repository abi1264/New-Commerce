import { ReactNode } from 'react';

type ButtonProps = {
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon?: ReactNode;
};

const ButtonOther: React.FC<ButtonProps> = ({
  title,
  onClick,
  className,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer bg-blue-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-smooth duration-300 ${className} flex gap-2 items-center justify-center`}
    >
      {icon}
    </button>
  );
};

export { ButtonOther };
