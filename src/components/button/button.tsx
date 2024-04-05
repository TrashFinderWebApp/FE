interface ButtonProps {
  className?: string;
  icon?: string;
  iconComponent?: React.ReactNode;
  content?: string;
  style?: React.CSSProperties;
  onClick: () => void;
}

export default function Button({
  className = "",
  icon = "",
  content = "",
  iconComponent,
  style,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`h-10 flex items-center justify-center p-3 border-2 border-light-green rounded-md text-light-green gap-3 ${className}`}
      onClick={onClick}
      type="button"
      style={style}
    >
      {icon && <img src={icon} alt="icon" className="" />}
      {iconComponent}
      {content}
    </button>
  );
}
