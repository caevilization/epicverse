import React, { useState, useEffect, useRef } from "react";
import "./CreatePage.css";
import engineDecoration from "../assets/images/banner-decoration.png";
import epicmuse1 from "../assets/epicmuse/epicmuse1.png";
import epicmuse2 from "../assets/epicmuse/epicmuse2.png";
import epicmuse3 from "../assets/epicmuse/epicmuse3.png";
import epicmuse4 from "../assets/epicmuse/epicmuse4.png";
import step1BoxDecoration from "../assets/images/step1-box-decoration.jpg";
import storyUi from "../assets/images/story-ui.jpg";
import character1 from "../assets/materials/character1.png";
import character2 from "../assets/materials/character2.png";
import character3 from "../assets/materials/character3.png";
import character4 from "../assets/materials/character4.png";
import upLoadDecoration from "../assets/decorations/confirm-stamp.png";
import step3Decoration from "../assets/decorations/storyline-decoration.png";
import coverImage from "../assets/materials/cover.png";
import scenario1 from "../assets/materials/scenario1.png";
import scenario2 from "../assets/materials/scenario2.png";
import scenario3 from "../assets/materials/scenario3.png";
import scenario4 from "../assets/materials/scenario4.png";
import scenario5 from "../assets/materials/scenario5.png";
import pageDecoration from "../assets/decorations/page-decoration.png";
import { sendMessage } from "../services/api.ts";

interface FAQItem {
  question: string;
  answer: string;
}

interface Dialogue {
  character: string;
  text: string;
  image: string;
  position: "left" | "center" | "right";
  scenario?: string;
  effect?: "fadeIn" | "slideLeft" | "slideRight";
  isEnding?: boolean;
}

interface Message {
  text: string;
  isUser: boolean;
  timestamp?: number;
}

interface DialogueScript {
  question: string;
  answer: string;
}

interface StepData {
  storyUI: string | null;
  characters: Array<{
    name: string;
    image: string;
  }> | null;
  storylineConfirmed: boolean;
}

interface Muse {
  id: number;
  name: string;
  image: string;
}

