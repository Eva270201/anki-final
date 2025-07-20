import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnkiCard } from '../models/anki-card.model';

@Injectable({
  providedIn: 'root'
})
export class AnkiCardService {
  private apiUrl = '/api/cards';

  constructor(private http: HttpClient) {}

  getCards(): Observable<AnkiCard[]> {
    return this.http.get<AnkiCard[]>(this.apiUrl);
  }

  addCard(card: Partial<AnkiCard>): Observable<AnkiCard> {
    return this.http.post<AnkiCard>(this.apiUrl, card);
  }

  deleteCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
