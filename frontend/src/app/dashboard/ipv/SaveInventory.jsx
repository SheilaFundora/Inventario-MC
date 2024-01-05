import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {fetchData} from "@/helper/fetch";
import {dependent_endpoint, ipv_endpoint, product_endpoint, store_endpoint} from "@/constants/apiRoutes";
import Swal from "sweetalert2";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";

const SaveInventory = ({handleOpenSave, openSave, products}) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [dependents, setDependents] = useState([]);
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
        try{
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + dependent_endpoint
            )
                .then(response => {
                    setDependents(response.data);
                })

        }catch (error) {
            await Swal.fire('Error', "Error del servidor", 'error');

        }
    }

    const handleSubmitIPV =  async (data) => {
        //pasos:
        //1- Crear el ipv
        //2- Quedarme con el id del q esta en estado false, y ponerlo en ipv_id
        //3- Crear el ipv general
        //4- Hacer el patch de ese ipv y ponerlo en true y cerrar el modal
        const total = products.reduce((total, products) => total + products.subtotalEfectivo, 0);
        data.ipv_id = 1;
        data.total = total;
        data.totalEfectivo = total - data.transferencia - data.otrosGastos ;

        console.log(data)

     /*   try {
            const resp = await fetchData(ipv_endpoint, data, "POST");
            handleOpenSave();

            if (resp.status === 201) {
                handleRefreshIPV();
                await Swal.fire('Exito', "Se ha creado correctamente el ipv", 'success');
            }else{
                await Swal.fire('Error', "Error del servidor", 'error');
            }

        } catch (error) {
            console.log(error)
        }*/

    }

    return (
        <div>
            <Dialog
                onClose={handleOpenSave}
                aria-labelledby="customized-dialog-title"
                open={openSave}
                className={'p-5'}
            >

                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleOpenSave}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>

                <form onSubmit={handleSubmit(handleSubmitIPV)}>
                    <DialogContent>
                        <h4 className='mt-4 text-center'>Estás seguro de guardar este inventario</h4>
                        <div className={'d-flex align-items-center justify-content-between'}>
                            <TextField
                                label="Transferencia"
                                type='text'
                                sx={{m: 2, width: '700px'}}
                                {...register('transferencia', {
                                    required: 'Campo requerido',
                                    pattern: {
                                        value: /^\d+$/,
                                        message: 'Ingrese solo números',
                                    },
                                })}
                                error={errors.transferencia}
                                helperText={errors.transferencia && errors.transferencia.message}
                            />

                            <TextField
                                label="Otros Gastos"
                                type='text'
                                sx={{m: 2, width: '700px'}}
                                {...register('otrosGastos', {
                                    required: 'Campo requerido',
                                    pattern: {
                                        value: /^\d+$/,
                                        message: 'Ingrese solo números',
                                    },
                                })}
                                error={errors.otrosGastos}
                                helperText={errors.otrosGastos && errors.otrosGastos.message}
                            />
                            <TextField
                                type='date'
                                sx={{m: 2, width: '700px'}}
                                {...register('fechaIPV', {
                                    required: 'Campo requerido',
                                })}
                                error={errors.fechaIPV}
                                helperText={errors.fechaIPV && errors.fechaIPV.message}
                            />
                        </div>
                        <div className={'d-flex align-items-center justify-content-between'}>
                            <Controller
                                name={'dependiente_id'}
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        select
                                        required={true}
                                        label={'Dependientes'}
                                        {...field}
                                        sx={{ m: 2, width: '300px' }}
                                    >
                                        {dependents.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.nombre}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
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

                        <div className={'text-center ms-3'}>
                            <Typography variant="subtitle1" style={{fontSize: '1.1rem'}}>
                                Importe total de venta: {
                                products.reduce((total, products) => total + products.subtotalEfectivo, 0)
                            }
                            </Typography>
                        </div>


                        <DialogActions sx={{pb: 3, justifyContent: 'center'}}>
                            <Button autoFocus onClick={handleOpenSave} variant="contained" color='error'>
                                Cancelar
                            </Button> <br/>
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

export default SaveInventory;