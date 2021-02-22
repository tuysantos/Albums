import { EventEmitter, Inject } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Album } from 'src/app/model/album';
import { Artist } from 'src/app/model/artist';
import { DbService } from 'src/app/services/db.service';
import { UtilService } from 'src/app/services/util.service';

export interface IAlbum {
  id?: number;
  title: string;
  year: number;
  artistId: number;
}

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  
  public albumForm : FormGroup;
  public error_messages: any;
  public isDisabled = true;
  public album: Album;
  public albumList: Album[] = [];
  public artistList: Artist[] = [];
  public albumId = 0;
  public direction = -1;
  public formTitle = 'New Album';

  @Output() albumEvent: EventEmitter<Album> = new EventEmitter<Album>();
  public subscription: Subscription = new Subscription();
  
  constructor(
    public dialogRef: MatDialogRef<AlbumComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAlbum,
    public formBuilder: FormBuilder,
    private dbService: DbService,
    private snackBar: MatSnackBar,
    private utilService: UtilService,
    ) { }

  ngOnInit(): void {
    this.albumId = 0;
    this.formTitle = 'New Album';

    this.subscription.add(this.dbService.getAllAlbums()
        .pipe(filter(items => !! items))
        .subscribe((items: Album[]) => {
          this.albumList = items;
        }, err => this.openSnackBar(err.message, 'Error')));

    this.setupForm();
    this.error_messages = this.loadErrors();
    this.getArtists();
    if(this.data['title']) {
      this.formTitle = 'Edit Album';
      this.editAlbum(this.data)
    }
  }

  loadErrors(): any {
    return {
      'title':[
        { type:'required', message: 'title is required'}
      ],
      'year':[
        { type:'required', message: 'year is required'},
        { type:'pattern', message: 'invalid year'},
      ],
      'artistId': [
        { type:'required', message: 'artist is required'}
      ],
    }
  }

  setupForm(): void {
    this.albumForm = this.formBuilder.group({
      title: new FormControl('',Validators.compose([
        Validators.required,
        Validators.maxLength(100),
      ])),
      year: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern("^(2|1)[0-9]{3}")
      ])),
      artistId: new FormControl('',Validators.compose([
        Validators.required,
      ])),
    })
  }

  getArtists(): void {
    this.subscription.add(this.dbService.getArtists()
        .pipe(filter(items => !!items))
        .subscribe((items: Artist[]) => {
          this.artistList = this.utilService.sortBy(items, 'name', this.direction);
        }, err => this.openSnackBar(err.message, 'Error')));
  }

  editAlbum(data: Album): void {
    this.albumForm.get('title').setValue(data.title);
    this.albumForm.get('year').setValue(data.year);
    this.albumForm.get('artistId').setValue(data.artistId);
    this.albumId = data.id;
  }

  saveAlbum(): void {
    if(this.albumForm.valid) {
      this.album = {
        title: this.albumForm.get('title').value,
        year: this.albumForm.get('year').value,
        artistId: this.albumForm.get('artistId').value,
      }

      if(this.isNotDuplicate(this.album.title, this.album.artistId, this.albumId)) {
        if(this.albumId === 0) {
          this.dbService.addAlbum(this.album)
        } else {
          this.album.id = this.albumId;
          this.dbService.updateAlbum(this.album);
        }
        this.closeForm();
      } else {
        this.openSnackBar('Duplicate Album', 'Error');
      }
    }

  }

  isNotDuplicate(title: string, artistId: number, albumId: number): boolean {
    return this.albumList.find(item => item.title.toLocaleLowerCase() === title.toLocaleLowerCase() && item.artistId === artistId && item.id !== albumId) ? false : true;
  }

  closeForm(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  trackByFn(index:number, el:any): number {
    return el.id;
  }

}
