"use client";

import { createPortal } from "react-dom";

export default function Modal({
  children,
  isOpen,
  onClose,
  className,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}) {
  return isOpen
    ? createPortal(
        <div className="w-screen h-screen absolute z-40 bg-transparent backdrop-blur flex items-center justify-center">
          <aside
            className={`relative bg-white rounded-lg p-4 flex flex-col gap-4 items-center shadow-md drop-shadow-sm${className?.length ? ` ${className}` : ""}`}
          >
            <button
              className="place-self-end font-bold text-lg"
              type="button"
              onClick={onClose}
            >
              X
            </button>
            {children}
          </aside>
        </div>,
        document.getElementById("modal-root") as HTMLElement,
      )
    : null;
}
