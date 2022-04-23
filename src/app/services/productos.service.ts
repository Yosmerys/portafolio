import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
    cargando=true;
    productos:Producto[]=[];
    productosFiltrado:Producto[]=[];

  constructor(private http:HttpClient) {
    this.cargarProductos();
   }


private cargarProductos(){

return new Promise<void>( (resolve,reject)=>{

  this.http.get('https://angular-html-d4c22-default-rtdb.firebaseio.com/productos_idx.json').subscribe((resp:any)=>{
  //console.log(resp);
  this.productos=resp;
     
   setTimeout(()=>{
     this.cargando=false;
     resolve();
    },2000); 

});


});


}


getProducto(id:string){
return this.http.get(`https://angular-html-d4c22-default-rtdb.firebaseio.com/productos/${ id }.json`);

}

buscarProducto(termino:string){

if(this.productos.length===0){
  //cargar productos
this.cargarProductos().then( () =>{
  //Ejecutar despues de tener los productos
  //Aplicar filtro
this.filtrarProductos(termino);
});

}else{
  //aplicar filtro
  this.filtrarProductos(termino);
}


//console.log(this.productosFiltrado);
/* this.productosFiltrado=this.productos.filter(producto=>{
  return true;
}); */

}

private filtrarProductos(termino:string){

/* console.log(this.productos); */
this.productosFiltrado=[];

termino=termino.toLocaleLowerCase();
this.productos.forEach(prod=>{
const tutuloLower=prod.titulo.toLocaleLowerCase();


if(prod.categoria.indexOf(termino) >= 0 || tutuloLower.indexOf(termino) >=0){
this.productosFiltrado.push(prod);
}

});




}


}
