import React, {useEffect} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Button from "@mui/material/Button";
import axios from "axios";
import {ipv} from "@/constants/apiRoutes";
import Swal from "sweetalert2";
const DataTableIpv = ({ipvG}) => {
    const [ipvData, setIpvData] =  React.useState([]);
    const [openView, setOpenView] = React.useState(false);
    const [id, setId] = React.useState('');
    const [openDelete, setOpenDelete] = React.useState(false);

    useEffect( () => {
        const getData = () => {
            setIpvData(ipvG);
        }

        getData()


    }, [ipvG])

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <IconButton size="large" className="text-success" onClick={() => confirmViewIPV(rowData.id)}>
                    <RemoveRedEyeIcon fontSize="inherit" />
                </IconButton>
                <IconButton size="large" color="error" onClick={() => confirmDeleteIPV(rowData.id)}>
                    <DeleteForeverIcon  fontSize="inherit" />
                </IconButton>
            </>
        )
    }
    const handleOpenView= () => {
        setOpenView(!openView);
    }

    const confirmViewIPV = (idIPV) =>{
        handleOpenView();
    }

    const confirmDeleteIPV = (idIPV) =>{
        setId(idIPV)
        handleOpenDelete()
    }

    const handleOpenDelete = () => {
        setOpenDelete(!openDelete);
    }

    const handleDeleteIPV= async () => {
        const endpoint = ipv + '/' + id + '/';
        try{
            const response = await axios.delete(process.env.NEXT_PUBLIC_API_HOST + endpoint)

            console.log(response)
            if (response.status !== 200) {
                return null
            }

            handleOpenDelete();
            Swal.fire('Exito', "Se ha eliminado correctamente", 'success');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="datatable mt-4">
                <DataTable value={ipvData || []}
                           paginator rows={5}
                           rowsPerPageOptions={[5, 10, 25, 50]}
                           tableStyle={{minWidth: '50rem'}}
                           className="p-datatable-hgridlines"
                >
                    <Column field="nombreCafeteria" header="Cafeteria" sortable/>
                    <Column field="nombreDependienta" header="Dependiente" sortable/>
                    <Column field="fechaIPV"
                            header="Fecha"
                            sortable
                            body={(rowData) => {
                                if (!rowData || !rowData.fechaIPV) {
                                    return null;
                                }
                                const fechaCompleta = rowData.fechaIPV;
                                const fechaCortada = fechaCompleta.slice(0, 10);
                                return <div>{fechaCortada}</div>;
                            }}
                    />
                    <Column field="total" header="Total" sortable/>

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
                    <h4 className='mt-4'>Estás seguro de eliminar está ipv</h4>
                    <p>Está acción no se puede deshacer.</p>
                </DialogContent>

                <DialogActions sx={{ pb: 3, justifyContent: 'center'}} >
                    <Button autoFocus onClick={handleOpenDelete} variant="contained" color='error'>
                        Cancelar
                    </Button> <br/>
                    <Button variant="contained" onClick={handleDeleteIPV}>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default DataTableIpv;