import {dataApi} from '../dal/api';
import {
    ADD_HERO_NICKNAME,
    DELETE_HERO_SUCCESS,
    GET_DATA,
    RENAME_HERO,
    SAVE_PHOTO_SUCCESS,
    SET_HERO_CATCH_PHRASE,
    SET_HERO_DESCRIPTION,
    SET_HERO_ID,
    SET_HERO_NICKNAME,
    SET_HERO_SUPERPOWERS
} from '../ui/common/constants';

const initialState = {
    data: [
        {nickname: ''}
    ],
    currentHeroId: null,
    heroData: [],
    pageSize: 3,
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
            debugger
            return {
                ...state, data: [...state.data, action.nickname]
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            debugger
            return {
                ...state,
                data: {
                    ...state.data,
                    images: state.data.map(el => {
                        if (el.id === action.heroId) {
                            return {
                                ...el, images: action.image
                            }
                        }
                    })
                }
            }
        }
        case SET_HERO_NICKNAME: {
            return {
                ...state, data: state.data.map(el => {
                        if (el.id === action.heroId) {
                            return {
                                ...el, nickname: action.nickname
                            }
                        } else return el

                    }
                )
            }
        }
        case RENAME_HERO: {
            return {
                ...state, data: state.data.map(el => {
                        if (el.id === action.heroId) {
                            return {
                                ...el, real_name: action.name
                            }
                        } else return el

                    }
                )
            }
        }
        case SET_HERO_DESCRIPTION: {
            return {
                ...state, data: state.data.map(el => {
                        if (el.id === action.heroId) {
                            return {
                                ...el, origin_description: action.description
                            }
                        } else return el
                    }
                )
            }
        }
        case SET_HERO_SUPERPOWERS: {
            return {
                ...state, data: state.data.map(el => {
                        if (el.id === action.heroId) {
                            return {
                                ...el, superpowers: action.superpowers
                            }
                        } else return el

                    }
                )
            }
        }
        case SET_HERO_CATCH_PHRASE: {
            return {
                ...state, data: state.data.map(el => {
                        if (el.id === action.heroId) {
                            return {
                                ...el, catch_phrase: action.catchPhrase
                            }
                        } else return el
                    }
                )
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
const addNewHeroSuccess = (nickname) => ({type: ADD_HERO_NICKNAME, nickname})
const setCurrentHeroId = (currentHeroId) => ({type: SET_HERO_ID, currentHeroId})
const setPhotoSuccess = (image, heroId) => {
    debugger
    return {
        type: SAVE_PHOTO_SUCCESS, image, heroId
    }
}

const setNewHeroNickNameSuccess = (heroId, nickname) => ({type: SET_HERO_NICKNAME, heroId, nickname})
const renameHeroSuccess = (heroId, name) => ({type: RENAME_HERO, heroId, name})
const setHeroDescriptionSuccess = (heroId, description) => ({type: SET_HERO_DESCRIPTION, heroId, description})
const setHeroSuperPowersSuccess = (heroId, superpowers) => ({type: SET_HERO_SUPERPOWERS, heroId, superpowers})
const setHeroCatchPhraseSuccess = (heroId, catchPhrase) => ({type: SET_HERO_CATCH_PHRASE, heroId, catchPhrase})

const deleteHeroSuccess = (heroId) => ({type: DELETE_HERO_SUCCESS, heroId})


export const getData = (currentPage) => async (dispatch) => {
    try {
        let res = await dataApi.getData(currentPage)
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

export const setNewHeroNickName = (heroId, nickname) => async (dispatch) => {
    try {
        await dataApi.setHeroNickName(heroId, nickname)
        dispatch(setNewHeroNickNameSuccess(heroId, nickname))
    } catch (e) {
        console.log(e)
    }
}
export const renameHero = (heroId, name) => async (dispatch) => {
    try {
        await dataApi.renameHero(heroId, name)
        dispatch(renameHeroSuccess(heroId, name))
    } catch (e) {
        console.log(e)
    }
}
export const setHeroDescription = (heroId, description) => async (dispatch) => {
    try {
        await dataApi.setHeroDescription(heroId, description)
        dispatch(setHeroDescriptionSuccess(heroId, description))
    } catch (e) {
        console.log(e)
    }
}
export const setHeroSuperpowers = (heroId, superpowers) => async (dispatch) => {
    try {
        await dataApi.setHeroSuperpowers(heroId, superpowers)
        dispatch(setHeroSuperPowersSuccess(heroId, superpowers))
    } catch (e) {
        console.log(e)
    }
}
export const setHeroCatchPhrase = (heroId, catchPhrase) => async (dispatch) => {
    try {
        await dataApi.setHeroCatchPhrase(heroId, catchPhrase)
        dispatch(setHeroCatchPhraseSuccess(heroId, catchPhrase))
    } catch (e) {
        console.log(e)
    }
}
export const addNewHero = (nickname) => async (dispatch) => {
    try {
        let res = await dataApi.addNewHero(nickname)
        dispatch(addNewHeroSuccess(res))
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
// export const setHeroImage = (image, heroId) => async (dispatch) => {
//     debugger
//     try {
//         debugger
//         encodeImageFileAsURL(image, async (result) => {
//             debugger
//             await dataApi.setHeroImage(image, heroId)
//             dispatch(setPhotoSuccess(image, heroId))
//         })
//     } catch (e) {
//         console.log(e)
//     }
// }
export const setHeroImage = (image, heroId) => async (dispatch) => {
    debugger
    try {
        debugger
        await dataApi.setHeroImage(image, heroId)
        dispatch(setPhotoSuccess(image, heroId))
    } catch (e) {
        console.log(e)
    }
}
