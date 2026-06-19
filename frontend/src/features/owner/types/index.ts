export interface StoreData {
  id: number;
  name: string;
  email: string;
  address: string;
  overallRating: number;
  totalRatings: number;
  ratings: Array<{
    id: number;
    rating: number;
    user: { id: number; name: string; email: string };
    createdAt: string;
  }>;
}
