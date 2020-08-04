import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {addNewHero, deleteHero, getData, setHeroImage} from '../bll/dataReducer';
import superHero from '../assets/superhero.jpg'
import {NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Pagination from '@material-ui/lab/Pagination';
import {withStyles} from '@material-ui/core/styles';

function MainHeroesList() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getData())
    }, [])



    const onMainPhotoSelected = (e, id) => {
        if (e.target.files.length) {
            dispatch(setHeroImage(e.target.files[0], id));
        }
    }

    const [error, setError] = useState(false)

    const onClickDeleteHero = (heroId) => {
        dispatch(deleteHero(heroId))
    }
    // const currentPage = useSelector(state => state.reducer.data.currentPage)
    // const pageSize = useSelector(state => state.reducer.data.pageSize)
    // const totalItemsCount = useSelector(state => state.reducer.data.totalItemsCount)

    const hero = useSelector(state => state.reducer.data).map(el =>
        <div className={'hero'} id={el.id}>
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
                {!el.images && <input type={'file'} onChange={(e) => onMainPhotoSelected(e, el.id)}/>}</div>
            <div>
                <button onClick={() => onClickDeleteHero(el.id)}>delete hero</button>
            </div>
        </div>)

    const page = useSelector(state => state.reducer.currentPage);
    const pageSize = useSelector(state => state.reducer.pageSize);
    const totalUserCount = useSelector(state => state.reducer.totalUsersCount);

    const [nickName, setNewNickName] = useState('')

    const heroNickNameChange = (e) => {
        setError(false)
        setNewNickName(e.currentTarget.value)}

    const addHero = () => {
        if (!nickName) {
            setError(true)
        } else {
            debugger
            setError(false)
            let newNickname = nickName
            dispatch(addNewHero(newNickname))
            setNewNickName('')
        }
    }

    return (
        <div className="App">
            <Pagination count={10} page={1} color="primary" onChange={() => {
            }}/>
            {/*<Paginator currentPage={currentPage}*/}
            {/*           // onPageChanged={onPageChanged}*/}
            {/*           totalItemsCount={totalItemsCount} pageSize={pageSize}/>*/}
            <Input error={error ? error : ''}
                   onChange={heroNickNameChange}
                   type="text"
                   value={nickName}/>
            <Button variant={'contained'} onClick={addHero}>add super hero</Button>
            <div>
                {hero}
            </div>
        </div>
    );
}

export default MainHeroesList;
