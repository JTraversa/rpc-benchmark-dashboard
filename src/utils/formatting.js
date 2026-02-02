export function formatMs(ms) {
  if (ms == null) return '—';
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export function formatRange(range) {
  if (range == null || range === 0) return '—';
  if (range >= 1000) return `${(range / 1000).toFixed(range % 1000 === 0 ? 0 : 1)}k`;
  return String(range);
}

export function formatTime(timestamp) {
  if (!timestamp) return '—';
  const d = new Date(timestamp);
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function latencyColor(ms) {
  if (ms == null) return '';
  if (ms < 500) return 'good';
  if (ms < 2000) return 'medium';
  return 'bad';
}

export function rangeColor(range) {
  if (range == null || range === 0) return '';
  if (range >= 10000) return 'good';
  if (range >= 2000) return 'medium';
  return 'bad';
}

export function statusLabel(status) {
  switch (status) {
    case 'ok': return 'OK';
    case 'auth_required': return 'Auth Required';
    case 'pruned': return 'Pruned';
    case 'timeout': return 'Timeout';
    case 'cors_blocked': return 'CORS Blocked';
    case 'error': return 'Error';
    case 'testing': return 'Testing...';
    default: return status || '—';
  }
}

export function statusColor(status) {
  if (status === 'ok') return 'good';
  if (status === 'testing') return 'medium';
  return 'bad';
}
