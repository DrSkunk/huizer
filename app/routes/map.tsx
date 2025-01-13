import type { MetaFunction } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { LoadFile } from "~/components/load-file";
import { Map2d } from "~/components/map-2d/map-2d.client";
import { SaveFile } from "~/components/save-file";
import type { House } from "~/domain/house";
import { Button } from "~/components/ui/button";
import { Blinds, BrickWall, DoorClosed } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Huizer" },
    { name: "description", content: "Huizer? I hardly know her." },
  ];
};

export default function Index() {
  const [house] = useOutletContext() as [
    House,
    React.Dispatch<React.SetStateAction<House>>,
  ];

  if (house === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen">
      <div className="flex gap-4">
        <LoadFile />
        <SaveFile />
      </div>
      <div className="absolute z-10 flex flex-col gap-3 rounded-xl border bg-white px-3 py-3">
        <Button variant="outline" size="icon">
          <BrickWall />
        </Button>
        <Button variant="outline" size="icon">
          <DoorClosed />
        </Button>
        <Button variant="outline" size="icon">
          <Blinds />
        </Button>
      </div>
      <Map2d layout={house.layout} />
    </div>
  );
}
