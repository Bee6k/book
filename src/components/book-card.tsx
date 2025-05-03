import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  price: number;
  format: string;
  rating?: number;
  dataAiHint?: string;
  description?: string; // Optional description for list view
}

interface BookCardProps extends React.HTMLAttributes<HTMLDivElement> {
  book: Book;
  viewMode?: 'grid' | 'list';
}

const BookCard: React.FC<BookCardProps> = ({ book, viewMode = 'grid', className, ...props }) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-4 w-4",
              rating >= star ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
            )}
          />
        ))}
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <Card className={cn("flex flex-col md:flex-row overflow-hidden transition-shadow hover:shadow-md", className)} {...props}>
        <div className="relative w-full md:w-1/4 lg:w-1/5 flex-shrink-0 aspect-[2/3] md:aspect-auto">
          <Link href={`/book/${book.id}`} passHref>
             <Image
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                layout="fill"
                objectFit="cover"
                quality={75}
                className="rounded-l-lg md:rounded-none md:rounded-l-lg"
                data-ai-hint={book.dataAiHint || 'book cover'}
             />
          </Link>
        </div>
        <div className="flex flex-col justify-between p-4 md:p-6 flex-grow">
          <div>
             <Link href={`/book/${book.id}`} passHref>
                 <CardTitle className="text-lg md:text-xl mb-1 hover:text-primary transition-colors">{book.title}</CardTitle>
              </Link>
             <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
             {book.rating && renderStars(book.rating)}
              {book.description && (
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
                    {book.description}
                  </p>
              )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
            <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-primary">${book.price.toFixed(2)}</span>
                 <Badge variant="secondary">{book.format}</Badge>
            </div>
            <Button size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Default Grid View
  return (
    <Card className={cn("overflow-hidden flex flex-col", className)} {...props}>
       <Link href={`/book/${book.id}`} passHref className="block relative aspect-[2/3] w-full overflow-hidden group">
           <Image
             src={book.coverUrl}
             alt={`Cover of ${book.title}`}
             layout="fill"
             objectFit="cover"
             quality={75}
             className="transition-transform duration-300 group-hover:scale-105"
             sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
             data-ai-hint={book.dataAiHint || 'book cover'}
           />
       </Link>
       <CardContent className="p-3 flex-grow flex flex-col justify-between">
         <div>
            <Link href={`/book/${book.id}`} passHref>
              <h3 className="font-semibold text-sm leading-tight mb-1 hover:text-primary transition-colors line-clamp-2">{book.title}</h3>
            </Link>
           <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{book.author}</p>
           {book.rating && renderStars(book.rating)}
         </div>
         <div className="mt-3 flex justify-between items-center">
           <span className="font-semibold text-primary">${book.price.toFixed(2)}</span>
           <Badge variant="secondary" className="text-xs px-1.5 py-0.5">{book.format}</Badge>
         </div>
       </CardContent>
       <CardFooter className="p-3 pt-0">
         <Button size="sm" className="w-full text-xs">
            <ShoppingCart className="mr-1 h-3 w-3" /> Add to Cart
         </Button>
       </CardFooter>
    </Card>
  );
};

export default BookCard;
