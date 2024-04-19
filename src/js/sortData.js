export function sortData(data, value) {
  switch (value) {
    case 'az':
      data.sort((a, b) => a.title.localeCompare(b.title));
    break
    case 'za':
      data.sort((b, a) => a.title.localeCompare(b.title));
    break
    case 'best':
      data.sort((a, b) => b.ratings_average - a.ratings_average);
      break;
    case 'worst':
      data.sort((b, a) => b.ratings_average - a.ratings_average);
      break;
  }   
  return data;
}