import api from '../../../services/api';

export const ratingsApi = {
  submit(storeId: number, rating: number): Promise<any> {
    return api.post('/ratings', { storeId, rating }).then(r => r.data);
  },
  update(storeId: number, rating: number): Promise<any> {
    return api.put(`/ratings/${storeId}`, { rating }).then(r => r.data);
  },
  delete(storeId: number): Promise<any> {
    return api.delete(`/ratings/${storeId}`).then(r => r.data);
  },
};
