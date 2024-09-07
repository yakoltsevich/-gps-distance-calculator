import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {haversine} from "../shared/helpers";
import addLocationIcon from '../icons/add_location_icon.svg';
// @ts-ignore
import {Marker} from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {v4 as uuidv4} from 'uuid';
import {Point} from "./Point";
import {Map} from "mapbox-gl";

type PointsFormProps = {
    markers: Marker[],
    setMarkers: Dispatch<SetStateAction<Marker[]>>,
    map: { current: Map | null },
}
export const PointsForm = ({markers, setMarkers, map}: PointsFormProps) => {
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        if (markers.length > 1) {
            let distance = 0
            markers.forEach((marker: Marker, i: number, array: Marker[]) => {
                const nextEl = array[i + 1]
                if (nextEl) {
                    const segment = haversine({
                        lon1: Number(marker.getLngLat().lng),
                        lat1: Number(marker.getLngLat().lat),
                        lon2: Number(nextEl.getLngLat().lng),
                        lat2: Number(nextEl.getLngLat().lat)
                    });
                    distance += segment
                }
            })
            setDistance(Number(distance.toFixed(2)))
        } else {
            setDistance(0)
        }
    }, [markers, setDistance]);

    const onClearClick = () => {
        markers.forEach((marker: Marker) => marker.remove())
        setMarkers([])
    }

    const onAddClick = () => {
        const mark = new Marker()
            .setLngLat([0, 0])
            .addTo(map.current);
        setMarkers((prevMarks: Marker[]) => [...prevMarks, mark])
    }

    return (
        <div className="fixed top-5 left-5 z-10 backdrop-blur p-5 rounded-xl min-w-80">
            <div className='flex gap-1 font-bold text-xl mb-2'>
                <div>Distance:</div>
                <div>{distance} km</div>
            </div>
            <div className=' max-h-[35vh] overflow-x-hidden mb-4'>
                {markers.map((marker: Marker[], i: number) =>
                    <Point marker={marker} setMarkers={setMarkers} index={i} key={uuidv4()}/>
                )}
            </div>

            <div className='grid grid-cols-2 gap-4 '>
                <button className='border-none p-2 hover:scale-105 bg-gray-300 flex rounded-xl justify-center'
                        onClick={onClearClick}>Clear
                </button>
                <button className='border-none p-2 hover:scale-105 bg-blue-200 flex rounded-xl justify-center'
                        onClick={onAddClick}>
                    <img src={addLocationIcon} alt="add location"/>&nbsp;Add new
                </button>
            </div>
        </div>
    );
}
