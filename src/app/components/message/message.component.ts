import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db.service';

export interface IAlbum {
  id?: number;
  title: string;
  year: number;
  artistId: number;
  name: string;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  public albumName = '';
  public artistName = '';
  public albumYear = 0;

  constructor(
    private dbService: DbService,
    public dialogRef: MatDialogRef<MessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAlbum) { }

  ngOnInit(): void {
    this.albumName = this.data.title;
    this.albumYear = this.data.year;
    this.artistName = this.data.name;
  }

  deleteData(): void {
    this.dbService.deleteAlbum(this.data.id)
        .then(() => {
          this.closeForm();
        })
  }

  closeForm(): void {
    this.dialogRef.close();
  }

}
