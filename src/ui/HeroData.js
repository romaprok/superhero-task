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
        dispatch(setNewHeroNickName(heroId, superName))
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


    const data = useSelector(state => state.reducer.data)
    const [el] = useSelector(state => state.reducer.data)


    const [superName, changeNickName] = useState(data.nickname)
    const [name, changeName] = useState(data.real_name)
    const [description, changeDescription] = useState(data.origin_description)
    const [superPower, changeSuperPower] = useState(data.superpowers)
    const [catchPhrase, changeCatchPhrase] = useState(data.catch_phrase)
    const fullHeroData = (
        <div>
            <div> {!editModeNickName
                ? <span onClick={onActivatedEditModeNickName}
                        className={'heroTableField'}>{data.nickname ? superName : 'unknown'}</span>
                : <input className={'heroTableInput'} onChange={onNickNameChanged}
                         value={superName}
                         autoFocus={true}
                         onBlur={() => deactivatedEditModeNickName(data.id)}
                         type="text"/>
            }</div>
            <div> {!editModeName
                ? <span onClick={onActivatedEditModeName}
                        className={'heroTableField'}>{data.real_name ? data.real_name : 'unknown'}</span>
                : <input className={'heroTableInput'} onChange={onNameChanged} autoFocus={true}
                         onBlur={() => deactivatedEditModeName(data.id)} type="text"
                         value={name}/>
            }</div>
            <div>
                {!editModeDescription
                    ? <span onClick={onActivatedEditModeDescription}
                            className={'heroTableField'}>{data.origin_description ? data.origin_description : 'unknown'}</span>
                    : <input className={'heroTableInput'} onChange={onDescriptionChanged} autoFocus={true}
                             onBlur={() => deactivatedEditModeDescription(data.id)}
                             type="text"
                             value={description}/>
                }</div>
            <div>
                {!editModeSuperPower
                    ? <span onClick={onActivatedEditModeSuperPower}
                            className={'heroTableField'}>{data.superpowers ? data.superpowers : 'unknown'}</span>
                    : <input className={'heroTableInput'} onChange={onSuperPowerChanged} autoFocus={true}
                             onBlur={() => deactivatedEditModeSuperPower(data.id)}
                             type="text"
                             value={superPower}/>
                }</div>
            <div> {!editModeCatchPhrase
                ? <span onClick={onActivatedEditModeCatchPhrase}
                        className={'heroTableField'}>{data.catch_phrase ? data.catch_phrase : 'unknown'}</span>
                : <input className={'heroTableInput'} onChange={onCatchPhraseChanged} autoFocus={true}
                         onBlur={() => deactivatedEditModeCatchPhrase(data.id)}
                         type="text"
                         placeholder={catchPhrase}/>
            }</div>
            <div>{data.images
                ? <img className={'heroImage'} src={data.images} alt=""/>
                : <img className={'heroImage'} src={superHero} alt=""/>}
            </div>

        </div>
    )
    return (
        <>
            <button><NavLink to={'/'}>back to main menu</NavLink></button>
            <div className={'heroWrapper'}>
                <div>
                    <div>nickname</div>
                    <div>name</div>
                    <div>description</div>
                    <div>superpowers</div>
                    <div>catch phrase</div>
                    <div>image</div>
                </div>
                {fullHeroData}
            </div>

        </>
    );
}

export default withRouter(HeroData);
