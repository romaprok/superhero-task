import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import HeroData from './HeroData';
import MainHeroesList from './MainHeroesList';


function App() {
    return (
        <Switch>
            <Route exact path={'/'} component={MainHeroesList}/>
            <Route exact path={'/superhero-task'} component={MainHeroesList}/>
            <Route path={'/heroData/:id'} component={HeroData}/>


            {/*data.map(patient => <Link to={`${patient.name}` }></Link>*/}
        </Switch>
    )
}

export default App;
