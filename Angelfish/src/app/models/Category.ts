export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface ICategoryCreate {
  name: string;
  slug: string;
  imageFile?: File | null;
}

export interface ICategoryDelete {
  id: number
}
