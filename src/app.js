import React, { Component } from 'react';

import ListArtist from './list-artist';

import AlbumArtist from './album-artist';

export default class App extends Component {
    render() {
        return(
            <div>
                <ListArtist />       
                
                <AlbumArtist />
            </div>
        )
    }
}