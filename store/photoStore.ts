import axios from 'axios';
const baseURL = 'https://api.unsplash.com';
const key = 'XEgV7P-yEIq_ecleGiQHHFm-vosbWlyyEmp0cTntS04';

export default class photoStore {
  // 최신 사진 목록
  static getPhotoList() {
    axios.get(`${baseURL}/photos/?client_id=${key}`).then((result) => {
      return result.data;
    });
  }
  // 사진 검색
  static searchPhoto(query?: string) {
    axios
      .get(`${baseURL}/search/photos/?client_id=${key}&query=${query}`)
      .then((result) => {
        return result.data;
      });
  }
}
