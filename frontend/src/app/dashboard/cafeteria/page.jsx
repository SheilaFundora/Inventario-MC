'use client'
import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import DataTableStore from "@/app/dashboard/cafeteria/DataTableStore";
import { store_endpoint} from "@/constants/apiRoutes";
import Swal from "sweetalert2";
import axios from "axios";
import {AddSharp} from "@mui/icons-material";
import AddStore from "@/app/dashboard/cafeteria/AddStore";

const Page = () => {
    const [openAddStore, setOpenAddStore] = useState(false);
    const [stores, setStores] = useState([]);
    const [refreshStores, setRefreshStores] = React.useState(false)
    const [loading, setLoading] = useState(true);

    const handleOpenAddStore = () => {
        setOpenAddStore(!openAddStore);
    }

    const handleRefreshStores = () => {
        setRefreshStores(!refreshStores)
    }

    useEffect( () => {
        getStores();

    }, [refreshStores])

    const getStores = async () => {
        try{
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + store_endpoint
            )
                .then(response => {
                    console.log(response)
                    setStores(response.data);
                })

            setLoading(!loading);
        }catch (error) {
            await Swal.fire('Error', "Error del servidor", 'error');

        }
    }

    return (
        <div className={'pt-2'}>
            <Button variant="contained" className={'float-end'} onClick={handleOpenAddStore}>+ Agregar Cafeteria</Button>

            <h4 className={'pt-5 text-secondary ms-1'}>Cafeterias</h4>

            <DataTableStore stores={stores}
                            handleRefreshStores={handleRefreshStores}
                            setLoading={setLoading}
                            loading={loading}
            />


            {openAddStore &&
                <AddStore openAddStore={openAddStore}
                          handleOpenAddStore={handleOpenAddStore}
                          handleRefreshStores={handleRefreshStores}
                          setLoading={setLoading}
                          loading={loading}
                />
            }
        </div>
    );
};

export default Page;