const baseUrl = process.env.NEXT_PUBLIC_API_HOST;

export const fetchData = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }${ endpoint }`;
    console.log(JSON.stringify( data ))

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}
