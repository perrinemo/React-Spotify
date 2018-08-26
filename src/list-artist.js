import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchArtists } from './api';
import { Redirect } from "react-router-dom";

export default class ListArtist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            artists: [],
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    searchArtist(name) {
        fetchArtists(name)
        .then((resp) => resp.json())
        .then(data => {
            console.log("Received: ", data.artists.items);
            this.setState({artists: data.artists.items});
        })
    }

    // Action sur le formulaire pour afficher l'artiste entré
    handleSubmit(e) {
        this.searchArtist(this.state.value);
        e.preventDefault();
    }

    render() {
        // On vérifie si un token existe
        var token = sessionStorage.getItem("spotify-token")
        if (token === null) {
            return <Redirect to="/login" />
        }
        return(
            <div className="col-lg-3 col-6 mx-auto">
                <form onSubmit={this.handleSubmit}>
                    <img src="./img/spotify.png" />
                    <div className="form-group">
                        <label>Nom de l'artiste :
                        <input type="text" 
                            className="form-control" 
                            placeholder="Nom de l'artiste"
                            value={this.state.value}
                            onChange={this.handleChange} />
                        </label>
                    </div>
                    <button type="submit" className="btn">Rechercher</button>
                </form>
                <ul id="artists">
                    {this.state.artists.map((artist, key) => 
                        <Link key={key} to={`/artists/${artist.id}`} >
                            <li className="list-group-item list-group-item-action">{artist.name}</li>
                        </Link>
                    )}
                </ul>
            </div>
        )
    }
}