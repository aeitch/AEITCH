export interface TripChapter {
  id: string;
  year: string;
  placeAr: string;
  placeEn: string;
  badgeAr: string;
  badgeEn: string;
  storyAr: string;
  storyEn: string;
  altitude?: string;
  photos: {
    src: string;
    aspect: string;
    captionAr: string;
    captionEn: string;
    speed: number; // Parallax relative scroll multiplier
  }[];
}

export const COMPANY_TRIPS: TripChapter[] = [
  {
    id: 'trip-2026-mushkpuri',
    year: '2026',
    placeAr: 'مسار قمة مشكبوري ومحمية أيوبيا',
    placeEn: 'Mushkpuri Peak & Ayubia Trail',
    badgeAr: 'المسار الجبلي السنوي (2,800م)',
    badgeEn: 'Annual Alpine Trek (2,800m)',
    storyAr: 'صعد كامل فريق إيتش إلى قمة جبل مشكبوري على ارتفاع 2,800 متر. مسار وسط غابات الصنوبر الممتدة، تخللته جلسات نقاش معمارية في الهواء الطلق، واستراحة شاي كرك دافئ على التراس الجبلي مع إطلالات ساحرة على سفوح الهيمالايا.',
    storyEn: 'The full AEITCH squad completed the alpine ascent to Mushkpuri Peak (2,800m). Trekking along pine forest ridges, holding outdoor system design discussions, and sharing steaming karak chai on scenic terraces with panoramic views.',
    altitude: '2,800m',
    photos: [
      {
        src: '/life/trips/mushkpuri-summit.jpg',
        aspect: '1:1',
        captionAr: 'فريق إيتش على قمة مشكبوري (2,800م)',
        captionEn: 'AEITCH squad on Mushkpuri summit ridge (2,800m)',
        speed: 1.0,
      },
      {
        src: '/life/trips/mushkpuri-terrace.jpg',
        aspect: '1:1',
        captionAr: 'استراحة شاي كرك على التراس الجبلي المطل',
        captionEn: 'Karak chai break on the mountain terrace',
        speed: 1.35,
      },
      {
        src: '/life/trips/mushkpuri-joy.jpg',
        aspect: '1:1',
        captionAr: 'معنويات عالية وضحكات مشتركة بين أعضاء الفريق',
        captionEn: 'High spirits, camaraderie, and laughter along the trail',
        speed: 1.2,
      },
      {
        src: '/life/trips/mushkpuri-trail.jpg',
        aspect: '3:4',
        captionAr: 'مسار الغابة الكثيفة وصعود المنحدرات',
        captionEn: 'Dense pine forest ascent up the mountain ridge',
        speed: 1.4,
      },
    ],
  },
];
