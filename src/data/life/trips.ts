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
    id: 'trip-2026-skardu',
    year: '2026',
    placeAr: 'سكردو والصحراء الباردة',
    placeEn: 'Skardu & The Cold Desert',
    badgeAr: 'رحلة استكشاف سنوية',
    badgeEn: 'Annual Expedition',
    storyAr: 'تسلقنا الكثبان الرملية في أعلى صحراء باردة في العالم على ارتفاع 2,500 متر. جلسات عصف ذهني حول معمارية النظم الموزعة تحت سماء مرصعة بالنجوم.',
    storyEn: 'Traversing wind-swept sand dunes at 2,500 meters altitude. Architecture fireside debates on distributed topologies beneath unobstructed galaxy views.',
    altitude: '2,500m',
    photos: [
      {
        src: '/life/trips/trip-skardu-1.svg',
        aspect: '16:10',
        captionAr: 'مخيم الفريق في وادي سارفرنجا',
        captionEn: 'Base camp at Sarfaranga Desert',
        speed: 1.0,
      },
      {
        src: '/life/trips/trip-skardu-2.svg',
        aspect: '4:3',
        captionAr: 'غروب الشمس فوق بحيرة شنجريلا',
        captionEn: 'Sunset over Shangrila Lake',
        speed: 1.4,
      },
    ],
  },
  {
    id: 'trip-2025-hunza',
    year: '2025',
    placeAr: 'وادي هونزا وجبال كاراكورام',
    placeEn: 'Hunza Valley & Karakoram Peaks',
    badgeAr: 'معسكر الابتكار الجبلي',
    badgeEn: 'Alpine Engineering Retreat',
    storyAr: 'أسبوع من البرمجة المركزة والمسارات الجبلية بمحاذاة قمم راكابوشي الشاهقة. أنهينا خلالها المعمارية التأسيسية لمنظومة وكلاء الذكاء الاصطناعي.',
    storyEn: 'A high-focus sprint amidst 7,000m Karakoram peaks. Finalized our sovereign multi-agent RAG orchestrator while trekking to Passu Cones.',
    altitude: '2,800m',
    photos: [
      {
        src: '/life/trips/trip-hunza-1.svg',
        aspect: '16:10',
        captionAr: 'جلسة عمل خارجية أمام قمة راكابوشي',
        captionEn: 'Outdoor code sync facing Rakaposhi',
        speed: 1.0,
      },
      {
        src: '/life/trips/trip-hunza-2.svg',
        aspect: '4:3',
        captionAr: 'جسر حسيني المعلق ومسار وادي باسو',
        captionEn: 'Hussaini suspension bridge trek',
        speed: 1.35,
      },
    ],
  },
  {
    id: 'trip-2024-malam',
    year: '2024',
    placeAr: 'مالم جبا ووادي سوات',
    placeEn: 'Malam Jabba & Swat Valley',
    badgeAr: 'سباق التزلج والبرمجة',
    badgeEn: 'Winter Ski & Hackathon',
    storyAr: 'تحدي برمجي شتوي استمر 48 ساعة متواصلة في منتجع التزلج الثلجي. كسرنا فيه الروتين بالهبوط على الجليد والاحتفال بأول إطلاق مؤسسي كبير.',
    storyEn: 'A 48-hour sub-zero hackathon at the ski resort. Celebrating our first major enterprise deployment with snowboard runs and hot local tea.',
    altitude: '2,804m',
    photos: [
      {
        src: '/life/trips/trip-malam-1.svg',
        aspect: '16:10',
        captionAr: 'فريق الهندسة في قمة مضمار التزلج',
        captionEn: 'Engineering squad at the ski summit',
        speed: 1.0,
      },
      {
        src: '/life/trips/trip-malam-2.svg',
        aspect: '4:3',
        captionAr: 'مسار غابات الصنوبر في وادي سوات',
        captionEn: 'Pine forest hike in Swat Valley',
        speed: 1.25,
      },
    ],
  },
];
