export interface Developer {
  id: number;
  name: string;
  photoUrl: string;
  photoScale?: number;
  photoTranslateY?: string;
  apologizesMessage: string;
}

export interface WhackableDeveloper extends Developer {
  isWhacked: boolean;
  isReturning: boolean;
}
