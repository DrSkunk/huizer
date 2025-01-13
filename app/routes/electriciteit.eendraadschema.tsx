import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Eéndraadschema" }];
};

export default function Eendraadschema() {
  return <div className="">Eendraadschema</div>;
}
