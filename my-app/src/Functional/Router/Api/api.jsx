import axios from "axios";

const apiNews = axios.create({
  baseURL: "https://newsapi.org/v2",
});

export default apiNews;
