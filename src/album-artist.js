import React, { Component } from 'react';

export default class AlbumArtist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            albums: [], // empty list on construct
        }
    }

    showAlbums(id) {
        const url = "https://api.spotify.com/v1/artists/" + id + "/albums?include_groups=album";
        const token = "BQDBs3YU2eRclJwrEWrgru8HHfrsEtMg-zsLTdg6D3dQviwpXUCQVfJN-IqLErIJNM60YKUtA5U9yqU9SvkBhSxARnVGEj5YvBpVMjUK3xVefbF4UpHbfdgHenbsO_ypRCE3Gm5yi9zUTrC9vHwNBSORuvFNKxi9hKM";

        fetch(url, {
            method: 'get',
            headers: new Headers({
                'Authorization': "Bearer " + token,
                'Content-Type': "application/json"
            })
        })
        .then((resp) => resp.json())
        .then(data => {
            console.log("Received: ", data.items);
            this.setState({albums: data.items});
        })
    }

    componentDidMount() {
        this.showAlbums("5MmVJVhhYKQ86izuGHzJYA");
    }

    render() {
        return(
            <div className="album">
                <h1>Mika</h1>
                <div className="flex-container">
                    {this.state.albums.map((album, key) => 
                        <div key={key} className="card">
                            <img className="car-img-top" src={ album.images[0].url } />
                            <div className="card-body">
                                <h5 className="card-title">{ album.name }</h5>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}