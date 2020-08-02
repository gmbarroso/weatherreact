import React from 'react'
import {
    // Button,
    DropdownButton
} from 'react-bootstrap';

import './style.css'

const LocationButtons = list => {
    return (
        <div className="buttons">
            <DropdownButton size="sm" id="dropdown-basic-button" title="Selecione uma cidade" />
            {/* <Button variant="primary" size="sm">Peido</Button> */}
        </div>
    )
}

export default LocationButtons