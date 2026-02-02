export default function BenchmarkRunner({ running, progress, onRunChain, onRunAll, onStop, onClear, selectedChain }) {
  const pct = progress.total > 0
    ? Math.round((progress.current / progress.total) * 100)
    : 0;

  return (
    <div className="runner">
      <div className="runner-buttons">
        {!running ? (
          <>
            <button className="btn btn-primary" onClick={() => onRunChain(selectedChain)}>
              Benchmark This Chain
            </button>
            <button className="btn btn-secondary" onClick={onRunAll}>
              Benchmark All Chains
            </button>
            <button className="btn btn-danger" onClick={onClear}>
              Clear Results
            </button>
          </>
        ) : (
          <button className="btn btn-danger" onClick={onStop}>
            Stop
          </button>
        )}
      </div>
      {running && (
        <div className="runner-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="progress-label">{progress.label} ({pct}%)</span>
        </div>
      )}
    </div>
  );
}
