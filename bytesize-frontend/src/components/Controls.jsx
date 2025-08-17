export default function Controls({ onRefresh, onViewFavorites }) {
  return (
    <div className="controls">
      <button className="btn btn-primary" onClick={onRefresh}>Refresh News</button>
      <button className="btn btn-secondary" onClick={onViewFavorites}>View Favorites</button>
    </div>
  );
}
