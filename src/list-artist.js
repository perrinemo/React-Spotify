import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ListArtist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            artists: [], // empty list on construct
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    searchArtist(name) {
        const url = "https://api.spotify.com/v1/search?type=artist&q=" + name;
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
            console.log("Received: ", data.artists.items);
            this.setState({artists: data.artists.items});
        })
    }

    handleSubmit(e) {
        this.searchArtist(this.state.value);
        e.preventDefault();
    }

    render() {        
        return(
            <div className="col-4 mx-auto">
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
                        <Link to={`/artists/${artist.id}`} >
                            <a key={key} href="#" className="list-group-item list-group-item-action">{artist.name}</a>
                        </Link>
                    )}
                </ul>
            </div>
        )
    }
}