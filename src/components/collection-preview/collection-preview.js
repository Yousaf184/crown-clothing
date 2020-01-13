import React from 'react';

import CollectionItem from './collection-item/collection-item';

import classes from './collection-preview.module.scss';

function CollectionPreview(props) {
    return (
        <div className={classes.collectionPreview}>
            <h1 className={classes.title}>{ props.title }</h1>
            <div className={classes.preview}>
                {
                    props.items
                        .filter((item, idx) => idx < 4)
                        .map(item => <CollectionItem key={item.id} {...item}/>)
                }
            </div>
        </div>
    );
}

export default CollectionPreview;