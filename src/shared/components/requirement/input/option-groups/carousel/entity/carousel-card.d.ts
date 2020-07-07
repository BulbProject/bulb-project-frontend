export interface CarouselCard {
  id: string;
  title: string;
  url: string;
  onCardSelect(id: string): void;
}
