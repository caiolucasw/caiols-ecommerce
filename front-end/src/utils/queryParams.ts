interface FetchProductsInterface {
  [key: string]: any;
}

export const formatQueryParams = (filters: FetchProductsInterface): string => {
  const keys = Object.keys(filters);
  let formattedQs = "?";

  keys.forEach((key) => {
    if (filters[key]) {
      if (typeof filters[key] === "string") {
        formattedQs += `${key}=${filters[key]}`;
      } else if (Array.isArray(filters[key])) {
        // @ts-ignore
        formattedQs += `${key}=${filters[key].join(",")}`;
      }
    }
  });

  return formattedQs;
};
