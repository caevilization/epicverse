import React, { useState, useEffect } from "react";
import "./AdventurePage.css";
import BlackBackground from "../components/BlackBackground.tsx";
import adventurePage from "../assets/images/adventure-page.png";
import posterOne from "../assets/images/poster-placeholder-one.png";
import posterTwo from "../assets/images/poster-placeholder-two.png";
import newGameOne from "../assets/images/new-game-one.png";
import newGameTwo from "../assets/images/new-game-two.jpg";
import game1 from "../assets/images/game1.png";
import game2 from "../assets/images/game2.png";
import game3 from "../assets/images/game3.png";
import game4 from "../assets/images/game4.png";
import game5 from "../assets/images/game5.png";
import game6 from "../assets/images/game6.png";
import { Link } from "react-router-dom";

const AdventurePage: React.FC = () => {
  const [currentPoster, setCurrentPoster] = useState(0);
  const posters = [
    { src: posterOne, alt: "Featured activity 1" },
    { src: posterTwo, alt: "Featured activity 2" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPoster((prev) => (prev + 1) % posters.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [posters.length]);

  // 创建固定顺序的游戏列表
  const games = [
    {
      id: 1,
      src: game1,
      alt: "Game 1",
      title: "Time Travelers",
      author: "Emma Chen",
      players: 2156,
    },
    {
      id: 2,
      src: game2,
      alt: "Game 2",
      title: "Enchanted Academy",
      author: "Alex Rivera",
      players: 1893,
    },
    {
      id: 3,
      src: game3,
      alt: "Game 3",
      title: "Cyber Detective",
      author: "Sarah Kim",
      players: 1567,
    },
    {
      id: 4,
      src: game4,
      alt: "Game 4",
      title: "Ocean's Secret",
      author: "Michael Zhang",
      players: 1342,
    },
    {
      id: 5,
      src: game5,
      alt: "Game 5",
      title: "Space Pirates",
      author: "David Wilson",
      players: 986,
    },
    {
      id: 6,
      src: game6,
      alt: "Game 6",
      title: "Dream Walker",
      author: "Luna Park",
      players: 754,
    },
  ];

  return (
    <div>
      <BlackBackground height={48}>
        <div className="adventure-banner-wrapper">
          <img
            src={adventurePage}
            alt="Adventure background"
            className="adventure-banner"
          />
          <div className="adventure-content">
            <p className="adventure-title">ADVENTURE</p>
            <p className="adventure-description">
              Dive into EpicVerse and discover amazing works from players
              worldwide. Experience interactive stories, unique game designs,
              and get inspired by the creativity of our community. Ready to
              share your own masterpiece?
            </p>
          </div>
        </div>
      </BlackBackground>
      <div className="page-body">
        <div className="featured-section">
          <div className="featured-poster">
            {posters.map((poster, index) => (
              <img
                key={index}
                src={poster.src}
                alt={poster.alt}
                className={`poster-slide ${
                  index === currentPoster ? "active" : ""
                }`}
              />
            ))}
            <div className="poster-indicators">
              {posters.map((_, index) => (
                <span
                  key={index}
                  className={`indicator ${
                    index === currentPoster ? "active" : ""
                  }`}
                  onClick={() => setCurrentPoster(index)}
                />
              ))}
            </div>
          </div>
          <div className="new-games">
            <div className="new-game-item">
              <img src={newGameOne} alt="New game 1" />
              <span className="new-badge">NEW!!</span>
              <div className="new-game-info">
                <span className="new-game-title">Adventure Quest</span>
                <span className="new-game-author">by John Doe</span>
              </div>
            </div>
            <div className="new-game-item">
              <img src={newGameTwo} alt="New game 2" />
              <span className="new-badge">NEW!!</span>
              <div className="new-game-info">
                <span className="new-game-title">Mystery Island</span>
                <span className="new-game-author">by Jane Smith</span>
              </div>
            </div>
          </div>
        </div>
        <div className="all-games">
          <div className="game-grid">
            {games.map((game) => (
              <div key={game.id} className="game-item">
                <img src={game.src} alt={game.alt} />
                <div className="game-info">
                  <div className="adv-game-title">
                    {game.title || "Coming Soon"}
                  </div>
                  <div className="game-info-bottom">
                    <div className="game-author">
                      by {game.author || "Unknown"}
                    </div>
                    <div className="game-players">
                      <i className="player-icon"></i>
                      {(game.players || 0).toLocaleString()} players
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="create-button-container">
          <Link to="/create" className="create-button">
            Create My Own Game →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdventurePage;
