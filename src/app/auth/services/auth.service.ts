import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, User, UserResponse, TokenRequest, UserRegister } from '../interfaces';

@Injectable( { providedIn: 'root' } )
export class AuthService {
  constructor() {
    this.checkAuthStatus().subscribe();
  }


  private readonly baseUrl: string =environment.baseurl;

  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.cheking );

  //Exportar Signal
  public currentUser = computed( () => this._currentUser());
  public authStatus = computed( () => this._authStatus() );

  private setAUthentication(user: User, token: string): boolean {
    this._currentUser.set( user );
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem( 'token', token );
    return true;
  }

  login( email: string, password: string ) : Observable<boolean>{

    //const params = new HttpParams().set('email', email).set('password', password);
    const body = { email, password };

    return this.http.post<UserResponse>(` ${this.baseUrl}/auth/login`, body)
        .pipe(
          map( ({user, token}) => {
            return this.setAUthentication(user, token);
          }),
         catchError( (error) => {
          localStorage.removeItem('token');
          return of(false)
        })
        )
  }

  checkAuthStatus(): Observable<boolean>{

    const url=`${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if( !token ) {
      this.logout();
      return of(false);}

    
    const headers = new HttpHeaders()
                        .append('Authorization', `Bearer ${token}`)
                        //.set('Authorization', `Bearer ${token}`)

    return this.http.get<TokenRequest>(url, { headers })
                .pipe(
                  map(({token, user}) => this.setAUthentication(user, token)),
                  catchError( (err) => {
                    return throwError ( () => err.error.message);
                  })
                )
  }

  logout(){
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notauthenticated);
    
  }

  register( userRegister: UserRegister){
      
  return this.http.post<UserResponse>( `${this.baseUrl}/auth/register`, userRegister )
        .pipe(
          map( ({user, token}) => {
            this.setAUthentication(user,token)
          } ),
          catchError( (err) => {
            this._authStatus.set(AuthStatus.notauthenticated);
            console.log(err);
            return of(false);
          } )
        )
    }

}
