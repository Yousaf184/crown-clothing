import React, { Component } from 'react';

import CollectionPreview from '../../components/collection-preview/collection-preview';

import SHOP_DATA from './shop-data';

class ShopPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.collections
                        .map(c => <CollectionPreview key={c.id} {...c}/>)
                }
            </div>
        );
    }
}

export default ShopPage;