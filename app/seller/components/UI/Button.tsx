import { ReactNode } from 'react';

type ButtonProps = {
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon?: ReactNode;
};

const Button: React.FC<ButtonProps> = ({ title, onClick, className, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors ${className}`}
    >
      {title}
      {icon}
    </button>
  );
};

export { Button };
