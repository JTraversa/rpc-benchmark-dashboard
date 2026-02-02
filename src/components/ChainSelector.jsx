import { CHAINS } from '../config/chains';

export default function ChainSelector({ selected, onSelect }) {
  return (
    <div className="chain-tabs">
      {CHAINS.map((chain) => (
        <button
          key={chain.id}
          className={`chain-tab ${selected === chain.id ? 'active' : ''}`}
          onClick={() => onSelect(chain.id)}
        >
          {chain.name}
        </button>
      ))}
    </div>
  );
}
