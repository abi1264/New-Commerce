type ButtonProps = {
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const CartButton: React.FC<ButtonProps> = ({ title, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-amber-500 text-white px-4 py-2 rounded-lg
    transition-all duration-300
    hover:bg-amber-600 hover:scale-105
    ${className}`}
    >
      {title}
    </button>
  );
};

export { CartButton };
