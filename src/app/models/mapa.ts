export interface Mapa {
    id : number;
    longitud : number;
    latitud : number;
    desc?:string,
    updated_at?:string,
    created_at?: string,
    sorte?: number
    mrk?:any
} 

export interface ordenMap {
    id : number;
    sorte : number; 
} 
