import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, MenuItem, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Button from "@mui/material/Button";
import {Controller, useForm} from "react-hook-form";
import {fetchData} from "@/helper/fetch";
import {dependent_endpoint, store_endpoint} from "@/constants/apiRoutes";
import Swal from "sweetalert2";
import axios from "axios";

const AddStore = ({openAddStore, setLoading, loading, handleOpenAddStore, handleRefreshStores}) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmitStore = async (data) => {
        try {
            const resp = await fetchData(store_endpoint, data, "POST");

            if (resp.status === 400) {
                setErrorMessage('La cafeteria ya existe')

            }else{
                if (resp.status === 201) {
                    handleRefreshStores();
                    handleOpenAddStore();
                    await Swal.fire('Exito', "Se ha creado correctamente el dependiente", 'success');
                }else{
                    await Swal.fire('Error', "Error del servidor", 'error');
                }
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(!loading);
    }

    return (
        <div>
            <Dialog
                open={openAddStore}
                onClose={handleOpenAddStore}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <IconButton
                    aria-label="close"
                    onClick={handleOpenAddStore}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>


                <form onSubmit={handleSubmit(handleSubmitStore)}>
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
                            />
                            <TextField
                                label="Salario"
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
                            />
                        </div>

                        {errorMessage && <div className='error-message text-danger text-start ms-4'>{errorMessage}</div>}

                        <DialogActions sx={{pb: 3, justifyContent: 'center'}}>
                            <Button autoFocus onClick={handleOpenAddStore} variant="contained" color='error'>
                                Cancelar
                            </Button>
                            <Button variant="contained" type="submit" className={'ms-4'}>
                                Agregar
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </form>

            </Dialog>

        </div>

    );
};

export default AddStore;