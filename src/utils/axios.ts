import axios from "axios";

const Axios = axios.create({
  baseURL: "https://rag-experiment.playpower.ai/api/v1/",
});

export default Axios;
