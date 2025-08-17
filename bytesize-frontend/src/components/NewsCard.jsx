export default function NewsCard({ article, onSummarize, onSaveFavorite }) {
  const truncatedDescription = article.description?.length > 150
    ? article.description.substring(0, 150) + "..."
    : article.description || "No description available.";

  return (
    <div className="news-card">
      <h3>{article.title}</h3>
      <p>{truncatedDescription}</p>
      <div className="card-actions">
        {/* Always send a string to summarize */}
        <button
  className="btn btn-primary"
  onClick={() => {
    const fullText = [article.title, article.content, article.description]
      .filter(Boolean)
      .join(". ");
    onSummarize(fullText || "No description available.");
  }}
>
  📝 Summarize
</button>



        {/* Save favorite */}
        <button
          className="btn btn-secondary"
          onClick={() => onSaveFavorite(article)}
        >
          ⭐ Save
        </button>

        {/* Read full article */}
        {article.url && (
          <button
            className="btn"
            style={{ background: "#6c757d" }}
            onClick={() => window.open(article.url, "_blank")}
          >
            🔗 Read Full
          </button>
        )}
      </div>
    </div>
  );
}
