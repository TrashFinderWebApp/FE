"use client";

import { useContext } from "react";
import { mapContext } from "../layout";

export default function registerationPage() {
  const { map } = useContext(mapContext);
  console.log(map);
}
