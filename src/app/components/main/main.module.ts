import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { AlbumModule} from '../album/album.module';
import { AlbumListModule } from '../album-list/album-list.module';
import { MatButtonModule } from '@angular/material/button';
import { MessageModule } from '../message/message.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    MatDialogModule,
    MatButtonModule,
    AlbumModule,
    AlbumListModule,
    MessageModule
  ],
  declarations: [MainComponent]
})
export class MainModule {}
