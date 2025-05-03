import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import Link from "next/link";
import BookCard from "@/components/book-card"; // Assume this component exists for displaying book info
import NewsletterForm from "@/components/newsletter-form"; // Import the new client component

// Sample data - replace with actual data fetching
const featuredBooks = [
  { id: '1', title: "The Midnight Library", author: "Matt Haig", coverUrl: "https://picsum.photos/200/300?random=1", price: 14.99, format: 'eBook', dataAiHint: 'book cover fantasy' },
  { id: '2', title: "Project Hail Mary", author: "Andy Weir", coverUrl: "https://picsum.photos/200/300?random=2", price: 16.99, format: 'Paperback', dataAiHint: 'book cover science fiction' },
  { id: '3', title: "Klara and the Sun", author: "Kazuo Ishiguro", coverUrl: "https://picsum.photos/200/300?random=3", price: 15.50, format: 'eBook', dataAiHint: 'book cover literary fiction' },
  { id: '4', title: "The Vanishing Half", author: "Brit Bennett", coverUrl: "https://picsum.photos/200/300?random=4", price: 13.99, format: 'Paperback', dataAiHint: 'book cover historical fiction' },
  { id: '5', title: "Atomic Habits", author: "James Clear", coverUrl: "https://picsum.photos/200/300?random=5", price: 12.00, format: 'eBook', dataAiHint: 'book cover self help' },
   { id: '6', title: "Dune", author: "Frank Herbert", coverUrl: "https://picsum.photos/200/300?random=6", price: 18.00, format: 'Paperback', dataAiHint: 'book cover science fiction classic' },
];

const trendingGenres = [
  { name: "Fantasy", slug: "fantasy", image: "https://picsum.photos/300/200?random=11", dataAiHint: 'fantasy landscape' },
  { name: "Science Fiction", slug: "sci-fi", image: "https://picsum.photos/300/200?random=12", dataAiHint: 'spaceship stars' },
  { name: "Mystery", slug: "mystery", image: "https://picsum.photos/300/200?random=13", dataAiHint: 'detective magnifying glass' },
  { name: "Thriller", slug: "thriller", image: "https://picsum.photos/300/200?random=14", dataAiHint: 'dark alley suspense' },
  { name: "Romance", slug: "romance", image: "https://picsum.photos/300/200?random=15", dataAiHint: 'couple sunset' },
  { name: "Non-Fiction", slug: "non-fiction", image: "https://picsum.photos/300/200?random=16", dataAiHint: 'library books study' },
];


export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Banner */}
      <section className="relative text-center py-20 md:py-32 rounded-lg overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-950 dark:to-black text-white">
         <Image
            src="https://picsum.photos/1200/400?random=0"
            alt="Abstract background representing books and knowledge"
            layout="fill"
            objectFit="cover"
            quality={80}
            className="opacity-20"
            priority // Load hero image first
            data-ai-hint="library abstract pattern"
          />
        <div className="relative container mx-auto px-4 z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">Discover Your Next Great Read</h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300 animate-fade-in-up animation-delay-200">Explore thousands of physical and digital books at LitLink.</p>
          <Link href="/shop" passHref>
             <Button size="lg" className="animate-fade-in-up animation-delay-400">
                Shop Top eBooks
             </Button>
          </Link>
        </div>
      </section>

      {/* Featured Books Carousel - Horizontal Scroll */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Featured Books</h2>
        <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary">
          {/* Add invisible elements at start/end for better spacing */}
          <div className="flex-shrink-0 w-1"></div>
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} className="w-48 md:w-56 flex-shrink-0 card-hover" />
          ))}
           <div className="flex-shrink-0 w-1"></div>
        </div>
      </section>

      {/* Trending Genres Grid */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Trending Genres</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {trendingGenres.map((genre) => (
            <Link key={genre.slug} href={`/shop?genre=${genre.slug}`} passHref>
              <Card className="overflow-hidden card-hover cursor-pointer group">
                 <div className="relative h-32 sm:h-40">
                    <Image
                        src={genre.image}
                        alt={`Genre: ${genre.name}`}
                        layout="fill"
                        objectFit="cover"
                        quality={75}
                        className="transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        data-ai-hint={genre.dataAiHint}
                    />
                 </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg text-center">{genre.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Sign-Up */}
       <section className="bg-secondary dark:bg-gray-800 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4 text-secondary-foreground dark:text-gray-200">Stay Updated</h2>
          <p className="text-muted-foreground dark:text-gray-400 mb-6">Subscribe to our newsletter for the latest book releases and offers.</p>
          <NewsletterForm />
       </section>
    </div>
  );
}

// Add basic animation styles (can be moved to globals.css)
const styles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0; /* Start hidden */
  }
  .animation-delay-200 { animation-delay: 0.2s; }
  .animation-delay-400 { animation-delay: 0.4s; }

  /* Basic scrollbar styling */
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: hsl(var(--primary)) hsl(var(--secondary));
  }
  .scrollbar-thin::-webkit-scrollbar {
    height: 8px; /* Height for horizontal scrollbar */
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: hsl(var(--secondary));
    border-radius: 10px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: hsl(var(--primary));
    border-radius: 10px;
    border: 2px solid hsl(var(--secondary));
  }
`;

// Inject styles - consider moving to globals.css or using Tailwind plugins
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
