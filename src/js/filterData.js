export function filterData(data, value) {
  // data.forEach(book => {
  //   var subjects = book.subject;

  //   subjects.forEach(subject => {
  //     subject = subject.toLowerCase();
  //   });
  // });
  // console.dir(subjects)

  return data.filter(book => book.subject.includes(value));
}