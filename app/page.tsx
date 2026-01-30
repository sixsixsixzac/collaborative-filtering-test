import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const movieCategories = [
  {
    name: "ACTION",
    movies: [
      { id: 1, title: "Action Movie 1", image: "/thumnails/2koX1xLkpTQM4IZebYvKysFW1Nh.webp" },
      { id: 2, title: "Action Movie 2", image: "/thumnails/fNqlsmu2tiI1bXcpU31yjHPkiJz.webp" },
      { id: 3, title: "Action Movie 3", image: "/thumnails/hEwUU5qXjJEwHglSyOmwurhQyF8.webp" },
      { id: 4, title: "Action Movie 4", image: "/thumnails/hjJkrLXhWvGHpLeLBDFznpBTY1S.webp" },
      { id: 5, title: "Action Movie 5", image: "/thumnails/iwZIR8wp1lqj69zsbWmZKhXTTIU.webp" },
      { id: 6, title: "Action Movie 6", image: "/thumnails/kkp8dRftSHIiNceNMrEzTfmr7IT.webp" },
    ]
  },
  {
    name: "COMEDY",
    movies: [
      { id: 7, title: "Comedy Movie 1", image: "/thumnails/luhKkdD80qe62fwop6sdrXK9jUT.webp" },
      { id: 8, title: "Comedy Movie 2", image: "/thumnails/nLTAs08doHYZ1obg5PTcWliR7vo.webp" },
      { id: 9, title: "Comedy Movie 3", image: "/thumnails/oJ2jVlhj60ofzFfXjfLkOD01rxZ.webp" },
      { id: 10, title: "Comedy Movie 4", image: "/thumnails/otxZzMh53TsN7yYFqSZ3rwH1yMd.webp" },
    ]
  },
  {
    name: "DRAMA",
    movies: [
      { id: 11, title: "Drama Movie 1", image: "/thumnails/qTvFWCGeGXgBRaINLY1zqgTPSpn.webp" },
      { id: 12, title: "Drama Movie 2", image: "/thumnails/wijlZ3HaYMvlDTPqJoTCWKFkCPU.webp" },
      { id: 13, title: "Drama Movie 3", image: "/thumnails/xeEw3eLeSFmJgXZzmF2Efww0q3s.webp" },
      { id: 14, title: "Drama Movie 4", image: "/thumnails/z53D72EAOxGRqdr7KXXWp9dJiDe.webp" },
    ]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          <span className="text-red-500">Hello</span>{' '}
          <span className="text-blue-500">World</span>
        </h1>

        {movieCategories.map((category) => (
          <section key={category.name} className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-semibold">{category.name}</h2>
              <Badge variant="secondary">{category.movies.length} movies</Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {category.movies.map((movie) => (
                <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow p-0">
                  <CardContent className="p-0">
                    <div className="aspect-[2/3] relative">
                      <Image
                        src={movie.image}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm truncate">{movie.title}</h3>
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
