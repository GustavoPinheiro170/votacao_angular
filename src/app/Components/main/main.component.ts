import { Component, OnInit, Output } from '@angular/core';
import { ServiceMainService } from './service/service-main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']

})

export class MainComponent implements OnInit {

  constructor(private service: ServiceMainService) { }

  ipAddress: number = 0;
  @Output() locBolsonarista = new Array<any>();
  @Output() locLulista = new Array<any>();



  qtVotosLula: number = 0;
  qtVotosBolso: number = 0;

  voteBolsonaro: Array<string> = [];
  voteLula: Array<string> = [];

  permission: boolean = true;

  lat: any;
  lng: any;



  ngOnInit(): void {
    this.RefreshArray()
    this.getIP()
    this.getLocation()
  }

   RefreshArray() {
    this.service.getVoteBolsonaro().subscribe(async(item: any) => {
      for (let i = 0; i < item.length; i++) {
        this.voteBolsonaro.push(item[i].ip)
        this.locBolsonarista.push( [item[i].lat , item[i].lng])
        this.qtVotosBolso = item.length;
      }
    })

    this.service.getVoteLula().subscribe(async(item: any) => {
      for (let i = 0; i < item.length; i++) {
        this.voteLula.push(item[i].ip)
        this.locLulista.push( [item[i].lat , item[i].lng])
        this.qtVotosLula = item.length;
      }
    })
  }

  getIP() {
    this.service.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
      console.log(this.ipAddress)
    });
  }

  getLocation() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
  }

  votoLula() {
    this.voteBolsonaro.forEach((item: any) => {
      this.getLocation()
      if (item === this.ipAddress)
        this.permission = false;
      this.service.openSnackBar('Voce já votou no seu oponente!', true)
      return false;
    })
    return this.fetchLula()

  }

  fetchLula() {
    if (this.permission) {
      return this.service.postLula(1, this.ipAddress, this.lat, this.lng).subscribe((data: any) => {
        if (data.sqlState == 23000) {
          this.service.openSnackBar('Voce já votou uma vez!', true)
        } else {
          this.RefreshArray()
          this.service.openSnackBar('Voto Realizado com sucesso!')
        }
      })
    } else {
      return false
    }

  }

  votoBolsonaro() {
    this.voteLula.forEach((item: any) => {
      if (item === this.ipAddress)
        this.permission = false;
      this.service.openSnackBar('Voce já votou no seu oponente!', true)
      return false;
    })
    return this.fetchBolsonaro()
  }

  fetchBolsonaro() {
    if (this.permission) {
      return this.service.postBolsonaro(1, this.ipAddress, this.lat, this.lng).subscribe((data: any) => {
        if (data.body.sqlState == 23000) {
          return this.service.openSnackBar('Voce já votou uma vez!', true)
        } else {
          this.RefreshArray()
          return this.service.openSnackBar('Voto Realizado com sucesso!')
        }
      }
      )
    } else {
      return false
    }
  }
}
