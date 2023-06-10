import axios from "axios";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "../provider/UserProvider";

const questions = [
  {
    id: 1,
    question: "I was aware of dryness of my mouth.",
  },
  {
    id: 2,
    question: "I couldn't experience any positive feeling at all.",
  },
  {
    id: 3,
    question: "I found it hard to wind down.",
  },
  {
    id: 4,
    question:
      "I experienced breathing difficulty (eg, excessively rapid breathing).",
  },
  {
    id: 5,
    question: "I found it difficult to work up the initiative to do things.",
  },
  {
    id: 6,
    question: "I tended to over-react to situations.",
  },
  {
    id: 7,
    question: "I experienced trembling (eg, in the hands).",
  },
  {
    id: 8,
    question: "I felt that I had nothing to look forward to.",
  },
  {
    id: 9,
    question: "I felt that I was using a lot of nervous energy.",
  },
  {
    id: 10,
    question:
      "I was worried about situations in which I might panic and make a fool of myself.",
  },
  {
    id: 11,
    question: "I felt down-hearted and blue.",
  },
  {
    id: 12,
    question: "I found myself getting agitated.",
  },
  {
    id: 13,
    question: "I felt I was close to panic.",
  },
  {
    id: 14,
    question: "I was unable to become enthusiastic about anything.",
  },
  {
    id: 15,
    question: "I found it difficult to relax.",
  },
  {
    id: 16,
    question:
      "I was aware of the action of my heart in the absence of physical exertion.",
  },
  {
    id: 17,
    question: "I felt I wasn't worth much as a person.",
  },
  {
    id: 18,
    question:
      "I was intolerant of anything that kept me from getting on with what I was doing.",
  },
  {
    id: 19,
    question: "I felt scared without any good reason.",
  },
  {
    id: 20,
    question: "I felt that life wasn't worthwhile.",
  },
  {
    id: 21,
    question: "I felt that I was rather touchy.",
  },
];

const ratings = [
  "0 - Did not apply to me at all",
  "1 - Applied to me to some degree, or some of the time",
  "2 - Applied to me to a considerable degree or a good part of time",
  "3 - Applied to me very much or most of the time",
];

const QuestionTable = ({ setSecondStep, setDasScores }) => {
  const [formData, setFormData] = useState({});
  const onFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [`q${Number(e.target.name) + 1}`]: e.target.value,
    }));
  };

  const calculateScore = async () => {
    try {
      const body = { ...formData };
      const response = await axios.request({
        url: "http://127.0.0.1:8000/calculate",
        method: "POST",
        data: body,
      });
      setSecondStep(true);
      setDasScores({ ...response.data });
    } catch (e) {
      console.log(e);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    calculateScore();
  };

  return (
    <>
      <div className="w-full flex text-xl my-8">
        <div className="font-bold mr-auto">Questions</div>
        <div className="font-bold flex">
          {[0, 1, 2, 3].map((val, colIdx) => (
            <div className="w-6 h-6 mr-6">{val}</div>
          ))}
        </div>
      </div>
      <div className="flex flex-col mb-8">
        <div className="w-full">
          <form onChange={onFormChange} onSubmit={onFormSubmit}>
            {questions.map((ques, rowIdx) => (
              <div className="flex mb-8" key={rowIdx}>
                <div className="text-xl mr-auto w-[600px]">{ques.question}</div>
                <div className="flex">
                  {[0, 1, 2, 3].map((val, colIdx) => (
                    <input
                      className="radio radio-primary mr-6"
                      key={colIdx}
                      type="radio"
                      name={rowIdx}
                      value={val}
                    />
                  ))}
                </div>
              </div>
            ))}
            <button className="btn btn-primary w-full my-4">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

const QuestionTable2 = () => {};

const Dass = () => {
  const [secondStep, setSecondStep] = useState(false);
  const [dasScores, setDasScores] = useState({});
  const { user } = useUser();

  const saveToDB = async (submission) => {
    try {
      const body = {
        result: submission,
        type: "answers",
      };
      const response = await axios.request({
        url: `http://localhost:5000/report/${user.id}`,
        method: "POST",
        data: body,
        withCredentials: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full bg-base-200">
      <Navbar transparentBg />
      <div className="py-14 px-64">
        <p className="text-5xl font-bold mb-12">Let's Answer The Quiz! 😇</p>
        <div className="text-xl">
          <p className="mb-8">
            Please read each statement and circle a number 0, 1, 2 or 3 which
            indicates how much the statement applied to you over the past week.
            There are no right or wrong answers. Do not spend too much time on
            any statement.
          </p>
          <p className="mb-4">The rating scale is as follows:</p>
          {ratings.map((str) => (
            <p className="font-medium mb-1">{str}</p>
          ))}
        </div>
        {secondStep ? (
          <QuestionTable2 dasScores={dasScores} />
        ) : (
          <QuestionTable
            setSecondStep={setSecondStep}
            setDasScores={setDasScores}
          />
        )}
      </div>
    </div>
  );
};

export default Dass;
