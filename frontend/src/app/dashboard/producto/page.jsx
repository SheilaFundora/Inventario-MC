'use client'
import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {InputText} from "primereact/inputtext";


const productos = [
    { nombre: 'Café Americano', precio: 2.50, cantidad: 100 },
    { nombre: 'Croissant de Chocolate', precio: 3.50, cantidad: 50 },
    { nombre: 'Té Verde', precio: 2.00, cantidad: 80 },
    { nombre: 'Muffin de Arándanos', precio: 4.00, cantidad: 40 },
    { nombre: 'Cappuccino', precio: 3.00, cantidad: 60 }
];

export default function BasicCard() {
    const [globalFilter, setGlobalFilter] = useState('');
    const [loading, setLoading] = useState(false);


    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <IconButton size="large" className="text-warning" onClick={() => confirmEditProduct(rowData.id)}>
                    <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="large" color="error" >
                    <DeleteForeverIcon  fontSize="inherit" />
                </IconButton>
            </>
        )
    }

    return (

        <div className={'pt-2'}>
            <Button variant="contained" className={'float-end'}>+ Agregar Producto</Button>
            <h4 className={'pt-5 text-secondary ms-1'}>Productos</h4>


            <div className={'d-flex align-items-end justify-content-between mt-4'}>
                <InputText
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Filtrar..."
                    sx={{mb: 3}}
                />
            </div>
            <br/>

            <div className="datatable">
                <DataTable value={productos}
                           paginator rows={5}
                           rowsPerPageOptions={[5, 10, 25, 50]}
                           tableStyle={{minWidth: '50rem'}}
                           globalFilter={globalFilter}
                           loading={loading}
                           className="p-datatable-hgridlines"
                >
                    <Column field="nombre" header="Nombre" style={{width: '25%'}}></Column>
                    <Column field="precio" header="Precio" sortable style={{width: '25%'}}></Column>
                    <Column field="cantidad" header="Cantidad" sortable style={{width: '25%'}}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{minWidth: '12rem'}}/>
                </DataTable>
            </div>


        </div>

    );
}
