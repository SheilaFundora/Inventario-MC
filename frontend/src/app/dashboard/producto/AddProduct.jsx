import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {product} from "@/constants/apiRoutes";
import {fetchData} from "@/helper/fetch";
import Swal from "sweetalert2";

const AddProduct = ({openAddProduct, handleOpenAddProduct, handleRefreshProducts, loading, setLoading}) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmitProduct = async (data) => {
        console.log('esta es la data: ', data)

        try {
            const resp = await fetchData(product, data, "POST");

            console.log(resp)

            if (resp.status === 201) {
                Swal.fire('Exito', "Se ha creado correctamente", 'success');
            } else {
                Swal.fire('Error', "Error del servidor", 'error');
            }
        } catch (error) {
            console.log(error)
        }

        handleOpenAddProduct(!openAddProduct);
        handleRefreshProducts();
        setLoading(!loading);

    }

        return (
            <div>
                <Dialog
                    open={openAddProduct}
                    onClose={handleOpenAddProduct}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <form onSubmit={handleSubmit(handleSubmitProduct)}>
                        <DialogContent>
                            <h4 className='mt-4 text-center'>Formulario para agregar Productos</h4>

                            <div >
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
                            </div>

                            <div className={'d-flex align-items-center justify-content-between'}>
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
                                    sx={{m: 2, width: '200px'}}
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
                                <Button autoFocus onClick={handleOpenAddProduct} variant="contained" color='error'>
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

export default AddProduct;