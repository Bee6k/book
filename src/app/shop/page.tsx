'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Star, List, LayoutGrid } from 'lucide-react';
import BookCard from '@/components/book-card'; // Reusable book card component

// Sample data - replace with actual data fetching and filtering logic
const allBooks = [
 { id: '1', title: "The Midnight Library", author: "Matt Haig", coverUrl: "https://picsum.photos/200/300?random=1", price: 14.99, format: 'eBook', rating: 4, genre: 'Fantasy', language: 'English', dataAiHint: 'book cover fantasy' },
  { id: '2', title: "Project Hail Mary", author: "Andy Weir", coverUrl: "https://picsum.photos/200/300?random=2", price: 16.99, format: 'Paperback', rating: 5, genre: 'Sci-Fi', language: 'English', dataAiHint: 'book cover science fiction' },
  { id: '3', title: "Klara and the Sun", author: "Kazuo Ishiguro", coverUrl: "https://picsum.photos/200/300?random=3", price: 15.50, format: 'eBook', rating: 4, genre: 'Sci-Fi', language: 'English', dataAiHint: 'book cover literary fiction' },
  { id: '4', title: "The Vanishing Half", author: "Brit Bennett", coverUrl: "https://picsum.photos/200/300?random=4", price: 13.99, format: 'Paperback', rating: 4, genre: 'Historical Fiction', language: 'English', dataAiHint: 'book cover historical fiction' },
  { id: '5', title: "Atomic Habits", author: "James Clear", coverUrl: "https://picsum.photos/200/300?random=5", price: 12.00, format: 'eBook', rating: 5, genre: 'Non-Fiction', language: 'English', dataAiHint: 'book cover self help' },
   { id: '6', title: "Dune", author: "Frank Herbert", coverUrl: "https://picsum.photos/200/300?random=6", price: 18.00, format: 'Paperback', rating: 5, genre: 'Sci-Fi', language: 'English', dataAiHint: 'book cover science fiction classic' },
   { id: '7', title: "The Silent Patient", author: "Alex Michaelides", coverUrl: "https://picsum.photos/200/300?random=7", price: 11.50, format: 'eBook', rating: 4, genre: 'Thriller', language: 'English', dataAiHint: 'book cover psychological thriller' },
   { id: '8', title: "Where the Crawdads Sing", author: "Delia Owens", coverUrl: "https://picsum.photos/200/300?random=8", price: 10.99, format: 'Paperback', rating: 5, genre: 'Mystery', language: 'English', dataAiHint: 'book cover mystery nature' },
   { id: '9', title: "Educated", author: "Tara Westover", coverUrl: "https://picsum.photos/200/300?random=9", price: 14.00, format: 'Paperback', rating: 5, genre: 'Non-Fiction', language: 'English', dataAiHint: 'book cover memoir education' },
   { id: '10', title: "Circe", author: "Madeline Miller", coverUrl: "https://picsum.photos/200/300?random=10", price: 13.50, format: 'eBook', rating: 4, genre: 'Fantasy', language: 'English', dataAiHint: 'book cover mythology fantasy' },
];

const genres = ['Fantasy', 'Sci-Fi', 'Mystery', 'Thriller', 'Romance', 'Non-Fiction', 'Historical Fiction'];
const formats = ['eBook', 'Paperback', 'Hardcover'];
const languages = ['English', 'Spanish', 'French'];


