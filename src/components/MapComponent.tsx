import React, {useRef, useEffect, useState} from 'react';
// @ts-ignore
import mapboxgl, {MapMouseEvent} from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN

export const MapComponent = ({markers, setMarkers}: any) => {
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(18.63);
    const [lat, setLat] = useState(54.35);
    const [zoom, setZoom] = useState(10.2);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        map.current.on('click', (evt: MapMouseEvent) => {
            const {lat, lng} = evt.lngLat
            const mark = new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(map.current);
            setMarkers((prevMark: any) => [...prevMark, mark])
        });
    }, [map, lat, lng, zoom, setMarkers]);

    return (
        <div ref={mapContainer} className="h-[100vh] w-full"/>
    );
}



