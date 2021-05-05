
import { http } from './HttpService'

export function getAllAdoption(page, limit) {
    return http().get(`/adoptions?page=` + page + "&limit=" + limit);
}
export function createAdoption(Adoption) {
    return http().post('/adoption', Adoption);
}
export function deleteAdoptionById(id) {
    return http().delete(`/adoption/${id}`);
}
export function search(filter) {
    return http().post(`/adoption/search`, filter);
}

export function updateAdoption(Adoption) {
    return http().put(`/adoption/${Adoption._id}`, Adoption);
}

export function totalNumber() {
    http().get('/adoption/count')
        .then(data => {
            return data.data['count']
        })
}
