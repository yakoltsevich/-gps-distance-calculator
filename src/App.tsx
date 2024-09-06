import React, {useState} from 'react';
import {MapComponent} from "./components/MapComponent";
import {PointsForm} from "./components/PointsForm";

function App() {
  const [markers, setMarkers] = useState([]);
  return (
      <div className="overflow-hidden">
        <PointsForm markers={markers} setMarkers={setMarkers}/>
        <MapComponent  markers={markers} setMarkers={setMarkers} />
      </div>
  );
}

export default App;
