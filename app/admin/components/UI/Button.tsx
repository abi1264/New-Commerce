type ButtonProps = {
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ title, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors ${className}`}
    >
      {title}
    </button>
  );
};

export { Button };
