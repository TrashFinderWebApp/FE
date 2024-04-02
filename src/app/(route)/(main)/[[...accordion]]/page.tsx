"use client";

import FindTrashCan from "../_components/findtrashcan/findtrashcan";
import RegisterTrashCan from "../_components/registertrashcan/registertrashcan";
import Navigation from "../_components/navigation/navigation";

const selectedAccordion = (accordion: string) => {
  switch (accordion) {
    case "FindLocation":
      return <FindTrashCan />;
    case "AddLocation":
      return <RegisterTrashCan />;
    case "GetDirection":
      return <Navigation />;
    default:
      return <FindTrashCan />;
  }
};

export default function Main({ params }: { params: { accordion: string[] } }) {
  return selectedAccordion(params.accordion?.[0] || "");
}
