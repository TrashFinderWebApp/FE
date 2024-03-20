import NavigationIconSVG from "@/components/svg/NavigationIconSVG";

export default function Navigation() {
  return (
    <div>
      <h2 className="text-[1.25rem] font-extrabold flex items-center">
        <NavigationIconSVG />
        <p>길찾기</p>
      </h2>
    </div>
  );
}
