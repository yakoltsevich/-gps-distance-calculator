import React, {useRef, useState} from 'react';
import {MapComponent} from "./components/MapComponent";
import {PointsForm} from "./components/PointsForm";
// @ts-ignore
import {Marker, Map} from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

function App() {
    const [markers, setMarkers] = useState<Marker[]>([]);
    const map = useRef<Map | null>(null);

    return (
        <div className="overflow-hidden">
            <PointsForm markers={markers} map={map} setMarkers={setMarkers}/>
            <MapComponent markers={markers} map={map} setMarkers={setMarkers}/>
        </div>
    );
}

export default App;
