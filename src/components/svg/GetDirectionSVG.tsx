import { SVGProps } from "@/types/svgprops";

export default function GetDirectionSVG({ color }: SVGProps) {
  return (
    <svg
      width="32"
      height="46"
      viewBox="0 0 32 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="Group 80">
        <g id="Mask group">
          <mask
            id="mask0_240_78"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="1"
            y="0"
            width="30"
            height="30"
          >
            <rect
              id="Route"
              x="1"
              width="30"
              height="30"
              fill="url(#pattern2)"
            />
          </mask>
          <g mask="url(#mask0_240_78)">
            <rect
              id="Rectangle 1216"
              x="1"
              width="30"
              height="30"
              fill={color}
            />
          </g>
        </g>
        <path
          id="&#234;&#184;&#184;&#236;&#176;&#190;&#234;&#184;&#176;"
          d="M9.02344 33.5312V38.8633H8.10938V33.5312H9.02344ZM5.90625 34.0469C5.90625 36.707 4.01953 38.3711 0.9375 39.0859L0.597656 38.3125C3.20508 37.7324 4.73438 36.4844 4.89844 34.8086H1.125V34.0469H5.90625ZM9.02344 39.3555V41.875H3.1875V43.1172H9.39844V43.8555H2.27344V41.1719H8.10938V40.0938H2.25V39.3555H9.02344ZM14.3438 35.7109C14.3438 36.9531 15.3984 38.1016 16.9336 38.5586L16.5 39.2617C15.2988 38.9043 14.3613 38.1309 13.9102 37.1289C13.4531 38.2305 12.4863 39.0684 11.25 39.4727L10.793 38.7461C12.3398 38.2773 13.4414 37.082 13.4414 35.7109V35.5117H11.0859V34.75H13.4414V33.4844H14.3672V34.75H16.6992V35.5117H14.3438V35.7109ZM18.9375 33.5312V36.1094H20.5078V36.8828H18.9375V39.5898H18.0234V33.5312H18.9375ZM19.125 40.1523V40.9023H16.1719C16.3242 41.9922 17.8535 42.9297 19.5234 43.1992L19.1836 43.9141C17.6543 43.6621 16.2715 42.9062 15.6797 41.8633C15.082 42.9004 13.7109 43.6387 12.1992 43.9023L11.8477 43.1992C13.5293 42.9297 15.041 42.0098 15.1992 40.9023H12.2578V40.1523H19.125ZM29.7773 33.5312V43.9492H28.8516V33.5312H29.7773ZM26.6953 34.668C26.6836 37.668 25.2891 40.3164 21.7969 41.9922L21.293 41.2422C24.1113 39.9062 25.5469 37.9082 25.7578 35.418H21.7734V34.668H26.6953Z"
          fill={color}
        />
      </g>
      <defs>
        <pattern
          id="pattern2"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_240_78" transform="scale(0.0111111)" />
        </pattern>
        <image
          id="image0_240_78"
          width="90"
          height="90"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACqUlEQVR4nO3dMW4TQRjF8WeWiAL5AqFHHAUuAEmNRJk29BT05AhEpMkWNGlDUkHHGRAXQKFBLj600kREyJ8Ru7Nvv5l5f2kay1qvfxqP15ZHBpRSSiml1J9WAA4BXAP4mcYVgIM791ET2wNwCsCc8T7dR02oA3C2A/l29MKeH9mEzUM2YfOQTdg8ZGETkYVNRBY2EVnYRGRhg4fcNHZHRm4Su1sIuSnsbmHkJrC7IMhVY3fBkKvE7oIiV4UdHdlqwB6QPwRAtJqxS0O2ErFLRbaSsEtHthKwoyFvALypDTsasiVo1IQdEdnuQFeBHRXZ/oIuGjsysm2BLhI7OrI50EVhl4BsO6CLwB4e4JwM9g3ACYCnAJ4AeJjpubydcE7nc2KzZ/J3AK8A3J/rCUWc2eyZ/BHAGpzCzGw28jsA98BrCnQ2bPZycZEek9WUpSPbMrL6xy/t51iT1yhnJm/beTCqQyKyAXi541weADgC8DntX5l6eZcb+Xa8GAN9Tb6E65zzeATg64hjbsjIw/g0BvqGCH2yYyaPQfag50Qexo/o0M+ccziacMwNGXk0NHPpeOycw5dM0AzkYVyOgT4gQq9neFVtyMjDeB798s7LJkIzkQer8B9YvKyQkeV7Dwa2VzPILGyvppAZ2F7NIc+N7dUk8pzYXs0iz4Xt1TTyHNhe1jpybmyvpXFDIOfE9loaOAxyLmwvIWfG3ne+8NdMdtpLL7X/BTrecqzXWi7yY/9K2PtpHKfbml+Ta/l9nkV+46sVuy8RuTTsvmTkUrD7GpCjY/c1IUfFrhI5GnbVyFGwm0BeGrsp5KWwm0RmYzeNzMIWMgFbyARsIROwhUzAFjIBW8gEbCETsIVM+AunU30Yydcq7am5Shs6b9KevlEbKJVSSimlUG2/AUV10qulEkATAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
}
