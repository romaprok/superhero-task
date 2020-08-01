import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import HeroData from "./HeroData";
import MainHeroesList from "./MainHeroesList";

function App() {


    return (
        <>
            <Route exact path={'/'} render={()=><MainHeroesList/>}/>
            <Route path={'/heroData/:id'} render={() => <HeroData/>}/>
        </>
    )

}

export default App;
