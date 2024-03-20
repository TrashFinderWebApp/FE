import { SVGProps } from "@/types/svgprops";

export default function WalkerIconSVG({ fill = "black" }: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="none"
    >
      <mask
        id="mask0_182_1025"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="12"
        height="20"
      >
        <path
          d="M6.81818 3.72093C7.81818 3.72093 8.63636 2.88372 8.63636 1.86047C8.63636 0.837209 7.81818 0 6.81818 0C5.81818 0 5 0.837209 5 1.86047C5 2.88372 5.81818 3.72093 6.81818 3.72093ZM3.45455 6.88372L0.909091 20H2.81818L4.45455 12.5581L6.36364 14.4186V20H8.18182V13.0233L6.27273 11.1628L6.81818 8.37209C8 9.76744 9.81818 10.6977 11.8182 10.6977V8.83721C10.0909 8.83721 8.63636 7.90698 7.90909 6.60465L7 5.11628C6.63636 4.55814 6.09091 4.18605 5.45455 4.18605C5.18182 4.18605 5 4.27907 4.72727 4.27907L0 6.32558V10.6977H1.81818V7.53488L3.45455 6.88372Z"
          fill={fill}
        />
      </mask>
      <g mask="url(#mask0_182_1025)">
        <rect x="-6" y="-3" width="24" height="24" fill={fill} />
      </g>
    </svg>
  );
}
