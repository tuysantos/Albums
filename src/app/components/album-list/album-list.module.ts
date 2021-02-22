import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

import { AlbumListComponent } from './album-list.component';
import { AlbumListRoutingModule } from './album-list-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    AlbumListRoutingModule
  ],
  declarations: [AlbumListComponent],
  exports: [AlbumListComponent]
})
export class AlbumListModule {}