const CreatePage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [currentMuse, setCurrentMuse] = useState(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBuilding, setIsBuilding] = useState(true);
  const [progress, setProgress] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const [showGameScene, setShowGameScene] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(scenario1);
  const [isLoading, setIsLoading] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const [stepData, setStepData] = useState<StepData>({
    storyUI: null,
    characters: null,
    storylineConfirmed: false,
  });
  const [showPlayer, setShowPlayer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const muses: Muse[] = [
    {
      id: 1,
      name: "Zeta",
      image: epicmuse1,
    },
    {
      id: 2,
      name: "Hana",
      image: epicmuse2,
    },
    {
      id: 3,
      name: "Aurora",
      image: epicmuse3,
    },
    {
      id: 4,
      name: "Yuè Yáo",
      image: epicmuse4,
    },
  ];

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

  const dialogues: Dialogue[] = [
    {
      character: "Lori",
      text: "It's my first day at the new school. I've met some friendly classmates, but I can't bring myself to respond. ",
      image: character1,
      position: "center",
      scenario: scenario1,
    },
    {
      character: "Lori",
      text: "My past is too heavy... All I want now is some peace and quiet. ",
      image: character1,
      scenario: scenario1,
    },
    {
      character: "",
      text: "Wandering around the campus to clear my mind...",
      image: character1,
      position: "center",
      scenario: scenario1,
    },
    {
      character: "Lori",
      text: "What a beautiful clock tower... But why does it show exactly 14:25 PM? It should be the beginning of the school day.",
      image: character1,
      position: "left",
      scenario: scenario2,
    },
    {
      character: "Lori",
      text: "And there's a boy standing on the tower!",
      image: "",
      position: "center",
      scenario: scenario2,
    },
    {
      character: "???",
      text: "...",
      image: character2,
      position: "right",
      scenario: scenario2,
    },
    {
      character: "Lori",
      text: "Who is he? He's staring at me...",
      image: character1,
      scenario: scenario2,
      position: "left",
    },
    {
      character: "",
      text: "Quickly search for my binoculars in my pocket.",
      scenario: scenario1,
      image: "",
    },
    {
      character: "???",
      text: "Did you see him? The one they say lives in the clock tower.",
      image: character3,
      position: "right",
      scenario: scenario1,
    },
    {
      character: "Lori",
      text: "So the school's strange rumor is true?",
      image: character1,
      scenario: scenario1,
      position: "left",
    },
    {
      character: "???",
      text: "Seems like it. Anyway, see you around.",
      image: character3,
      position: "right",
      scenario: scenario1,
    },
    {
      character: "Lori",
      text: "Strange boy...",
      image: character1,
      scenario: scenario1,
      position: "left",
    },
    {
      character: "Lori",
      text: "I looked back, the boy is no longer on the tower and the time is correct again.",
      image: character1,
      scenario: scenario5,
      position: "left",
    },
    {
      character: "",
      text: "Back in the classroom...",
      scenario: scenario3,
    },
    {
      character: "Teacher",
      text: "Class, please welcome our new student.",
      image: character4,
      position: "left",
      scenario: scenario3,
    },
    {
      character: "Phi",
      text: "I'm Phi, nice to meet you!",
      image: character3,
      position: "right",
      scenario: scenario3,
    },
    {
      character: "Teacher",
      text: "Phi, your seat will be next to Lori.",
      image: character4,
      position: "left",
      scenario: scenario3,
    },
    {
      character: "Phi",
      text: "Hey, dear deskmate.",
      image: character3,
      position: "right",
      scenario: scenario3,
    },
    {
      character: "Lori",
      text: "...",
      image: character1,
      scenario: scenario3,
      position: "center",
    },
    {
      character: "Lori",
      text: "The afternoon passed quickly. As I was about to leave and returned to my desk, I noticed a note on top of my books.",
      image: "",
      scenario: scenario4,
    },
    {
      character: "Phi",
      text: "Hi Lori. I know a little about your past. And I also know you're curious about the boy who lives in the clock tower.",
      image: character3,
      scenario: scenario4,
      position: "center",
    },
    {
      character: "Phi",
      text: "Meet me on the school rooftop at 8:00 tonight. Hope to see you there.",
      image: character3,
      scenario: scenario4,
      position: "center",
    },
    {
      character: "Lori",
      text: "...",
      image: character1,
      scenario: scenario4,
      position: "center",
    },
    {
      character: "Lori",
      text: "...",
      image: character1,
      scenario: scenario4,
      position: "center",
    },
    {
      character: "",
      text: "To be continued...",
      image: "",
      position: "center",
      effect: "fadeIn",
      isEnding: true,
    },
  ];

  const mockDialogues: DialogueScript[] = [
    {
      question: "Hello",
      answer:
        "Hi, I'm your EpicMuse! Welcome to the wonderful world of AVG games. Today, I'll guide you step-by-step through creating your very first AVG game—just follow my lead!",
    },
    {
      question: "Show me!",
      answer:
        "Absolutely! Let's break it down into three simple steps. First, I recommend starting with a Japanese school mystery story. Japan is renowned for its AVG and galgame culture, and it's the perfect theme to kick off your creative journey!",
    },
    {
      question: "Sounds good",
      answer:
        "Great choice! Based on this theme, I recommend a UI style featuring soft pastel colors and an anime-inspired aesthetic. Does this sound like a good fit for your story?",
    },
    {
      question: "I confirm the ui style",
      answer:
        "Fantastic! Now, take a look at the sample image I've generated for you on the right side. Next up, let's bring your story to life with some characters. I suggest three main roles: the heroine Lori, a mysterious male lead, and a supporting male character named Phi. How does that sound?",
    },
    {
      question: "A classic character lineup. What about their designs?",
      answer:
        "I'm glad you like it! Based on the UI style we chose earlier, I've curated some publicly shared, free-to-use character illustrations from the community. They're a perfect match for your story. If you're happy with them, just confirm, and we'll move forward!",
    },
    {
      question: "The character designs are great and ok with me!",
      answer:
        "Wonderful! With the characters all set, it's time to craft the first scene of your story: *Lori arrives at a new school with a mysterious clock tower legend and encounters two enigmatic boys.* If this setup excites you, please confirm, and we'll bring it to life!",
    },
    {
      question: "Interesting story, confirm it!",
      answer:
        "That's the spirit! All the essential elements of your AVG game are now in place. The 'Go Generate' button is glowing—click it to see your story come alive! I can't wait for you to experience it!",
    },
  ];

  const calculateSimilarity = (str1: string, str2: string): number => {
    const str1Lower = str1.toLowerCase().trim();
    const str2Lower = str2.toLowerCase().trim();

    if (str1Lower === str2Lower) return 1;
    if (str1Lower.length === 0 || str2Lower.length === 0) return 0;

    const words1 = str1Lower.split(/\s+/);
    const words2 = str2Lower.split(/\s+/);

    const commonWords = words1.filter((word) => words2.includes(word));

    return (2.0 * commonWords.length) / (words1.length + words2.length);
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (message.trim() && !isLoading) {
      try {
        setIsLoading(true);
        const trimmedMessage = message.trim();

        setMessages((prev) => [
          ...prev,
          { text: trimmedMessage, isUser: true },
        ]);

        const matchedScript = mockDialogues.find(
          (script) => calculateSimilarity(trimmedMessage, script.question) > 0.8
        );

        if (matchedScript) {
          setMessages((prev) => [
            ...prev,
            {
              text: "",
              isUser: false,
            },
          ]);

          const replyText = matchedScript.answer;
          let currentIndex = 0;

          const typeNextChar = () => {
            if (currentIndex < replyText.length) {
              setMessages((prev) => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                lastMessage.text = replyText.slice(0, currentIndex + 1);
                return newMessages;
              });
              currentIndex++;

              const nextChar = replyText[currentIndex];
              let delay = 50;

              if ([".", "!", "?"].includes(nextChar)) {
                delay = 400;
              } else if ([",", ";"].includes(nextChar)) {
                delay = 200;
              }

              setTimeout(typeNextChar, delay);
            }
          };

          typeNextChar();
        } else {
          const response = await sendMessage(trimmedMessage);

          if (response && response[0]?.text) {
            setMessages((prev) => [
              ...prev,
              {
                text: "",
                isUser: false,
              },
            ]);

            const replyText = response[0].text;
            let currentIndex = 0;

            const typeNextChar = () => {
              if (currentIndex < replyText.length) {
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  lastMessage.text = replyText.slice(0, currentIndex + 1);
                  return newMessages;
                });
                currentIndex++;

                const nextChar = replyText[currentIndex];
                let delay = 50;

                if ([".", "!", "?"].includes(nextChar)) {
                  delay = 400;
                } else if ([",", ";"].includes(nextChar)) {
                  delay = 200;
                }

                setTimeout(typeNextChar, delay);
              }
            };

            typeNextChar();
          } else {
            setMessages((prev) => [
              ...prev,
              {
                text: "遇到一点问题，请稍后再试...",
                isUser: false,
              },
            ]);
          }
        }

        setMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
        setMessages((prev) => [
          ...prev,
          {
            text: "遇到一点问题，请稍后再试...",
            isUser: false,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault(); // 阻止默认的换行行为
      handleSend();
    }
  };

  const handleStateToggle = () => {
    setIsBuilding(true);
    setProgress(0);
    const duration = 8000;
    const interval = 50;
    const step = (100 * interval) / duration;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsBuilding(false);
            setShowTitle(true);
          }, 500);
          return 100;
        }
        return prev + step;
      });
    }, interval);
  };

  const handleGameStart = () => {
    setGameStarted(true);
    setShowGameScene(true);
    setCurrentDialogue(0);
    setDisplayedText("");
    setIsTyping(false);

    // 确保状态更新后再开始第一句对话
    Promise.resolve().then(() => {
      if (dialogues[0]?.text) {
        typeDialogue(dialogues[0].text);
      }
    });
  };

  const playNextDialogue = () => {
    if (!dialogues[currentDialogue]) return;

    if (isTyping) {
      // 如果正在打字，直接显示完整文本
      setDisplayedText(dialogues[currentDialogue].text);
      setIsTyping(false);
      return;
    }

    if (currentDialogue < dialogues.length - 1) {
      const nextDialogue = dialogues[currentDialogue + 1];

      if (nextDialogue.scenario) {
        setCurrentScenario(nextDialogue.scenario);
      }

      setCurrentDialogue((prev) => prev + 1);

      // 确保状态更新后再开始打字
      Promise.resolve().then(() => {
        if (nextDialogue.text) {
          typeDialogue(nextDialogue.text);
        }
      });
    } else if (dialogues[currentDialogue].isEnding) {
      // 如果是最后一幕，等待一会后重置游戏
      setTimeout(() => {
        setGameStarted(false);
        setCurrentDialogue(0);
        setShowTitle(true);
      }, 2000);
    }
  };

  const typeDialogue = (text: string) => {
    if (!text) return;

    setIsTyping(true);
    setDisplayedText("");

    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;

        // 根据标点符号调整延迟时间
        const nextChar = text[currentIndex];
        let delay = 30; // 默认打字速度

        if ([".", "!", "?"].includes(nextChar)) {
          delay = 500; // 句子结束停顿
        } else if ([",", ";"].includes(nextChar)) {
          delay = 250; // 逗号停顿
        }

        setTimeout(typeNextChar, delay);
      } else {
        setIsTyping(false);
      }
    };

    typeNextChar();

    // 返回清理函数
    return () => {
      setIsTyping(false);
      setDisplayedText("");
    };
  };

  useEffect(() => {
    if (gameStarted && dialogues[currentDialogue]) {
      const cleanup = typeDialogue(dialogues[currentDialogue].text);
      return cleanup;
    }
  }, [gameStarted, currentDialogue]);

  useEffect(() => {
    handleStateToggle();
  }, []);

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 2];
    if (!lastMessage || !lastMessage.isUser) return;

    // 根据用户的输入来更新步骤数据
    switch (lastMessage.text.toLowerCase().trim()) {
      case "i confirm the ui style":
        setStepData((prev) => ({
          ...prev,
          storyUI: storyUi,
        }));
        break;

      case "the character designs are great and ok with me!":
        setStepData((prev) => ({
          ...prev,
          characters: [
            {
              name: "Lori",
              image: character1,
            },
            {
              name: "???",
              image: character2,
            },
            {
              name: "Phi",
              image: character3,
            },
          ],
        }));
        break;

      case "interesting story, confirm it!":
        setStepData((prev) => ({
          ...prev,
          storylineConfirmed: true,
        }));
        break;
    }
  }, [messages]);

  const handleGenerate = () => {
    if (isCompleted) return;

    setShowPlayer(true);
    setIsBuilding(true);
    setProgress(0);

    // 添加平滑滚动
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight * 1, // 滚动到页面高度的 80%
        behavior: "smooth",
      });
    }); // 短暂延迟确保 player 已渲染

    // 模拟构建进度
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBuilding(false);
          setShowTitle(true);
          setIsCompleted(true);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  return (
    <div>
      <div className="create-engine">
        <div className="engine-decoration">
          <img src={engineDecoration} alt="decoration" />
        </div>
        <div className="epicverse-maker-container">
          <div className="epic-muse">
            <div className="muse-image">
              <img
                src={muses[currentMuse].image}
                alt={muses[currentMuse].name}
              />
              <div className="muse-image-overlay">
                <div className="muse-name">Your Epicmuse</div>
              </div>
            </div>
            <div className="muse-selector-outer">
              <div className="muse-selector-bg"></div>
              <h3 className="muse-selector-title">Select My Muse</h3>
              <div className="muse-buttons">
                {[...Array(4)].map((_, index) => (
                  <button
                    key={index}
                    className={`muse-button ${
                      index === currentMuse ? "active" : ""
                    }`}
                    onClick={() => setCurrentMuse(index)}
                    style={{ backgroundImage: `url(${muses[index].image})` }}
                  >
                    {muses[index].name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="epicverse-chat">
            <div className="epicverse-chat-bg">
              <div className="dot-left-bottom">
                <div className="dot-left-bottom-1"></div>
                <div className="dot-left-bottom-2"></div>
              </div>
              <div className="dot-right-bottom">
                <div className="dot-right-bottom-1"></div>
                <div className="dot-right-bottom-2"></div>
                <div className="dot-right-bottom-3"></div>
              </div>
              <div className="dots-right-top">
                <div className="dot-1"></div>
                <div className="dot-2"></div>
              </div>
            </div>
            <div className="vertical-dots">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="dot"></div>
              ))}
            </div>
            <div className="chat-container">
              <div className="chat-messages" ref={chatMessagesRef}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${
                      msg.isUser ? "user-message" : "epicmuse-message"
                    }`}
                  >
                    {!msg.isUser && (
                      <div className="message-avatar">
                        <img src={muses[currentMuse].image} alt="EpicMuse" />
                      </div>
                    )}
                    <div className="message-content">
                      {msg.text}
                      {isLoading &&
                        index === messages.length - 1 &&
                        !msg.isUser && (
                          <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.isUser && (
                  <div className="message epicmuse-message">
                    <div className="message-avatar">
                      <img src={muses[currentMuse].image} alt="EpicMuse" />
                    </div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`chat-input ${message.trim() ? "has-content" : ""}`}
              >
                <textarea
                  placeholder="Type your message here..."
                  rows={3}
                  value={message}
                  onChange={handleMessageChange}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <button
                  className={`chat-send ${isLoading ? "loading" : ""}`}
                  onClick={handleSend}
                  disabled={isLoading || !message.trim()}
                >
                  send
                </button>
              </div>
            </div>
          </div>
          <div className="maker-steps">
            <div className="step1-box">
              <div className="step1-top">
                <div className="step1-decoration">
                  <img src={step1BoxDecoration} alt="decoration" />
                </div>
                <div className="step1-title tooltip-container">
                  STORY UI
                  <div className="tooltip">
                    Design your game background and UI elements
                  </div>
                </div>
              </div>
              <div className="step1-preview">
                {stepData.storyUI ? (
                  <img src={stepData.storyUI} alt="story ui" />
                ) : (
                  <div className="empty-preview">Waiting for UI design...</div>
                )}
              </div>
            </div>

            <div className="step2-wrapper">
              <div className="step2-header">
                <h3 className="tooltip-container">
                  CHARACTER DESIGN
                  <div className="tooltip">
                    Create and customize your game characters
                  </div>
                </h3>
              </div>
              <div className="decoration-shapes">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="parallelogram"></div>
                ))}
              </div>
              <div className="step2-box">
                <div className="character-grid">
                  {stepData.characters ? (
                    stepData.characters.map((char, index) => (
                      <div key={index} className="character-item">
                        <img src={char.image} alt={char.name} />
                        <span>{char.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="empty-preview">
                      Waiting for character designs...
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="step3-box">
              <div className="step3-content">
                <h3 className="tooltip-container">
                  STORYLINE
                  <div className="tooltip">
                    Write and upload your game script
                  </div>
                </h3>
                {stepData.storylineConfirmed ? (
                  <>
                    <img src={upLoadDecoration} alt="upload decoration" />
                  </>
                ) : (
                  <div className="empty-preview">
                    Waiting for story confirmation...
                  </div>
                )}
              </div>
              <div className="step3-preview">
                <img src={step3Decoration} alt="script icon" />
              </div>
            </div>
            <button
              className={`generate-button ${
                stepData.storylineConfirmed && !isCompleted ? "active" : ""
              }`}
              disabled={!stepData.storylineConfirmed || isCompleted}
              onClick={handleGenerate}
            >
              {isCompleted ? "Generated" : "Go Generate"}
            </button>
          </div>
        </div>
      </div>

      <div className="create-page-body">
        {showPlayer && (
          <>
            {/* <div
              className={`epicverse-player-state ${
                isBuilding ? "building" : ""
              }`}
            >
              {isBuilding ? "BUILDING" : "YOUR MASTERPIECE IS DONE"}
            </div> */}
            <div
              className={`epicverse-player-container ${
                isBuilding ? "building" : "completed"
              }`}
            >
              {isBuilding ? (
                <>
                  <div
                    className="building-cover"
                    style={{
                      backgroundImage: `url(${coverImage})`,
                      height: `${progress}%`,
                    }}
                  />
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </>
              ) : (
                <div
                  className="game-container"
                  style={{
                    backgroundImage: `url(${
                      showGameScene ? currentScenario : coverImage
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!gameStarted && showTitle && (
                    <div className="game-title">
                      <h1>Echoes of the Clocktower</h1>
                      <button
                        className="start-button"
                        onClick={handleGameStart}
                      >
                        Start Game
                      </button>
                    </div>
                  )}
                  {gameStarted && dialogues[currentDialogue] && (
                    <>
                      <div className="game-scene">
                        {dialogues[currentDialogue].image && (
                          <div
                            className={`character-display ${
                              dialogues[currentDialogue].position
                            } ${dialogues[currentDialogue].effect || ""}`}
                          >
                            <img
                              src={dialogues[currentDialogue].image}
                              alt={dialogues[currentDialogue].character}
                            />
                          </div>
                        )}
                      </div>
                      <div className="dialogue-box" onClick={playNextDialogue}>
                        <div className="character-name">
                          {dialogues[currentDialogue].character}
                        </div>
                        <div className="dialogue-text">{displayedText}</div>
                        {!isTyping && (
                          <div className="continue-indicator">
                            Click to continue...
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        )}
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
      <div className="decoration-for-page-wrapper">
        <img
          src={pageDecoration}
          alt="decoration"
          className="decoration-for-page"
        />
      </div>
    </div>
  );
};

export default CreatePage;
