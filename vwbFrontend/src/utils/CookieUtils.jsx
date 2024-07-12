import { Cookies } from "react-cookie";

class CookieUtils {
    /**
     * caplsule a cookie utils for requiured data without string
     * 
     */
    constructor() {
        this.maxAge = 60*60;
        this.path = '/';
        this.cookies = new Cookies({path:this.path, maxAge: this.maxAge});
        this.cookies.set('authorized', false, {path:this.path, maxAge: this.maxAge});
    }

    setId(id) {
        this.cookies.set('id', id, {path:this.path, maxAge: this.maxAge});
    }
    setName(name) {
        this.cookies.set('name', name, {path:this.path, maxAge: this.maxAge});
    }
    setToken(token) {
        this.cookies.set('token', token, {path:this.path, maxAge: this.maxAge});
    }
    setPassword(password) {
        this.cookies.set('password', password, {path:this.path, maxAge: this.maxAge});
    }
    setAuthorized(authorized) {
        this.cookies.set('authorized', authorized, {path:this.path, maxAge: this.maxAge});
    }
    getId() {
        return this.cookies.get('id');
    }
    getName() {
        return this.cookies.get('name');
    }
    getPassword() {
        return this.cookies.get('password');
    }
    getToken() {
        return this.cookies.get('token');
    }
    getAuthorized() {
        return this.cookies.get('authorized');
    }
    removeId() {
        return this.cookies.remove('id', {path:this.path});
    }
    removeName() {
        return this.cookies.remove('name', {path:this.path});
    }
    removePassword() {
        return this.cookies.remove('password', {path:this.path});
    }
    removeToken() {
        return this.cookies.remove('token', {path:this.path});
    }
    removeAuthorized() {
        return this.cookies.remove('authorized', {path:this.path});
    }  
};
export const cookieUtils = new CookieUtils();