import isProduction from "./isProduction";

export default function getAbsolutePath(req, query) {
  const protocol = isProduction() ? "https" : "http";
  // const protocol = "https";
  return `${protocol}://${req.headers.host}${query}`;
}
