'use client'
import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import AddProduct from "@/app/dashboard/producto/AddProduct";
import {ipv, product} from "@/constants/apiRoutes";
import axios from "axios";
import DataTableProducts from "@/app/dashboard/producto/DataTableProducts";
import DataTableIpv from "@/app/dashboard/resumen/DataTableIPV";

export default function BasicCard() {
    const [ipvG, setIpvG] = useState([]);

    useEffect( () => {
        getProducts();

    }, [])

    const getProducts = async () => {
        await axios.get(
            process.env.NEXT_PUBLIC_API_HOST + ipv
        )
            .then(response => {
                console.log(
                    response
                )
                setIpvG(response.data);
            })

    }

    return (
        <div className={'pt-2'}>

            <h4 className={'pt-5 text-secondary ms-1'}>IPV </h4>

            <DataTableIpv ipvG={ipvG} />

        </div>
    );
}
