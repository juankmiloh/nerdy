import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjectDetailPage } from './subject-detail.page';

declare const describe: (description: string, specDefinitions: () => void) => void;
declare const beforeEach: (action: () => void) => void;
declare const it: (description: string, test: () => void) => void;
declare const expect: (actual: unknown) => { toBeTruthy(): void };

describe('SubjectDetailPage', () => {
  let component: SubjectDetailPage;
  let fixture: ComponentFixture<SubjectDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
