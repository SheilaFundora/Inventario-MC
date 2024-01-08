import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {store_endpoint} from "@/constants/apiRoutes";
import {fetchData} from "@/helper/fetch";
import Swal from "sweetalert2";

const EditStore = ({openEdit, handleOpenEdit, storeToEdit, handleRefreshStores, loading, setLoading}) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const handleEditStore= async (data) => {
        const endpoint = store_endpoint + '/' + storeToEdit.id +'/'


        try {
            const resp = await fetchData(endpoint, data, "PUT");

            if (resp.status === 200) {
                handleRefreshStores();
                handleOpenEdit();
                await Swal.fire('Exito', "Se ha editado correctamente", 'success');
            } else {
                await Swal.fire('Error', "Error del servidor", 'error');
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(!loading);
    }

    return (
        <div>
            <Dialog
                open={openEdit}
                onClose={handleOpenEdit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <IconButton
                    aria-label="close"
                    onClick={handleOpenEdit}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>


                <form onSubmit={handleSubmit(handleEditStore)}>
                    <DialogContent>
                        <h4 className='mt-4 text-center'>Formulario para agregar Cafeterias</h4>


                        <div className={'d-flex w-100 align-items-center justify-content-between'}>
                            <TextField
                                label="Nombre"
                                type='text'
                                sx={{m: 2, width: '500px'}}
                                {...register("nombre", {
                                    required: 'Campo requerido'
                                })}
                                error={errors.nombre}
                                helperText={errors.nombre && errors.nombre.message}
                                defaultValue={storeToEdit.nombre}
                            />
                            <TextField
                                label="Salario en %"
                                type='text'
                                sx={{m: 2, width: '400px'}}
                                {...register('salario', {
                                    required: 'Campo requerido',
                                    pattern: {
                                        value: /^\d+$/,
                                        message: 'Ingrese solo números',
                                    },
                                })}
                                error={errors.salario}
                                helperText={errors.salario && errors.salario.message}
                                defaultValue={storeToEdit.salario}
                            />
                        </div>

                        {errorMessage && <div className='error-message text-danger text-start ms-4'>{errorMessage}</div>}

                        <DialogActions sx={{pb: 3, justifyContent: 'center'}}>
                            <Button autoFocus onClick={handleOpenEdit} variant="contained" color='error'>
                                Cancelar
                            </Button>
                            <Button variant="contained" type="submit" className={'ms-4'}>
                                Aceptar
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </form>

            </Dialog>

        </div>
    );
};

export default EditStore;