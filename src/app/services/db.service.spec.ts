import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { albumsMock, artistsMock } from '../data-fixture';
import { Album } from '../model/album';
import { Artist } from '../model/artist';

import { DbService } from './db.service';
import { UtilService } from './util.service';

describe('DbService', () => {
  let service: DbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbService, UtilService],
      imports: [HttpClientTestingModule, MatSnackBarModule]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DbService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get artists', inject(
    [HttpTestingController, DbService], 
    (httpMock: HttpTestingController, service: DbService) => {

      service.getArtists().subscribe((result: Artist[]) => {
        expect(result).toEqual(artistsMock)
      });

      const req = httpMock.expectOne(
        `${environment.endPoint}/artists`
      );
      expect(req.request.method).toEqual("GET");
      req.flush(artistsMock);
    }));

    it('should get albums', inject(
      [HttpTestingController, DbService], 
      (httpMock: HttpTestingController, service: DbService) => {
  
        service.getAllAlbums().subscribe((result: Album[]) => {
          expect(result).toEqual(albumsMock)
        });
  
        const req = httpMock.expectOne(
          `${environment.endPoint}/albums`
        );
        expect(req.request.method).toEqual("GET");
        req.flush(albumsMock);
      }));

    it('should add album', inject(
      [HttpTestingController, DbService], 
      (httpMock: HttpTestingController, service: DbService) => {
        spyOn(service.albumns$, 'next').and.callThrough();
        const album: Album = {
          title: "New Album",
          year: 2000,
          artistId: 1,
          id: 3
        }
        service.addAlbum(album);
        const req = httpMock.expectOne(
          `${environment.endPoint}/albums`
        );
        expect(req.request.method).toEqual("POST");
      }));

  it('should call http.delete', inject(
      [HttpTestingController, DbService], 
      (httpMock: HttpTestingController, service: DbService) => {
        service.deleteAlbum(1);
        const req = httpMock.expectOne(
          `${environment.endPoint}/albums/1`
        );
        expect(req.request.method).toEqual("DELETE");
      }));

  it('should call http.put', inject(
    [HttpTestingController, DbService], 
    (httpMock: HttpTestingController, service: DbService) => {
      const album: Album = {
        title: "Old Album",
        year: 2000,
        artistId: 1,
        id: 3
      }
      service.updateAlbum(album);
      const req = httpMock.expectOne(
        `${environment.endPoint}/albums/3`
      );
      expect(req.request.method).toEqual("PUT");
    }));

  it('should populate item list', inject(
    [HttpTestingController, DbService], 
    (httpMock: HttpTestingController, service: DbService) => {
      service.getAlbums();
      const req = httpMock.expectOne(
        `${environment.endPoint}/albums`
      );
      
      expect(req.request.method).toEqual("GET");
      req.flush(albumsMock);
    }))
});

