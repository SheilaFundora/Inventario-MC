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

const EditDependent = ({openEdit, handleOpenEdit, handleRefreshDependents, setLoading, loading, dependenToEdit}) => {
    const { register, setValue, control, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [stores, setStores] = useState([]);

    useEffect(() => {
        getDataForm();
    }, []);

    const getDataForm = async () => {
        console.log(dependenToEdit.cafeteria_id)
        setValue('cafeteria_id', dependenToEdit.cafeteria_id.id );

        try{
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + store_endpoint
            )
                .then(response => {
                    setStores(response.data);
                })

        }catch (error) {
            console.log(error)
            await Swal.fire('Error', "Error del servidor", 'error');

        }
    }

    const handleEditDependent= async (data) => {
        const endpoint = dependent_endpoint + '/' + dependenToEdit.id +'/'

        console.log(data)
        try {
            const resp = await fetchData(endpoint, data, "PUT");

            if (resp.status === 200) {
                handleRefreshDependents();
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


                <form onSubmit={handleSubmit(handleEditDependent)}>
                    <DialogContent>
                        <h4 className='mt-4 text-center'>Formulario para editar Dependientes</h4>

                        <TextField
                            label="Nombre"
                            type='text'
                            sx={{m: 2, width: '460px'}}
                            {...register("nombre", {
                                required: 'Campo requerido'
                            })}
                            error={errors.nombre}
                            helperText={errors.nombre && errors.nombre.message}
                            defaultValue={dependenToEdit.nombre}
                        />

                        <div className={'d-flex w-100 align-items-center justify-content-between'}>
                            <TextField
                                label="Número de teléfono"
                                type='text'
                                sx={{m: 2, width: '200px'}}
                                {...register('numeroT', {
                                    pattern: {
                                        value: /^\d+$/,
                                        message: 'Ingrese solo números',
                                    },
                                })}
                                error={errors.numeroT}
                                helperText={errors.numeroT && errors.numeroT.message}
                                defaultValue={dependenToEdit.numeroT}
                            />
                            <Controller
                                name={'cafeteria_id'}
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        select
                                        required={true}
                                        label={'Cafeterias'}
                                        {...field}
                                        sx={{ m: 2, width: '250px' }}
                                    >
                                        {stores.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.nombre}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
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

export default EditDependent;