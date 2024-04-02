interface FetchProductsInterface {
  [key: string]: any;
}

export const formatQueryParams = (filters: FetchProductsInterface): string => {
  const keys = Object.keys(filters);
  let formattedQs = "";
  let qsParts: string[] = [];

  keys.forEach((key) => {
    if (filters[key]) {
      if (typeof filters[key] === "string" || filters[key] === "number") {
        qsParts.push(`${key}=${filters[key]}`);
      } else if (
        key !== "products" &&
        Array.isArray(filters[key]) &&
        filters[key].length > 0
      ) {
        // @ts-ignore
        qsParts.push(`${key}=${filters[key].join(",")}`);
      }
    }
  });

  formattedQs = qsParts.length > 0 ? "?" + qsParts.join("&") : "";

  return formattedQs;
};
