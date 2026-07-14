import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { SessionService } from './core/session.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppComponent], providers: [provideRouter([])] }).compileComponents();
  });

  it('creates the application shell', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    expect((fixture.nativeElement as HTMLElement).querySelector('.brand')?.textContent).toContain('Approved');
  });

  it('changes the simulated network user', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const session = TestBed.inject(SessionService);
    fixture.componentInstance.changeUser({ target: { value: 'ana.dev@bancobogota.com' } } as unknown as Event);
    expect(fixture.componentInstance.username()).toBe('ana.dev@bancobogota.com');
    expect(fixture.componentInstance.password()).toBe('ana.dev');
    expect(session.user()).toBe('');
  });
});
