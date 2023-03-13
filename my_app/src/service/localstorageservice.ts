import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setArrayItem(key: string, value: any[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getArrayItem(key: string): any[]  {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  }

}