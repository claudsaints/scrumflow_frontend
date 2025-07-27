import { HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';



export const authInterceptor: HttpInterceptorFn = (request, next: HttpHandlerFn) => {
    const token = sessionStorage.getItem('token'); 


    if (token) {
      const authReq = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${token}`)
      });
      return next(authReq);
    } else {
      return next(request);
    }
}