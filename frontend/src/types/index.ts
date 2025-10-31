
export interface Experience {
  _id: string;
  title: string;
  description: string; 
  shortDescription?: string;
  price: {
    amount: number;
  };
  location: {
    city: string;
    state?: string;
    country?: string;
  };
  images: {
    url: string;
    alt?: string;
  }[];
}
