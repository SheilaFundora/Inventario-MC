import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const PreviewIPV = ({openView, handleOpenView, ipvToView}) => {
    console.log(ipvToView)
    return (
        <div>
            <Dialog
                onClose={handleOpenView}
                aria-labelledby="customized-dialog-title"
                open={openView}
                className={'p-5'}
                maxWidth={'sm'}
                fullWidth={true}
            >

                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 'bold' }} id="customized-dialog-title">
                    Detalles del ipv
                </DialogTitle>


                <IconButton
                    aria-label="close"
                    onClick={handleOpenView}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent>
                    <div className='d-flex align-items-center justify-content-between'>
                        <Typography sx={{fontSize: 20}} gutterBottom>
                            Dependiente: {ipvToView.nombreDependienta}
                        </Typography>
                        <Typography sx={{fontSize: 20}} gutterBottom>
                            Cafeteria: {ipvToView.nombreCafeteria}
                        </Typography>
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>

                        <Typography sx={{fontSize: 20}} gutterBottom>
                            Transferencia: ${ipvToView.transferencia}
                        </Typography>
                        <Typography sx={{fontSize: 20}} gutterBottom>
                            Fecha: {ipvToView.fechaIPV.slice(0, 10)}
                        </Typography>
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>

                        <Typography sx={{fontSize: 20}} gutterBottom>
                            Salario: ${ipvToView.salario}
                        </Typography>
                        <Typography sx={{fontSize: 20}} gutterBottom>
                            Porciento en salario {ipvToView.porcientoSalario}%
                        </Typography>
                    </div>

                    <Typography sx={{fontSize: 18, fontWeight: 'bold' }} gutterBottom >
                        Dinero total: ${ipvToView.total}
                    </Typography>

                    <Accordion
                        sx={{
                            border: 'none', // Elimina el borde
                            margin: '10px', // Agrega márgenes
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography sx={{ textDecoration: 'underline', cursor: 'pointer' }}>Leer más</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table>
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
                                        {ipvToView.data && ipvToView.data.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.nombre}</TableCell>
                                                <TableCell>{row.cantidad}</TableCell>
                                                <TableCell>{row.precio}</TableCell>
                                                <TableCell>{row.entrada}</TableCell>
                                                <TableCell>{row.traslado}</TableCell>
                                                <TableCell>{row.venta}</TableCell>
                                                <TableCell>{row.merma}</TableCell>
                                                <TableCell>{row.nombre}</TableCell>
                                            </TableRow>
                                        ))}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>

                    </Accordion>

                </DialogContent>

                <DialogActions sx={{pb: 3, justifyContent: 'center'}}>
                    <Button autoFocus onClick={handleOpenView} variant="contained" color='error'>
                        Cerrar
                    </Button> <br/>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default PreviewIPV;