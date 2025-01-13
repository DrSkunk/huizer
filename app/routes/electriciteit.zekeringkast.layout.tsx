import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Zekeringkast layout" }];
};

export default function ZekeringkastLayout() {
  return <div className="">Zekeringkast layout</div>;
}
