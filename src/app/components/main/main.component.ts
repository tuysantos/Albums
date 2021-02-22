import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Album } from 'src/app/model/album';
import { AlbumComponent } from '../album/album.component';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(data: Album): void {
    const dialogRef = this.dialog.open(AlbumComponent, {
      width: '470px',
      disableClose: true,
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }

  editAlbum(album: Album): void {
    this.openDialog(album)
  }

  deleteAlbum(album: any): void {
    const dialogRef = this.dialog.open(MessageComponent, {
      width: '400px',
      disableClose: true,
      data: album
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }
}
