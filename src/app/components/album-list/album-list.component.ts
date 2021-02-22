import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Album } from 'src/app/model/album';
import { Artist } from 'src/app/model/artist';
import { DbService } from 'src/app/services/db.service';
import { UtilService } from 'src/app/services/util.service';

export interface IAlbumList {
  id: number;
  title: string;
  year: number;
  artist: string;
  artistId: number;
}

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'year', 'artist', 'artistId'];
  dataSource: MatTableDataSource<IAlbumList>;
  public albumList: IAlbumList[] = [];
  public artistList: Artist[] = [];
  public direction = -1;
  public columnSelected = 'title';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() editEvent: EventEmitter<Album> = new EventEmitter<Album>();
  @Output() deleteEvent: EventEmitter<Album> = new EventEmitter<Album>();
  public subscription: Subscription = new Subscription();

  constructor(
    private dbService: DbService,
    private utilService: UtilService,
    private snackBar: MatSnackBar,
    ) 
  { }

  ngOnInit(): void {
    this.albumList = [];
    this.dataSource = new MatTableDataSource(this.albumList);

    this.subscription.add(this.dbService.albumns$
        .pipe(filter(items => !!items))
        .subscribe((items: Album[]) => {
          this.albumList = [];
          items.forEach(item => {
            const obj: IAlbumList = {
              id: item.id,
              title: item.title,
              year: item.year,
              artist: this.getArtistById(item.artistId),
              artistId: item.artistId
            }
            this.albumList.push(obj);
          });
          this.albumList = this.utilService.sortBy(this.albumList, this.columnSelected, this.direction);
          this.dataSource.data = this.albumList;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err => this.openSnackBar(err.message, 'Error')));

    this.subscription.add(this.dbService.getArtists()
        .pipe(filter(items => !!items))
        .subscribe((items: Artist[]) => {
          this.artistList = items;
          this.dbService.getAlbums();
        }, err => this.openSnackBar(err.message, 'Error')));
  }

  getArtistById(id: number): string {
    const artist = this.artistList.find(artist => artist.id === id);
    return artist ? artist.name : '';
  }

  editAlbum(row: IAlbumList): void {
    const obj: Album = {
      id: row.id,
      title: row.title,
      year: row.year,
      artistId: row.artistId
    }
    this.editEvent.emit(obj)
  }

  deleteAlbum(album: Album): void {
    const obj = {
      ...album,
      name: this.getArtistById(album.artistId)
    }
    this.deleteEvent.emit(obj)
  }

  sortColumn(column: string): void {
    this.dataSource.data = [];
    this.albumList = this.utilService.sortBy(this.albumList, column, this.direction);
    this.dataSource.data = this.albumList;
    this.columnSelected = column;
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}


