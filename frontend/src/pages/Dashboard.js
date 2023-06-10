import React, { useEffect } from "react";
import { ArrowCircleRight } from "phosphor-react";

import { useUser } from "../provider/UserProvider";

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const stepRouteMapping = ["/face", "/dass", "/report"];

const StartPage = ({ step }) => {
  return (
    <>
      <div className="text-xl text-center mb-16">
        We understand that mental health is important, and your input can help
        us assess your current state. By answering the following questions, we
        aim to gain insights into your levels of depression, anxiety, and
        stress. Your responses will remain confidential, and this questionnaire
        is not a substitute for professional diagnosis. Let's begin, and thank
        you for your participation!
      </div>
      <Link to={stepRouteMapping[step - 1]}>
        <button className="block w-1/2 btn btn-primary mx-auto">
          {step === 1 ? "Start" : step === 3 ? "Show Report" : "Next"}
        </button>
      </Link>
    </>
  );
};

const IntermediatePage = () => {
  return (
    <>
      <div className="text-2xl font-semibold mb-2">
        Next Step: DASS Questionnaire
      </div>
      <a className="flex items-center font-bold cursor-pointer mb-6 text-xl">
        <span className="mr-2">Continue where you left off</span>
        <ArrowCircleRight size={32} />
      </a>
      <div className="text-xl">
        You're only few steps away from finishing your report.
      </div>
    </>
  );
};

const ProgressBar = ({ step }) => {
  const arr = [
    "Register",
    "Face Recoginition",
    "Questionnaire",
    "Generate Report",
  ];

  const allSteps = arr.map((text, index) => (
    <li
      className={`font-base step ${step >= index + 1 ? "step-primary" : ""}`}
    >
      {text}
    </li>
  ));

  return (
    <div className="mb-12 flex justify-center text-lg">
      <ul className="font-medium steps steps-horizontal scale-125">
        {allSteps}
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useUser();
  const { step } = user;
  return (
    <div className="w-full h-[100vh] bg-base-200">
      <Navbar transparentBg />
      <div className="py-14 px-64">
        <h1 className="text-5xl font-bold mb-12">Progress</h1>
        <ProgressBar step={step} />
        <div className="mb-8">
          <StartPage step={step} />
          {/* <IntermediatePage /> */}
        </div>
        <div className="w-full bg-primary"></div>
      </div>
    </div>
  );
};

export default Dashboard;
