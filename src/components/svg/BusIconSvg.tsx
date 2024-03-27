import { SVGProps } from "@/types/svgprops";

export default function BusIconSVG({
  className = "",
  fill = "white",
}: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <mask
        id="mask0_182_990"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="url(#busicon)" />
      </mask>
      <g mask="url(#mask0_182_990)">
        <rect width="24" height="24" fill={fill} />
      </g>
      <defs>
        <pattern
          id="busicon"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_182_990" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_182_990"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADPElEQVR4nO2dQUsVYRSGn9p6MaLctS1XkauyfkBBixZtgmoXFLRy708IgrSCFu0lwkVFv0BaRQuhtRBiIRUpEZrkiS++hQQ5c23me8/MPQ+8ICjX9zln5s4VuXMhCIIgCIIgCIIgCIIgCNpjAJwGrgAzwANgAXgNLAHLwArwdU92ABsyO389xkp+7KX8uxby757JXVKnsb4t/jBwHpgFXgBrBxikFc5a7jqbuyeHznEBeAqsOxio/WfWs0tycs0h4Go+za2nWc6OydUVk8AbBwOyQkmup3DCTeC7g6FY4STnG+rh3wJ+ORiGibIL3FUN/3IuYCOe3TyLokwAnxzIm5N8zDMpxn0H0uYs90oNfxz45kDYnGUTOFJiAdcdyJrTXCuxgCcORM1pHpdYwDsHouY0b0ssYNWBqDnNhxIL+OFA1JwmzaZ1qkr0HVP7ywuIkfvLC4iR+8sLiJH7ywuIkfvLC4iR+8sLiJH7ywuIkfvLC4iR+8sLiJH7ywuIkfvLC4iR+8sLiJH7ywuIkfvLC4iR+8sLiJH7ywuIkfvLC4iR+8sLiJH7ywuIkfvLC4iR+8sLiJH7ywuIkfvLC4iR+1cVGPW0jlrQnCcWQCxAfhRanAH6QVg8BemHYYLENYBYgPwotDgD9IOweArSD8MEiWsAsQD5UWhxBsBWvifbuXwvtrH89Vz+njlLU31dPAWlt7Ke2ecxppy93XW1wb6tU+dI2k9mr9SWg+E33bd1qgqk07gu8w4W0HTf1qkqcHaIx5p2sICm+7ZOVYF0Y9a6DBwsoOm+rdOk0HjHFlCnb+uUPqWt5XTuKWijokB63dyli/Bcg33TbFrnfUWJrfySrYopYNvBAprsm2bTOq9qSK1WSHn8Q2yqgb4vKcCdmlLb+ZSdzhe6Qb4b+byTI99a6Hu7xAImDng//75nBzhOIR45EDZneUhBjvbkswGsoXwGjlGYS8BPB/ImTro+XERE3MSVPzOQYiMeOTbikWMjHjmdK9w3n84V7ptP5wr3zadzhfvmszlE2fTJG97Z7JrP4hCFn+Ofxa75pE/R+1KjbPqZk/hnsos+J4Bn//h35UY+UtyUHUGfIAiCAH/8BhYr/NCYXwQCAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
}
