import React, {useEffect, useState} from 'react';
import {haversine} from "../shared/helpers";
import deleteIcon from '../icons/delete_icon.svg';

const Marker = ({marker, setMarkers, index}: any) => {
    const {lng, lat} = marker.getLngLat()

    const [longitude, setLng] = useState(lng);
    const [latitude, setLat] = useState(lat);

    useEffect(() => {
        marker.setLngLat([longitude, latitude])
    }, [marker, latitude, longitude]);

    const onRemoveClick = () => {
        marker.remove()
        setMarkers((points: any) => {
            const newarr = [...points]
            newarr.splice(index, 1)
            return newarr
        })
    }
    const onLongitudeChange = (event: any) => {
        setLng(Math.min(Math.max(Number(event.target.value), -180), 180))
    }
    const onLatitudeChange = (event: any) => {
        setLat(Math.min(Math.max(Number(event.target.value), -90), 90))
    }

    return (
        <div className="flex flex-col mb-3">
            <div className='font-medium'>Point {index + 1}</div>
            <div className='flex'>
                <div className="grid grid-cols-[1fr,2fr] grid-rows-2 gap-1 min-w-64">
                    <div>Longitude</div>
                    <input
                        className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-1 rounded`}
                        min={-180}
                        max={180}
                        type="number" value={longitude} onChange={onLongitudeChange}/>

                    <div>Latitude</div>
                    <input type="number"
                           min={-90}
                           max={90}
                           className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-1 rounded`}
                           value={latitude} onChange={onLatitudeChange}/>
                </div>
                <div className='flex justify-center w-[50px]'>
                    <button onClick={onRemoveClick}>
                        <img src={deleteIcon} alt="delete"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export const PointsForm = ({markers, setMarkers}: any) => {
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        if (markers.length > 1) {
            let distance = 0
            markers.forEach((marker: any, i: any, array: any) => {
                const nextEl = array[i + 1]
                if (nextEl) {
                    const cc = haversine({
                        lon1: Number(marker.getLngLat().lng),
                        lat1: Number(marker.getLngLat().lat),
                        lon2: Number(nextEl.getLngLat().lng),
                        lat2: Number(nextEl.getLngLat().lat)
                    });
                    distance += cc
                }
            })
            setDistance(Number(distance.toFixed(2)))
        } else {
            setDistance(0)
        }

    }, [markers, setDistance]);

    const onClearClick = () => {
        markers.forEach((marker: any) => marker.remove())
        setMarkers([])
    }
    return (
        <div className="fixed top-5 left-5 z-10 backdrop-blur p-5 rounded-xl">
            <div className='flex gap-1 font-bold text-xl mb-2'>
                <div>Distance:</div>
                <div>{distance} km</div>
            </div>
            <div className=' max-h-[70vh] overflow-x-hidden mb-4'>
                {markers.map((marker: any, i: number) => {
                    return <Marker marker={marker} setMarkers={setMarkers} index={i}
                                   key={JSON.stringify(marker.getLngLat())}/>
                })}
            </div>
            <button className='border-none p-2 px-10 hover:scale-105 bg-gray-300 flex rounded-xl'
                    onClick={onClearClick}>Clear
            </button>
        </div>
    );
}



