import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MultiselectService } from '../../services/multiselect.service';
import { catchError, filter, map, switchMap, tap, Observable, EMPTY } from 'rxjs';
import { Countries, Region, SmallCountry } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class MultiselectComponent implements OnInit {

  private fb = inject( FormBuilder );
  private selectService = inject( MultiselectService );

  public regions = computed( () => this.selectService.regions() );
  public countries = signal<SmallCountry[]>( [] );
  public borders = signal<SmallCountry[]>([]);
  public frontera = signal<Countries | undefined>(undefined);



  public mySelect = this.fb.group({
    region: [ '', Validators.required ],
    country: [ '', Validators.required ],
    border: [ '', Validators.required ],
  });

  ngOnInit(): void {
      this.onSelectRegion();
      this.onCountryChanged();
      this.onBorderChange();
  }

  onSelectRegion(){
    return this.mySelect.get('region')!.valueChanges
        .pipe(
          //filter( region => region !==null ),
          tap( () => this.mySelect.get('country')!.setValue('') ),
          tap( () => this.borders.set([]) ),
          switchMap( (region) => this.selectService.onCountryByRegion(region as Region) ),
        )
        .subscribe( data => {
            this.countries.set(data);
        })
  }

  onCountryChanged() {

    return this.mySelect.get('country')!.valueChanges
            .pipe(
              tap( () => this.mySelect.get('border')!.setValue('') ),
              tap( () => this.borders.set([]) ),
              switchMap( cca3  => this.selectService.onCountryByAlphaCode(cca3 as string) ), // devuelve mi country
              switchMap( ({borders}) => this.selectService.getCountryBordersByCodes( borders as string[] ))
            )
            .subscribe( countries  => {
              this.borders.set(countries)
            } )
  }

  onBorderChange(){
    return this.mySelect.get('border')!.valueChanges
              .pipe(
                switchMap( code => {
                  if(code === ''){
                    this.frontera.set(undefined);
                    return EMPTY;
                  } else {
                    return this.selectService.getBorderByAlphaCode(code as string );
                  }} )
              )
              .subscribe( data => {
                console.log(data);
                this.frontera.set(data);
              })
  }


  
  

}
