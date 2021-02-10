import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AnonService } from 'src/app/anon/shared/anon.service';
import { EntertainmentActivity } from '../../entertainment-activity/shared/entertainment-activity.model';
import { EntertainmentPlace } from '../../shared/entertainment-place.model';
import { PlaceSearchObj } from './shared/place-search.model';

@Component({
  selector: 'app-entertainment-place-search',
  templateUrl: './entertainment-place-search.component.html',
  styleUrls: ['./entertainment-place-search.component.scss'],
})
export class EntertainmentPlaceSearchComponent implements OnInit {
  
  searchObj: PlaceSearchObj;
  activities: EntertainmentActivity[] = [];
  @Output() searchStart: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchEnded: EventEmitter<EntertainmentPlace[]> = new EventEmitter<EntertainmentPlace[]>();

  constructor(private anonService: AnonService) { 
    this.searchObj = new PlaceSearchObj();
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void {
    this.anonService.getAllEntertainmentActivities().subscribe(entAct => {
      this.activities.push(new EntertainmentActivity());
      this.activities.push(...entAct);
    });
  }

  onChange() {
    this.searchStart.emit();
    this.anonService.searchEntertainmentPlaces(this.searchObj).subscribe(entPlaces => {
      this.searchEnded.emit(entPlaces);
    });
  }



}
