import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentumUploadComponent } from './documentum-upload/documentum-upload.component';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DocumentumUploadComponent,
    ViewDocumentsComponent,
    ToolbarComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
