import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrManager } from 'ng6-toastr-notifications';
import { RenterService } from 'src/app/renter/shared/renter.service';
import { ImageBytesService } from 'src/app/utils/image-bytes.service';
import { Message } from 'src/app/utils/message.model';
import { EntertainmentPlace } from '../../shared/entertainment-place.model';
import { OwnerService } from '../../shared/owner.service';

@Component({
  selector: 'app-entertainment-place-edit',
  templateUrl: './entertainment-place-edit.component.html',
  styleUrls: ['./entertainment-place-edit.component.scss']
})
export class EntertainmentPlaceEditComponent implements OnInit {

  entertainmentPlaceId: string;
  entertainmentPlace: EntertainmentPlace;
  canRender: boolean = false;
  image: any;
  selectedImage: File;

  constructor(
    private renterService: RenterService,
    private imageBytesService: ImageBytesService,
    private dialogRef: MatDialogRef<EntertainmentPlaceEditComponent>,
    private ownerService: OwnerService,
    private toastr: ToastrManager,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.entertainmentPlaceId = data;
  }

  ngOnInit(): void {
    this.getAllData();
  }

  private getAllData(): void {
    this.getEntertainmentPlace();
  }

  private getEntertainmentPlace() {
    this.renterService.findEntertainmentPlace(this.entertainmentPlaceId).subscribe(entPlace => {
      this.entertainmentPlace = entPlace;
      this.image = this.imageBytesService.getImageFromBytes(entPlace.profileImage);
      this.canRender = true;
    });
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

  onCancelModifications() {
    this.dialogRef.close();
  }

  onSaveModifications() {
    this.updateEntertainmentPlace();
  }
  
  private updateEntertainmentPlace(): void {
    if (this.image) {
      this.entertainmentPlace.profileImage = this.imageBytesService.getBytesFromImage(this.image);
    }
    this.ownerService.updateEntertainmentPlaces(this.entertainmentPlace).subscribe(data => {
      this.toastr.infoToastr(Message.ENTITY_UPDATED_SUCCESSFULLY, Message.INFORMATION);
      this.dialogRef.close();
    });
  }

  isSaveDisabled(): boolean {
    return (!this.entertainmentPlace || !this.entertainmentPlace.name || !this.entertainmentPlace.address.county || 
      !this.entertainmentPlace.address.city || !this.entertainmentPlace.address.street || !this.entertainmentPlace.address.number
      || !this.entertainmentPlace.description || !this.image);
  }
}
