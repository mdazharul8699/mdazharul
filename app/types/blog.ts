export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  imageUrl: string;
  content: string; // এখানে ব্লগের বিস্তারিত থাকবে
}