"use client";

import { createPortal } from "react-dom";

export default function Modal({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  return isOpen
    ? createPortal(
        <div className="w-screen h-screen absolute z-40 bg-transparent backdrop-blur flex items-center justify-center">
          <aside className="relative bg-white w-[60%] h-[60%] rounded-lg p-4 flex flex-col items-center shadow-md drop-shadow-sm">
            <button type="button" onClick={onClose}>
              X
            </button>
            {children}
          </aside>
        </div>,
        document.getElementById("modal-root") as HTMLElement,
      )
    : null;
}
