'use client'
import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import AddProduct from "@/app/dashboard/producto/AddProduct";
import {product} from "@/constants/apiRoutes";
import axios from "axios";
import DataTableProducts from "@/app/dashboard/producto/DataTableProducts";
import Swal from "sweetalert2";

export default function BasicCard() {
    const [openAddProduct, setOpenAddProduct] = useState(false);
    const [products, setProducts] = useState([]);
    const [refreshProducts, setRefreshProducts] = React.useState(false)
    const [loading, setLoading] = useState(true);

    const handleOpenAddProduct = () => {
        setOpenAddProduct(!openAddProduct);
    }

    const handleRefreshProducts = () => {
        setRefreshProducts(!refreshProducts)
    }

    useEffect( () => {
        getProducts();

    }, [refreshProducts])

    const getProducts = async () => {
        try{
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + product
            )
                .then(response => {
                    setProducts(response.data);
                })

            setLoading(!loading);
        }catch (error) {
            await Swal.fire('Error', "Error del servidor", 'error');

        }
    }

    return (
        <div className={'pt-2'}>
            <Button variant="contained" className={'float-end'} onClick={handleOpenAddProduct}>+ Agregar Producto</Button>

            <h4 className={'pt-5 text-secondary ms-1'}>Productos</h4>
            <DataTableProducts products={products}
                               handleRefreshProducts={handleRefreshProducts}
                               setLoading={setLoading}
                               loading={loading}
            />

            { openAddProduct &&
                <AddProduct openAddProduct={openAddProduct}
                            handleOpenAddProduct={handleOpenAddProduct}
                            handleRefreshProducts={handleRefreshProducts}
                            setLoading={setLoading}
                            loading={loading}
                />
            }
        </div>
    );
}
