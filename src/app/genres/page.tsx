import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data - replace with actual data source
const genres = [
  { name: "Fantasy", slug: "fantasy", image: "https://picsum.photos/300/200?random=11", dataAiHint: 'fantasy landscape dragon castle' },
  { name: "Science Fiction", slug: "sci-fi", image: "https://picsum.photos/300/200?random=12", dataAiHint: 'spaceship stars planet' },
  { name: "Mystery", slug: "mystery", image: "https://picsum.photos/300/200?random=13", dataAiHint: 'detective magnifying glass clues' },
  { name: "Thriller", slug: "thriller", image: "https://picsum.photos/300/200?random=14", dataAiHint: 'dark alley suspense shadow figure' },
  { name: "Romance", slug: "romance", image: "https://picsum.photos/300/200?random=15", dataAiHint: 'couple sunset beach love' },
  { name: "Non-Fiction", slug: "non-fiction", image: "https://picsum.photos/300/200?random=16", dataAiHint: 'library books study history science' },
  { name: "Historical Fiction", slug: "historical-fiction", image: "https://picsum.photos/300/200?random=17", dataAiHint: 'old map vintage castle knight' },
  { name: "Horror", slug: "horror", image: "https://picsum.photos/300/200?random=18", dataAiHint: 'haunted house ghost spooky forest' },
  { name: "Biography", slug: "biography", image: "https://picsum.photos/300/200?random=19", dataAiHint: 'portrait famous person historical figure' },
  { name: "Young Adult", slug: "young-adult", image: "https://picsum.photos/300/200?random=20", dataAiHint: 'teenagers friends school adventure' },
  { name: "Children's", slug: "childrens", image: "https://picsum.photos/300/200?random=21", dataAiHint: 'cartoon animals kids playing colorful' },
  { name: "Poetry", slug: "poetry", image: "https://picsum.photos/300/200?random=22", dataAiHint: 'quill ink paper writing words' },
];

export default function GenresPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center">Explore Genres</h1>
      <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
        Dive into your favorite categories or discover something new. Click on a genre to see related books.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {genres.map((genre) => (
          <Link key={genre.slug} href={`/shop?genre=${genre.slug}`} passHref>
            <Card className="overflow-hidden card-hover cursor-pointer group text-center h-full flex flex-col justify-between">
              <div className="relative h-32 sm:h-40 w-full">
                <Image
                  src={genre.image}
                  alt={`Genre: ${genre.name}`}
                  layout="fill"
                  objectFit="cover"
                  quality={75}
                  className="transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  data-ai-hint={genre.dataAiHint}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
              </div>
              <CardHeader className="p-3 flex-grow flex items-end justify-center relative -mt-8 z-10">
                 <CardTitle className="text-md sm:text-lg font-semibold text-white group-hover:text-primary transition-colors">
                    {genre.name}
                 </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
