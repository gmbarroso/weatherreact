import React, { Fragment } from 'react'

import './style.css'

  const Loader = () => (
    <Fragment>
        <div className="loaderContainer">
          <div className="spinner-border text-primary" role="status" />
        </div>
    </Fragment>
  )

  export default Loader