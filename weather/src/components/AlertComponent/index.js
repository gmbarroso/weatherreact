import React, { Fragment } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const Alert = ({
    message,
    showAlert
}) => {
    return (
        <Fragment>
            {showAlert &&
                <div className="alert alert-success" role="alert" >
                    {message}
                </div>
            }
        </Fragment>
    )
}

export default Alert