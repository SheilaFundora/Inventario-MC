import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";



const AddProduct = ({openDialog, handleOpenDialog}) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmitProduct = () => {

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
                                {...register("username", {
                                    required: 'Campo requerido'
                                })}
                                error={errors.username}
                                helperText={errors.username && errors.username.message}
                            />
                            <TextField
                                label="Precio"
                                type='text'
                                sx={{m: 2, width: '200px'}}
                                {...register('telf', {
                                    required: 'Campo requerido',
                                    pattern: {
                                        value: /^\d+$/, // Expresión regular para aceptar solo números
                                        message: 'Ingrese solo números',
                                    },
                                })}
                                /*error={errors.first_name}
                                helperText={errors.first_name && errors.first_name.message}*/
                            />
                            <TextField
                                label="Cantidad"
                                type='text'
                                sx={{m: 2, width: '400px'}}
                                {...register('telf', {
                                    required: 'Campo requerido',
                                    pattern: {
                                        value: /^\d+$/, // Expresión regular para aceptar solo números
                                        message: 'Ingrese solo números',
                                    },
                                })}
                               /* error={errors.last_name}
                                helperText={errors.last_name && errors.last_name.message}*/
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