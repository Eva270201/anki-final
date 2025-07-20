import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnkiCardService } from '../services/anki-card.service';
import { AnkiCard } from '../models/anki-card.model';

@Component({
  selector: 'app-anki-cards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './anki-cards.html',
  styleUrl: './anki-cards.scss'
})
export class AnkiCards implements OnInit {
  cards: AnkiCard[] = [];
  newQuestion = '';
  newAnswer = '';

  // ▶️ Mode Quiz
  quizMode = true;
  currentIndex = 0;
  showAnswer = false;

  // ▶️ Score
  score = 0;
  totalAnswered = 0;

  constructor(private cardService: AnkiCardService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards() {
    this.cardService.getCards().subscribe(data => {
      this.cards = data;
      this.currentIndex = 0;
      this.showAnswer = false;
      this.score = 0;
      this.totalAnswered = 0;
    });
  }

  addCard() {
    const card = { question: this.newQuestion, answer: this.newAnswer };
    this.cardService.addCard(card).subscribe(newCard => {
      this.cards.push(newCard);
      this.newQuestion = '';
      this.newAnswer = '';
    });
  }

  deleteCard(id: number) {
    this.cardService.deleteCard(id).subscribe(() => {
      this.cards = this.cards.filter(card => card.id !== id);
      if (this.quizMode && this.cards.length > 0) {
        this.currentIndex = this.currentIndex % this.cards.length;
      }
    });
  }

  // ▶️ Obtenir la carte actuelle
  get currentCard(): AnkiCard | null {
    return this.cards[this.currentIndex] || null;
  }

  // ▶️ Révéler la réponse
  revealAnswer() {
    this.showAnswer = true;
  }

  // ▶️ Enregistrer la réponse (bonne ou mauvaise)
  answer(correct: boolean) {
    if (correct) {
      this.score++;
    }
    this.totalAnswered++;
    this.nextCard();
  }

  // ▶️ Passer à la carte suivante
  nextCard() {
    this.currentIndex++;
    if (this.currentIndex >= this.cards.length) {
      this.currentIndex = 0;
    }
    this.showAnswer = false;
  }
}
