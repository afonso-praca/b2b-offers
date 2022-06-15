import React, { Fragment } from 'react'
import { Route } from 'vtex.my-account-commons/Router'
import offersPage from './B2BOffersPage'

/* Router */
const ExtensionRouter = () => (
    <Fragment>
        <Route exact path="/offers" component={offersPage} />
    </Fragment>
)

export default ExtensionRouter