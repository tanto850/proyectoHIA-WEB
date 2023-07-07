import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Area } from 'src/app/models/area';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent implements OnInit {

  personas!:Array<Persona>;
  persona:Persona = new Persona();
  personaDni:Persona= new Persona();


  rol:Rol=new Rol();
  area:Area=new Area();
  
  constructor(private router:Router,
              private personaService:PersonaService,
              private toastr: ToastrService,
             ) { 
    this.inicializar();
    this.cargarPersonas();

  }

  inicializar(){
    this.personas= new Array<Persona>();
    this.personaDni= new Persona();
  }

  cargarPersonas(){
    this.personas=new Array <Persona>();
    this.personaService.getPersonas().subscribe(
      (result) =>{
        console.log(result);
        result.forEach((element:any) => {
          var unroles = new Array<Rol>();
          var unapersona = new Persona();
          var unarea =  new Area();
          Object.assign(unarea,element.area);
          element.roles.forEach((irol:any) => {
            var rol = new Rol();
            Object.assign(rol,irol);
            unroles.push(rol);  
          });
          unapersona.roles= unroles;
        //  unapersona.area=unarea;
          Object.assign(unapersona,element);
          this.personas.push(unapersona);
      
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }  
 

  agregarPersona(){
    this.router.navigate(["persona-form", 0])
  }

  modificarPersona(persona:Persona){
    this.router.navigate(["persona-form", persona._id]);
  }

  borrarPersona(persona:Persona){
    this.personaService.deletePersona(persona._id).subscribe(
      (result)=>{
        if(result.status="1"){
          console.log(result.msg);
          //alert(result.msg);
          this.cargarPersonas();
          this.toastr.success("Persona eliminado/a correctamente","Baja de Persona");
        }
      },
      (error)=>{
        if(error.status="0")
        //console.log(error.msg);
        this.toastr.error(error.msg,"Baja de Persona");
      }
    )
  }

  fitrarByDni(){
    this.personas= new Array<Persona>();
    this.personaService.getPersonaByDni(this.personaDni.dni).subscribe(
      (result)=>{
        if (result.length!=0){
          var unroles = new Array<Rol>();
          var unapersona = new Persona();
          var unarea =  new Area();

          result.forEach((element:any) => {
            Object.assign(unarea,element.area);
            element.roles.forEach((irol:any) => {
              var rol = new Rol();
              Object.assign(rol,irol);
              unroles.push(rol);  
            });
            unapersona.roles= unroles;
           // unapersona.area=unarea;
            Object.assign(unapersona,element);
            this.personas.push(unapersona);
          });
          console.log(this.personas);  
        }else{
          this.toastr.error("La persona con dni "+this.personaDni.dni+" no se encuentra registrado","Busqueda");
          this.cargarPersonas();
        }
      },
      (error)=>{
        console.log(error.msg);

      }
    )

  }



  ngOnInit(): void {
  }

}

