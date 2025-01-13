import type { MetaFunction } from "@remix-run/node";
import { BrickWall, DoorClosed, WindIcon } from "lucide-react";
import { useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import { Map } from "~/components/grondplan/map.client";
import { Tool, Toolbox } from "~/components/ui/toolbox";

export const meta: MetaFunction = () => {
  return [{ title: "Grondplan" }];
};

export default function Grondplan() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const tools = [
    {
      id: "wall",
      name: "Muur",
      icon: BrickWall,
    },
    {
      id: "door",
      name: "Deur",
      icon: DoorClosed,
    },
    {
      id: "window",
      name: "Raam",
      icon: WindIcon,
    },
  ];

  function handleToolClick(tool: Tool) {
    setActiveTool(tool);
  }

  return (
    <div className="container mx-auto flex">
      <Toolbox
        tools={tools}
        onToolClick={handleToolClick}
        activeTool={activeTool}
      />
      <div>
        <ClientOnly fallback={<div>Loading...</div>}>
          {() => <Map />}
        </ClientOnly>
      </div>
    </div>
  );
}
