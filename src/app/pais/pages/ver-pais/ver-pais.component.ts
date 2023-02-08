import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { elementAt, switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  pais!: Country
  currency!: String
  translation!:[]

  constructor(
    private activateRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap( ({id}) => this.paisService.getPaisAlpha(id) ),
        tap(console.log)
      )
      .subscribe(pais => {
        this.pais = pais[0]
        Object.entries(pais[0].currencies).forEach(element => this.currency = element[0])
        
      })
  }
}
