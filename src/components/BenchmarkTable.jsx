import { useState } from 'react';
import PROVIDERS from '../config/providers';
import {
  formatMs,
  formatRange,
  latencyColor,
  rangeColor,
  statusLabel,
  statusColor,
} from '../utils/formatting';

const COLUMNS = [
  { key: 'name', label: 'Provider', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'latencyMs', label: 'Latency', sortable: true },
  { key: 'maxRange', label: 'Max Log Range', sortable: true },
  { key: 'url', label: 'URL', sortable: false },
];

function getSortValue(row, key) {
  if (key === 'name') return row.name;
  if (key === 'url') return row.url;
  const r = row.result;
  if (!r) {
    if (key === 'maxRange') return row.knownMaxRange ?? -1;
    return key === 'latencyMs' ? Infinity : '';
  }
  if (key === 'status') return r.status || '';
  if (key === 'latencyMs') return r.latencyMs ?? Infinity;
  if (key === 'maxRange') return r.maxRange ?? row.knownMaxRange ?? -1;
  return '';
}

function maskUrl(url) {
  return url.replace(/\{API_KEY\}/, '***');
}

export default function BenchmarkTable({ chainId, results }) {
  const [sortKey, setSortKey] = useState('latencyMs');
  const [sortDir, setSortDir] = useState('asc');

  const providers = PROVIDERS[chainId] || [];
  const chainResults = results[chainId] || {};

  const rows = providers.map((p) => ({
    name: p.name,
    url: p.url,
    requiresKey: !!p.requiresKey,
    knownMaxRange: p.knownMaxRange,
    result: chainResults[p.name] || null,
  }));

  const sorted = [...rows].sort((a, b) => {
    const va = getSortValue(a, sortKey);
    const vb = getSortValue(b, sortKey);
    let cmp = 0;
    if (typeof va === 'number' && typeof vb === 'number') cmp = va - vb;
    else cmp = String(va).localeCompare(String(vb));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  function handleSort(key) {
    if (!COLUMNS.find((c) => c.key === key)?.sortable) return;
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'maxRange' ? 'desc' : 'asc');
    }
  }

  return (
    <div className="table-wrapper">
      <div className="table-scroll">
        <table className="benchmark-table">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`${col.sortable ? 'sortable' : ''} ${sortKey === col.key ? `sorted sorted-${sortDir}` : ''}`}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span className="sort-arrow">{sortDir === 'asc' ? ' \u25B2' : ' \u25BC'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => {
              const r = row.result;
              const isKeyMissing = r?.status === 'key_missing';
              const displayRange = r?.maxRange ?? row.knownMaxRange;
              const rangeIsTested = r?.maxRange != null;

              return (
                <tr key={row.name} className={isKeyMissing ? 'row-dimmed' : ''}>
                  <td className="provider-name">
                    {row.name}
                    {row.requiresKey && <span className="key-badge">KEY</span>}
                  </td>
                  <td>
                    <span className={`badge badge-${r ? statusColor(r.status) : ''}`}>
                      {r ? statusLabel(r.status) : '\u2014'}
                    </span>
                  </td>
                  <td className={`number ${r ? latencyColor(r.latencyMs) : ''}`}>
                    {r && r.latencyMs != null ? formatMs(r.latencyMs) : '\u2014'}
                  </td>
                  <td className={`number ${rangeIsTested ? rangeColor(displayRange) : ''}`}>
                    {displayRange != null ? (
                      <>
                        {formatRange(displayRange)}
                        {!rangeIsTested && <span className="known-tag">known</span>}
                      </>
                    ) : '\u2014'}
                  </td>
                  <td className="url-cell">
                    <span className="url-text">{maskUrl(row.url)}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
