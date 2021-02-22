import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule]
    });
    service = TestBed.inject(UtilService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return is string true', () => {
    const result = service.isString('my string');
    expect(result).toBe(true);
  });

  it('should return is string false', () => {
    const result = service.isString(33);
    expect(result).toBe(false);
  });

  it('should sort an array by column', () => {
    const unserted = [
      {title: 'z', year: 2000},
      {title: 'a', year: 1900},
      {title: 'p', year: 800},
    ];

    const sortedArray = [
      {title: 'a', year: 1900},
      {title: 'p', year: 800},
      {title: 'z', year: 2000},
    ]
    const result = service.sortBy(unserted, 'title', -1);
    expect(result[0].title).toEqual(sortedArray[0].title);
  });

  it('should call openSnackBar.open()', () => {
    spyOn(snackBar, 'open');
    service.openSnackBar('My message', 'Success');
    expect(snackBar.open).toHaveBeenCalledWith('My message', 'Success', { duration: 2000 });
  })
});
