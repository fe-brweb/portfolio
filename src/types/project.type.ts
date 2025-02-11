export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Period {
  start: string;
  end: string;
}
export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Status {
  id: string;
  name: string;
  color: string;
}

export interface Project {
  id: string;
  category: Category;
  title: string;
  url: string;
  status: Status;
  description?: string;
  contents?: string;
  coverUrl?: string;
  thumbUrl?: string;
  images: string[];
  tags?: Tag[];
  period?: Period;
  repository?: string;
  website?: string;
}
