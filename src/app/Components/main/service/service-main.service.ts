import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from '@material-ui/core';
import { Observable } from 'rxjs';
import { ErrorsComponent } from '../errors/errors.component';
import { latLong } from '../model/model.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceMainService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  base_url: string = 'https://voto-api-nodejs.herokuapp.com/';



  getIPAddress() {
    return this.http.get("http://api.ipify.org/?format=json");
  }

  getLocations(): Observable<any> {
    return this.http.get(this.base_url + 'api/get/votos')
  }

  getVoteLula(): Observable<any> {
    return this.http.get(this.base_url + 'api/get/lula')
  }

  getVoteBolsonaro(): Observable<any> {
    return this.http.get(this.base_url + 'api/get/bolsonaro')
  }
  
  postBolsonaro(bolsonaro: number, ip: number, lat: any, lng: any): Observable<any> {
    return this.http.post<any>(this.base_url + 'api/insert/bolsonaro', { bolsonaro, ip, lat, lng }, { observe: 'response' })
  }

  postLula(lula: number, ip: number, lat: any, lng: any): Observable<any> {
    return this.http.post<any>(this.base_url + 'api/insert/lula', { lula, ip, lat, lng })
  }

  openSnackBar(event: string, isError: boolean = false) {
    return this._snackBar.open(event, 'x', {
      duration: 2000,
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

}
