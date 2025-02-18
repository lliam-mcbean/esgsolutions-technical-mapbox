import React from 'react'
import { useInfo } from '../context/info'

export default function Info() {
    const {info, earthquakeRange, setEarthquakeRange, setDisplacementRange, displacementRange} = useInfo()

  return (
    <div>
    <div className='fixed top-0 right-0 p-4 bg-white opacity-80 rounded'>
      {info ? <>
        <div>
            {`location: ${info.location}`}
        </div>
        <div>
            {`coords: ${info.coords}`}
        </div>
        <div>
            {`amplitude: ${info.amplitude}`}
        </div>
      </> : 'Select an earthquake site'}
    </div>
        <div className='fixed left-0 top-0 p-4'>
            <div>Earthquake range</div>
            <input type="range" value={earthquakeRange} step={0.1} min={0} max={5} onChange={(e) => {
                setEarthquakeRange(e.target.value)
            }}/>
        </div>
    </div>
  )
}

