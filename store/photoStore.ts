import axios from 'axios';
const baseURL = 'https://api.unsplash.com';
const key = 'XEgV7P-yEIq_ecleGiQHHFm-vosbWlyyEmp0cTntS04';

export default class photoStore {
  // 최신 사진 목록
  static getPhotoList(): any {
    return axios.get(`${baseURL}/photos/?client_id=${key}`).then((result) => {
      return result.data;
    });
  }
  // 사진 검색
  static searchPhoto(query?: string): any {
    return axios
      .get(`${baseURL}/search/photos/?client_id=${key}&query=${query}`)
      .then((result) => {
        return result.data;
      });
  }
  // related Collection
  static getCollectionList(id?: string): any {
    return axios
      .get(`${baseURL}/search/collections/?client_id=${key}&id=${id}`)
      .then((result) => {
        return result.data;
      });
  }
}
