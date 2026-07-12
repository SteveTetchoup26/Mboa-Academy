/**
 * Formate une durée en secondes en texte lisible.
 * Exemples : 3600 → "1h" | 5400 → "1h 30min" | 900 → "15min"
 */
export function formatDuration(seconds: number | undefined | null): string {
  if (!seconds || seconds <= 0) return '';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}min`;
  }
  if (hours > 0) {
    return `${hours}h`;
  }
  if (minutes > 0) {
    return `${minutes}min`;
  }
  return `${seconds}s`;
}
