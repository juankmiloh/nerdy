import { Component, input } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonButton, IonIcon],
})
export class FolderPage {
  readonly folder = input.required<string>();

  mySubjects: string[] = [];

  constructor() {
    const storedSubjects = localStorage.getItem('mySubjects');
    this.mySubjects = storedSubjects ? JSON.parse(storedSubjects) : [];
  }

  addSubject(subject: string) {
    // if (subject && !this.mySubjects.includes(subject)) {
    if (subject) {
      console.log('materia agregada');
      this.mySubjects.push(subject);
      localStorage.setItem('mySubjects', JSON.stringify(this.mySubjects));
    } else {
      console.log('materia ya existe');
    }
  }
}
