import React from "react";
import { Button } from "@/components";

type TConstructionType = {
  value: string;
  clickHandler: (v: string) => void;
};
const ConstructionType = ({ value, clickHandler }: TConstructionType) => {
  return (
    <div>
      <p className="font-bold">Construction</p>
      <div className="flex gap-3.5">
        <Button
          title="Issue"
          color={value === "issue" ? "black" : "white"}
          onClick={() => clickHandler("issue")}
          className="rounded-2xl py-2.5 px-5 border border-stroke-gray"
        />
        <Button
          title="Conceptual"
          color={value === "conceptual" ? "black" : "white"}
          onClick={() => clickHandler("conceptual")}
          className="rounded-2xl py-2.5 px-5 border border-stroke-gray"
        />
      </div>
    </div>
  );
};

export default ConstructionType;
