import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {add_product} from "@/constants/apiRoutes";
import {fetchData} from "@/helper/fetch";
import Swal from "sweetalert2";

const AddProduct = ({openDialog, handleOpenDialog, handleRefreshProducts, loading, setLoading}) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmitProduct = async (data) => {
        console.log('esta es la data: ', data)

        try {
            const resp = await fetchData(add_product, data, "POST");

            console.log(resp)

            if (resp.status === 201) {
                Swal.fire('Exito', "Se ha creado correctamente", 'success');
            } else {
                Swal.fire('Error', "Error del servidor", 'error');
            }
        } catch (error) {
            console.log(error)
        }

        handleOpenDialog(!openDialog);
        handleRefreshProducts();

        setLoading(!loading);

    }

        return (
            <div>
                <Dialog
                    open={openDialog}
                    onClose={handleOpenDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <form onSubmit={handleSubmit(handleSubmitProduct)}>
                        <DialogContent className='text-center'>
                            <h4 className='mt-4'>Formulario para agregar Productos</h4>

                            <div className={'d-flex align-items-center justify-content-between'}>

                                <TextField
                                    label="Nombre"
                                    type='text'
                                    sx={{m: 2, width: '200px'}}
                                    {...register("nombre", {
                                        required: 'Campo requerido'
                                    })}
                                    error={errors.nombre}
                                    helperText={errors.nombre && errors.nombre.message}
                                />
                                <TextField
                                    label="Precio"
                                    type='text'
                                    sx={{m: 2, width: '200px'}}
                                    {...register('precio', {
                                        required: 'Campo requerido',
                                        pattern: {
                                            value: /^\d+$/, // Expresión regular para aceptar solo números
                                            message: 'Ingrese solo números',
                                        },
                                    })}
                                    error={errors.precio}
                                    helperText={errors.precio && errors.precio.message}
                                />
                                <TextField
                                    label="Cantidad"
                                    type='text'
                                    sx={{m: 2, width: '400px'}}
                                    {...register('cantidad', {
                                        required: 'Campo requerido',
                                        pattern: {
                                            value: /^\d+$/, // Expresión regular para aceptar solo números
                                            message: 'Ingrese solo números',
                                        },
                                    })}
                                    error={errors.cantidad}
                                    helperText={errors.cantidad && errors.cantidad.message}
                                />

                            </div>

                            {errorMessage &&
                                <div className='error-message text-danger text-start ms-4'>{errorMessage}</div>}


                            <DialogActions sx={{pb: 3, justifyContent: 'center'}}>
                                <Button autoFocus onClick={handleOpenDialog} variant="contained" color='error'>
                                    Cancelar
                                </Button> <br/>
                                <Button variant="contained" type="submit" className={'ps-3'}>
                                    Aceptar
                                </Button>
                            </DialogActions>
                        </DialogContent>
                    </form>
                </Dialog>
            </div>
    );
};

export default AddProduct;