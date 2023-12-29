'use client'
import React, {useEffect, useState} from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import {ipv} from "@/constants/apiRoutes";
import axios from "axios";
import DataTableIpv from "@/app/dashboard/resumen/DataTableIPV";

export default function BasicCard() {
    const [ipvG, setIpvG] = useState([]);
    const [refreshIpv, setRefreshIpv] = React.useState(false);

    const handleRefreshIpv = () => {
        setRefreshIpv(!refreshIpv)
    }

    useEffect( () => {
        getProducts();

    }, [refreshIpv])

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

            <DataTableIpv ipvG={ipvG}
                          handleRefreshIpv={handleRefreshIpv}
            />

        </div>
    );
}
