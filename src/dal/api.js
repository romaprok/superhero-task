import axios from 'axios'
import {setHeroImage} from "../bll/dataReducer";

const instance = axios.create({
    baseURL: 'http://localhost:3004/superhero/'
})

export const dataApi = {
    getData() {
        return instance.get('')
            .then(res => res.data)
            .catch(e => alert(e))
    },
    setHeroId(id) {
        debugger
        return instance.get(`${id}`)
            .then(res => res.data)
            .catch(e => alert(e))
    },
    setNewHeroNickName(nickname) {
        return instance.post('', {nickname})
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
        const response = instance.post('/images', image, heroId)
            .then(res => res.data)
            .catch(e => alert(e))
    }

}
