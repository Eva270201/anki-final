import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnkiCards } from './anki-cards';

describe('AnkiCards', () => {
  let component: AnkiCards;
  let fixture: ComponentFixture<AnkiCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnkiCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnkiCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
