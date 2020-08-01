import {dataApi} from "../dal/api";
import {ADD_HERO_NICKNAME, GET_DATA, SAVE_PHOTO_SUCCESS, SET_HERO_ID} from "../ui/common/constants";

const initialState = {
    data: [],
    currentHeroId: 0,
    heroData:[],
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
            debugger
            return {
                ...state, data:[action.currentHeroId]
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
                    ...state.data, images: state.data.map(el => {
                        if (el.id === action.id) {
                            return {
                                ...el, images: action.image
                            }
                        }
                    })
                }
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

export const getData = () => async (dispatch) => {
    try {
        let res = await dataApi.getData()
        dispatch(getDataSuccess(res))
    } catch (e) {
        console.log(e)
    }
}
export const setHeroId = (currentHeroId) => async (dispatch) => {
    debugger
    try {
        debugger
        let res = await dataApi.setHeroId(currentHeroId)
        dispatch(setCurrentHeroId(res))
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
export const setHeroImage = (image, id) => async (dispatch) => {
    try {
        let res = await dataApi.savePhoto(image, id)
        dispatch(setPhotoSuccess(res))
    } catch (e) {
        console.log(e)
    }
}
