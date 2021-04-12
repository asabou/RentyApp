import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { AnonService } from 'src/app/anon/shared/anon.service';
import { LoginService } from 'src/app/login/shared/login.service';
import { EntertainmentPlace } from '../shared/entertainment-place.model';
import { OwnerService } from '../shared/owner.service';

@Component({
  selector: 'app-entertainment-places',
  templateUrl: './entertainment-places.component.html',
  styleUrls: ['./entertainment-places.component.scss']
})
export class EntertainmentPlacesComponent implements OnInit, OnDestroy {
  entertainmentPlaces: EntertainmentPlace[] = [];
  canRender = false;
  hasRights = false;
  subs: Subscription;

  constructor(private loginService: LoginService, 
              private anonService: AnonService, 
              private ownerService: OwnerService) { }
  
  getAllData() {
    let adminRights = this.loginService.hasAdminRights();
    let ownerRights = this.loginService.hasOwnerRights();
    let renterRights = this.loginService.hasRenterRights();
    this.hasRights = ownerRights && !adminRights;
    if (ownerRights && !adminRights) {
      this.ownerService.findAllOwnedEntertainmentPlaces().subscribe(place => {
        this.entertainmentPlaces = place;
        this.canRender = true;
      });
      return;
    } else {
      this.anonService.getAllEntertainmentPlaces().subscribe(places => {
        this.entertainmentPlaces = places;
        this.canRender = true;
      });
      return;
    }
  }

  ngOnInit(): void {
    this.getAllData();
    this.subs = interval(3000).subscribe(() => {
      this.hasRights = this.loginService.hasOwnerRights() && !this.loginService.hasAdminRights();
    });
  }

  onEntertainmentPlaceDelete(data: any) {
    this.getAllData();
  }

  onEntertainmentPlaceEdit(data: any) {
    this.getAllData();
  }

  onSearchStart(data: any) {
    this.canRender = false;
  }

  onSearchEnded(entPlaces: EntertainmentPlace[]) {
    this.entertainmentPlaces = entPlaces;
    this.canRender = true;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  
}
