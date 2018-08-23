import React, { Component } from 'react';

export default class AlbumArtist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            albums: [], // empty list on construct
            isLoading: true,
            artist: null
        }
    }

    showAlbums(id) {
        const url = "https://api.spotify.com/v1/artists/" + id + "/albums?include_groups=album";
        const token = "BQDwiPg1BRbgf5v_f0BECEFK026CcZJWQogg6Mg1TEagptQ5n_bZKrvz14_qQ2IdSuf_ZTq-pL2MNYXsAoJYBEsRXauytN9M7BRVjdvVUd3RAo0tUkKCmZZzknhHBS50nSHd61agWTe-6mvaq-6iAWXKjxrUL-lLlsk";

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

            if (data.items.length > 0) {
                this.setState({
                    albums: data.items,
                    isLoading: false,
                    artist: data.items[0].artists[0]
                });
            } else {
                this.setState({
                    isLoading: false
                });
            }
        })
    }

    componentDidMount() {
        this.showAlbums(this.props.match.params.id);
    }

    render() {
        return(
            <div className="album">
                {this.state.isLoading && <p>Chargement en cours</p>}
                {!this.state.isLoading && this.state.artist === null && <p>Pas d'album pour cet artiste :(</p>}
                {!this.state.isLoading && this.state.artist !== null && 
                    <div>
                        <h1>{this.state.artist.name}</h1>
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
                }
            </div>
        )
    }
}