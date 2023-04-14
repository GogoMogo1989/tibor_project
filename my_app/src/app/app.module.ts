import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentumUploadComponent } from './documentum-upload/documentum-upload.component';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { WebcamModule} from 'ngx-webcam';

import { MyErrorStateMatcher, SignupComponent } from './signup/signup.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginComponent } from './login/login.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AdminMainComponent } from './adminPages/admin-main/admin-main.component';
import { AdminDocumentViewComponent } from './adminPages/admin-document-view/admin-document-view.component';
import { AdminLoginViewComponent } from './adminPages/admin-login-view/admin-login-view.component';
import { AdminToolbarComponent } from './adminPages/admin-toolbar/admin-toolbar.component';
import { DocumentumUploadChoiceComponent } from './documentum-upload-choice/documentum-upload-choice.component';
import { DocumentumUploadCameraComponent } from './documentum-upload-camera/documentum-upload-camera.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentumUploadComponent,
    ViewDocumentsComponent,
    ToolbarComponent,
    LoginComponent,
    SignupComponent,
    DeleteUserComponent,
    AdminMainComponent,
    AdminDocumentViewComponent,
    AdminLoginViewComponent,
    AdminToolbarComponent,
    DocumentumUploadChoiceComponent,
    DocumentumUploadCameraComponent,
  ],
  imports: [
    MatSelectModule,
    MatCheckboxModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    WebcamModule
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: MyErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }