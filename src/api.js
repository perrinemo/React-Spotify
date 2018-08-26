const rawToken = "BQDCRRz45_pxO5xLUK97oCMWRSSZ-ZpYsW07NUlmaklc6LLTUYZEhrn4HCKkskVGcCOeK9QNDIf81vnupnyGJkvwh05-HH10SeiZCrpJmlxK8V-ZblVKUfjoeDCZ5Hfd1lmPn4JlF93tiU4V2Zuhhe_jh4u-W2cUfSI";

// Requête pour afficher les albums d'un artiste
export function fetchAlbums(id) {
    const url = "https://api.spotify.com/v1/artists/" + id + "/albums?include_groups=album";
    var token = sessionStorage.getItem("spotify-token");
    return fetch(url, {
        method: 'get',
        headers: new Headers({
            'Authorization': "Bearer " + token,
            'Content-Type': "application/json"
        })
    })
}

// Requête pour trouver un artiste
export function fetchArtists(name) {
    const url = "https://api.spotify.com/v1/search?type=artist&q=" + name;
    var token = sessionStorage.getItem("spotify-token");
    return fetch(url, {
        method: 'get',
        headers: new Headers({
            'Authorization': "Bearer " + token,
            'Content-Type': "application/json"
        })
    })
}