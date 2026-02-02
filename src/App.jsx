import { useState } from 'react';
import Header from './components/Header';
import ChainSelector from './components/ChainSelector';
import ApiKeySettings from './components/ApiKeySettings';
import BenchmarkRunner from './components/BenchmarkRunner';
import BenchmarkTable from './components/BenchmarkTable';
import { useBenchmark, loadApiKeys, saveApiKeys } from './hooks/useBenchmark';
import './App.css';

function App() {
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const [apiKeys, setApiKeys] = useState(loadApiKeys);
  const { results, running, progress, runChain, runAll, stop, clearResults } = useBenchmark();

  function handleSaveKeys(keys) {
    setApiKeys(keys);
    saveApiKeys(keys);
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        <ChainSelector selected={selectedChain} onSelect={setSelectedChain} />
        <ApiKeySettings apiKeys={apiKeys} onSave={handleSaveKeys} />
        <BenchmarkRunner
          running={running}
          progress={progress}
          onRunChain={(chainId) => runChain(chainId, apiKeys)}
          onRunAll={() => runAll(apiKeys)}
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
