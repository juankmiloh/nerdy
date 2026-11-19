import { ChangeDetectorRef, Component, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonModal } from '@ionic/angular';

interface ScheduleEntry {
  day: string;
  start: string;
  end: string;
  subject: string;
}

interface Task {
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.page.html',
  styleUrls: ['./subject-detail.page.scss'],
  imports: [IonContent, CommonModule, IonIcon, FormsModule],
})
export class SubjectDetailPage implements OnInit {
  readonly folder = input.required<string>();

  private cdr = inject(ChangeDetectorRef);

  readonly days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // Nombre del día actual (coincide con `days`) y fecha legible, ej. "Lunes 26 de octubre"
  readonly today = ['Domingo', ...this.days][new Date().getDay()];
  readonly todayLabel = `${this.today} ${new Date().toLocaleDateString('es', { day: 'numeric', month: 'long' })}`;

  mySubjects: string[] = [];
  mySchedule: ScheduleEntry[] = [];
  hideCard = true;
  selectedSubject: string | null = null;
  isScheduleOpen = false;
  grades: Record<string, Record<string, number[]>> = {};
  period: number[] = [1];
  selectedPeriod: string | null = null;
  myTask: Task[] = [];
  isTaskOpen = false;
  editandoIndice: number | null = null;
  nombreEditado = '';
  editandoTarea: string | null = null;
  tareaEditada = '';
  editandoHorario: ScheduleEntry | null = null;
  proximaClase: ScheduleEntry | null = null;

  constructor() {
    const storedSubjects = localStorage.getItem('mySubjects');
    this.mySubjects = storedSubjects ? JSON.parse(storedSubjects) : [];

    const storedSchedule = localStorage.getItem('mySchedule');
    this.mySchedule = storedSchedule ? JSON.parse(storedSchedule) : [];

    const storedGrades = localStorage.getItem('grades');
    this.grades = storedGrades ? JSON.parse(storedGrades) : {};

    const storedPeriod = localStorage.getItem('period');
    this.period = storedPeriod ? JSON.parse(storedPeriod) : [1];

    const storedTask = localStorage.getItem('myTask');
    this.myTask = storedTask ? JSON.parse(storedTask) : [];
  }

  frases = [
    "¡Hola! Bienvenido a Nerdy's.",
    "Qué bueno verte en Nerdy's.",
    '¡Hola! Listos para empezar hoy.',
    "Bienvenido de nuevo a Nerdy's.",
    '¡Hola! Tu equipo te espera.',
    "Qué alegría verte por Nerdy's.",
    '¡Hola! ¿Cómo va tu día?',
    "Nerdy's te da la bienvenida.",
    '¡Hola! A trabajar en equipo.',
    "Qué gusto saludarte en Nerdy's.",
    '¡Hola! Todo listo para ti.',
    "Bienvenido a tu espacio Nerdy's.",
    '¡Hola! Vamos con toda hoy.',
    'Qué bueno tenerte conectado aquí.',
    '¡Hola! Un gran día empieza.',
    "Tu equipo Nerdy's te espera.",
    '¡Hola! Conecta con tu equipo.',
    'Bienvenido, nos alegra verte aquí.',
    '¡Hola! ¿Listo para colaborar hoy?',
    "Qué bien verte en Nerdy's.",
    '¡Hola! Tu oficina está lista.',
    'Bienvenido a un nuevo día.',
    '¡Hola! Hagamos que hoy cuente.',
    'Qué gusto verte de nuevo.',
    "¡Hola! Nerdy's está listo hoy.",
    'Bienvenido, empieza a conectar ahora.',
    '¡Hola! Seguimos avanzando juntos hoy.',
    'Qué alegría verte por aquí.',
    '¡Hola! Todo en orden hoy.',
    "Bienvenido al mundo de Nerdy's.",
    '¡Hola! Listos para crear juntos.',
    'Qué bueno saludarte de nuevo.',
    '¡Hola! Únete a la conversación.',
    'Bienvenido, tu equipo está listo.',
    '¡Hola! Comencemos con buena energía.',
    "Qué gusto tenerte en Nerdy's.",
    '¡Hola! A darle con todo.',
    'Bienvenido, todo listo para empezar.',
    '¡Hola! ¿Qué crearemos hoy?',
    'Qué bien tenerte de vuelta.',
    '¡Hola! Tu jornada comienza ahora.',
    "Bienvenido a tu comunidad Nerdy's.",
    '¡Hola! Siempre es bueno verte.',
    'Qué alegría saludarte hoy aquí.',
    '¡Hola! Conecta y avanza hoy.',
    "Bienvenido a Nerdy's, empecemos ya.",
    '¡Hola! Tu día empieza aquí.',
    'Qué gusto verte conectado hoy.',
    '¡Hola! Vamos a hacer equipo.',
    "Bienvenido, Nerdy's te estaba esperando.",
  ];

