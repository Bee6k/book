import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ThumbsUp, ThumbsDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import BookCard from '@/components/book-card'; // Reuse book card for related items
import { cn } from '@/lib/utils';

// Sample data - replace with actual data fetching based on ID
const sampleBook = {
  id: '1',
  title: "The Midnight Library",
  author: "Matt Haig",
  coverUrl: "https://picsum.photos/400/600?random=1",
  price: 14.99,
  formats: ['eBook', 'Paperback', 'Hardcover'],
  selectedFormat: 'eBook',
  rating: 4.2,
  reviewsCount: 1258,
  description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets? A novel about all the choices that go into a life well lived.",
  sampleAvailable: true,
  dataAiHint: 'book cover fantasy',
};

const sampleReviews = [
    { id: 'r1', user: 'Alice', rating: 5, text: 'Absolutely loved this book! A unique concept and beautifully written.', helpfulness: 15 },
    { id: 'r2', user: 'Bob', rating: 4, text: 'Thought-provoking read. Made me reflect on my own life choices.', helpfulness: 8 },
    { id: 'r3', user: 'Charlie', rating: 3, text: 'Interesting idea, but the pacing felt a bit slow for me.', helpfulness: 2 },
];

const relatedBooks = [
   { id: '7', title: "The Silent Patient", author: "Alex Michaelides", coverUrl: "https://picsum.photos/200/300?random=7", price: 11.50, format: 'eBook', rating: 4, dataAiHint: 'book cover psychological thriller' },
   { id: '8', title: "Where the Crawdads Sing", author: "Delia Owens", coverUrl: "https://picsum.photos/200/300?random=8", price: 10.99, format: 'Paperback', rating: 5, dataAiHint: 'book cover mystery nature' },
   { id: '9', title: "Educated", author: "Tara Westover", coverUrl: "https://picsum.photos/200/300?random=9", price: 14.00, format: 'Paperback', rating: 5, dataAiHint: 'book cover memoir education' },
   { id: '10', title: "Circe", author: "Madeline Miller", coverUrl: "https://picsum.photos/200/300?random=10", price: 13.50, format: 'eBook', rating: 4, dataAiHint: 'book cover mythology fantasy' },
   { id: '5', title: "Atomic Habits", author: "James Clear", coverUrl: "https://picsum.photos/200/300?random=5", price: 12.00, format: 'eBook', rating: 5, dataAiHint: 'book cover self help' },
];


interface BookDetailPageProps {
  params: { id: string };
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  // Fetch book data based on params.id - using sample data for now
  const book = sampleBook; // In real app: await fetchBookById(params.id);

  if (!book) {
    // Handle book not found case
    return <div>Book not found</div>;
  }

