import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import superHero from '../assets/superhero.jpg'
import {
    renameHero,
    setHeroCatchPhrase,
    setHeroDescription,
    setHeroId,
    setHeroSuperpowers,
    setNewHeroNickName
} from "../bll/dataReducer";
import {NavLink, withRouter} from "react-router-dom";

function HeroData(props) {

    const dispatch = useDispatch()

    const [editModeNickName, setEditModeNickName] = useState(false)
    const [editModeName, setEditModeName] = useState(false)
    const [editModeDescription, setEditModeDescription] = useState(false)
    const [editModeSuperPower, setEditModeSuperPower] = useState(false)
    const [editModeCatchPhrase, setEditModeCatchPhrase] = useState(false)


    useEffect(() => {
        let id = props.match.params.id
        dispatch(setHeroId(+id))
    }, [])

    const onActivatedEditModeNickName = () => setEditModeNickName(true)
    const onActivatedEditModeName = () => setEditModeName(true)
    const onActivatedEditModeDescription = () => setEditModeDescription(true)
    const onActivatedEditModeSuperPower = () => setEditModeSuperPower(true)
    const onActivatedEditModeCatchPhrase = () => setEditModeCatchPhrase(true)

    const deactivatedEditModeNickName = (heroId) => {
        setEditModeNickName(false)
        dispatch(setNewHeroNickName(heroId, nickname))
    }
    const deactivatedEditModeName = (heroId) => {
        setEditModeName(false)
        dispatch(renameHero(heroId, name))
    }
    const deactivatedEditModeDescription = (heroId) => {
        setEditModeDescription(false)
        dispatch(setHeroDescription(heroId, description))
    }
    const deactivatedEditModeSuperPower = (heroId) => {
        setEditModeSuperPower(false)
        dispatch(setHeroSuperpowers(heroId, superPower))
    }
    const deactivatedEditModeCatchPhrase = (heroId) => {
        setEditModeCatchPhrase(false)
        dispatch(setHeroCatchPhrase(heroId, catchPhrase))
    }

    const onNickNameChanged = (e) => changeNickName(e.currentTarget.value)
    const onNameChanged = (e) => changeName(e.currentTarget.value)
    const onDescriptionChanged = (e) => changeDescription(e.currentTarget.value)
    const onSuperPowerChanged = (e) => changeSuperPower(e.currentTarget.value)
    const onCatchPhraseChanged = (e) => changeCatchPhrase(e.currentTarget.value)


    const [el] = useSelector(state => state.reducer.data)

    const [nickname, changeNickName] = useState(el.nickname)
    const [name, changeName] = useState(el.real_name)
    const [description, changeDescription] = useState(el.origin_description)
    const [superPower, changeSuperPower] = useState(el.superpowers)
    const [catchPhrase, changeCatchPhrase] = useState(el.catch_phrase)
    const fullHeroData = (
        <tr>
            {!editModeNickName
                ? <td onClick={onActivatedEditModeNickName}
                      className={'heroTableField'}>{el.nickname ? el.nickname : 'unknown'}</td>
                : <input onChange={onNickNameChanged}
                         value={nickname}
                         autoFocus={true} placeholder={nickname}
                         onBlur={() => deactivatedEditModeNickName(el.id)}
                         type="text"/>
            }
            {!editModeName
                ? <td onClick={onActivatedEditModeName}
                      className={'heroTableField'}>{el.real_name ? el.real_name : 'unknown'}</td>
                :
                <input onChange={onNameChanged} autoFocus={true} onBlur={() => deactivatedEditModeName(el.id)} type="text"
                       value={name}/>
            }
            {!editModeDescription
                ? <td onClick={onActivatedEditModeDescription}
                      className={'heroTableField'}>{el.origin_description ? el.origin_description : 'unknown'}</td>
                : <input onChange={onDescriptionChanged} autoFocus={true}
                         onBlur={() => deactivatedEditModeDescription(el.id)}
                         type="text"
                         value={description}/>
            }
            {!editModeSuperPower
                ? <td onClick={onActivatedEditModeSuperPower}
                      className={'heroTableField'}>{el.superpowers ? el.superpowers : 'unknown'}</td>
                :
                <input onChange={onSuperPowerChanged} autoFocus={true} onBlur={() => deactivatedEditModeSuperPower(el.id)}
                       type="text"
                       value={superPower}/>
            }
            {!editModeCatchPhrase
                ? <td onClick={onActivatedEditModeCatchPhrase}
                      className={'heroTableField'}>{el.catch_phrase ? el.catch_phrase : 'unknown'}</td>
                : <input onChange={onCatchPhraseChanged} autoFocus={true} onBlur={() =>deactivatedEditModeCatchPhrase(el.id)}
                         type="text"
                         placeholder={catchPhrase}/>
            }
            <td>{el.images
                ? <img className={'heroImage'} src={el.images} alt=""/>
                : <img className={'heroImage'} src={superHero} alt=""/>}
            </td>
        </tr>
    )

    return (
        <>
            <button><NavLink to={'/'}>back to main menu</NavLink></button>
            <div className="hero">
                <table>
                    <tr>
                        <th>nickname</th>
                        <th>real name</th>
                        <th>description</th>
                        <th>superpowers</th>
                        <th>catch phrase</th>
                        <th>image</th>
                    </tr>
                    {fullHeroData}
                </table>
            </div>
        </>
    );
}

export default withRouter(HeroData);