  addSubject(subject: string) {
    const nombre = subject.trim();

    if (!nombre) {
      return;
    }

    if (this.mySubjects.includes(nombre)) {
      return;
    }

    this.mySubjects.push(nombre);
    localStorage.setItem('mySubjects', JSON.stringify(this.mySubjects));
    this.selectedSubject = '';
  }
  guardarMaterias() {
    localStorage.setItem('mySubjects', JSON.stringify(this.mySubjects));
  }

  openSubject(subject: string) {
    this.selectedSubject = subject;
    this.selectedPeriod = null;
  }

  getAverage(subject: string, period: string) {
    const notas = this.grades[subject]?.[period] ?? [];
    if (notas.length === 0) {
      return 0;
    }
    let suma = 0;
    for (const nota of notas) {
      suma = suma + Number(nota);
    }
    return suma / notas.length;
  }

  addScheduleEntry(day: string, start: string, end: string, subject: string) {
    if (!day || !start || !end || !subject || start >= end) {
      console.log('datos de horario inválidos');
      return;
    }
    this.mySchedule = [...this.mySchedule, { day, start, end, subject }].sort((a, b) => a.start.localeCompare(b.start));
    localStorage.setItem('mySchedule', JSON.stringify(this.mySchedule));
  }

  removeScheduleEntry(entry: ScheduleEntry) {
    this.mySchedule = this.mySchedule.filter((e) => e !== entry);
    localStorage.setItem('mySchedule', JSON.stringify(this.mySchedule));
  }

  removeSubject(subject: string) {
    this.mySubjects = this.mySubjects.filter((s) => s !== subject);
    localStorage.setItem('mySubjects', JSON.stringify(this.mySubjects));
    this.mySchedule = this.mySchedule.filter((e) => e.subject !== subject);
    localStorage.setItem('mySchedule', JSON.stringify(this.mySchedule));
  }
  formatTime(time: string) {
    return time.replace(/^0/, '');
  }

  entriesForDay(day: string) {
    return this.mySchedule.filter((e) => e.day === day);
  }

  addGrade(value: string) {
    if (!this.selectedSubject || !this.selectedPeriod || !value) {
      return;
    }
    const nota = Number(value);

    if (!this.grades[this.selectedSubject]) {
      this.grades[this.selectedSubject] = {};
    }
    if (!this.grades[this.selectedSubject][this.selectedPeriod]) {
      this.grades[this.selectedSubject][this.selectedPeriod] = [];
    }
    this.grades[this.selectedSubject][this.selectedPeriod].push(nota);
    localStorage.setItem('grades', JSON.stringify(this.grades));
  }
  removeGrade(index: number) {
    if (!this.selectedSubject || !this.selectedPeriod) {
      return;
    }

    const grades = this.grades[this.selectedSubject]?.[this.selectedPeriod];
    if (!grades) {
      return;
    }
    grades.splice(index, 1);
    localStorage.setItem('grades', JSON.stringify(this.grades));
  }

