export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://devcamper-next.herokuapp.com"
    : "http://localhost:3000";