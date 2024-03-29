import React, {useEffect, useState} from 'react';
import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent, MenuItem,
    Snackbar,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {Controller, useForm} from "react-hook-form";
import {dependent_endpoint, product_endpoint, store_endpoint} from "@/constants/apiRoutes";
import {fetchData} from "@/helper/fetch";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import MuiAlert from '@mui/material/Alert';
import axios from "axios";


const AddProduct = ({openAddProduct, handleOpenAddProduct, handleRefreshProducts, loading, setLoading}) => {
    const { register, control, reset, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = React.useState(false);
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

    const handleClick = () => {
        setOpen(true);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleSubmitProduct = async (data) => {
        if(  data.precio < data.precioC ) {
            setErrorMessage('EL precio de venta no puede ser menor al de compra ')
        }else{
            try {
                const resp = await fetchData(product_endpoint, data, "POST");

                if (resp.status === 400) {
                    setErrorMessage('El producto ya existe')

                }else{
                    if (resp.status === 201) {
                        handleClick()
                    } else {
                        setErrorMessage('Error de servidor')
                    }
                }
            } catch (error) {
                console.log(error)
            }

            reset();
            handleRefreshProducts();
            setLoading(!loading);
        }
    }

    const handleCancel = () => {
        handleOpenAddProduct(!openAddProduct);
    }

        return (
            <div>
                <Dialog
                    open={openAddProduct}
                    onClose={handleOpenAddProduct}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <IconButton
                        aria-label="close"
                        onClick={handleOpenAddProduct}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <form onSubmit={handleSubmit(handleSubmitProduct)}>
                        <DialogContent>
                            <h4 className='mt-4 text-center'>Formulario para agregar Productos</h4>

                            <div className={'d-flex align-items-center justify-content-between'}>
                                <TextField
                                    label="Nombre"
                                    type='text'
                                    sx={{m: 2, width: '300px'}}
                                    {...register("nombre", {
                                        required: 'Campo requerido'
                                    })}
                                    error={errors.nombre}
                                    helperText={errors.nombre && errors.nombre.message}
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
                                            sx={{ m: 2, width: '300px' }}
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

                            <div className={'d-flex align-items-center justify-content-between'}>
                                <TextField
                                    label="Precio de venta"
                                    type='text'
                                    sx={{m: 2, width: '300px'}}
                                    {...register('precio', {
                                        required: 'Campo requerido',
                                        pattern: {
                                            value: /^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/,
                                            message: 'Ingrese solo números',
                                        },
                                    })}
                                    error={errors.precio}
                                    helperText={errors.precio && errors.precio.message}
                                />
                                <TextField
                                    label="Precio de compra"
                                    type='text'
                                    sx={{m: 2, width: '300px'}}
                                    {...register('precioC', {
                                        required: 'Campo requerido',
                                        pattern: {
                                            value: /^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/,
                                            message: 'Ingrese solo números',
                                        },
                                    })}
                                    error={errors.precioC}
                                    helperText={errors.precioC && errors.precioC.message}
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
                                />

                            </div>

                            {errorMessage && <div className='error-message text-danger text-start ms-4'>{errorMessage}</div>}

                            <DialogActions sx={{pb: 3, justifyContent: 'center'}}>
                                <Button autoFocus onClick={handleCancel} variant="contained" color='error'>
                                    Cancelar
                                </Button>
                                <Button variant="contained" type="submit" className={'ms-4'}>
                                    Agregar
                                </Button>
                            </DialogActions>
                        </DialogContent>
                    </form>
                </Dialog>


                <Snackbar open={open}
                          autoHideDuration={6000}
                          onClose={handleClose}
                          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                          style={{ margin: 'auto' }}
                >
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        El producto se ha agregado correctamente!!
                    </Alert>
                </Snackbar>
            </div>
    );
};

export default AddProduct;