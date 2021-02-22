import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Album } from 'src/app/model/album';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let dialog: MatDialogRef<any>;

  class MatDialogRefMock {
    close(): void {}
    open(obj: any, {
      width: string,
      disableClose: boolean,
      data: album
    }): any {

    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports: [
        MatDialogModule,
      ],
      
      providers: [
        {provide: MatDialogRef, useValue: MatDialogRefMock},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject<any>(MatDialogRef)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call editAlbum', () => {
    spyOn(component, 'openDialog');
    const album: Album = {
      id: 1,
      title: 'Another night',
      year: 2020,
      artistId: 1
    }
    component.editAlbum(album);
    expect(component.openDialog).toHaveBeenCalledWith(album);
  });
});
