import React, { useEffect,memo,Fragment } from 'react'


//SimpleRouter 
// import SimpleRouter from '../../router/simple-router'

// store
import { Outlet } from 'react-router-dom'

const Simple = memo((props) => {
    return (
        <Fragment>
            <div id="loading">
            </div>
            <div className="wrapper">
                <Outlet />
            </div>
        </Fragment>
    )
})

export default Simple
