export enum ItemType {
  BOOK = "book",
  MISC = "misc",
}

export interface ValidEventFilters {
  title: string;
  location: string;
  price: number;
}
