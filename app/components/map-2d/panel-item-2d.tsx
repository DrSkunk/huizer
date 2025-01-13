import { defaults, PanelItemType, type PanelItem } from "~/domain/layout";
import { Rect, Image } from "react-konva";
import { Outlet } from "../symbols/outlet";
import { useState, useEffect } from "react";

export function PanelItem2D({ panelItem }: { panelItem: PanelItem }) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const svgData = `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
              <g
          stroke="currentColor"
          fill="none"
        >
          <line x1="0" y1="10" x2="12" y2="10" />
          <path d="M 20 2 A 1 1 0 0 0 20 18" />
          {/* Aarding */}
          <line x1="12" y1="2" x2="12" y2="18" />
          {/* Kinderbescherming */}
          <line x1="20" y1="0" x2="20" y2="2" />
          <line x1="20" y1="18" x2="20" y2="20" />
        </g>
    </svg>
  `;

  useEffect(() => {
    const img = new window.Image();
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    img.onload = () => {
      setImage(img);
    };
  }, [svgData]);

  switch (panelItem.type) {
    case PanelItemType.OUTLET: {
      let amount = panelItem.amount || defaults.outlet.amount;
      // return <Outlet amount={amount} />
      return <Image image={image} x={0} y={0} width={50} height={50} />;
    }
    case "light-switch": {
      return <Rect x={0} y={0} width={10} height={10} fill="yellow" />;
    }
  }
}
