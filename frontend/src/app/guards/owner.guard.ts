import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const ownerGuard: CanActivateFn = (route, state) => {
  const authService:AuthService = inject(AuthService)

  if(authService.isOwner()) return true

  return false
};
