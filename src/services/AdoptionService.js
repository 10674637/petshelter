import { http } from './HttpService'

 

// export function getAdoptionById(id) {
//     return http().get(`/adoption/${id}`);
// }
export function getAllAdoption() {
    return http().get(`/adoption`);
}

export function createAdoption(Adoption) {
    return http().post('/adoption', Adoption);
}

export function deleteAdoptionById(id) {
    return http().delete(`/adoption/${id}`);
}

export function search(filter) {
    return http().post(`/adoption/search`,filter);
}

export function updateAdoption(Adoption) {
    return http().put(`/adoption`,Adoption);
}
// export function updateTask(LostFound) {
//     return http().put('/lost-found', LostFound);
// }