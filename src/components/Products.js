import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { products } from '../data/products';


const ProductsView = styled.div`
    display: flex;
    flex-flow:row wrap;
`;

const MainProducts = styled.div`
    display: flex;
    flex-flow:row wrap;
    justify-content: center;

    @media screen and (max-width: 768px){
        flex-flow:column nowrap;
        justify-content: center;
    }
`;

const Products = (props) => {
    return (
        <ProductsView>
            <h2 className="ml-5 font-weight-bolder">Browse All Products</h2>
            <MainProducts className="">
                {
                    products.map((product, index) => {
                        return <ProductItem key={index} product={product} {...props} />
                    })
                }
            </MainProducts>
        </ProductsView>
    );
}

export default Products;