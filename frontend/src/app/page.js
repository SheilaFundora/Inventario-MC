'use client'
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import Loading from "@/components/Loading";


export default function Home() {
    const router = useRouter();

    useEffect( () => {
        return router.push('/dashboard');
    }, [])

    return (
        <div className={'pt-5'}>
            <Loading infoText={'Cargando ...'} />
        </div>
    )
}
