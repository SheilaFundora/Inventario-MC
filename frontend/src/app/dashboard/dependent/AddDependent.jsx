import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, MenuItem, Snackbar, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Button from "@mui/material/Button";
import {Controller, useForm} from "react-hook-form";
import {fetchData} from "@/helper/fetch";
import {dependent_endpoint, store_endpoint} from "@/constants/apiRoutes";
import Swal from "sweetalert2";
import axios from "axios";

const AddDependent = ({openAddDependent, setLoading, loading, handleOpenAddDependent, handleRefreshDependents}) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [stores, setStores] = useState([]);

    useEffect(() => {
        getDataForm();
    }, []);

    const getDataForm = async () => {
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

    const handleSubmitStore = async (data) => {

        try {
            const resp = await fetchData(dependent_endpoint, data, "POST");

            if (resp.status === 400) {
                setErrorMessage('El dependente ya existe')

            }else{
                if (resp.status === 201) {
                    handleRefreshDependents();
                    handleOpenAddDependent();
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
                open={openAddDependent}
                onClose={handleOpenAddDependent}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <IconButton
                    aria-label="close"
                    onClick={handleOpenAddDependent}
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
                        <h4 className='mt-4 text-center'>Formulario para agregar Dependientes</h4>

                        <TextField
                            label="Nombre Completo"
                            type='text'
                            sx={{my: 2, width: '460px'}}
                            {...register("nombre", {
                                required: 'Campo requerido'
                            })}
                            error={errors.nombre}
                            helperText={errors.nombre && errors.nombre.message}
                        />
                        <div className={'d-flex w-100 align-items-center justify-content-between'}>
                            <TextField
                                label="Número de teléfono"
                                type='text'
                                sx={{my: 2, width: '200px'}}
                                {...register('numeroT', {
                                    pattern: {
                                        value: /^\d+$/,
                                        message: 'Ingrese solo números',
                                    },
                                })}
                                error={errors.numeroT}
                                helperText={errors.numeroT && errors.numeroT.message}
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

                        {errorMessage && <div className='error-message text-center text-danger my-2'>{errorMessage}</div>}



                        <DialogActions sx={{pb: 3, justifyContent: 'center'}}>
                            <Button autoFocus onClick={handleOpenAddDependent} variant="contained" color='error'>
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

export default AddDependent;