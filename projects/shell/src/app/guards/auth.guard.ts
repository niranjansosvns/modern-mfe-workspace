import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserStateService, pluck } from 'shared-assets';

interface RoutePermission {
  path: string;
  requiredRole: 'ADMIN' | 'USER' | 'GUEST';
}

const secureRoutes: RoutePermission[] = [
  { path: 'admin/dashboard', requiredRole: 'ADMIN' },
  { path: 'profile', requiredRole: 'USER' }
];

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userState = inject(UserStateService);

  // Pluck out required roles across your registry arrays for validation reference
  const protectedRoles = pluck(secureRoutes, 'requiredRole');
  console.log('[Auth Guard] Monitored permission matrix tokens:', protectedRoles);

  // Secure Guard Validation: If an auth token exists, grant access
  if (userState.authToken()) {
    return true;
  }

  // Redirect to home if unauthenticated
  console.warn('[Auth Guard] Blocked unauthorized entry thread!');
  router.navigate(['/']);
  return false;
};
