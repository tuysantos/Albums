import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private snackBar: MatSnackBar,) { }

  sortBy(collection: any[], col: string, dir: number): any[] {
    collection = [...collection].sort((a: any, b: any) => {
        let aVal: any;
        let bVal: any;

        aVal = a[col];
        bVal = b[col];

        if (this.isString(aVal)) { aVal = aVal.trim().toUpperCase(); }
        if (this.isString(bVal)) { bVal = bVal.trim().toUpperCase(); }

        if (aVal === bVal) {
            return 0;
        }
        else if (aVal > bVal) {
            return dir * -1;
        }
        else {
            return dir * 1;
        }
    });
    return collection;
  }

  isString(val: any): boolean {
      return (val && (typeof val === 'string' || val instanceof String));
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
