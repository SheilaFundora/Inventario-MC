'use client'
import React, {useEffect, useState} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {InputText} from "primereact/inputtext";
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {product} from "@/constants/apiRoutes";
import axios from "axios";
import Swal from "sweetalert2";
import EditProduct from "@/app/dashboard/producto/EditProduct";


const DataTableProducts = ({products, loading, setLoading, handleRefreshProducts}) => {
    const [produtsData, setProductsData] =  React.useState(products);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [id, setId] = React.useState('');
    const [productToEdit, setProductToEdit] = React.useState([]);

    useEffect( () => {
        const getData = () => {
            setProductsData(products);
        }

        getData()


    }, [products])

    const getColumnStyle = (precio) => {
        return precio < 10 ? { color: 'red' } : {};
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <IconButton size="large" className="text-warning" onClick={() => confirmEditProduct(rowData.id)}>
                    <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="large" color="error" onClick={() => confirmDeleteProduct(rowData.id)}>
                    <DeleteForeverIcon  fontSize="inherit" />
                </IconButton>
            </>
        )
    }
    const handleOpenDelete = () => {
        setOpenDelete(!openDelete);
    }

    const confirmDeleteProduct = (idProduct) =>{
        setId(idProduct)
        handleOpenDelete()
    }

    const handleOpenEdit = () => {
        setOpenEdit(!openEdit);
    }

    const confirmEditProduct = (idProduct) =>{
        const _products = products.filter((val) => val.id === idProduct)

        setProductToEdit(_products[0]);
        handleOpenEdit();
    }

    const handleDeleteProduct = async () => {
        const endpoint = product + '/' + id + '/';
        try{
            const response = await axios.delete(process.env.NEXT_PUBLIC_API_HOST + endpoint)
            console.log(response)

            if (response.status !== 200) {
                return null
            }

            handleOpenDelete();
            handleRefreshProducts();
            setLoading(!loading);
            Swal.fire('Exito', "Se ha eliminado correctamente", 'success');


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="datatable mt-4">
                <DataTable value={produtsData || []}
                           paginator rows={5}
                           rowsPerPageOptions={[5, 10, 25, 50]}
                           tableStyle={{minWidth: '50rem'}}
                           className="p-datatable-hgridlines"
                >
                    <Column field="nombre" header="Nombre" sortable filter style={{width: '25%'}}></Column>
                    <Column field="cantidad" header="Cantidad" sortable style={{ width: '20%' }} body={(products) => (
                        <div className={products.cantidad < 100 ? 'text-danger font-weight-bold' : ''}>{products.cantidad}</div>
                    )}></Column>
                    <Column field="precio" header="Precio" sortable/>
                    <Column body={actionBodyTemplate} exportable={false} style={{minWidth: '12rem'}}/>
                </DataTable>
            </div>

            <Dialog
                onClose={handleOpenDelete}
                aria-labelledby="customized-dialog-title"
                open={openDelete}
                className={'p-5'}
            >

                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleOpenDelete}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent className='text-center'>
                    <ErrorOutlineIcon sx={{ fontSize: 60 }} color="action"  />
                    <h4 className='mt-4'>Estás seguro de eliminar está producto</h4>
                    <p>Está acción no se puede deshacer.</p>
                </DialogContent>

                <DialogActions sx={{ pb: 3, justifyContent: 'center'}} >
                    <Button autoFocus onClick={handleOpenDelete} variant="contained" color='error'>
                        Cancelar
                    </Button> <br/>
                    <Button variant="contained" onClick={handleDeleteProduct}>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>

            { openEdit &&
                <EditProduct openEdit={openEdit}
                             handleOpenEdit={handleOpenEdit}
                             handleRefreshProducts={handleRefreshProducts}
                             setLoading={setLoading}
                             loading={loading}
                             productToEdit={productToEdit}
                />
            }


        </div>

    );
};

export default DataTableProducts;