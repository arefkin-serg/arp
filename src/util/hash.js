export default (path) => {
  return path.split(" ").map((el, index) => {
    const firstLetter = index ? el.charAt(0).toUpperCase() : el.charAt(0).toLowerCase();
    return `${firstLetter}${el.slice(1)}`;
  }).join('');
}