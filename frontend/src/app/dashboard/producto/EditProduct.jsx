import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, Snackbar, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {fetchData} from "@/helper/fetch";
import {product_endpoint} from "@/constants/apiRoutes";
import Swal from "sweetalert2";

const EditProduct = ({openEdit, handleOpenEdit, handleRefreshProducts, loading, setLoading, productToEdit}) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const handleEditProduct = async (data) => {
        const endpoint = product_endpoint + '/' + productToEdit.id +'/'

        try {
            const resp = await fetchData(endpoint, data, "PUT");

            if (resp.status === 200) {
                handleOpenEdit();
                handleRefreshProducts();
                setLoading(!loading);
                Swal.fire('Exito', "Se ha editado correctamente", 'success');
            } else {
                Swal.fire('Error', "Error del servidor", 'error');
            }
        } catch (error) {
            console.log(error)
        }

        reset();

    }

    return (
        <div>
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

                    <form onSubmit={handleSubmit(handleEditProduct)}>
                        <DialogContent>
                            <h4 className='mt-4 text-center'>Formulario para agregar Productos</h4>

                            <div className={'d-flex align-items-center justify-content-between'}>
                                <TextField
                                    label="Nombre"
                                    type='text'
                                    sx={{m: 2, width: '650px'}}
                                    {...register("nombre", {
                                        required: 'Campo requerido'
                                    })}
                                    error={errors.nombre}
                                    helperText={errors.nombre && errors.nombre.message}
                                    defaultValue={productToEdit.nombre}
                                />
                                <TextField
                                    label="Límite"
                                    type='text'
                                    sx={{m: 2, width: '300px'}}
                                    {...register('limite', {
                                        required: 'Campo requerido',
                                        pattern: {
                                            value: /^\d+$/,
                                            message: 'Ingrese solo números',
                                        },
                                    })}
                                    error={errors.limite}
                                    helperText={errors.limite && errors.limite.message}
                                    defaultValue={productToEdit.limite}
                                />
                            </div>

                            <div className={'d-flex align-items-center justify-content-between'}>
                                <TextField
                                    label="Precio de venta"
                                    type='text'
                                    sx={{m: 2, width: '300px'}}
                                    {...register('precio', {
                                        required: 'Campo requerido',
                                        pattern: {
                                            value: /^\d+$/,
                                            message: 'Ingrese solo números',
                                        },
                                    })}
                                    error={errors.precio}
                                    helperText={errors.precio && errors.precio.message}
                                    defaultValue={productToEdit.precio}
                                />
                                <TextField
                                    label="Precio de compra"
                                    type='text'
                                    sx={{m: 2, width: '300px'}}
                                    {...register('precioC', {
                                        required: 'Campo requerido',
                                        pattern: {
                                            value: /^\d+$/,
                                            message: 'Ingrese solo números',
                                        },
                                    })}
                                    error={errors.precioC}
                                    helperText={errors.precioC && errors.precioC.message}
                                    defaultValue={productToEdit.precioC}
                                />
                                <TextField
                                    label="Cantidad"
                                    type='text'
                                    sx={{m: 2, width: '300px'}}
                                    {...register('cantidad', {
                                        required: 'Campo requerido',
                                        pattern: {
                                            value: /^\d+$/, // Expresión regular para aceptar solo números
                                            message: 'Ingrese solo números',
                                        },
                                    })}
                                    error={errors.cantidad}
                                    helperText={errors.cantidad && errors.cantidad.message}
                                    defaultValue={productToEdit.cantidad}

                                />

                            </div>

                            {errorMessage &&
                                <div className='error-message text-danger text-start ms-4'>{errorMessage}</div>}

                            <DialogActions sx={{pb: 3, justifyContent: 'center'}}>
                                <Button autoFocus onClick={handleOpenEdit} variant="contained" color='error'>
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
        </div>
    );
};

export default EditProduct;