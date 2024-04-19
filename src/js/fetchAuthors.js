export function fetchAuthors(key) {
  const authorsUrl = `https://openlibrary.org${key}.json`;

  try {
    const response = fetch(authorsUrl);
    if (!response.ok) {
      throw new Error('Réponse réseau non OK');
    }
    const author = response.json();
    return author.name;
  } 
  catch (error) {
    console.error('Erreur de requête API', error);
    throw error;
  }
}
