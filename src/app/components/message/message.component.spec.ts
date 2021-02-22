import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db.service';

import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let dbService: DbService;

  const promise = {
    then: () => {}
  }
  class DbServiceMock {
    deleteAlbum(id: number): any {
      return promise;
    }
  }

  class MatDialogRefMock {
    close(): void {}
  };

  const data = {
    title: "Thriller",
    year: 1982,
    artistId: 3,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: DbService, useClass : DbServiceMock},
        {provide: MatDialogRef, useClass: MatDialogRefMock},
        {provide: MAT_DIALOG_DATA, useValue: data}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud call delete', () => {
    dbService = TestBed.inject(DbService);
    spyOn(dbService, 'deleteAlbum').and.callFake((id: number): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        resolve(true)
      })
    })

    component.deleteData();
    expect(dbService.deleteAlbum).toHaveBeenCalled();
  })
});
