export const addEllipseToString = (text: string, size: number) => {
  if (text.length <= size) return text;

  let newText = text.substring(0, size) + "...";
  return newText;
};

export const formatDate = (date: string, sep = "/"): string | null => {
  let formattedDate = null;

  try {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    //

    const formattedDay = day < 9 ? `0${day}` : day;
    const formattedMonth = month < 9 ? `0${month}` : month;

    formattedDate = `${formattedDay}${sep}${formattedMonth}${sep}${year}`;
  } catch (err) {
    console.log(err);
    return null;
  }

  return formattedDate;
};
