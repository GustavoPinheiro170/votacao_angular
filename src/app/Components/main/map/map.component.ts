import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { latLong } from '../model/model.interface';
import { ServiceMainService } from '../service/service-main.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {


  constructor(private service: ServiceMainService) { }

  private map: any;

  @Input() locBolsonarista: any;
  @Input() locLulista: any;


  ngAfterViewInit(): void {
    this.initMap()
    console.log(this.locBolsonarista)

  }
  iconBolso = L.icon({
    iconUrl: '../../../assets/markerblue.png',
    iconSize: [20, 28],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
  });

  iconLula = L.icon({
    iconUrl: '../../../assets/markerred.png',
    iconSize: [20, 25],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
  });

  private initMap(): void {
    this.map = L.map('map', {
      center: [-23.5432, -46.6292],
      zoom: 5,
      minZoom: 5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    setTimeout(() =>  {
    for (let i = 0; i < this.locBolsonarista.length  ; i++) {
       console.log(this.locBolsonarista)
      L.marker(this.locBolsonarista[i], { icon: this.iconBolso }).addTo(this.map)
        .bindPopup('Bolsonarista')
        .openPopup();
      }
    }, 2000)

    setTimeout(() =>  {
      for (let i = 0; i < this.locLulista.length  ; i++) {
        L.marker(this.locLulista[i], { icon: this.iconLula }).addTo(this.map)
          .bindPopup('Lulista')
          .openPopup();
        }
      }, 2000)

  }

}
