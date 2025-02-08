import React from "react";
import "./TreasuryPage.css";
import BlackBackground from "../components/BlackBackground.tsx";
import treasuryPage from "../assets/images/treasury-page.png";
import image1 from "../assets/placeholder/image1.jpg";
import image2 from "../assets/placeholder/image2.jpg";
import scriptBackground from "../assets/images/script-background.png";
import audioBackground from "../assets/images/audio-background.png";

const TreasuryPage: React.FC = () => {
  const sections = [
    {
      title: "Poster Materials",
      description:
        "Discover and use amazing posters created by our community. Each poster tells its own story and sets the perfect mood for your game.",
      items: [
        {
          type: "poster",
          src: image1,
          alt: "Poster 1",
          title: "Adventure Poster",
          author: "John Doe",
          description: "A mysterious forest scene perfect for adventure games",
          price: "0.01 SOL",
        },
        {
          type: "poster",
          src: image2,
          alt: "Poster 2",
          title: "Mystery Poster",
          author: "Jane Smith",
          description: "Dark and moody atmosphere for mystery games",
          price: "0.02 SOL",
        },
        {
          type: "poster",
          src: image1,
          alt: "Poster 3",
          title: "Fantasy Poster",
          author: "Mike Wilson",
          description: "Magical scenery for fantasy adventure games",
          price: "0.015 SOL",
        },
      ],
      layout: "text-left",
    },
    {
      title: "Story Scripts",
      description:
        "Browse through a collection of engaging scripts written by our talented community members. Find inspiration or use them directly in your game.",
      items: [
        {
          type: "script",
          title: "Adventure Script",
          content:
            "A thrilling journey through mysterious lands where the hero must save the world from an evil force. And the hero is a girl. She is a girl who is a hero.A thrilling journey through mysterious lands where the hero must save the world from an evil force. And the hero is a girl. She is a girl who is a hero.A thrilling journey through mysterious lands where the hero must save the world from an evil force. ",
          author: "John Doe",
          price: "0.05 SOL",
        },
        {
          type: "script",
          title: "Mystery Tale",
          content: "Uncover the secrets hidden in the shadows...",
          author: "Jane Smith",
          price: "0.03 SOL",
        },
        {
          type: "script",
          title: "Fantasy Quest",
          content: "Embark on an epic journey in a magical realm...",
          author: "Mike Johnson",
          price: "0.04 SOL",
        },
      ],
      layout: "text-right",
    },
    {
      title: "Audio Resources",
      description:
        "Enhance your game with our collection of background music and sound effects. From peaceful melodies to intense action tracks.",
      items: [
        {
          type: "audio",
          title: "Background Music",
          content:
            "Immersive orchestral soundtrack perfect for epic adventure scenes",
          author: "David Chen",
          price: "0.03 SOL",
        },
        {
          type: "audio",
          title: "Sound Effects",
          content:
            "High-quality sound effects collection for various game scenarios",
          author: "Sarah Williams",
          price: "0.02 SOL",
        },
        {
          type: "audio",
          title: "Voice Acting",
          content:
            "Professional voice acting for character dialogues and narration",
          author: "Michael Brown",
          price: "0.04 SOL",
        },
      ],
      layout: "text-left",
    },
  ];

  const renderItem = (item: any) => {
    switch (item.type) {
      case "poster":
        return (
          <>
            <div className="item-image">
              <img src={item.src} alt={item.alt} />
            </div>
            <div className="item-info">
              <h3>{item.title}</h3>
              <p className="item-description">{item.description}</p>
              <div className="item-details">
                <span className="item-author">by {item.author}</span>
                <span className="item-price">{item.price}</span>
              </div>
            </div>
          </>
        );
      case "script":
        return (
          <>
            <div className="script-background">
              <img src={scriptBackground} alt="Script background" />
            </div>
            <div className="script-content">
              <h3>{item.title}</h3>
              <p className="script-preview">{item.content}</p>
              <div className="script-details">
                <span className="script-author">by {item.author}</span>
                <span className="script-price">{item.price}</span>
              </div>
            </div>
          </>
        );
      case "audio":
        return (
          <>
            <div className="audio-background">
              <img src={audioBackground} alt="Audio background" />
            </div>
            <div className="audio-content">
              <h3>{item.title}</h3>
              <p className="audio-preview">{item.content}</p>
              <div className="audio-details">
                <span className="audio-author">by {item.author}</span>
                <span className="audio-price">{item.price}</span>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div>
      <BlackBackground height={48}>
        <div className="treasury-banner-wrapper">
          <img
            src={treasuryPage}
            alt="Treasury background"
            className="treasury-banner"
          />
          <div className="treasury-content">
            <p className="treasury-title">TREASURY</p>
            <p className="treasury-description">
              Welcome to the EpicVerse Treasury, your creative asset
              marketplace. Discover unique game elements, purchase premium
              assets, or earn by sharing your creations. Every asset is secured
              by blockchain technology, ensuring authentic ownership and fair
              rewards.
            </p>
          </div>
        </div>
      </BlackBackground>
      <div className="treasury-page-body">
        {sections.map((section, index) => (
          <section key={index} className="treasury-materials">
            <div className={`materials-content ${section.layout}`}>
              <div className="materials-text">
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>
              <div
                className={`materials-items ${
                  section.items[0].type === "script" ? "scripts" : ""
                }`}
              >
                {section.items.map((item, i) => (
                  <div key={i} className={`material-item ${item.type}`}>
                    {renderItem(item)}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TreasuryPage;
