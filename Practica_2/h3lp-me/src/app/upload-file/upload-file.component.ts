import { Component, OnInit } from '@angular/core';

import { FirestoreService } from '../services/firestore/firestore.service'


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  selectedFile = null;

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  uploadFile(){
    if (this.selectedFile != null) {
      console.log(this.selectedFile);
      let storageRef = this.firestoreService.getStorage().ref("test.jpg");

      storageRef.put(this.selectedFile).then(function(snapshot) {
        console.log('Uploaded file!');
      });
    }

  }

}
