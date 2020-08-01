import React, { Fragment } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const Alert = ({
    message,
    showAlert
}) => (
    <Fragment>
        {showAlert &&
            <div id="snackbar" className="show">
                { message }
            </div>
        }
    </Fragment>
)

export default Alert