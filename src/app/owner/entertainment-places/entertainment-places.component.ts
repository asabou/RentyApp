import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnonService } from 'src/app/anon/shared/anon.service';
import { AbstractSearchComponent } from 'src/app/commons/abstract-search/abstract-search.component';
import { LoginService } from 'src/app/login/shared/login.service';
import { EntertainmentPlace } from '../shared/entertainment-place.model';
import { OwnerService } from '../shared/owner.service';

@Component({
  selector: 'app-entertainment-places',
  templateUrl: './entertainment-places.component.html',
  styleUrls: ['./entertainment-places.component.scss']
})
export class EntertainmentPlacesComponent extends AbstractSearchComponent implements OnInit {
  entertainmentPlaces: EntertainmentPlace[] = [];

  constructor(private router: Router,
    	        private loginService: LoginService, 
              private anonService: AnonService, 
              private ownerService: OwnerService) {
                super();
  }
  
  getAllData() {
    let adminRights = this.loginService.hasAdminRights();
    let ownerRights = this.loginService.hasOwnerRights();
    let renterRights = this.loginService.hasRenterRights();
    if ((adminRights || renterRights) || (!adminRights && !ownerRights && !renterRights)) {
      this.anonService.getAllEntertainmentPlaces().subscribe(places => {
        this.entertainmentPlaces = places;
      });
      return;
    }
    if (ownerRights && !adminRights) {
      this.ownerService.findAllOwnedEntertainmentPlaces().subscribe(place => {
        this.entertainmentPlaces = place;
      });
      return;
    }
  }

  ngOnInit(): void {
    this.getAllData();
  }

  onEntertainmentPlaceDelete(data: any) {
    this.getAllData();
  }

  onEntertainmentPlaceEdit(data: any) {
    this.getAllData();
  }
}
