import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { MessageRoutingModule } from './message-routing.module';
import {MatCardModule} from '@angular/material/card';
import { MessageComponent } from './message.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MessageRoutingModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [MessageComponent],
})
export class MessageModule {}
