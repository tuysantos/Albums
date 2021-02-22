import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DbService } from 'src/app/services/db.service';
import { UtilService } from 'src/app/services/util.service';
import { ReactiveFormsModule } from '@angular/forms';

import { AlbumComponent, IAlbum } from './album.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { Album } from 'src/app/model/album';
import { albumsMock, artistsMock } from 'src/app/data-fixture';
import { of } from 'rxjs';
import { Artist } from 'src/app/model/artist';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { not } from '@angular/compiler/src/output/output_ast';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let snackBar: MatSnackBar;
  let dbService: DbService;

  class DbServiceMock {

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
      return artistsMock
    }
  }

  class MatDialogRefMock {
    close(): void {}
  };

  const data: IAlbum = {
    title: "Thriller",
    year: 1982,
    artistId: 3,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumComponent ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: DbService, useClass : DbServiceMock},
        {provide: UtilService, useClass : UtilServiceMock},
        {provide: MatDialogRef, useClass: MatDialogRefMock},
        {provide: MAT_DIALOG_DATA, useValue: data}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the artist list', async() => {
    component.getArtists();
    expect(component.artistList.length).toEqual(4)
  });

  it('should edit an album', () => {
    const album: Album = {
      title: "What's Going On",
      year: 1971,
      artistId: 1,
      id: 3
    }
    component.editAlbum(album);
    expect(component.albumId).toEqual(3);
    expect(component.albumForm.get('title').value).toEqual("What's Going On");
    expect(component.albumForm.get('year').value).toEqual(1971);
  });

  it('should not be duplicate album', () => {
    component.albumList = albumsMock;
    component.albumId = 3;
    const album: Album = {
      title: "What's Going On",
      year: 1971,
      artistId: 1,
      id: 3
    }
    component.editAlbum(album);
    const result = component.isNotDuplicate('Ride on', 1, 4);
    expect(result).toBe(true);
  });

  it('should be a duplicated album', () => {
    component.albumList = albumsMock;
    component.albumId = 3;
    const album: Album = {
      title: "What's Going On",
      year: 1971,
      artistId: 1,
      id: 3
    }

    component.editAlbum(album);
    const result = component.isNotDuplicate("What's Going On", 1, 4);
    expect(result).toBe(false)
  });

  it('should save a new album', () => {
    spyOn(component, 'openSnackBar');
    spyOn(component, 'closeForm');
    component.albumForm.get('title').setValue('New Title');
    component.albumForm.get('year').setValue(2021);
    component.albumForm.get('artistId').setValue(3);
    component.saveAlbum();

    expect(component.openSnackBar).not.toHaveBeenCalled();
    expect(component.closeForm).toHaveBeenCalled();
    expect(component.albumForm.valid).toBe(true);
  });

  it('should not save a new album', () => {
    spyOn(component, 'closeForm');
    component.albumForm.get('title').setValue('');
    component.albumForm.get('year').setValue(2021);
    component.albumForm.get('artistId').setValue(3);
    component.saveAlbum();

    expect(component.closeForm).not.toHaveBeenCalled();
    expect(component.albumForm.valid).toBe(false);
  });
});
