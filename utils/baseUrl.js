const baseUrl =
  process.NODE_ENV === "production"
    ? "https://michal-next-app.herokuapp.com/"
    : "http://localhost:3000";

export default baseUrl;