export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Placeholder filtering logic - replace with actual backend/API calls
  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(book.genre);
    const matchesFormat = selectedFormats.length === 0 || selectedFormats.includes(book.format);
    const matchesRating = book.rating >= minRating;
    const matchesLanguage = selectedLanguage === 'all' || book.language === selectedLanguage;

    return matchesSearch && matchesPrice && matchesGenre && matchesFormat && matchesRating && matchesLanguage;
  });

  const handleGenreChange = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const handleFormatChange = (format: string) => {
     setSelectedFormats(prev =>
       prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
     );
   };


  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <aside className="w-full lg:w-1/4 xl:w-1/5 space-y-6">
        <h2 className="text-2xl font-semibold">Filters</h2>

         {/* Search within filters */}
         <Input
            type="search"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
         />

        {/* Price Range */}
        <div>
          <Label className="text-lg font-medium">Price Range</Label>
          <Slider
            defaultValue={[0, 50]}
            max={50}
            step={1}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value)}
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Genre */}
        <div>
          <Label className="text-lg font-medium mb-2 block">Genre</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
            {genres.map(genre => (
              <div key={genre} className="flex items-center space-x-2">
                <Checkbox
                  id={`genre-${genre}`}
                  checked={selectedGenres.includes(genre)}
                  onCheckedChange={() => handleGenreChange(genre)}
                />
                <Label htmlFor={`genre-${genre}`} className="font-normal cursor-pointer">{genre}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Format */}
        <div>
          <Label className="text-lg font-medium mb-2 block">Format</Label>
          <div className="space-y-2">
            {formats.map(format => (
              <div key={format} className="flex items-center space-x-2">
                 <Checkbox
                   id={`format-${format}`}
                   checked={selectedFormats.includes(format)}
                   onCheckedChange={() => handleFormatChange(format)}
                 />
                 <Label htmlFor={`format-${format}`} className="font-normal cursor-pointer">{format}</Label>
              </div>
            ))}
          </div>
        </div>

         {/* Rating */}
         <div>
           <Label className="text-lg font-medium mb-2 block">Minimum Rating</Label>
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map(rating => (
                    <Button
                        key={rating}
                        variant={minRating >= rating ? "default" : "outline"}
                        size="icon"
                        className={`h-8 w-8 ${minRating >= rating ? 'text-yellow-400 border-yellow-400' : 'text-muted-foreground'}`}
                        onClick={() => setMinRating(rating === minRating ? 0 : rating)}
                        aria-label={`Set minimum rating to ${rating} stars`}
                    >
                        <Star className="h-4 w-4 fill-current" />
                    </Button>
                ))}
            </div>
         </div>

        {/* Language */}
        <div>
          <Label className="text-lg font-medium mb-2 block" htmlFor="language-select">Language</Label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger id="language-select" className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {languages.map(lang => (
                 <SelectItem key={lang} value={lang}>{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="w-full" onClick={() => { /* Reset filters logic */
           setSearchTerm('');
           setPriceRange([0, 50]);
           setSelectedGenres([]);
           setSelectedFormats([]);
           setMinRating(0);
           setSelectedLanguage('all');
        }}>
            Reset Filters
        </Button>
      </aside>

      {/* Books Listing Area */}
      <main className="w-full lg:w-3/4 xl:w-4/5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Shop Books ({filteredBooks.length})</h1>
          <div className="flex items-center gap-2">
             <span className="text-sm text-muted-foreground hidden sm:inline">View:</span>
             <Button
                 variant={viewMode === 'grid' ? 'default' : 'ghost'}
                 size="icon"
                 onClick={() => setViewMode('grid')}
                 aria-label="Grid View"
             >
                 <LayoutGrid className="h-5 w-5" />
             </Button>
              <Button
                 variant={viewMode === 'list' ? 'default' : 'ghost'}
                 size="icon"
                 onClick={() => setViewMode('list')}
                 aria-label="List View"
              >
                 <List className="h-5 w-5" />
              </Button>
          </div>
        </div>

        {/* Results Grid/List */}
        {filteredBooks.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'}`}>
                 {filteredBooks.map(book => (
                    <BookCard key={book.id} book={book} viewMode={viewMode} className="card-hover" />
                 ))}
            </div>
        ) : (
            <Card className="text-center p-12">
                <p className="text-lg text-muted-foreground">No books found matching your criteria.</p>
                <Button variant="link" onClick={() => { /* Reset filters logic */
                     setSearchTerm('');
                     setPriceRange([0, 50]);
                     setSelectedGenres([]);
                     setSelectedFormats([]);
                     setMinRating(0);
                     setSelectedLanguage('all');
                  }}>Clear filters</Button>
            </Card>
        )}

        {/* Infinite Scroll / Load More Placeholder */}
         {filteredBooks.length > 10 && ( // Only show if there might be more
           <div className="text-center mt-12">
             <Button variant="outline" onClick={() => alert('Load more books (placeholder)')}>
               Load More
             </Button>
           </div>
         )}
      </main>
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
    width: 6px;
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: hsl(var(--secondary));
    border-radius: 10px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: hsl(var(--primary));
    border-radius: 10px;
    border: 1px solid hsl(var(--secondary));
  }
`;

// Inject styles - consider moving to globals.css or using Tailwind plugins
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
