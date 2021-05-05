import { http } from './HttpService'

// export function getAllLostFound(id) {    
//     return http().get(`/lost-found/type/${id}`);
// }
export function getAllLostFound(id, page, limit) {
    return http().get(`/lost-found/type/${id}?page=` + page + "&limit=" + limit);
}

export function getLostFoundById(id) {
    return http().get(`/lost-found/${id}`);
}

export function createLostFound(LostFound) {
    return http().post('/lost-found', LostFound);
}

export function deleteLostFound(id) {
    return http().delete(`/lost-found/${id}`);
}

export function search(filter) {
    return http().post(`/lost-found/search`, filter);
}
export function updateLostFound(LostFound) {
    return http().put('/lost-found', LostFound);
}
export function totalNumber() {
    http().get('/lost-found/count')
        .then(data => {
            return data.data['count']
        })
}

// export function updateTask(LostFound) {
//     return http().put('/lost-found', LostFound);
// }