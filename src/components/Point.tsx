import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react';
import deleteIcon from '../icons/delete_icon.svg';
// @ts-ignore
import {Marker} from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax


type PointProps = {
    marker: Marker,
    setMarkers: Dispatch<SetStateAction<Marker[]>>,
    index: number,
}
export const Point = ({marker, setMarkers, index}: PointProps) => {
    const {lng, lat} = marker.getLngLat()
    const [longitude, setLng] = useState(lng);
    const [latitude, setLat] = useState(lat);

    useEffect(() => {
        marker.setLngLat([longitude, latitude])
    }, [marker, latitude, longitude]);

    const onRemoveClick = () => {
        marker.remove()
        setMarkers((markers: Marker[]) => {
            const newArr = [...markers]
            newArr.splice(index, 1)
            return newArr
        })
    }
    const onLongitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value === ''
            ? event.target.value
            : Math.min(Math.max(Number(event.target.value), -180), 180)
        setLng(newValue)
    }

    const onLatitudeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value === ''
            ? event.target.value
            : Math.min(Math.max(Number(event.target.value), -90), 90)
        setLat(newValue)
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
                    <button onClick={onRemoveClick} className='hover:scale-125'>
                        <img src={deleteIcon} alt="delete"/>
                    </button>
                </div>
            </div>
        </div>
    );
}
