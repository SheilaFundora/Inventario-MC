import React, {useEffect} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import Swal from "sweetalert2";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Button from "@mui/material/Button";
import {store_endpoint} from "@/constants/apiRoutes";
import EditDependent from "@/app/dashboard/dependent/EditDependent";
import EditStore from "@/app/dashboard/cafeteria/EditStore";

const DataTableStore = ({stores, handleRefreshStores, loading, setLoading}) => {
    const [storeData, setStoreData] =  React.useState(stores);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [id, setId] = React.useState('');
    const [storeToEdit, setStoreToEdit] = React.useState([]);

    useEffect( () => {
        const getData = () => {
            setStoreData(stores);
        }

        getData()


    }, [stores])

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <IconButton size="large" className="text-warning" onClick={() => confirmEditStore(rowData.id)}>
                    <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="large" color="error" onClick={() => confirmDeleteStore(rowData.id)}>
                    <DeleteForeverIcon  fontSize="inherit" />
                </IconButton>
            </>
        )
    }

    const handleOpenDelete = () => {
        setOpenDelete(!openDelete);
    }

    const confirmDeleteStore = (idStore) =>{
        setId(idStore)
        handleOpenDelete()
    }

    const confirmEditStore = (idStore) =>{
        const _products = stores.filter((val) => val.id === idStore)

        setStoreToEdit(_products[0]);
        handleOpenEdit();
    }


    const handleOpenEdit = () => {
        setOpenEdit(!openEdit);
    }


    const handleDeleteStore = async () => {
        const endpoint = store_endpoint + '/' + id + '/';
        try{
            const response = await axios.delete(process.env.NEXT_PUBLIC_API_HOST + endpoint)

            if (response.status !== 200) {
                return null
            }

            handleOpenDelete();
            handleRefreshStores();
            setLoading(!loading);
            Swal.fire('Exito', "Se ha eliminado correctamente", 'success');


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="datatable mt-4">
                <DataTable value={storeData || []}
                           paginator rows={5}
                           rowsPerPageOptions={[5, 10, 25, 50]}
                           tableStyle={{minWidth: '50rem'}}
                           className="p-datatable-hgridlines"
                >
                    <Column field="nombre" header="Nombre" sortable filter style={{width: '25%'}}></Column>
                    <Column field="salario" header="Salario" sortable/>
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
                    <h4 className='mt-4'>Estás seguro de eliminar está cafeteria</h4>
                    <p>Está acción no se puede deshacer.</p>
                </DialogContent>

                <DialogActions sx={{ pb: 3, justifyContent: 'center'}} >
                    <Button autoFocus onClick={handleOpenDelete} variant="contained" color='error'>
                        Cancelar
                    </Button> <br/>
                    <Button variant="contained" onClick={handleDeleteStore}>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>


            { openEdit &&
                <EditStore openEdit={openEdit}
                           handleOpenEdit={handleOpenEdit}
                           handleRefreshStores={handleRefreshStores}
                           setLoading={setLoading}
                           loading={loading}
                           storeToEdit={storeToEdit}
                />
            }


        </div>
    );
};

export default DataTableStore;