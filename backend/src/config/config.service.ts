import * as fs from 'fs';



export class ConfigService {

private readonly envConfig : {[key:string]:string};

constructor(){

    const isDevelopmentEnv = process.env.NODE_ENV !== "production";
    if (isDevelopmentEnv){
        const envFilePath = __dirname + '/../../.env';
        const existPath = fs.existsSync(envFilePath);

        if(!existPath){

            console.log('.env file no exist');
            process.exit(0);

        }


        

    }



}


}