import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import superHero from '../accets/superhero.jpg'
import {setHeroId} from "../bll/dataReducer";
import {NavLink, withRouter} from "react-router-dom";

function HeroData(props) {

    useEffect(() => {
        debugger
        let id = props.match.params.id
        dispatch(setHeroId(+id))

    }, [])


    const dispatch = useDispatch()

    debugger
    const defFullHeroData = useSelector(state => state.reducer.data)
        const fullHeroData = defFullHeroData.map(el =>
        <tr>
            <td className={'heroTableField'}>{el.nickname}</td>
            <td className={'heroTableField'}>{el.real_name ? el.real_name : 'unknown'}</td>
            <td className={'heroTableField'}>{el.origin_description ? el.origin_description : 'unknown'}</td>
            <td className={'heroTableField'}>{el.superpowers ? el.superpowers : 'unknown'}</td>
            <td className={'heroTableField'}>{el.catch_phrase ? el.catch_phrase : 'unknown'}</td>
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
