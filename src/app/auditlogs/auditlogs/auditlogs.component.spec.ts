import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditlogsComponent } from './auditlogs.component';

describe('AuditlogsComponent', () => {
  let component: AuditlogsComponent;
  let fixture: ComponentFixture<AuditlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditlogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
