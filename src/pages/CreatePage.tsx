import React, { useState } from "react";
import "./CreatePage.css";
import BlackBackground from "../components/BlackBackground.tsx";
import epicmuse1 from "../assets/epicmuse/epicmuse1.png";
import epicmuse2 from "../assets/epicmuse/epicmuse2.jpg";
import epicmuse3 from "../assets/epicmuse/epicmuse3.jpg";
import epicmuse4 from "../assets/epicmuse/epicmuse4.png";
import epicmuse5 from "../assets/epicmuse/epicmuse5.png";
import epicmuse6 from "../assets/epicmuse/epicmuse6.png";
import createPageDecoration from "../assets/images/create-page-decoration.png";

interface FAQItem {
  question: string;
  answer: string;
}

const CreatePage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [currentMuse, setCurrentMuse] = useState(0);

  const faqItems: FAQItem[] = [
    {
      question: "What is EpicVerse?",
      answer:
        "EpicVerse is an innovative game creation platform that enables creators to easily create, share, and monetize their game ideas. We provide a rich library of resources and intuitive creation tools to help you turn your ideas into reality.",
    },
    {
      question: "How do I start creating?",
      answer:
        "After registering for an EpicVerse account, you can directly enter the creation center. We provide various creation templates and tutorials, making it easy for both beginners and experienced creators to get started. Choose the right tools and begin your creative journey.",
    },
    {
      question: "What types of content can I create?",
      answer:
        "On EpicVerse, you can create various types of game content, including story scripts, character designs, scene materials, sound effects, and music. We support multiple game genres, allowing your creativity to flourish without limitations.",
    },
    {
      question: "How is my work protected?",
      answer:
        "All your creations on EpicVerse are protected by blockchain technology. Each work generates a unique digital certificate, ensuring your intellectual property is fully protected. You can view and manage your work's copyright at any time.",
    },
    {
      question: "How can I share and monetize my work?",
      answer:
        "You can choose to publish your work on the EpicVerse marketplace, setting appropriate prices and usage licenses. When other creators purchase your work, you'll receive corresponding earnings. We provide a transparent revenue-sharing mechanism to ensure creators receive fair returns.",
    },
    {
      question: "What if I encounter problems during creation?",
      answer:
        "We provide comprehensive technical support and community assistance. You can refer to detailed help documentation or seek advice from other creators in the community. If you encounter technical issues, our support team is always ready to assist you.",
    },
  ];

  const museImages = [
    epicmuse1,
    epicmuse2,
    epicmuse3,
    epicmuse4,
    epicmuse5,
    epicmuse6,
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div className="create-page-decoration">
        <img src={createPageDecoration} alt="decoration" />
      </div>
      <BlackBackground height={1040}>
        <div className="epicverse-maker-container">
          <div className="epic-muse">
            <div className="muse-image">
              <img src={museImages[currentMuse]} alt="Epic Muse" />
              <div className="muse-image-overlay">Your EpicMuse</div>
            </div>
            <div className="muse-selector-outer">
              <div className="muse-selector-bg"></div>
              <h3 className="muse-selector-title">Select My Muse</h3>
              <div className="muse-buttons">
                {[...Array(6)].map((_, index) => (
                  <button
                    key={index}
                    className={`muse-button ${
                      index === currentMuse ? "active" : ""
                    }`}
                    onClick={() => setCurrentMuse(index)}
                    style={{ backgroundImage: `url(${museImages[index]})` }}
                  >
                    Muse {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="epicverse-chat">
            <div className="epicverse-chat-bg"></div>
            <div className="chat-container">
              <div className="chat-messages">{/* 消息内容区域 */}</div>
              <div className="chat-input">
                <textarea placeholder="Type your message here..." rows={3} />
                <button className="chat-send">Send</button>
              </div>
            </div>
          </div>
          <div className="maker-steps">
            <div className="step-box blue">Step 1</div>
            <div className="step-box pink">Step 2</div>
            <div className="step-box blue">Step 3</div>
            <button className="generate-button">Go Generate</button>
          </div>
        </div>
      </BlackBackground>
      <div className="create-page-body">
        <div className="epicverse-player-state">BUIDLING</div>
        <div className="epicverse-player-container"></div>
        <div className="faq-section">
          <h2 className="faq-title">EpicVerse FAQ</h2>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <span>{item.question}</span>
                  <span className="faq-icon">
                    {openIndex === index ? "-" : "+"}
                  </span>
                </div>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
