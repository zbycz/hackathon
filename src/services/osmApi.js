import osmtogeojson from 'osmtogeojson';


export function getApiId(id) {
    const type = { w: 'way', n: 'node', r: 'relation' }[id[0]];
    const idx = id.substr(1);
    return { type, idx };
}

export function getShortId(id) {
    if (typeof id === 'string') {
        return id.replace(/([a-z])[a-z]+\/([0-9]+)/, '$1$2');
    }

    return id.type[0] + id.idx;
}


export function fetchOsmXmlAsGeojson(url) {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            //this.setState({ isLoading: false });
            return response;
        })
        .then((response) => response.text())
        .then((xmlStr) => (new window.DOMParser()).parseFromString(xmlStr, "text/xml"))
        .then((xmlDom) => osmtogeojson(xmlDom))

}

export function fetchElement(id) {
    const { type, idx } = getApiId(id);
    const url = `https://www.openstreetmap.org/api/0.6/${type}/${idx}`;
    return fetchOsmXmlAsGeojson(url);
}
