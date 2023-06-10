import React from "react";

const StepLadder = ({
  values,
  vertical = false,
  dark = false,
  eventHandlers,
}) => {
  const { onEnter, onLeave, onClick } = eventHandlers;

  return (
    <div className="mx-10 my-6">
      <ul
        className={`steps ${
          vertical ? "steps-vertical" : ""
        } scale-125 font-medium ${
          dark ? "text-primary-content" : "text-white"
        }`}
      >
        {values.map((value, idx) => (
          <li
            key={idx}
            className="font-base step step-primary"
            onMouseEnter={(e) => onEnter && onEnter(e)}
            onMouseLeave={(e) => onLeave && onLeave(e)}
            onClick={(e) => onClick && onClick(e)}
            data-id={idx}
          >
            <div className="border-2 border-transparent hover:border-white cursor-pointer rounded-lg">
              <div className="p-2">{value}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepLadder;
