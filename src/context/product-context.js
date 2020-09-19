import React from 'react';

export default React.createContext({
    cartItems: [],
    wishList: [],
    addToCart: (productId) => { },
    removeFromCart: (productId) => { },
    addToWishlist: (productId) => { },
    removeFromWishlist: (productid) => { }
})