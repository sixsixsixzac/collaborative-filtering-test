import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Movie = {
  id: number;
  title: string;
  image: string;
  rating: number;
  releaseDate: Date;
};

const movieCategories: { name: string; movies: Movie[] }[] = [
  {
    name: "ACTION",
    movies: [
      { id: 1, title: "พี่มาก..พระโขนง", image: "/thumnails/2koX1xLkpTQM4IZebYvKysFW1Nh.webp", rating: 4.2, releaseDate: new Date(2010, 9) },
      { id: 2, title: "สัปเหร่อ", image: "/thumnails/fNqlsmu2tiI1bXcpU31yjHPkiJz.webp", rating: 3.8, releaseDate: new Date(2006, 7) },
      { id: 3, title: "สุริโยไท", image: "/thumnails/hEwUU5qXjJEwHglSyOmwurhQyF8.webp", rating: 4.5, releaseDate: new Date(2007, 2) },
      { id: 4, title: "นาคี 2", image: "/thumnails/hjJkrLXhWvGHpLeLBDFznpBTY1S.webp", rating: 4.0, releaseDate: new Date(2018, 8) },
      { id: 5, title: "บุพเพสันนิวาส ๒", image: "/thumnails/iwZIR8wp1lqj69zsbWmZKhXTTIU.webp", rating: 3.9, releaseDate: new Date(2014, 1) },
      { id: 6, title: "ไอฟาย..แต๊งกิ้ว..เลิฟยู้", image: "/thumnails/kkp8dRftSHIiNceNMrEzTfmr7IT.webp", rating: 4.3, releaseDate: new Date(2010, 11) },
    ],
  },
  {
    name: "COMEDY",
    movies: [
      { id: 7, title: "ตุ๊ดซี่ส์ แอนด์ เดอะเฟค", image: "/thumnails/luhKkdD80qe62fwop6sdrXK9jUT.webp", rating: 4.1, releaseDate: new Date(2016, 4) },
      { id: 8, title: "น้อง.พี่.ที่รัก", image: "/thumnails/nLTAs08doHYZ1obg5PTcWliR7vo.webp", rating: 3.7, releaseDate: new Date(2018, 10) },
      { id: 9, title: "ตำนานสมเด็จพระนเรศวรมหาราช ภาค 1 องค์ประกันหงสา", image: "/thumnails/oJ2jVlhj60ofzFfXjfLkOD01rxZ.webp", rating: 4.4, releaseDate: new Date(2007, 0) },
      { id: 10, title: "Friend Zone ระวัง..สิ้นสุดทางเพื่อน", image: "/thumnails/otxZzMh53TsN7yYFqSZ3rwH1yMd.webp", rating: 3.6, releaseDate: new Date(2019, 1) },
    ],
  },
  {
    name: "DRAMA",
    movies: [
      { id: 11, title: "ตำนานสมเด็จพระนเรศวรมหาราช ภาค 2 ประกาศอิสรภาพ", image: "/thumnails/qTvFWCGeGXgBRaINLY1zqgTPSpn.webp", rating: 4.6, releaseDate: new Date(2007, 2) },
      { id: 12, title: "ตำนานสมเด็จพระนเรศวรมหาราช ภาค 5 ยุทธหัตถี", image: "/thumnails/wijlZ3HaYMvlDTPqJoTCWKFkCPU.webp", rating: 4.2, releaseDate: new Date(2010, 7) },
      { id: 13, title: "อีเรียมซิ่ง", image: "/thumnails/xeEw3eLeSFmJgXZzmF2Efww0q3s.webp", rating: 3.8, releaseDate: new Date(2015, 5) },
      { id: 14, title: "ตำนานสมเด็จพระนเรศวรมหาราช ภาค 3 ยุทธนาวี", image: "/thumnails/z53D72EAOxGRqdr7KXXWp9dJiDe.webp", rating: 4.1, releaseDate: new Date(2008, 0) },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        {movieCategories.map((category) => (
          <section key={category.name} className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-semibold">{category.name}</h2>
              <Badge variant="secondary">{category.movies.length} movies</Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {category.movies.map((movie) => (
                <Card
                  key={movie.id}
                  className="overflow-hidden border-0 shadow-none p-0 cursor-pointer"
                >
                  <CardContent className="relative p-0">
                    <div className="aspect-[2/3] relative">
                      <Image
                        src={movie.image}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      />
                    </div>
                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur px-2 py-1 rounded-md shadow">
                      <div className="flex items-center gap-1 text-white text-sm font-semibold">
                        <span className="text-yellow-400 text-base">★</span>
                        <span>{movie.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-sm truncate">
                        {movie.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {movie.releaseDate.getFullYear()}-{String(movie.releaseDate.getMonth() + 1).padStart(2, '0')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
