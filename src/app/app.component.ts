
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  protected readonly appPages = [
     { title: 'Inicio', url: '/folder/Inbox', icon: 'book' },
     { title: 'Crear quiz', url: '/folder/CrearQuiz', icon: 'school' },
     { title: 'Añadir tarea', url: '/folder/AñadirTarea', icon: 'clipboard' },
     { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
     { title: 'Añadir materia', url: '/folder/AñadirMateria', icon: 'library' },
  ];
  protected readonly labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
}
