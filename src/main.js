import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AlbumArtist from './album-artist';
import ListArtist from './list-artist';
import qs from "query-string";

const AuthContext = React.createContext("auth-context");

const LoginSpotify = () => {
    var scopes = "user-read-private user-read-email";

    window.location.href = "https://accounts.spotify.com/authorize" + 
        "?response_type=token" +
        "&client_id=c079e596f6884fe8840ec176f48f442c" +
        "&scope=" + scopes + 
        "&redirect_uri=http://localhost:8080/callback/";
}


const CallbackSpotify = ({ location }) => {
    const values = qs.parse(location.hash)
    console.log(values);
    sessionStorage.setItem("spotify-token", values.access_token);
    sessionStorage.setItem("spotify-expires", values.expires_in);
    return <Redirect to="/" />
}


const Main = () => (
    <main>
        <AuthContext.Provider>
            <Switch>
                <Route exact path='/' component={ListArtist} />
                <Route path='/artists/:id' component={AlbumArtist} />
                <Route path='/login' component={LoginSpotify} />
                <Route path='/callback' component={CallbackSpotify} />
            </Switch>
        </AuthContext.Provider>
    </main>
)

export default Main;