// import axios from "axios";
// export default axios.create({
//   baseURL: "http://localhost:3060/api/v2",
// });

import axios from "axios";
const Backend_url = import.meta.env.VITE_BACKEND_URL;
export default axios.create({
  baseURL: `${Backend_url}/api/v2`,
});
