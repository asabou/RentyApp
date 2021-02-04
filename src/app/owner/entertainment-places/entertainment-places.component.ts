import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnonService } from 'src/app/anon/shared/anon.service';
import { EntertainmentPlace } from '../shared/entertainment-place.model';

@Component({
  selector: 'app-entertainment-places',
  templateUrl: './entertainment-places.component.html',
  styleUrls: ['./entertainment-places.component.scss']
})
export class EntertainmentPlacesComponent implements OnInit {
  entertainmentPlaces: EntertainmentPlace[] = [];

  constructor(private router: Router, 
              private anonService: AnonService) {
  }
  
  getAllData() {
    this.anonService.getAllEntertainmentPlaces().subscribe(places => {
      this.entertainmentPlaces = places;
      this.entertainmentPlaces.push(new EntertainmentPlace({name: "Name3"}));
      this.entertainmentPlaces.push(new EntertainmentPlace({name: "Name4"}));
      this.entertainmentPlaces.push(new EntertainmentPlace({name: "Name5"}));
      this.entertainmentPlaces.push(new EntertainmentPlace({name: "Name6"}));
    });  
  }

  ngOnInit(): void {
    this.getAllData();
  }

  onEntertainmentPlaceClick(item: EntertainmentPlace) {
    this.router.navigate(['entertainment-place-details', item.id]);
  }
}
