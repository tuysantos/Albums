import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Artist } from '../model/artist';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, catchError, share, filter } from 'rxjs/operators';
import { Album } from '../model/album';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  public api = environment.endPoint;
  public errorMessage = '';
  public albumns$: Subject<Album[]> = new Subject<Album[]>();
  public subscription: Subscription = new Subscription();
  private iTemList: Album[] = []
  constructor(
    private http: HttpClient, 
    private utilService: UtilService) 
    {}

  getAlbums(): void {
    this.subscription.add(this.http.get<Album[]>(`${this.api}/albums`)
                .pipe(filter(items => !!items))
                .subscribe((items: Album[]) => {
                  this.iTemList = items;
                  this.albumns$.next(items);
                }));
  }

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.api}/albums`)
                .pipe(filter(items => !!items), map((items: Album[]) => items));
  }

  getArtists(): Observable<Artist[]> {
    this.errorMessage = '';
    return this.http.get<Artist[]>(`${this.api}/artists`)
                .pipe(map((items: Artist[]) => items), 
                catchError(this.handleError)
                );
  }

  addAlbum(album: Album): void {
    this.errorMessage = '';
    this.http.post<Album>(`${this.api}/albums`, album).subscribe({
      next: data => {
        this.utilService.openSnackBar('Album added', 'Success');
        this.iTemList.push(data);
        this.albumns$.next(this.iTemList);
      },
      error: error => {
        this.errorMessage = error.message;
        this.utilService.openSnackBar(error.message, 'Error');
      }
    })
  }

  updateAlbum(album: Album): Promise<boolean> {
    this.errorMessage = '';
    return new Promise<boolean>((resolve, reject) => {
      this.http.put(`${this.api}/albums/${album.id}`, album).subscribe(() => {
        const temp = this.iTemList;
        this.iTemList = [];
        temp.forEach(item => {
          item.id !== album.id ? this.iTemList.push(item) : this.iTemList.push(album);
        })
        this.albumns$.next(this.iTemList);
        this.utilService.openSnackBar('Album updated', 'Success');
        resolve(true);
      }, err => {
        this.utilService.openSnackBar(err.message, 'Error');
        reject(err.message)})
    });
  }

  deleteAlbum(id: number): Promise<boolean> {
    this.errorMessage = '';
    return new Promise<boolean>((resolve, reject) => {
      this.http.delete(`${this.api}/albums/${id}`).subscribe(() => {
        this.iTemList = this.iTemList.filter(item => item.id !== id);
        this.albumns$.next(this.iTemList);
        this.utilService.openSnackBar('Album deleted', 'Success');
        resolve(true);
      }, err => {
        this.utilService.openSnackBar(err.message, 'Error');
        reject(err.message)})
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error);
  }
}
