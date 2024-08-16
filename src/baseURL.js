let baseURL = "";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev URL
  // Mockoon
  // baseURL = "http://localhost:8005";
  // Mobile dev
  baseURL = "http://192.168.1.111:8005";
} else {
  // production URL
  baseURL = new URL("/", window.location);
}
export default baseURL;
