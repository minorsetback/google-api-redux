// Config
import { root } from "./config";
import axios from "axios";

export const api = Object.freeze({
  books: {
    fetch: (bookName, minIndex) => {
      return axios(`${root}/volumes?q=${bookName}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&startIndex=${minIndex}&maxResults=30`);
    },
    fetchById: (id) => {
      return axios(`${root}/volumes/${id}`);
    },
  },
});
