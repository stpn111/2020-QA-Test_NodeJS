import { urls } from '../config';
import { getApiInstance } from '../utils/api';

const api = getApiInstance(urls.photosApi);

export class PhotosApi {
  /**
   * Получение всех фотографий по одному коту
   * http://meowle.testops.ru:3001/api-docs-ui/#/default/get_cats__catId__photos
   * @param {number} catId ID имени кота
   * @returns {Promise<Object>} Объект с списком ссылок на фотографии
   */
  static getCatPhoto(catId) {
    return api.get(`/cats/${catId}/photos`).then(({ images }) => images);
  }

  /**
   * Загрузка фотографии определенного кота
   * http://bobrovartem.ru:6001/api-docs-ui/#/default/post_cats__catId__upload
   * @param {number} catId ID имени кота
   * @returns {Promise<Object>} Объект с списком ссылок на фотографии
   */
  static uploadCatPhoto(catId, file) {
    const data = new FormData();

    data.append('file', file);

    return api.post(`/cats/${catId}/upload`, data);
  }
}
