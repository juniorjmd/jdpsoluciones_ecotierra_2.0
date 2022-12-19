import { Mapa } from "./mapa";

export interface MapaRequest {
        RESPONS?:string|boolean, 
        filas_var?: number,
        datos : Mapa[],
        code:number,
        message?:string
     
}
