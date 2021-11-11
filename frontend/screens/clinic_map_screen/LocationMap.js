import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
    map: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    }
};

export class CurrentLocation extends React.Component {
    constructor(props) {
        super(props);

        const { lat, lng } = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            },
            clinicLocations: []
        };
    }

    // update map
    componentDidUpdate(prevProps, prevState) {
        // network unavailable
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        // change in location
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    // change center of map to current location
    recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;
        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
        }
    }
    
    // map already loaded so set callback to fetch current location
    componentDidMount() {
        if (this.props.centerAroundCenterLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    });
                });
            }
        }
        this.loadMap();
    }

    // load map
    loadMap() {
        if (this.props && this.props.google) {
            // check if google available
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;

            // reference to actual DOM element
            const node = ReactDOM.findDOMNode(mapRef);

            let { zoom } = this.props;
            const { lat, lng } = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);

            const mapConfig = Object.assign(
                {},
                {
                    center: center,
                    zoom: zoom
                }
            );

            // map constructor
            this.map = new maps.Map(node, mapConfig);
        }
    }

    getClinics() {
        // request details of health related services nearby
        const latitude = state.lat;
        const longitude = state.lng;
        const type = 'health';
        const radius = 50000;

        
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&type=' + type + '&key=' + 'AIzaSyB7IherL6RNS-XYn87NWahcAFNA-D8ALcM';

        fetch(url)
            .then(res => {
                return res.json()
            })
            .then(res => {
                // for each service returned retrieve its details, put details in clinics list
                this.setState({
                    clinicLocations: res
                })
            })
    }

    renderMarkers() {
        return this.state.clinicLocations.map((location, i) => {
            return <Marker
                key={ i }
                onClick={ this.onMarkerClick }
                title={ location.locName }
                position={ JSON.parse(locationn.position) }
                desc={ location.desc }
                name={ location.locName }>
            </Marker>
        })
    }

    renderChildren() {
        const { children } = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            if (!c) return;

            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }

    render() {
        const style = Object.assign({}, mapStyles.map);

        return(
            <div>
                <div style={style} ref="map">
                    Loading Map...
                </div>
                { this.renderChildren() }
                { this.renderMarkers() }
            </div>
        );
    }
}

export default CurrentLocation;

CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter: {
        lat: 53.5461,
        lng: -113.4938,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
    centerAroundCurrentLocation: false,
    visible: true
};