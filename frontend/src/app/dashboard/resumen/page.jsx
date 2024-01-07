'use client'
import React, {useEffect, useState} from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import {ipvG_endpoint} from "@/constants/apiRoutes";
import axios from "axios";
import DataTableIpv from "@/app/dashboard/resumen/DataTableIPV";
import Swal from "sweetalert2";

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
        try{
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + ipvG_endpoint
            )
                .then(response => {
                    console.log(
                        response
                    )
                    setIpvG(response.data);
                })
        }catch (error) {
            await Swal.fire('Error', "Error del servidor", 'error');
        }
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
