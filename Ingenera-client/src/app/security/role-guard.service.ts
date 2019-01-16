import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot
} from '@angular/router';
import { AuthServiceService } from './auth-service.service'
import decode from 'jwt-decode';
@Injectable()
export class RoleGuardService implements CanActivate {
    constructor(public auth: AuthServiceService, public router: Router, ) {

    }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (!this.auth.isLoggedIn()) {
            localStorage.clear()
            this.router.navigate(['login']);
            return false;
        }
        // this will be passed from the route config
        // on the data property
        const expectedRole = route.data.expectedRole;
        const token = localStorage.getItem('token');
        // decode the token to get its payload
        const tokenPayload = decode(token);
        if (
            tokenPayload.userType !== expectedRole
        ) {
            localStorage.clear();
            this.router.navigate(['login']);
            return false;
        }
        return true
    }
}