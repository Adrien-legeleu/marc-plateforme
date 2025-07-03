export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // retire les accents
    .replace(/[\u0300-\u036f]/g, '') // retire les diacritiques
    .replace(/[^a-z0-9 ]/g, '') // supprime tout sauf lettres, chiffres, espaces
    .replace(/\s+/g, '-') // remplace les espaces par des tirets
    .replace(/-+/g, '-') // supprime les doublons
    .replace(/^-+|-+$/g, ''); // trim les tirets au début/fin
}
