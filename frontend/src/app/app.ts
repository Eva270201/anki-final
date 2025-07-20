import { Component } from '@angular/core';
import { AnkiCards } from './anki-cards/anki-cards';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AnkiCards],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App { }
