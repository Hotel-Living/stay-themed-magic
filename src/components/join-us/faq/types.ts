
export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  id: string;
  title: string;
  emoji: string;
  questions: FaqItem[];
}
