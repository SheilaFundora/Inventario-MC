'use client'
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Image from "next/image";

export default function BasicCard() {

    return (
        <div className={'p-4'}>

            <div>

                <h2 className={'text-center p-3'}>¡Optimiza tu Gestión con Nuestro Sistema de Inventario para Cafeterías!</h2>
                <Container sx={{ py: 1 }} >
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >

                                    <Image
                                        src={ '/../2.jpeg'}
                                        alt={ 'Logotipo' }
                                        width={ 300 }
                                        height={ 140 }
                                        className={'bg-sucess pt-2'}
                                    />

                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2" className={'text-center'}>
                                            Inventarios Simplificados
                                        </Typography>
                                        <Typography >
                                            Simplifica las tareas de forma segura. Registra tus productos con solo unos clics y mantén un control detallado.
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <Image
                                        src={ '/../3.png'}
                                        alt={ 'Logotipo' }
                                        width={ 200 }
                                        height={ 140 }
                                        className={'bg-sucess text-center mx-auto pt-3'}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2" className={'text-center'}>
                                            Reportes Detallados
                                        </Typography>
                                        <Typography>
                                            Accede a informes detallados que te proporcionarán información clave sobre
                                            tus productos más vendidos.
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <Image
                                        src={ '/../1.jpeg'}
                                        alt={ 'Logotipo' }
                                        width={ 300 }
                                        height={ 140 }
                                        className={'bg-sucess text-center pt-3'}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2" className={'text-center'}>
                                            Prevención e errores
                                        </Typography>
                                        <Typography>
                                            Agiliza el trabajo humano al ofrecer funciones intuitivas, previniendo errores en la gestión del inventario.
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Grid>

                    </Grid>


                </Container>

            </div>

        </div>

    );
}
