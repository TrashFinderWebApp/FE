"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  isOpen,
  onClose,
  className,
  title,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  title?: string;
}) {
  const [element, setElement] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setElement(document.getElementById("modal-root"));
  }, []);

  return isOpen && element
    ? createPortal(
        <>
          <div className="w-screen h-svh absolute z-30 bg-transparent backdrop-blur" />
          <aside
            className={`absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] bg-white z-50 rounded-lg p-4 flex flex-col gap-4 items-center shadow-md drop-shadow-sm${className?.length ? ` ${className}` : ""}`}
          >
            <div className="flex w-full justify-between">
              {title && <h2 className="text-xl font-bold">{title}</h2>}
              <button
                className="place-self-end font-bold text-lg"
                type="button"
                onClick={onClose}
              >
                X
              </button>
            </div>
            {children}
          </aside>
        </>,
        element,
      )
    : null;
}
