import React from 'react'
import {useLocation} from 'react-router-dom'

function Compare() {
    const location = useLocation()
    console.log(location.state.grid)
    return (
        <div>Compare</div>
    )
}

export default Compare