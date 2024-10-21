export enum ItemType {
  BOOK = "book",
  MISC = "misc",
}

export interface ValidEventFilters {
  title: string;
  location: string;
  price: number;
}

export interface ValidPurchaseFilters {
  tax: string;
  isEvent: boolean;
  confirmationId: string;
  isMemberPurchase: boolean;
  isConfirmed: boolean;
}

export interface ValidQuestionFilters {
  isApproved: string;
  approvedBy: string;
}
