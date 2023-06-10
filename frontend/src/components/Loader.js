import React from "react";
import { CircleNotch } from "phosphor-react";

const Loader = () => {
  return (
    <div className="rounded-full animate-spin">
      <CircleNotch size={24} />
    </div>
  );
};

export default Loader;
