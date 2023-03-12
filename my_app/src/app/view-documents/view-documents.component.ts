import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css'],
})
export class ViewDocumentsComponent {

  @Input() myImage: any;

}
