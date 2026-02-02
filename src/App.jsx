import { useState } from 'react';
import Header from './components/Header';
import ChainSelector from './components/ChainSelector';
import BenchmarkRunner from './components/BenchmarkRunner';
import BenchmarkTable from './components/BenchmarkTable';
import { useBenchmark } from './hooks/useBenchmark';
import './App.css';

function App() {
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const { results, running, progress, runChain, runAll, stop, clearResults } = useBenchmark();

  return (
    <div className="app">
      <Header />
      <main className="main">
        <ChainSelector selected={selectedChain} onSelect={setSelectedChain} />
        <BenchmarkRunner
          running={running}
          progress={progress}
          onRunChain={runChain}
          onRunAll={runAll}
          onStop={stop}
          onClear={clearResults}
          selectedChain={selectedChain}
        />
        <BenchmarkTable chainId={selectedChain} results={results} />
      </main>
    </div>
  );
}

export default App;
