import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Situatieschema" }];
};

export default function Situatieschema() {
  return <div className="">Situatieschema</div>;
}
