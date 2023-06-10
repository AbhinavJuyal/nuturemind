import React from "react";
import Navbar from "../components/Navbar";
import { useUser } from "../provider/UserProvider";

const Results = () => {
  const { user } = useUser();
  const [expression, expressionValue] = Object.entries(user.face)[0];

  return (
    <div className="bg-[#F5F5F5] w-full h-full">
      <Navbar />
      <div className="py-10 px-64">
        <div className="text-5xl font-bold mb-8">Results</div>
        <div className="flex items-center w-full justify-center">
          <div
            className="radial-progress"
            style={{ "--value": expressionValue * 100, "--size": "8rem" }}
          >
            <div className="text-2xl">{Math.floor(expressionValue * 100)}%</div>
          </div>
          <div className="text-2xl font-bold capitalize ml-8">{expression}</div>
        </div>
      </div>
    </div>
  );
};

export default Results;
