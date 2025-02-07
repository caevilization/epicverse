import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import BlackBackground from "../components/BlackBackground.tsx";
import homeBanner from "../assets/images/home-banner.jpg";
import pageDecoration from "../assets/images/page-decoration.png";

const features = [
  {
    title: "AI-Powered Creation",
    description:
      "Leverage advanced AI to craft immersive, interactive stories effortlessly.",
  },
  {
    title: "No Coding",
    description:
      "With EpicVerse, creating games without writing a single line of code—perfect for all creators.",
  },
  {
    title: "Higher Rewards",
    description:
      "Secure Ownershiip, earn fair and transparent rewards powered by Web3 technology.",
  },
  {
    title: "Co-Creation",
    description:
      "Collaborate with a global community to build shared narratives and unique worlds.",
  },

  {
    title: "Diverse Monetization",
    description:
      "Share your game elements in our treasury to earn revenue or royalties.",
  },
  {
    title: "Limitless Imagination",
    description:
      "No matter how wild your ideas, if you can think it, you can make it.",
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/create");
  };

  return (
    <div>
      <BlackBackground height={941}>
        <div className="home-banner">
          <img src={homeBanner} alt="Welcome to EpicVerse" />
          <div className="welcome-text">
            <p>
              Powered by AI, bring your stories and games to life in a vibrant,
              decentralized Web3 world.
            </p>
            <p className="welcome-link" onClick={handleGetStarted}>
              Your Imagination, Your Rewards! {">>"}
            </p>
          </div>
        </div>
      </BlackBackground>
      <div className="home-content">
        <div className="home-title">
          EpicVerse - Empowering Your Creativity and Earnings!
        </div>
        <div className="home-description">
          {features.map((feature, index) => (
            <div key={index}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="page-decoration-wrapper">
        <img
          src={pageDecoration}
          alt="decoration"
          className="page-decoration"
        />
      </div>
      <div className="call-for-action">
        <div className="call-for-action-title">Begin Your Epic Journey</div>
        <div className="call-for-action-description">
          Unleash your creativity, create interactive stories, and start earning
          today!
        </div>
        <button className="call-for-action-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
