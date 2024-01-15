import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {fetchData} from "@/helper/fetch";
import {
    dependent_endpoint, dependent_store_endpoint,
    ipv_endpoint,
    ipvG_endpoint,
    product_endpoint,
    salary_endpoint,
    store_endpoint
} from "@/constants/apiRoutes";
import Swal from "sweetalert2";
import {Controller, useForm} from "react-hook-form";
import axios from "axios";

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Ajusta el formato del mes (agregando un cero al principio si es necesario)
    const day = today.getDate().toString().padStart(2, '0'); // Ajusta el formato del día (agregando un cero al principio si es necesario)
    return `${year}-${month}-${day}`;
};

const SaveInventory = ({handleOpenSave, openSave, ipvData, handleRefreshIPV, store_id}) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [dependents, setDependents] = useState([]);
    const [salary, setSalary] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        getDataForm();
    }, []);

    const getDataForm = async () => {
        const salary_to_id = store_endpoint + '/' + store_id + '/';
        const dependent_to_id = dependent_store_endpoint  + '/' + store_id + '/';

        try{
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + salary_to_id
            )
                .then(response => {
                    setSalary(response.data);
                })

        }catch (error) {
            await Swal.fire('Error', "Error del servidor", 'error');
        }

        try{
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + dependent_to_id
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
        data.total = total;
        data.totalEfectivo = total - data.transferencia - data.otrosGastos;
        data.ipvs = ipvData;
        data.salario = (total * salary.salario) / 100;
        data.cafeteria_id = store_id;

        const sumaTotal = parseInt(data.transferencia) + parseInt(data.otrosGastos);

        console.log(sumaTotal)
        try {
            switch (true) {
                case data.transferencia > data.total:
                    setErrorMessage('La transferencia tiene que ser menor que total');
                    break;
                case data.otrosGastos > data.total:
                    setErrorMessage('Otros gastos tiene que ser menor que total');
                    break;
                case data.total < sumaTotal:
                    setErrorMessage('El total debe ser mayor que transferencia + otros gastos');
                    break;
                default:
                    const resp = await fetchData(ipvG_endpoint, data, 'POST');
                    if (resp.status === 201) {
                        handleRefreshIPV();
                        handleOpenSave();
                        await Swal.fire('Éxito', 'Se ha creado correctamente el dependiente', 'success');
                    } else {
                        await Swal.fire('Error', 'Error del servidor', 'error');
                    }
            }
        } catch (error) {
            console.log(error);
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
                                        value: /^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/,
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
                                        value: /^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/,
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
                                sx={{ m: 2, width: '700px' }}
                                {...register('fechaIPV', {
                                    value: getCurrentDate(),
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

                        {errorMessage && <div className='error-message text-danger text-start ms-4'>{errorMessage}</div>}

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