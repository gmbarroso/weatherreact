import React, { useState } from 'react'
import {
    // Button,
    Form
} from 'react-bootstrap';

import './style.css'

const LocationButtons = cityList => {
    const [ cities, setCities ] = useState([])

    // console.log(cityList)
    const renderCityOptions = async () => {
        await cityList.list.map(city => {
            const cityName = city.AdministrativeArea.LocalizedName
            return (
                <option>{cityName}</option>
            )
        })
    }

    console.log(renderCityOptions())
    return (
        <div className="buttons">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control size="sm" as="select" placeholder="Enter email">
                        {/* {renderCityOptions()} */}
                    </Form.Control>
                </Form.Group>
            </Form>
            {/* <Button variant="primary" size="sm">Peido</Button> */}
        </div>
    )
}

export default LocationButtons