interface ButtonProps {
  className?: string;
  icon?: string;
  content?: string;
  onClick: () => void;
}

export default function Button({
  className = "",
  icon = "",
  content = "",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`h-10 flex items-center justify-center p-3 border-2 border-light-green rounded-md ${className} text-light-green gap-3 `}
      onClick={onClick}
      type="button"
    >
      {icon && <img src={icon} alt="icon" className="" />}
      {content}
    </button>
  );
}
