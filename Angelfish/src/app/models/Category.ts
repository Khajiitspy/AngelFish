export interface Category {
  id: number;
  name: string;
  image?: string;
  slug: string;
}

export interface ICategoryCreate {
  name: string;
  slug: string;
  imageFile?: File | null;
}

export interface ICategoryEdit {
  id: number;
  name: string;
  slug: string;
  imageFile?: File | null;
}

export interface ICategoryDelete {
  id: number
}
