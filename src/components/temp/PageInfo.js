// Lists page data so it may be referred to when testing

import React from 'react';

const PageInfo = props => {
    const { title, id, type } = props;
    return (
        <summary>
            <h3>{title}</h3>
            <p>Type: {type}</p>
            <p>ID: {id}</p>
        </summary>
    );
}

export default PageInfo;
