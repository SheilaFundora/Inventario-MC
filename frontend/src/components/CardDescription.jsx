'use client'
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import React from "react";


const CardDescription = () => {

    return (
        <div className='d-flex justify-content-between flex-wrap'>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Inventarios Simplificados: </b>
                    </Typography>
                    <Typography variant="h6" component="div">
                        Nuestra plataforma hace que la tarea de realizar inventarios sea
                        fácil y rápida. Registra tus productos con solo unos clics y
                        mantén un control detallado de tu stock.
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Cantidad de IPV</b>
                    </Typography>
                    <Typography variant="h6" component="div">
                       3
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Productos mermas</b>
                    </Typography>
                    <Typography variant="h6" component="div">
                        3
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 220 }} className='my-3'>
                <CardContent>
                    <Typography svariant="h5" className='text-primary ' gutterBottom>
                        <b>Ganancia</b>
                    </Typography>
                    <Typography variant="h6" component="div">
                        33
                    </Typography>
                </CardContent>
            </Card>
        </div>

    );
};

export default CardDescription;