import { HttpInterceptorFn , HttpHandlerFn, HttpRequest} from '@angular/common/http';
import { inject } from '@angular/core';
import { UserStateService } from 'shared-assets';
import { finalize, tap } from 'rxjs';

export const jwtLoggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const userState = inject(UserStateService);
  userState.setLoading(true); // Set loading state to true when request starts
  const authToken = userState.authToken();
  let modifiedReq = req;
  if (authToken) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    console.log(`JWT Logging Interceptor: Added Authorization header with token: ${authToken}`);
  }
  return next(modifiedReq).pipe(
    tap({
      next: (event) => {
        console.log('JWT Logging Interceptor: Request successful', event);
      },
      error: (error) => {
        console.error('JWT Logging Interceptor: Request failed', error);
      }
    }),
    finalize(() => {
      userState.setLoading(false); // Reset loading state when request completes
      console.log('JWT Logging Interceptor: Request completed');
    })
  );  
};
