export interface LifeQuote {
  id: string;
  quoteAr: string;
  quoteEn: string;
  authorAr: string;
  authorEn: string;
  roleAr: string;
  roleEn: string;
  portrait: string;
  aspect: string;
}

export const LIFE_QUOTES: LifeQuote[] = [
  {
    id: 'quote-1',
    quoteAr: 'في إيتش لا نكتب كوداً لمجرد ملء التذاكر البرمجية؛ نحن نصمم معمارية نحيا معها ونفتخر بإدارتها أمام أكبر المؤسسات.',
    quoteEn: 'At AEITCH we don’t write code to close tickets; we engineer architectures we are proud to stand behind in front of enterprise CTOs.',
    authorAr: 'م. عبد الله سليم',
    authorEn: 'Abdullah Saleem',
    roleAr: 'كبير مهندسي الذكاء الاصطناعي',
    roleEn: 'Lead AI Engineer',
    portrait: '/life/team/member-2.svg',
    aspect: '3:4',
  },
  {
    id: 'quote-2',
    quoteAr: 'أجمل ما في بيئة العمل هو غياب البيروقراطية. إذا كانت لديك فكرة معمارية تحسن الأداء بنسبة 20%، يمكنك اختبارها ونشرها في نفس اليوم.',
    quoteEn: 'The best facet of our culture is zero bureaucracy. If you propose an architectural refactor that trims latency by 20%, you benchmark and deploy it today.',
    authorAr: 'م. زينب البلوشي',
    authorEn: 'Zainab Al-Balushi',
    roleAr: 'مهندسة حلول السحابة وSRE',
    roleEn: 'Principal Cloud & SRE Engineer',
    portrait: '/life/team/member-3.svg',
    aspect: '3:4',
  },
  {
    id: 'quote-3',
    quoteAr: 'الرحلات الجبلية والعمل الميداني ليسا مجرد ترفيه، بل هما المكان الذي تولد فيه أعمق أفكارنا المعمارية وأكثر حلولنا بساطة وقوة.',
    quoteEn: 'Our mountain treks and outdoor retreats are not corporate theater; they are where our purest architectural paradigms and breakthrough simplifications are forged.',
    authorAr: 'م. عمر طارق',
    authorEn: 'Omer Tariq',
    roleAr: 'رئيس تصميم وهندسة المنتجات',
    roleEn: 'Head of Product Design',
    portrait: '/life/team/member-4.svg',
    aspect: '3:4',
  },
  {
    id: 'quote-4',
    quoteAr: 'أن تكون جزءاً من بناء أنظمة تخدم تحولاً بحجم رؤية 2030 يمنح كل سطر كود معنى مختلفاً ومسؤولية حقيقية نشعر بها كل صباح.',
    quoteEn: 'Being entrusted to engineer platforms powering a generational transformation like Vision 2030 imbues every single commit with immense purpose.',
    authorAr: 'م. حسيب الرحمن خان',
    authorEn: 'Haseeb Ur Rehman Khan',
    roleAr: 'المؤسس ورئيس المعمارية التقنية',
    roleEn: 'Founder & Principal Architect',
    portrait: '/life/team/member-1.svg',
    aspect: '3:4',
  },
];
