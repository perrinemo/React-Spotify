import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AlbumArtist from './album-artist';
import ListArtist from './list-artist';

const Main = () => (
    <main>
        <Switch>
            <Route path='/artists/:id' component={AlbumArtist} />
            <Route path='/' component={ListArtist} />
        </Switch>
    </main>
)

export default Main;