import { Album } from "./model/album";
import { Artist } from "./model/artist";

export const albumsMock: Album[] = [
    {
        id: 1,
        title: "Abbey Road",
        year: 1969,
        artistId: 2
      },
      {
        title: "Thriller",
        year: 1982,
        artistId: 3,
        id: 2
      },
      {
        title: "What's Going On",
        year: 1971,
        artistId: 1,
        id: 3
      },

];

export const artistsMock: Artist[] = [
    {
        id: 1,
        name: "Marvin Gaye"
      },
      {
        id: 2,
        name: "The Beatles"
      },
      {
        id: 3,
        name: "Michael Jackson"
      },
      {
        id: 4,
        name: "Lady Gaga"
      },
]