import React, { Component } from 'react';

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
        const token = "BQDAS5wkyJSKMEXx3iFECmZw5gCYKDpKYyWYmxvePiX-d_kUvj1wwniw9VBhyg6xdEJKSRl9suXFdX9ElUg7pf9rJl3nXuJ3iMm1JTWYVtfdvEhd1J8Fp580vYf8GvdtExU9zOyFz0G800_Cnv8uUnWAzn7-3P95nB0";

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
                        <a key={key} className="list-group-item list-group-item-action">{artist.name}</a>
                    )}
                </ul>
            </div>
        )
    }
}