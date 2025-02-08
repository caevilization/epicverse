import React, { useState, useEffect } from "react";
import "./AdventurePage.css";
import BlackBackground from "../components/BlackBackground.tsx";
import adventurePage from "../assets/images/adventure-page.png";
import posterOne from "../assets/images/poster-placeholder-one.png";
import posterTwo from "../assets/images/poster-placeholder-two.png";
import newGameOne from "../assets/images/new-game-one.png";
import newGameTwo from "../assets/images/new-game-two.jpg";
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
      src: newGameOne,
      alt: "Game 1",
      title: "Adventure Quest",
      author: "John Doe",
      players: 1234,
    },
    {
      id: 2,
      src: newGameTwo,
      alt: "Game 2",
      title: "Mystery Island",
      author: "Jane Smith",
      players: 856,
    },
    {
      id: 3,
      src: "game-placeholder.jpg",
      alt: "Game 3",
      title: "Coming Soon",
      author: "Unknown",
      players: 0,
    },
    {
      id: 4,
      src: "game-placeholder.jpg",
      alt: "Game 4",
      title: "Coming Soon",
      author: "Unknown",
      players: 0,
    },
    {
      id: 5,
      src: "game-placeholder.jpg",
      alt: "Game 5",
      title: "Coming Soon",
      author: "Unknown",
      players: 0,
    },
    {
      id: 6,
      src: "game-placeholder.jpg",
      alt: "Game 6",
      title: "Coming Soon",
      author: "Unknown",
      players: 0,
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
                  <h3 className="game-title">{game.title || "Coming Soon"}</h3>
                  <div className="game-details">
                    <span className="game-author">
                      by {game.author || "Unknown"}
                    </span>
                    <span className="game-players">
                      {(game.players || 0).toLocaleString()} players
                    </span>
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
