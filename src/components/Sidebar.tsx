import React from "react";

function Sidebar() {
  return (
    <header className="relative flex flex-col w-76px h-lvh bg-dark-blue">
      <h1>쓰파인더</h1>
      <nav className="absolute h-490px w-90 left-0 bottom-0  flex flex-col rounded-tr-lg bg-white justify-between">
        <span>123123</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
      </nav>
    </header>
  );
}

export default Sidebar;
