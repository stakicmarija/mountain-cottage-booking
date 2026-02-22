import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const touristGuard: CanActivateFn = (route, state) => {
  const authService:AuthService = inject(AuthService)

  if(authService.isTourist()) return true

  return false
};
