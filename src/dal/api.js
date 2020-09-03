import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3004/superhero/'
})

export const dataApi = {
    getFullHeroesLength() {
        return instance.get(``).then(res => {
            let data = res.data.length
            return {
                data
            }
        })
    },
    getData(currentPage = 1, pageSize = 3) {
        return instance.get(`?_page=${currentPage}&_limit=${pageSize}`)
            .then(res => {
                // let length = res.data.items.length
                let response = res.data
                let length = res.data.length
                return {
                    response, length
                }
            })
            .catch(e => alert(e))
    },
    setHeroId(id) {
        return instance.get(`/${id}`)
            .then(res => res.data)
            .catch(e => alert(e))
    },
    addNewHero(nickname) {
        return instance.post('/', {nickname})
            .then(res => res.data)
            .catch(e => alert(e))
    },
    deleteHero(heroId) {
        return instance.delete('' + heroId)
            .then(res => res.data)
            .catch(e => alert(e))
    },
    setHeroNickName(heroId, nickname) {
        return instance.patch(`/${heroId}`, {nickname})
            .then(res => res.data)
            .catch(e => alert(e))
    },
    renameHero(heroId, real_name) {
        return instance.patch(`/${heroId}`, {real_name})
            .then(res => res.data)
            .catch(e => alert(e))
    },
    setHeroDescription(heroId, origin_description) {
        return instance.patch(`${heroId}`, {origin_description})
            .then(res => res.data)
            .catch(e => alert(e))
    },
    setHeroSuperpowers(heroId, superpowers) {
        return instance.patch(`/${heroId}`, {superpowers})
            .then(res => res.data)
            .catch(e => alert(e))
    },
    setHeroCatchPhrase(heroId, catch_phrase) {
        return instance.patch(`/${heroId}`, {catch_phrase})
            .then(res => res.data)
            .catch(e => alert(e))
    },


    savePhoto(photoFile, id) {
        const formData = new FormData()
        formData.append('image', photoFile, id)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/from-data'
            }
        })
    },
    setHeroImage(image, heroId) {
        const response = instance.patch(`/id=${heroId}&images=${image}`, image, heroId)
            .then(res => res.data)
            .catch(e => alert(e))
    },

    postFile(file) {
        return instance.post('/file', {file})
            .then(response => {
                return response.data
            })
    }
}
