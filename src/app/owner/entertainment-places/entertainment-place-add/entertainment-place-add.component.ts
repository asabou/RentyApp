import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AnonService } from 'src/app/anon/shared/anon.service';
import { LoginService } from 'src/app/login/shared/login.service';
import { ImageBytesService } from 'src/app/utils/image-bytes.service';
import { EntertainmentActivity } from '../../entertainment-activity/shared/entertainment-activity.model';
import { EntertainmentPlaceOutput } from '../../shared/entertainment-place-output.model';
import { OwnerService } from '../../shared/owner.service';

@Component({
  selector: 'app-entertainment-place-add',
  templateUrl: './entertainment-place-add.component.html',
  styleUrls: ['./entertainment-place-add.component.scss']
})
export class EntertainmentPlaceAddComponent implements OnInit {

  entertainmentPlace: EntertainmentPlaceOutput;
  activities: EntertainmentActivity[];
  canRender = false;
  image: any = "";
  selectedImage: File;

  @Output() afterAdd: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private anonService: AnonService, 
    private ownerService: OwnerService, 
    loginService: LoginService,
    private imageBytesService: ImageBytesService) {
      this.entertainmentPlace = new EntertainmentPlaceOutput();
      this.entertainmentPlace.userDetailsId = loginService.getUserIdFromToken();
    }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.anonService.getAllEntertainmentActivities().subscribe(entAct => {
      this.activities = entAct;
      this.canRender = true;
    });
  }

  onSaveEntertainmentPlaceClick(): void {
    this.entertainmentPlace.profileImage = this.imageBytesService.getBytesFromImage(this.image);
    this.ownerService.createEntertainmentPlace(this.entertainmentPlace).subscribe(data => {
      this.afterAdd.emit();
    });
    this.entertainmentPlace.clearFields();
  }

  onCancel(): void {
    this.entertainmentPlace.clearFields();
  }

  onImageSelected(files) {
    if (files.length === 0) {
      return;
    }
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.image = reader.result;
    }
  }

  isSaveDisabled(): boolean {
    return (!this.entertainmentPlace.name || !this.entertainmentPlace.entertainmentActivity || !this.entertainmentPlace.pricePerHour
      || !this.entertainmentPlace.maxPeopleAllowed || !this.entertainmentPlace.address.county || 
      !this.entertainmentPlace.address.city || !this.entertainmentPlace.address.street || !this.entertainmentPlace.address.number
      || !this.entertainmentPlace.description);
  }


}
