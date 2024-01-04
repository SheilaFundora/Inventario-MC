'use client'
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ipv_endpoint, product_endpoint} from "@/constants/apiRoutes";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {InputText} from "primereact/inputtext";
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {useForm} from "react-hook-form";
import Typography from "@mui/material/Typography";
import {fetchData} from "@/helper/fetch";
import Swal from "sweetalert2";
import SaveInventory from "@/app/dashboard/ipv/SaveInventory";


const Page = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [openSave, setOpenSave] = React.useState(false);
    const [refreshIPV, setRefreshIPV] = React.useState(false)

    const handleRefreshIPV = () => {
        setRefreshIPV(!refreshIPV)
    }

    const handleOpenSave = () => {
        setOpenSave(!openSave)
    }

    const handleIpv = () => {
        const updatedData = products.map((row) => {
            const subtotalEfectivo = parseFloat(row.venta || 0) * parseFloat(row.precio || 0);
            const existenciaFinal = (parseFloat(row.cantidad) + parseFloat(row.entrada))
                - parseFloat(row.traslado) - parseFloat(row.venta) - parseFloat(row.merma)

            return {
                ...row,
                subtotalEfectivo,
                existenciaFinal,
            };
        });
        setProducts(updatedData)
        handleOpenSave();
    }

    const filteredProducts = products.filter((row) =>
        Object.values(row).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        getProducts();
    }, [refreshIPV]);

    const getProducts = async () => {
        try{
            await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + product_endpoint
            )
                .then(response => {
                    const newData = response.data.map((objeto) => ({
                        ...objeto,
                        entrada: 0,
                        traslado: 0,
                        venta: 0,
                        merma: 0,
                        subtotalEfectivo: 0,
                        existenciaFinal: 0
                    }));
                    setProducts(newData);
                })
        }catch (error) {
            await Swal.fire('Error', "Error del servidor", 'error');

        }
    }

    const handleEdit = (id, field, value) => {
        const updatedData = products.map((row) =>
            row.id === id ? { ...row, [field]: value } : row
        );
        setProducts(updatedData);
    };


    return (
        <div className={'mt-4'}>
            <div className={'d-flex align-items-center justify-content-between my-4'}>
                <InputText
                    placeholder="Buscar..."
                    sx={{mb: 3}}
                    value={searchTerm}
                    onChange={handleSearch}
                />

                <Button variant="contained" className={'float-end'} onClick={handleIpv} >+ Guardar Inventario</Button>

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
                                <TableCell
                                    style={{
                                        fontFamily: '"Inter var", sans-serif',
                                        fontSize: '1rem',
                                        color: (row.entrada !== undefined && row.entrada !== '' &&
                                            row.traslado !== undefined && row.traslado !== '' &&
                                            row.venta !== undefined && row.venta !== '' &&
                                            row.merma !== undefined && row.merma !== '' &&
                                            ((parseFloat(row.cantidad) + parseFloat(row.entrada))
                                                - parseFloat(row.traslado) - parseFloat(row.venta) - parseFloat(row.merma)) < 0)
                                            ? 'red'
                                            : 'inherit' // Color predeterminado si no es negativo
                                    }}
                                >
                                    {Number(
                                        row.entrada !== undefined && row.entrada !== '' &&
                                        row.traslado !== undefined && row.traslado !== '' &&
                                        row.venta !== undefined && row.venta !== '' &&
                                        row.merma !== undefined && row.merma !== ''
                                            ? ((parseFloat(row.cantidad) + parseFloat(row.entrada))
                                                - parseFloat(row.traslado) - parseFloat(row.venta) - parseFloat(row.merma))
                                            : 0
                                    )}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                openSave &&
                <SaveInventory handleOpenSave={handleOpenSave} openSave={openSave} products={products}/>
            }
        </div>
    );
};

export default Page;