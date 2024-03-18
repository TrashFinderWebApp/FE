interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({
  placeholder = "검색어를 입력하세요.",
}: SearchBarProps) {
  return (
    <input
      className="flex-grow outline-none border-2 border-light-green rounded-md p-2 w-full pl-10"
      placeholder={placeholder}
      style={{
        backgroundImage: "url(/svg/searchIcon.svg)",
        backgroundPosition: "left 0.5rem center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1.75rem",
      }}
    />
  );
}
