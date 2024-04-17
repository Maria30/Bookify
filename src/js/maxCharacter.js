export function maxCharacter(text, limit, addPoints) {
  if (text.length > limit) {
    if (addPoints) return text.slice(0, limit-3)+"...";
    else return text.slice(0, limit);
  }
  return text;
}