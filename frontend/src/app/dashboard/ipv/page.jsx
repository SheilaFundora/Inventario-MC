'use client'
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {product} from "@/constants/apiRoutes";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell, tableCellClasses,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import {InputText} from "primereact/inputtext";
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";


const Page = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [openSave, setOpenSave] = React.useState(false);
    const [nameDep, setNameDev] = React.useState('');
    const [date, setDate] = React.useState('');

    const handleOpenSave = () => {
        setOpenSave(!openSave)
    }

    const filteredProducts = products.filter((row) =>
        Object.values(row).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDate = (e) => {
        setDate(e.target.value);
    };
    const handleNameDev = (e) => {
        setNameDev(e.target.value);
    };

    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = async () => {
        await axios.get(
            process.env.NEXT_PUBLIC_API_HOST + product
        )
            .then(response => {
                const newData = response.data.map((objeto) => ({
                    ...objeto,
                    entrada: 0,
                    traslado: 0,
                    venta: 0,
                    merma: 0,
                    subTotalEfectivo: 0,
                    existencia: 0
                }));
                setProducts(newData);
            })

    }
    const handleEdit = (id, field, value) => {
        const updatedData = products.map((row) =>
            row.id === id ? { ...row, [field]: value } : row
        );
        setProducts(updatedData);
    };

    const handleSubmit = () => {
        console.log('date ', date)
        console.log('name dep', nameDep)
        console.log('productos', products)
    }
    console.log('productos', products)

    return (
        <div className={'mt-4'}>
            <div className={'d-flex align-items-center justify-content-between my-4'}>
                <InputText
                    placeholder="Buscar..."
                    sx={{mb: 3}}
                    value={searchTerm}
                    onChange={handleSearch}
                />

                <Button variant="contained" className={'float-end'} onClick={handleOpenSave} >+ Guardar Inventario</Button>

            </div>

            <TableContainer component={Paper} >
                <Table className={'text-center'}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1rem', backgroundColor: '#f9fafb' }}>Producto</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1rem', backgroundColor: '#f9fafb' }}>Saldo Inicial</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1rem', backgroundColor: '#f9fafb' }}>Precio</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1rem'  ,backgroundColor: '#f9fafb'}}>Entrada</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' ,backgroundColor: '#f9fafb'}}>Traslado</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' ,backgroundColor: '#f9fafb'}}>Venta</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' ,backgroundColor: '#f9fafb'}}>Merma</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' ,backgroundColor: '#f9fafb'}}>SubTotal efectivo</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' ,backgroundColor: '#f9fafb'}}>Existencia final</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((row, rowIndex) =>  (

                            <TableRow key={row.id}>
                                <TableCell style={{ fontFamily: '"Inter var", sans-serif', fontSize: '1rem' }}>{row.nombre}</TableCell>
                                <TableCell style={{ fontFamily: '"Inter var", sans-serif', fontSize: '1rem' }}>{row.cantidad}</TableCell>
                                <TableCell style={{ fontFamily: '"Inter var", sans-serif', fontSize: '1rem' }}>{row.precio}</TableCell>
                                <TableCell>
                                    <TextField
                                        value={row.entrada === undefined ? 0 : row.entrada}
                                        onChange={(e) => handleEdit(row.id, 'entrada', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        value={row.traslado === undefined ? 0 : row.traslado}
                                        onChange={(e) => handleEdit(row.id, 'traslado', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        value={row.venta === undefined ? 0 : row.venta}
                                        onChange={(e) => handleEdit(row.id, 'venta', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        value={row.merma === undefined ? 0 : row.merma}
                                        onChange={(e) => handleEdit(row.id, 'merma', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell style={{ fontFamily: '"Inter var", sans-serif', fontSize: '1rem' }}>
                                    {Number(row.venta !== undefined && row.venta !== ''
                                        ?
                                        ( parseFloat(row.venta) * parseFloat(row.precio))
                                        : 0
                                    )}
                                </TableCell>
                                <TableCell style={{ fontFamily: '"Inter var", sans-serif', fontSize: '1rem' }}>
                                    {Number(row.entrada !== undefined && row.entrada !== '' &&
                                        row.traslado !== undefined && row.traslado !== '' &&
                                        row.venta !== undefined && row.venta !== '' &&
                                        row.merma !== undefined && row.merma !== ''
                                            ?
                                            ( (parseFloat(row.cantidad) + parseFloat(row.entrada))
                                                - parseFloat(row.traslado) - parseFloat(row.venta) - parseFloat(row.merma))
                                            : 0
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                onClose={handleOpenSave}
                aria-labelledby="customized-dialog-title"
                open={openSave}
                className={'p-5'}
            >

                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
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
                    <CloseIcon />
                </IconButton>

                <DialogContent className='text-center'>
                    <h4 className='mt-4'>Estás seguro de guardar este inventario</h4>

                    <TextField
                        label="Nombre del Dependiente"
                        type='text'
                        sx={{m: 2, width: '400px'}}
                        value={nameDep}
                        onChange={handleNameDev}
                    />
                    <TextField
                        type='date'
                        sx={{m: 2, width: '400px'}}
                        value={date}
                        onChange={handleDate}
                        helperText={'Fecha'}

                    />
                </DialogContent>

                <DialogActions sx={{ pb: 3, justifyContent: 'center'}} >
                    <Button autoFocus onClick={handleOpenSave} variant="contained" color='error'>
                        Cancelar
                    </Button> <br/>
                    <Button variant="contained" onClick={handleSubmit}>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Page;