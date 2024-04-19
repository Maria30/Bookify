export function fetchData(id) {
  const apiUrl = `https://openlibrary.org${id}.json`;
  try {
    const response = fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Réponse réseau non OK');
    }
    const data = response.json();
    return data;
  } 
  catch (error) {
    console.error('Erreur de requête API', error);
    throw error;
  }
}