'use client'
import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import DataTableStore from "@/app/dashboard/cafeteria/DataTableStore";
import {dependent_endpoint, product, store} from "@/constants/apiRoutes";
import Swal from "sweetalert2";
import axios from "axios";
import DataTableDependent from "@/app/dashboard/dependent/DataTableDependent";
import AddDependent from "@/app/dashboard/dependent/AddDependent";

const Page = () => {
    const [openAddDependent, setOpenAddDependent] = useState(false);
    const [dependents, setDependents] = useState([]);
    const [refreshDependents, setRefreshDependents] = React.useState(false)
    const [loading, setLoading] = useState(true);

    const handleOpenAddDependent = () => {
        setOpenAddDependent(!openAddDependent);
    }

    const handleRefreshDependents = () => {
        setRefreshDependents(!refreshDependents)
    }

    useEffect( () => {
        getDependents();

    }, [refreshDependents])

    const getDependents = async () => {
        try{
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + dependent_endpoint
            )
                .then(response => {
                    setDependents(response.data);
                })

            setLoading(!loading);
        }catch (error) {
            await Swal.fire('Error', "Error del servidor", 'error');

        }
    }


    return (
        <div className={'pt-2'}>
            <Button variant="contained" className={'float-end'} onClick={handleOpenAddDependent}>+ Agregar Dependiente</Button>

            <h4 className={'pt-5 text-secondary ms-1'}>Dependientes</h4>

            <DataTableDependent dependents={dependents}
                                handleRefreshDependents={handleRefreshDependents}
                                setLoading={setLoading}
                                loading={loading}
            />

             {openAddDependent &&
                <AddDependent openAddDependent={openAddDependent}
                              handleOpenAddDependent={handleOpenAddDependent}
                              handleRefreshDependents={handleRefreshDependents}
                              setLoading={setLoading}
                              loading={loading}
                />
            }
        </div>
    );
};

export default Page;