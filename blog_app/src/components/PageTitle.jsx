import React from 'react'
import { Helmet } from 'react-helmet'

function PageTitle(props) {
    return (
        <>
            <Helmet>
                <title>OOKINGSLEY BLOG | {props.title}</title>
                <meta name="description" content={props.description} />
            </Helmet>
        </>
    )
}

export default PageTitle