  addPeriod() {
    const nuevo = this.period.length + 1;
    this.period.push(nuevo);
    localStorage.setItem('period', JSON.stringify(this.period));
  }

  removePeriod(period: number) {
    this.period = this.period.filter((p) => p !== period);
    localStorage.setItem('period', JSON.stringify(this.period));
  }

  removeLastPeriod() {
    this.period.pop();
    localStorage.setItem('period', JSON.stringify(this.period));
  }

  addTask(task: string) {
    if (!task) {
      console.log('Tarea inválida');
      return;
    }

    if (this.myTask.some((t) => t.text === task)) {
      console.log('Tarea ya existe');
      return;
    }

    this.myTask = [...this.myTask, { text: task, done: false }];
    localStorage.setItem('myTask', JSON.stringify(this.myTask));
  }
  removeTask(task: Task) {
    this.myTask = this.myTask.filter((t) => t.text !== task.text);
    localStorage.setItem('myTask', JSON.stringify(this.myTask));
  }
  toggleTask(task: Task) {
    task.done = !task.done;
    localStorage.setItem('myTask', JSON.stringify(this.myTask));
    if (task.done) {
      setTimeout(() => {
        if (task.done) {
          this.removeTask(task);
          this.cdr.markForCheck();
        }
      }, 3000);
    }
  }
  empezarEditar(indice: number) {
    this.editandoIndice = indice;
    this.nombreEditado = this.mySubjects[indice];
  }
  guardarEdicion(indice: number) {
    const anterior = this.mySubjects[indice];
    const nuevo = this.nombreEditado.trim();
    if (!nuevo || nuevo === anterior) {
      this.editandoIndice = null;
      return;
    }

    if (this.mySubjects.includes(nuevo)) {
      console.log('materia ya existe');
      return;
    }

    this.mySubjects = this.mySubjects.map((s, i) => (i === indice ? nuevo : s));
    this.guardarMaterias();

    // El horario y las notas guardan el nombre de la materia, así que también hay que actualizarlos
    this.mySchedule = this.mySchedule.map((e) => (e.subject === anterior ? { ...e, subject: nuevo } : e));
    localStorage.setItem('mySchedule', JSON.stringify(this.mySchedule));

    if (this.grades[anterior]) {
      this.grades[nuevo] = this.grades[anterior];
      delete this.grades[anterior];
      localStorage.setItem('grades', JSON.stringify(this.grades));
    }

    if (this.selectedSubject === anterior) {
      this.selectedSubject = nuevo;
    }
    this.editandoIndice = null;
  }
  empezarEditarTarea(task: Task) {
    this.editandoTarea = task.text;
    this.tareaEditada = task.text;
  }
  guardarEdicionTarea(task: Task) {
    const nuevo = this.tareaEditada.trim();
    if (!nuevo || nuevo === task.text) {
      this.editandoTarea = null;
      return;
    }

    if (this.myTask.some((t) => t.text === nuevo)) {
      console.log('Tarea ya existe');
      return;
    }

    // Se modifica el mismo objeto para que el borrado pendiente de toggleTask siga encontrando la tarea
    task.text = nuevo;
    localStorage.setItem('myTask', JSON.stringify(this.myTask));
    this.editandoTarea = null;
  }
  guardarEdicionHorario(entry: ScheduleEntry, day: string, start: string, end: string, subject: string) {
    if (!day || !start || !end || !subject || start >= end) {
      console.log('datos de horario inválidos');
      return;
    }
    this.mySchedule = this.mySchedule
      .map((e) => (e === entry ? { day, start, end, subject } : e))
      .sort((a, b) => a.start.localeCompare(b.start));
    localStorage.setItem('mySchedule', JSON.stringify(this.mySchedule));
    this.editandoHorario = null;
  }
  fraseActual = '';

  ngOnInit() {
    const poscicion = Math.floor(Math.random() * this.frases.length);
    this.fraseActual = this.frases[poscicion];
  }
}
