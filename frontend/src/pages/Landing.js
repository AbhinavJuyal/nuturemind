import React, { useState } from "react";
import Navbar from "../components/Navbar";
import bg from "../assets/head.svg";
import StepLadder from "../components/StepLadder";
import { Link } from "react-router-dom";
import depression from "../assets/depression.png";
import anxiety from "../assets/anxiety.png";
import stress from "../assets/stress.png";

const Card = ({ title, description }) => {
  return (
    <div className="card w-96 h-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

const CardWithImage = ({ title, description, src }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={src} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="relative bg-[#F5F5F5] flex justify-center items-center py-32">
      <div className="flex">
        <img src={bg} className="h-[400px] mr-16" />
        <div>
          <p className="text-primary-content text-6xl font-bold mt-14 mb-6">
            Assess Your
            <br />
            Mental Health
            <br />
            with Ease
          </p>
          <p className="max-w-lg text-lg mb-6">
            Generate report for Depression, Stress, and Anxiety through Face
            Detection and DASS-21 Questionnaire
          </p>
          <button className="btn btn-primary">
            <Link to="/signin">
              <span>Start</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const [index, setIndex] = useState(0);

  const values = [
    "Register",
    "Face Recoginition",
    "Let's answer the quiz 😇",
    "Generate Report",
  ];

  const descriptions = [
    "Unlock the Benefits of Registering on Our Platform. Register on our platform and go through the next steps. Registering on our platform unlocks a multitude of advantages, providing you with a holistic and personalized approach to mental health. Take advantage of the comprehensive assessment. Join us today and empower yourself on your path to mental well-being.",
    "Our advanced face detection technology analyzes facial expressions and micro-expressions to detect emotional states related to depression, stress, and anxiety.",
    "Complete the DASS-21 questionnaire, a widely recognized assessment tool that measures the severity of depression, anxiety, and stress. Your responses will help us gain a comprehensive understanding of your mental health.",
    "Based on the analysis of your facial expressions and questionnaire responses, we provide you with personalized results and a detailed report that outlines your levels of depression, stress, and anxiety. This information can help you gain valuable insights into your mental well-being.",
  ];

  const onStepEnter = (e) => {
    const id = e.target.dataset.id;
    setIndex(id ?? 0);
  };

  const eventHandlers = {
    onEnter: onStepEnter,
  };

  return (
    <div className="bg-primary-content py-24 h-[672px]">
      <p className="text-white text-6xl text-center font-semibold mb-20">
        How It Works
      </p>
      <div className="flex items-center justify-center">
        <div className="flex max-w-2xl items-stretch">
          <div className="flex-shrink-0">
            <StepLadder
              vertical
              values={values}
              eventHandlers={eventHandlers}
            />
          </div>
          <div className="ml-12">
            <Card title={values[index]} description={descriptions[index]} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Explaination = () => {
  const values = [
    {
      title: "Depression",
      description:
        "Depression is more than just feeling sad or going through temporary periods of low mood. It is a persistent and prolonged state of emotional, psychological, and physical distress that significantly impairs your ability to function and enjoy life. Common symptoms of depression include persistent sadness, loss of interest in activities, changes in appetite or sleep patterns, feelings of worthlessness or guilt, difficulty concentrating, and thoughts of self-harm or suicide.",
      src: depression,
    },
    {
      title: "Anxiety",
      description:
        "Anxiety is a natural human response to stress or perceived threats. It is a complex emotion that manifests as a feeling of unease, worry, or fear. While experiencing anxiety on occasion is normal, persistent or excessive anxiety can significantly impact daily life, relationships, and overall well-being. In this section, we will explore the nature of anxiety, its symptoms, causes, and strategies for managing and coping with this challenging emotion.",
      src: anxiety,
    },
    {
      title: "Stress",
      description:
        "Stress is the body's response to demanding situations, triggering a 'fight-or-flight' reaction. It can be caused by various factors such as work pressures, financial difficulties, or major life changes. Symptoms include physical tension, fatigue, anxiety, and changes in mood or appetite. Effective stress management involves identifying stressors, practicing relaxation techniques, prioritizing self-care, seeking support, and adopting healthy coping mechanisms.",
      src: stress,
    },
  ];
  return (
    <div className="bg-base-200 p-32">
      <div className="text-center font-bold text-5xl mb-16">
        Our Focus
      </div>
      <div className="w-full flex justify-between items-center">
        {values.map(({ title, description, src }, idx) => (
          <CardWithImage
            key={idx}
            title={title}
            description={description}
            src={src}
          />
        ))}
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, message });
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block mb-2 font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            rows="4"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="inline-block px-6 py-3 font-semibold text-white bg-emerald-500 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] text-primary-content">
      <div className="container mx-auto py-32" id="contact">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-6xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg mb-8">
            Ready to take the first step towards a happier and healthier life?
            Reach out to us today!
          </p>
        </div>
        <ContactForm />
      </div>
    </footer>
  );
};

const Landing = () => {
  // bg-gradient-to-r from-green-400 to-blue-500
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Explaination />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
