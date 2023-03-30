import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  get(arg0: string): string {
    throw new Error('Method not implemented.');
  }
  set(arg0: string, userId: any) {
    throw new Error('Method not implemented.');
  }

  setArrayItem(key: string, value: any[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getArrayItem(key: string): any[]  {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  }

}