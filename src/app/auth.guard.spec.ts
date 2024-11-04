import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Import du RouterTestingModule
      providers: [AuthGuard] // Fournir AuthGuard
    });
    guard = TestBed.inject(AuthGuard); // Injection de l'instance AuthGuard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
