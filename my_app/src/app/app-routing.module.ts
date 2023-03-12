import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentumUploadComponent } from './documentum-upload/documentum-upload.component';
import { ViewDocumentsComponent } from './view-documents/view-documents.component';

const routes: Routes = [
  {path: 'documentum-upload', component: DocumentumUploadComponent},
  {path:'view-documents', component: ViewDocumentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
