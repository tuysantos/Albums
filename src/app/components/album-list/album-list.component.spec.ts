import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { albumsMock, artistsMock } from 'src/app/data-fixture';
import { Album } from 'src/app/model/album';
import { Artist } from 'src/app/model/artist';
import { DbService } from 'src/app/services/db.service';
import { UtilService } from 'src/app/services/util.service';

import { AlbumListComponent, IAlbumList } from './album-list.component';

describe('AlbumListComponent', () => {
  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;

  class DbServiceMock {
    albumns$ = of(albumsMock);
    getAlbums(): void {}

    getAllAlbums(): Observable<Album[]> {
      return of(albumsMock);
    }

    getArtists(): Observable<Artist[]> {
      return of(artistsMock);
    }

    addAlbum(album: Album): void {}

    updateAlbum(album: Album): void {}
  }
  
  class UtilServiceMock {
    sortBy(collection: any[], col: string, dir: number): any[] {
      return albumsMock
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumListComponent ],
      imports: [MatSnackBarModule],
      providers: [
        {provide: DbService, useClass : DbServiceMock},
        {provide: UtilService, useClass : UtilServiceMock},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    component.albumList = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an artist by id', () => {
    const result = component.getArtistById(1);
    expect(result).toEqual('Marvin Gaye');
  });

  it('should emit event editung an album', () => {
    spyOn(component.editEvent, 'emit').and.callThrough();
    const album: IAlbumList = {
      id: 1,
      title: 'Back in Black',
      year: 1980,
      artist: 'AC/DC',
      artistId: 5
    }

    const albumEmited: Album = {
      id: 1,
      title: 'Back in Black',
      year: 1980,
      artistId: 5
    }
    component.editAlbum(album);
    expect(component.editEvent.emit).toHaveBeenCalledWith(albumEmited);
  });

  it('should emit event deleting an album', () => {
    spyOn(component.deleteEvent, 'emit').and.callThrough();
    const album: Album = {
      id: 1,
      title: 'Another night',
      year: 2020,
      artistId: 1
    }

    const albumEmited = {
      id: 1,
      title: 'Another night',
      year: 2020,
      artistId: 1,
      artist: 'Marvin Gaye',
      name: 'Marvin Gaye'
    }
    component.deleteAlbum(albumEmited)
    expect(component.deleteEvent.emit).toHaveBeenCalledWith(albumEmited);
  })

});
