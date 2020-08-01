import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {getData, setHeroImage, setNewHeroNickName} from "../bll/dataReducer";
import superHero from '../accets/superhero.jpg'
import {NavLink} from "react-router-dom";

function MainHeroesList() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getData())
    }, [])

    const onMainPhotoSelected = (e, id) => {
        if (e.target.files.length) {
            setHeroImage(e.target.files[0], id);
        }
    }

    // const currentPage = useSelector(state => state.reducer.data.currentPage)
    // const pageSize = useSelector(state => state.reducer.data.pageSize)
    // const totalItemsCount = useSelector(state => state.reducer.data.totalItemsCount)

    const hero = useSelector(state => state.reducer.data).map(el =>
        <div className={'hero'}>
            <div className={'heroNickName'}>{el.nickname}</div>
            {el.images
                ? <div className={'heroImageWrapper'}><img className={'heroImage'} src={el.images} alt=""/></div>
                :
                <div className={'heroImageWrapper'}><img className={'heroImage'} src={superHero} alt=""/></div>}
            <div>
                <button>change hero</button>
            </div>
            <div>
                <button><NavLink to={'/heroData/' + el.id}>see details about hero</NavLink></button>
                {!el.images &&   <input type={"file"} onChange={onMainPhotoSelected}/>}</div>
        </div>)


    const [newNickName, setNewNickName] = useState('')

    const heroNickNameChange = (e) => setNewNickName(e.currentTarget.value)

    const addHero = () => {
        let nickname = newNickName
        dispatch(setNewHeroNickName(nickname))
    }

    return (
        <div className="App">
            {/*<Paginator currentPage={currentPage}*/}
            {/*           // onPageChanged={onPageChanged}*/}
            {/*           totalItemsCount={totalItemsCount} pageSize={pageSize}/>*/}
            <input onChange={heroNickNameChange} type="text" placeholder={'nickname'}/>
            <button onClick={addHero}>add super hero</button>
            <div>
                {hero}
            </div>
        </div>
    );
}

export default MainHeroesList;
