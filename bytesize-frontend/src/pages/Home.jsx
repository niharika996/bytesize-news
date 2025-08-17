import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Controls from "../components/Controls";
import NewsGrid from "../components/NewsGrid";
import Modal from "../components/Modal";

const BACKEND_BASE = "http://localhost:5000";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNews = async () => {
    setArticles([]);
    try {
      const res = await fetch(`${BACKEND_BASE}/news`);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error(err);
    }
  };

const summarizeArticle = async (text) => {
  const articleText = text || "No description available.";
  console.log("Sending text to backend:", articleText);

  setModalContent("Generating summary...");
  setIsModalOpen(true);

  try {
    const response = await fetch(`${BACKEND_BASE}/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: articleText }),
    });

    const data = await response.json();
    console.log("Parsed JSON:", data);

    setModalContent(data.summary_text || "No summary available.");
  } catch (error) {
    console.error("Summarization error:", error);
    setModalContent("Failed to summarize the article.");
  }
};

  const saveFavorite = (article) => {
    if (favorites.find(fav => fav.title === article.title)) {
      setModalContent("This article is already in your favorites!");
      setIsModalOpen(true);
      return;
    }
    setFavorites([...favorites, article]);
    setModalContent("✅ Saved to favorites!");
    setIsModalOpen(true);
  };

  const viewFavorites = () => setArticles(favorites);

  useEffect(() => { fetchNews(); }, []);

  return (
    <div className="container">
      <Navbar />
      <Controls onRefresh={fetchNews} onViewFavorites={viewFavorites} />
      <main>
        <NewsGrid articles={articles} onSummarize={summarizeArticle} onSaveFavorite={saveFavorite} />
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalContent}
      </Modal>
    </div>
  );
}
