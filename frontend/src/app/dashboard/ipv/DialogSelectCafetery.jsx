import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Button from "@mui/material/Button";
import axios from "axios";
import {store_endpoint} from "@/constants/apiRoutes";
import Swal from "sweetalert2";
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";


const DialogSelectCafetery = ({openModal, handleSetOpenModal}) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const [stores, setStores] = useState([]);
    const router = useRouter();

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

    const handleSubmitStoreToIpv = (data) => {
        router.push('/dashboard/ipv' );
        handleSetOpenModal();
    }

    return (
        <div>
            <Dialog
                onClose={handleSetOpenModal}
                aria-labelledby="customized-dialog-title"
                open={openModal}
                className={'p-5'}
            >

                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleSetOpenModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>

                <form onSubmit={handleSubmit(handleSubmitStoreToIpv)}>
                    <DialogContent>
                        <h4 className='mt-4 text-center'>Seleccione la cafeteria deseada</h4>

                        <div className={'text-center'}>
                            <Controller
                                name={'cafeteria_id'}
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <TextField
                                        select
                                        required={true}
                                        label={'Cafeterias'}
                                        {...field}
                                        sx={{m: 2, width: '300px'}}
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

                        <DialogActions sx={{pb: 3, justifyContent: 'center'}}>
                            <Button autoFocus onClick={handleSetOpenModal} variant="contained" color='error'>
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

export default DialogSelectCafetery;