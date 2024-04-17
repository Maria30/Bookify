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

  // fetch(authorsUrl)
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Réponse réseau non OK');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     const author = data;
  //     console.dir(author)
  //     return author.name;
  //   })
  //   .catch(error => {
  //     console.error('Erreur de requête API', error);  
  //   });
}
