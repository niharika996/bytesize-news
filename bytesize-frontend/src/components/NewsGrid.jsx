import NewsCard from './NewsCard';

export default function NewsGrid({ articles, onSummarize, onSaveFavorite }) {
  if (!articles.length) return <div className="loading">No articles found.</div>;

  return (
    <div className="news-grid">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} onSummarize={onSummarize} onSaveFavorite={onSaveFavorite} />
      ))}
    </div>
  );
}
