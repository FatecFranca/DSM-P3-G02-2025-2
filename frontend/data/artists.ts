export const artists = [
  { 
    name: "Ebony", 
    img: "/ebony.svg", 
    id: "1", 
    slug: "ebony",
    images: [
      { id: 1, img: "/fotos/ebony1.jpg", alt: "Ebony 1" },
      { id: 2, img: "/fotos/ebony2.jpg", alt: "Ebony 2" },
      { id: 3, img: "/fotos/ebony3.jpg", alt: "Ebony 3" },
    ]
  },
  { 
    name: "Marina Sena", 
    img: "/marina_sena.svg", 
    id: "2", 
    slug: "marina-sena",
    images: [
      { id: 1, img: "/fotos/marina1.jpg", alt: "Marina Sena 1" },
      { id: 2, img: "/fotos/marina2.jpg", alt: "Marina Sena 2" },
      { id: 3, img: "/fotos/marina3.jpg", alt: "Marina Sena 3" },
      { id: 4, img: "/fotos/marina4.jpg", alt: "Marina Sena 4" },
      { id: 5, img: "/fotos/marina5.jpg", alt: "Marina Sena 5" },
      { id: 6, img: "/fotos/marina6.jpg", alt: "Marina Sena 6" },
      { id: 7, img: "/fotos/marina7.jpg", alt: "Marina Sena 7" }
    ]
  },
  { 
    name: "Duquesa", 
    img: "/duquesa.svg", 
    id: "3", 
    slug: "duquesa",
    images: [
      { id: 1, img: "/fotos/duquesa1.jpg", alt: "Duquesa 1" },
      { id: 2, img: "/fotos/duquesa2.jpg", alt: "Duquesa 2" },
    ]
  },
];

export type Artist = typeof artists[number];