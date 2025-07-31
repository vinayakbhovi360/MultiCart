// export const server = "http://localhost:3060/api/v2";

const Backend_url = import.meta.env.VITE_BACKEND_URL;
export const server = `${Backend_url}/api/v2`;
