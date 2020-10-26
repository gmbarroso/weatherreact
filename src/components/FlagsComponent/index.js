import React from 'react'

import br from '../../img/flags/br.svg'
import us from '../../img/flags/us.svg'
import es from '../../img/flags/es.svg'

import './style.css'

const FlagComponent = ({ setShow, getLang }) => {

    const handleBr = () => {
        setShow(true)
        getLang(document.getElementById('br').id)
    }

    const handleUs = () => {
        setShow(true)
        getLang(document.getElementById('en').id)
    }

    const handleEs = () => {
        setShow(true)
        getLang(document.getElementById('es').id)
    }

    return (
        <div className="flags">
            <img className="flag" id="br" src={br} alt="icon" onClick={() => handleBr()} />
            <img className="flag" id="en" src={us} alt="icon" onClick={() => handleUs()} />
            <img className="flag" id="es" src={es} alt="icon" onClick={() => handleEs()} />
        </div>
    )
}

export default FlagComponent