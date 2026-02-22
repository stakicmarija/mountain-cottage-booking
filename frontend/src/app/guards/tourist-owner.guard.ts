import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const touristOwnerGuard: CanActivateFn = (route, state) => {
  const authService:AuthService = inject(AuthService)

  if(authService.touristOrOwner()) return true

  return false
};
