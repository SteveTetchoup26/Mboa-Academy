import { API_URL } from '../constants/API_URL';

/**
 * Construit l'URL complète d'un fichier uploadé.
 * Gère à la fois les anciens fichiers (dans `others/`) et les nouveaux
 * (stockés avec leur sous-dossier, ex: `cover_course/fichier.jpg`).
 */
export function getFileUrl(fileName: string | null | undefined): string {
  if (!fileName) return '';
  if (fileName.includes('/')) {
    // Nouveau format : fileName contient déjà le sous-dossier
    return `${API_URL}/uploads/${fileName}`;
  }
  // Ancien format : fichier dans le dossier par défaut
  return `${API_URL}/uploads/others/${fileName}`;
}
