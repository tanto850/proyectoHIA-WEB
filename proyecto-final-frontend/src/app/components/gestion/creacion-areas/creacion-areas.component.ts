import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/models/area';
import { Persona } from 'src/app/models/persona';
import { ServiciosAreaService } from 'src/app/services/servicios-area.service';

@Component({
  selector: 'creacion-areas',
  templateUrl: './creacion-areas.component.html',
  styleUrls: ['./creacion-areas.component.css']
})
export class CreacionAreasComponent implements OnInit {

  lista: Array<Persona>;

  area: Area;

  accion: string = '';

  responsables: Array<Persona>;

  personaSeleccionada: Persona;

  

  constructor(private servicios: ServiciosAreaService, private activatedRoute: ActivatedRoute,private router: Router) {
    this.lista = new Array<Persona>();
    this.area = new Area();
    this.personaSeleccionada = new Persona();
    this.responsables = new Array<Persona>();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params['idArea'] == "0") {
          this.responsables = new Array<Persona>();
          this.accion = 'new';
          this.listarPersonas();
        }
        else {
          this.responsables = new Array<Persona>();
          this.accion = 'update';
          this.listarPersonas();
          this.cargarArea(params['idArea']);
        }
      }
    )

  }


  listarPersonas() {
    this.servicios.getPersonas().subscribe(
      result => {
        var unaPersona = new Persona();
        result.forEach((element: any) => {
          Object.assign(unaPersona, element);
          this.lista.push(unaPersona);
          unaPersona = new Persona();
        });
      },
      error => {
        console.log(error);
      }
    )

  }

  cargarArea(idArea: any) {
    this.servicios.getArea(idArea).subscribe(
      result => {
        Object.assign(this.area, result);
        var unaPersona = new Persona();
        result.responsables.forEach((element: any) => {
          Object.assign(unaPersona, element);
          this.responsables.push(unaPersona);
          unaPersona = new Persona();
        })
      },
      error => {
        console.log(error);
      }
    )

  }

  crearArea(area: Area){
    this.area.responsables = this.responsables;
    this.servicios.postArea(area).subscribe(
      result=>{
        alert(result.msg);
        this.router.navigate(['lista-areas']);

      },
      error=>{
        console.log(error);
      }
    )
  }

  modificarArea(area:Area, idArea:any){
    this.area.responsables = this.responsables;
    this.servicios.putArea(idArea, area).subscribe(
      result=>{
        alert(result.msg);
        this.router.navigate(['lista-areas']);

      },
      error=>{
        console.log(error);
      }
    )
  }

  eliminarArea(idArea:any){
    this.servicios.deleteArea(idArea).subscribe(
      result=>{
        alert(result.msg);
        this.router.navigate(['lista-areas']);

      },
      error=>{
        console.log(error);
      }
    )
  }



  agregarResponsable(responsable: Persona){
    this.responsables.push(responsable);
  }

  eliminarResponsable(id: any) {
    const index = this.responsables.findIndex(t => t._id === id);
    if (index != -1) {
      this.responsables.splice(index, 1);
    }
  }

  volver(){
    this.router.navigate(['lista-areas']);
  }

}
