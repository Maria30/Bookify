export function filterData(data, value) {
  return data.filter(book => book.subject.includes(value));
}