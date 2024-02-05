import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobAreaModule } from './Modules/JobArea/job-area.module';
import { HttpClientModule } from '@angular/common/http';
import { PadFirmasModule } from 'ngx-ba-padfirmas';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JobAreaModule,
    HttpClientModule,
    PadFirmasModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
