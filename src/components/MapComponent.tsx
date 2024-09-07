import React, {useRef, useEffect, useState, SetStateAction, Dispatch} from 'react';
// @ts-ignore
import mapboxgl, {MapMouseEvent, Map, Marker} from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN
const GDANSK_COORDINATES = {
    latitude: '54.35',
    longitude: '18.63'
}

type MapComponentProps = {
    markers: Marker[],
    setMarkers: Dispatch<SetStateAction<Marker[]>>,
    map: { current: Map | null },
}
export const MapComponent = ({setMarkers, map}: MapComponentProps) => {
    const mapContainer = useRef(null);
    const [lng, setLng] = useState<string>(GDANSK_COORDINATES.longitude);
    const [lat, setLat] = useState<string>(GDANSK_COORDINATES.latitude);
    const [zoom, setZoom] = useState('11');

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        if (map.current) {
            map.current.on('move', () => {
                const currentMap = map.current;
                if (currentMap) {
                    setLng(currentMap.getCenter().lng.toFixed(4));
                    setLat(currentMap.getCenter().lat.toFixed(4));
                    setZoom(currentMap.getZoom().toFixed(2));
                }
            });

            map.current.on('click', (evt: MapMouseEvent) => {
                const {lat, lng} = evt.lngLat
                const mark = new mapboxgl.Marker()
                    .setLngLat([lng, lat])
                    .addTo(map.current);
                setMarkers((prevMarks: Marker[]) => [...prevMarks, mark])
            });
        }

        return () => {
            map.current = false;
        };
    }, [map, lat, lng, zoom, setMarkers]);

    return (
        <div ref={mapContainer} className="h-[100vh] w-full"/>
    );
}
