export const addEllipseToString = (text: string, size: number) => {
  if (text.length <= size) return text;

  let newText = text.substring(0, size) + "...";
  return newText;
};
