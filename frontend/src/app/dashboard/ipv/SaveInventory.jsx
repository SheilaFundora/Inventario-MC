import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {fetchData} from "@/helper/fetch";
import {dependent_endpoint, ipv_endpoint, ipvG_endpoint, product_endpoint, store_endpoint} from "@/constants/apiRoutes";
import Swal from "sweetalert2";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";

const SaveInventory = ({handleOpenSave, openSave, ipvData, handleRefreshIPV, store_id}) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [dependents, setDependents] = useState([]);
    const [store, setStore] = useState([]);


    useEffect(() => {
        getDataForm();
    }, []);

    const getDataForm = async () => {
        try{
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + store_endpoint
            )
                .then(response => {
                    setStore(response.data);
                })

        }catch (error) {
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
        const total = ipvData.reduce((total, ipvData) => total + ipvData.subtotalEfectivo, 0);
        const salary = store
            .filter(elemento => elemento.id === store_id)
            .map(elemento => elemento.salario);

        data.total = total;
        data.totalEfectivo = total - data.transferencia - data.otrosGastos;
        data.ipvs = ipvData;
        data.salario = ipvData * salary;

        try {
            const resp = await fetchData(ipvG_endpoint, data, "POST");
            console.log(resp)
        } catch (error) {
            console.log(error)
        }

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
                        <h4 className='mt-1 text-center'>Estás seguro de guardar este inventario</h4>
                        <div className={'d-flex align-items-center justify-content-between mt-3'}>
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
                        </div>
                        <div className={'d-flex align-items-center justify-content-between mt-3'}>
                            <Controller
                                name={'dependiente_id'}
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        select
                                        required={true}
                                        label={'Dependiente'}
                                        {...field}
                                        sx={{ m: 2, width: '700px' }}
                                    >
                                        {dependents.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.nombre}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
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

                        <div className={'text-center ms-3 my-2'}>
                            <Typography variant="subtitle1" style={{fontSize: '1.1rem'}}>
                                Importe total de venta: {
                                ipvData.reduce((total, ipvData) => total + ipvData.subtotalEfectivo, 0)
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