   const renderStars = (rating: number, large = false) => {
      const starSize = large ? "h-6 w-6" : "h-4 w-4";
      return (
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                starSize,
                rating >= star ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
              )}
            />
          ))}
        </div>
      );
    };

  return (
    <div className="space-y-12">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Book Cover */}
        <div className="relative aspect-[2/3] w-full max-w-md mx-auto md:mx-0 rounded-lg overflow-hidden shadow-lg group cursor-pointer">
            {/* Add zoom functionality later */}
           <Image
             src={book.coverUrl}
             alt={`Cover of ${book.title}`}
             layout="fill"
             objectFit="cover"
             quality={85}
             priority // Prioritize loading the main book cover
             className="transition-transform duration-300 group-hover:scale-105"
             data-ai-hint={book.dataAiHint}
           />
        </div>

        {/* Book Details & Actions */}
        <div className="flex flex-col space-y-4">
           <h1 className="text-3xl md:text-4xl font-bold">{book.title}</h1>
           <p className="text-lg text-muted-foreground">
               by <Link href={`/author/${book.author.toLowerCase().replace(' ', '-')}`} className="text-primary hover:underline">{book.author}</Link>
            </p>

           {/* Rating */}
           <div className="flex items-center gap-2">
             {renderStars(book.rating, true)}
             <span className="text-muted-foreground">({book.rating.toFixed(1)})</span>
             <Link href="#reviews" className="text-sm text-primary hover:underline ml-2">{book.reviewsCount} reviews</Link>
           </div>

            <Separator />

           {/* Format Selection */}
           <div>
             <Label className="text-lg font-medium mb-2 block">Select Format</Label>
              <RadioGroup defaultValue={book.selectedFormat} className="flex flex-wrap gap-3">
                 {book.formats.map(format => (
                     <Label
                        key={format}
                        htmlFor={`format-${format}`}
                        className={cn(
                            "flex items-center space-x-2 border rounded-md py-2 px-4 cursor-pointer hover:border-primary transition-colors",
                             // Add style for selected state if needed via state management
                             // book.selectedFormat === format ? "border-primary bg-primary/10" : "border-border"
                         )}
                      >
                         <RadioGroupItem value={format} id={`format-${format}`} />
                         <span>{format}</span>
                     </Label>
                 ))}
              </RadioGroup>
           </div>

           {/* Pricing */}
            <p className="text-3xl font-bold text-primary">${book.price.toFixed(2)}</p>

           {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button size="lg" className="flex-grow">
                    Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-grow">
                    Buy Now
                </Button>
            </div>

           {book.sampleAvailable && (
              <Button variant="link" className="justify-start px-0">Read a Sample</Button>
           )}

           <Separator className="mt-4"/>

           {/* Description */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                {/* Add collapsible logic if description is long */}
                <p className="text-muted-foreground leading-relaxed">{book.description}</p>
            </div>

        </div>
      </section>

      <Separator />

       {/* Reviews Section */}
       <section id="reviews">
          <h2 className="text-2xl font-semibold mb-6">Ratings & Reviews</h2>
          <div className="space-y-6">
             {sampleReviews.map(review => (
               <Card key={review.id}>
                  <CardContent className="p-4 md:p-6">
                     <div className="flex items-center justify-between mb-2">
                         <div className="flex items-center gap-2">
                           <span className="font-semibold">{review.user}</span>
                            {renderStars(review.rating)}
                         </div>
                         <span className="text-xs text-muted-foreground">2 days ago</span> {/* Placeholder */}
                     </div>
                     <p className="text-muted-foreground mb-3">{review.text}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Helpful?</span>
                          <Button variant="ghost" size="sm" className="p-1 h-auto">
                              <ThumbsUp className="h-4 w-4 mr-1"/> ({review.helpfulness})
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1 h-auto">
                               <ThumbsDown className="h-4 w-4 mr-1"/> (0) {/* Placeholder */}
                           </Button>
                           <Button variant="ghost" size="sm" className="p-1 h-auto ml-auto">
                                Report
                            </Button>
                      </div>
                  </CardContent>
               </Card>
             ))}
              {/* Add Review Form Placeholder */}
              <Card>
                  <CardContent className="p-4 md:p-6">
                     <h3 className="text-lg font-semibold mb-3">Write a Review</h3>
                      <textarea placeholder="Share your thoughts..." className="w-full p-2 border rounded-md min-h-[100px] bg-background mb-3"></textarea>
                     <div className="flex justify-between items-center">
                         {/* Rating input */}
                          <div className="flex items-center gap-1">
                            <span className="text-sm mr-2">Your Rating:</span>
                             {[1,2,3,4,5].map(r => <Star key={r} className="h-5 w-5 text-muted-foreground hover:text-yellow-400 cursor-pointer"/>)}
                          </div>
                         <Button>Submit Review</Button>
                     </div>
                  </CardContent>
              </Card>
          </div>
       </section>

      <Separator />

       {/* You Might Also Like Section */}
       <section>
          <h2 className="text-2xl font-semibold mb-6">You Might Also Like</h2>
          {/* Basic Horizontal Scroll - Consider a Carousel component for better UX */}
          <div className="relative group">
             <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary">
                {/* Add invisible elements for spacing */}
                <div className="flex-shrink-0 w-1"></div>
                {relatedBooks.map((relatedBook) => (
                  <BookCard key={relatedBook.id} book={relatedBook} className="w-40 md:w-48 flex-shrink-0 card-hover" />
                ))}
                 <div className="flex-shrink-0 w-1"></div>
             </div>
              {/* Simple Arrow Placeholders - Requires State/Logic for actual scrolling */}
             <Button variant="outline" size="icon" className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden sm:flex"> <ChevronLeft/> </Button>
              <Button variant="outline" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden sm:flex"> <ChevronRight/> </Button>
          </div>
       </section>
    </div>
  );
}

// Add basic scrollbar styles (can be moved to globals.css)
const styles = `
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
