import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

// Define HTTP headers
const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GenericService<Entity> {
  urlNew: string = environment.apiUrl; // Base URL

  constructor(private http: HttpClient) {}

  // Method to get entity by ID
  getById(entity: string, id: number): Observable<Entity> {
    const url = `${this.urlNew}${entity}/${id}`;
    return this.http.get<Entity>(url);
  }

  // Method to get all entities
  getAll(endpoint: string): Observable<Entity[]> {
    const url = `${this.urlNew}${endpoint}`;
    return this.http.get<Entity[]>(url);
  }

  // Method to create a new entity
  create(entity: Entity, endpoint: string): Observable<Entity> {
    return this.http.post<Entity>(`${this.urlNew}${endpoint}`, entity, httpOptions);
  }

  // Method to delete an entity by ID
  delete(endpoint: string, id: number): Observable<any> {
    const url = `${this.urlNew}${endpoint}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  // Method to update an entity
  update(entity: Entity, endpoint: string, entityId: number): Observable<Entity> {
    const url = `${this.urlNew}${endpoint}/${entityId}`;
    return this.http.put<Entity>(url, entity, httpOptions);
  }
}
