import React, { Component } from 'react';
import { fetchAlbums } from './api';
import { Link } from 'react-router-dom';

export default class AlbumArtist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            albums: [],
            isLoading: true,
            artist: null
        }
    }

    // Afficher les albums de l'artiste
    showAlbums(id) {
        fetchAlbums(id)
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
        // On vérifie si un token existe
        var token = sessionStorage.getItem("spotify-token")
        if (token === null) {
            return <Redirect to="/login" />
        }
        return(
            <div className="album">
                {this.state.isLoading && 
                    <p>Chargement en cours</p>
                }
                
                {!this.state.isLoading && this.state.artist === null && 
                    <div>
                        <p>Pas d'album pour cet artiste :(</p>
                        <Link to="/">Retour</Link>
                    </div>
                }
                
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