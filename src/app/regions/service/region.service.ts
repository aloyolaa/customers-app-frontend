import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from 'src/app/core/model/region.model';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private url = 'http://localhost:8080/api/v1/regions';

  constructor(private http: HttpClient) {}

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.url}/`);
  }
}
