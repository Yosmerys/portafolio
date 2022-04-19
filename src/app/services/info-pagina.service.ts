import { HttpClient } from '@angular/common/http'; //peticion json
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';
@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info:InfoPagina={};

  cargada=false;

  constructor(private http:HttpClient) {
  //console.log("Servicio de info pagina listo");
  /* LEER JSON */
  this.http.get('assets/data/data-pagina.json').subscribe(
    (resp:InfoPagina)=>{
     // console.log(resp);
     this.cargada=true;
     this.info=resp;

      console.log( resp );

    }
  );


   }
}
