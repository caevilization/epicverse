import React, { useState } from "react";
import "./TreasuryPage.css";
import BlackBackground from "../components/BlackBackground.tsx";
import treasuryPage from "../assets/images/treasury-page.png";
import image1 from "../assets/placeholder/image1.jpg";
import image2 from "../assets/placeholder/image2.jpg";
import image3 from "../assets/placeholder/image3.png";
import scriptBackground from "../assets/images/script-background.png";
import audioBackground from "../assets/images/audio-background.png";

// 添加资源类型枚举
type ResourceType = "poster" | "script" | "audio";

// 添加表单数据接口
interface FormData {
  type: ResourceType;
  title: string;
  description: string;
  file: File | null;
  price: string;
}

const TreasuryPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    type: "poster",
    title: "",
    description: "",
    file: null,
    price: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: 处理表单提交
    setShowModal(false);
    alert("Coming Soon! Your creation will be listed here soon! 🚀");
  };

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
          price: "0.01 SUI",
        },
        {
          type: "poster",
          src: image2,
          alt: "Poster 2",
          title: "Mystery Poster",
          author: "Jane Smith",
          description: "Dark and moody atmosphere for mystery games",
          price: "0.02 SUI",
        },
        {
          type: "poster",
          src: image3,
          alt: "Poster 3",
          title: "Fantasy Poster",
          author: "Mike Wilson",
          description: "Magical scenery for fantasy adventure games",
          price: "0.015 SUI",
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
            "A thrilling journey through mysterious lands where the hero must save the world from an evil force. And the hero is a girl.",
          author: "John Doe",
          price: "0.05 SUI",
        },
        {
          type: "script",
          title: "Mystery Tale",
          content: "Uncover the secrets hidden in the shadows...",
          author: "Jane Smith",
          price: "0.03 SUI",
        },
        {
          type: "script",
          title: "Fantasy Quest",
          content: "Embark on an epic journey in a magical realm...",
          author: "Mike Johnson",
          price: "0.04 SUI",
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
          price: "0.03 SUI",
        },
        {
          type: "audio",
          title: "Sound Effects",
          content:
            "High-quality sound effects collection for various game scenarios",
          author: "Sarah Williams",
          price: "0.02 SUI",
        },
        {
          type: "audio",
          title: "Voice Acting",
          content:
            "Professional voice acting for character dialogues and narration",
          author: "Michael Brown",
          price: "0.04 SUI",
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

        {/* 添加发布按钮容器 */}
        <div className="post-button-container">
          <button className="post-button" onClick={() => setShowModal(true)}>
            Post Your Creation
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Submit Your Creation</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Resource Type</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as ResourceType,
                    })
                  }
                >
                  <option value="poster">Poster</option>
                  <option value="script">Script</option>
                  <option value="audio">Audio</option>
                </select>
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Price (SUI)</label>
                <input
                  type="number"
                  step="0.001"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Upload File</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      file: e.target.files ? e.target.files[0] : null,
                    })
                  }
                  required
                />
              </div>

              <div className="modal-buttons">
                <button type="submit" className="submit-button">
                  Submit
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreasuryPage;
