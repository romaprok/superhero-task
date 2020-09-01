import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {addNewHero, deleteHero, getData, setHeroImage} from '../bll/dataReducer';
import superHero from '../assets/superhero.jpg'
import {NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Pagination from '@material-ui/lab/Pagination';

function MainHeroesList() {
    const dispatch = useDispatch()
    const inRef = useRef(null)

    const totalUsersCount = useSelector(state => state.reducer.totalUsersCount);
    const data = useSelector(state => state.reducer.data);
    const pageSize = useSelector(state => state.reducer.pageSize);
    const [page, setCurrentPage] = useState(1)

    const [code, setCode] = useState(true);
    const [text, setText] = useState('');
    const [file, setFile] = useState();
    const [fileURL, setFileURL] = useState();
    const [fileData, setFileData] = useState();
    const [file64, setFile64] = useState();
    const [base64, setBase64] = useState(true);

    useEffect(() => {
        dispatch(getData(page))
    }, [page])

    useEffect(() => {
        return () => {
            console.log("cleaned up");
        };
    }, []);

    const imageHero = React.createRef()

    const onMainPhotoSelected = (e, heroId) => {
        const newFile = e.target.files && e.target.files[0]
        const reader = new FileReader();
        const formData = new FormData();

        if (newFile) {
            setFile(newFile);
            setFileURL(window.URL.createObjectURL(newFile));
            formData.append('myFile', newFile, newFile.name);
            setFileData(formData);

            if (code) {
                reader.onloadend = () => {
                    setFile64(reader.result);

                };
                if (base64) {
                    reader.readAsDataURL(newFile);
                    dispatch(setHeroImage(newFile, heroId))
                } else reader.readAsText(newFile)
            }
        }
    }

    const [error, setError] = useState(false)

    const onClickDeleteHero = (heroId) => {
        dispatch(deleteHero(heroId))
    }
    const newData = useSelector(state=>state.reducer.data)
    console.log(newData)
    const hero = useSelector(state => state.reducer.data).map((el, i) =>
        <div className={'hero'} id={el.id} key={i}>
            <div className={'heroNickName'}>{el.nickname}</div>
            {el.images
                ? <div className={'heroImageWrapper'}><img ref={imageHero} className={'heroImage'} src={el.images}
                                                           alt=""/></div>
                : <div className={'heroImageWrapper'}><img ref={imageHero} className={'heroImage'}
                                                           src={file64 ? file64 : superHero}
                                                           alt=""/></div>}
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


    const [nickName, setNewNickName] = useState('')

    const heroNickNameChange = (e) => {
        setError(false)
        setNewNickName(e.currentTarget.value)
    }

    const addHero = () => {
        if (!nickName) {
            setError(true)
        } else {
            setError(false)
            let newNickname = nickName
            dispatch(addNewHero(newNickname))
            setNewNickName('')
        }
    }
    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            addHero();
        }
    }


    const changeCurrentPage = (e) => {
        (setCurrentPage(+e.currentTarget.innerText))
    }

    const count = Math.ceil(totalUsersCount / pageSize)
    console.log(totalUsersCount)
    console.log(pageSize)
    console.log(page)
    return (
        <div className="App">
            <Pagination count={count} page={page} color='primary' onChange={changeCurrentPage}/>
            <Input error={error ? error : ''}
                   onChange={heroNickNameChange}
                   type="text"
                   value={nickName}
                   onKeyPress={onKeyPress}
            />
            <Button variant={'contained'} onClick={addHero}>add super hero</Button>
            <div>
                {hero}
            </div>
        </div>
    );
}

export default MainHeroesList;
