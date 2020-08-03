import {dataApi} from '../dal/api';
import {
    ADD_HERO_NICKNAME,
    DELETE_HERO_SUCCESS,
    GET_DATA,
    SAVE_PHOTO_SUCCESS,
    SET_HERO_FEATURE,
    SET_HERO_ID
} from '../ui/common/constants';
import {encodeImageFileAsURL} from '../utils/image-utils';

const initialState = {
    data: [],
    currentHeroId: null,
    heroData: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA: {
            return {
                ...state, data: action.data
            }
        }
        case SET_HERO_ID: {
            return {
                ...state, data: [action.currentHeroId]
            }
        }
        case ADD_HERO_NICKNAME: {
            return {
                ...state, data: [...state.data, action.nickname]
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                data: {
                    ...state.data,
                    images: state.data
                        .map(el => el.id === action.id ? {...el, images: action.image} : el)
                }
            }
        }
        case SET_HERO_FEATURE: {
            return {
                ...state, data: [...state.data, action.feature]
            }
        }
        case DELETE_HERO_SUCCESS: {
            return {
                ...state, data: state.data.filter(el => el.id !== action.heroId)
            }
        }
        default:
            return state
    }
}
export default dataReducer

const getDataSuccess = (data) => ({type: GET_DATA, data})
const setCurrentHeroId = (currentHeroId) => ({type: SET_HERO_ID, currentHeroId})
const setPhotoSuccess = (image, id) => ({type: SAVE_PHOTO_SUCCESS, image, id})
const setNewHeroNickNameSuccess = (nickname) => ({type: ADD_HERO_NICKNAME, nickname})
const setNewHeroFeatureSuccess = (feature) => ({type: SET_HERO_FEATURE, feature})
const deleteHeroSuccess = (heroId) => ({type: DELETE_HERO_SUCCESS, heroId})

export const getData = () => async (dispatch) => {
    try {
        let res = await dataApi.getData()
        dispatch(getDataSuccess(res))
    } catch (e) {
        console.log(e)
    }
}
export const setHeroId = (currentHeroId) => async (dispatch) => {
    try {
        let res = await dataApi.setHeroId(currentHeroId)
        dispatch(setCurrentHeroId(res))
    } catch (e) {
        console.log(e)
    }
}
export const setNewHeroFeature = (feature) => async (dispatch) => {
    try {
        let res = await dataApi.setHeroFeature(feature)
        dispatch(setNewHeroFeatureSuccess(res))
    } catch (e) {
        console.log(e)
    }
}
export const setNewHeroNickName = (nickname, id) => async (dispatch) => {
    try {
        let res = await dataApi.setNewHeroNickName(nickname, id)
        dispatch(setNewHeroNickNameSuccess(res))
    } catch (e) {
        console.log(e)
    }
}
export const deleteHero = (heroId) => async (dispatch) => {
    try {
        await dataApi.deleteHero(heroId)
        dispatch(deleteHeroSuccess(heroId))
    } catch (e) {
        console.log(e)
    }
}
export const setHeroImage = (image, id) => async (dispatch) => {
    try {
        encodeImageFileAsURL(image, async (result) => {
            let res = await dataApi.savePhoto(image, id)
            dispatch(setPhotoSuccess(res))
        })
    } catch (e) {
        console.log(e)
    }
}
