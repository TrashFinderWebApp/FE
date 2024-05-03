"use client";

import FindTrashCan from "../_components/findtrashcan/findtrashcan";
import RegisterTrashCan from "../_components/registertrashcan/registertrashcan";
import Navigation from "../_components/navigation/navigation";
import Home from "../_components/home/home";
import Ranking from "../_components/ranking/ranking";
import Notice from "../_components/notice/notice";

const selectedAccordion = (accordion: string[]) => {
  const lowerAccordion = accordion.length > 0 ? accordion[0].toLowerCase() : "";
  switch (lowerAccordion) {
    case "findlocation":
      return <FindTrashCan />;
    case "addlocation":
      return <RegisterTrashCan />;
    case "getdirection": {
      const lat = accordion[1];
      const lng = accordion[2];

      if (lat && lng) {
        return (
          <Navigation
            end={{
              lat: Number(lat),
              lng: Number(lng),
            }}
          />
        );
      }

      return <Navigation />;
    }
    case "ranking":
      return <Ranking />;
    case "notice":
      return <Notice />;
    default:
      return <Home />;
  }
};

export default function Main({ params }: { params: { accordion: string[] } }) {
  return selectedAccordion(params.accordion ?? []);
}
