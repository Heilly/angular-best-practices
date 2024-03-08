import { Injectable, computed, inject, signal } from '@angular/core';
import { Countries, Region, SmallCountry } from '../interfaces/countries.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, combineLatest, filter, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MultiselectService {
  
  private http = inject( HttpClient );
  
  private baseUrl: string = 'https://restcountries.com/v3.1';

  private _regions = signal<Region[]>([ Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ]);

  public regions = computed( () => this._regions() );


  onCountryByRegion( region : Region ): Observable <SmallCountry[]> {

    console.log('Region ', region);

    if ( !region ) return of([]);
    return this.http.get<Countries[]>( `${this.baseUrl}/region/${region}` )
            .pipe(
              map( countries => {

                return countries.map( country => ({
                  name: country.name.official,
                  borders: country.borders,
                  cca3: country.cca3
                }));
              } ),
              catchError( err => of( [] ) )
            )
  }


  onCountryByAlphaCode( alphaCode: string ) : Observable<SmallCountry>{
    return this.http.get<Countries[]>( `${this.baseUrl}/alpha/${alphaCode}` )
            .pipe(
              map( countries => countries[0]),
              map( country =>{
                return ({
                name: country.name!.common ?? '',
                cca3: country.cca3,
                borders: country.borders ?? [],
              })}),
              catchError( () => of() )
            )
  }

  getCountryBordersByCodes( borders: string[] ): Observable<SmallCountry[]> {
    if ( !borders || borders.length === 0 ) return of([]);

    const countriesRequests : Observable<SmallCountry>[]  = [];

    borders.forEach( code => {
      const request = this.onCountryByAlphaCode( code );
      countriesRequests.push( request );
    });


    return combineLatest( countriesRequests );
  }

  getBorderByAlphaCode( alphaCode: string ) : Observable<Countries>{
    return this.http.get<Countries[]>( `${this.baseUrl}/alpha/${alphaCode}` )
            .pipe(
              map( countries => countries[0]),
              tap( country => country ),
              catchError( () => of() )
            )
  }



}
