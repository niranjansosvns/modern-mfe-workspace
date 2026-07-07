import { HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserStateService } from 'shared-assets';
import { finalize } from 'rxjs/operators';

export const jwtLoggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>, 
  next: HttpHandlerFn
) => {
  const userState = inject(UserStateService);

  // 1. Turn on the global loading spinner state
  userState.setLoading(true);

  // 2. Fetch the active token string safely from memory
  const token = userState.authToken();

  // 3. Clone the request and inject Authorization Headers dynamically
  let modifiedReq = req;
  if (token) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(`[Interceptor] Injected JWT Token into outgoing call: ${req.url}`);
  }

  // 4. Pass the modified request down the pipeline and turn off loading when finished
  return next(modifiedReq).pipe(
    finalize(() => {
      userState.setLoading(false);
      console.log(`[Interceptor] Network operation finalized for: ${req.url}`);
    })
  );
};
