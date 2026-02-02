import { useState } from 'react';
import { API_KEY_PROVIDERS } from '../config/providers';

export default function ApiKeySettings({ apiKeys, onSave }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ ...apiKeys });

  function handleChange(keyName, value) {
    setDraft((prev) => ({ ...prev, [keyName]: value }));
  }

  function handleSave() {
    onSave(draft);
    setOpen(false);
  }

  const configuredCount = API_KEY_PROVIDERS.filter((p) => apiKeys[p.keyName]).length;

  return (
    <div className="api-keys-section">
      <button
        className="btn btn-secondary api-keys-toggle"
        onClick={() => setOpen(!open)}
      >
        API Keys ({configuredCount}/{API_KEY_PROVIDERS.length})
        <span className="toggle-arrow">{open ? ' \u25B2' : ' \u25BC'}</span>
      </button>

      {open && (
        <div className="api-keys-panel">
          <p className="api-keys-hint">
            Configure API keys to benchmark Infura, Alchemy, and other providers that require authentication.
            Keys are stored in your browser only.
          </p>
          {API_KEY_PROVIDERS.map((provider) => (
            <div key={provider.keyName} className="api-key-row">
              <label className="api-key-label">{provider.label}</label>
              <input
                type="text"
                className="api-key-input"
                placeholder={provider.placeholder}
                value={draft[provider.keyName] || ''}
                onChange={(e) => handleChange(provider.keyName, e.target.value.trim())}
              />
            </div>
          ))}
          <button className="btn btn-primary" onClick={handleSave}>
            Save Keys
          </button>
        </div>
      )}
    </div>
  );
}
