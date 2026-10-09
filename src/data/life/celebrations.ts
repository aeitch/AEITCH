export interface BirthdayPerson {
  nameAr: string;
  nameEn: string;
  day: number; // Month and day ONLY (NO year, NO age)
  roleAr: string;
  roleEn: string;
}

export interface MonthBirthdays {
  monthIndex: number; // 0 to 11
  nameAr: string;
  nameEn: string;
  shortAr: string;
  shortEn: string;
  people: BirthdayPerson[];
}

export interface CelebrationMoment {
  id: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  tag: string;
}

export const BIRTHDAYS_DATA: MonthBirthdays[] = [
  {
    monthIndex: 0,
    nameAr: 'يناير',
    nameEn: 'January',
    shortAr: 'ينا',
    shortEn: 'Jan',
    people: [
      { nameAr: 'م. حسيب الرحمن', nameEn: 'Haseeb Ur Rehman', day: 14, roleAr: 'رئيس المعمارية', roleEn: 'Principal Architect' },
    ],
  },
  {
    monthIndex: 1,
    nameAr: 'فبراير',
    nameEn: 'February',
    shortAr: 'فبر',
    shortEn: 'Feb',
    people: [
      { nameAr: 'م. زينب البلوشي', nameEn: 'Zainab Al-Balushi', day: 22, roleAr: 'مهندسة سحابة', roleEn: 'Cloud Engineer' },
    ],
  },
  {
    monthIndex: 2,
    nameAr: 'مارس',
    nameEn: 'March',
    shortAr: 'مار',
    shortEn: 'Mar',
    people: [
      { nameAr: 'م. عمر طارق', nameEn: 'Omer Tariq', day: 9, roleAr: 'رئيس المنتجات', roleEn: 'Product Lead' },
    ],
  },
  {
    monthIndex: 3,
    nameAr: 'أبريل',
    nameEn: 'April',
    shortAr: 'أبر',
    shortEn: 'Apr',
    people: [
      { nameAr: 'م. حمزة فاروق', nameEn: 'Hamza Farooq', day: 18, roleAr: 'مهندس خلفي', roleEn: 'Backend Lead' },
    ],
  },
  {
    monthIndex: 4,
    nameAr: 'مايو',
    nameEn: 'May',
    shortAr: 'ماي',
    shortEn: 'May',
    people: [
      { nameAr: 'م. عبد الله سليم', nameEn: 'Abdullah Saleem', day: 5, roleAr: 'مهندس ذكاء اصطناعي', roleEn: 'AI Lead' },
    ],
  },
  {
    monthIndex: 5,
    nameAr: 'يونيو',
    nameEn: 'June',
    shortAr: 'يون',
    shortEn: 'Jun',
    people: [
      { nameAr: 'م. عائشة مالك', nameEn: 'Ayesha Malik', day: 27, roleAr: 'مهندسة أمن', roleEn: 'Security Lead' },
    ],
  },
  {
    monthIndex: 6,
    nameAr: 'يوليو',
    nameEn: 'July',
    shortAr: 'يول',
    shortEn: 'Jul',
    people: [
      { nameAr: 'م. دانيال أحمد', nameEn: 'Danial Ahmed', day: 12, roleAr: 'مهندس نظم', roleEn: 'Systems Engineer' },
    ],
  },
  {
    monthIndex: 7,
    nameAr: 'أغسطس',
    nameEn: 'August',
    shortAr: 'أغس',
    shortEn: 'Aug',
    people: [
      { nameAr: 'م. مريم رحمن', nameEn: 'Maryam Rehman', day: 31, roleAr: 'باحثة تجربة المستخدم', roleEn: 'UX Researcher' },
    ],
  },
  {
    monthIndex: 8,
    nameAr: 'سبتمبر',
    nameEn: 'September',
    shortAr: 'سبت',
    shortEn: 'Sep',
    people: [
      { nameAr: 'م. أسامة خالد', nameEn: 'Osama Khalid', day: 16, roleAr: 'مهندس واجهات', roleEn: 'Frontend Engineer' },
    ],
  },
  {
    monthIndex: 9,
    nameAr: 'أكتوبر',
    nameEn: 'October',
    shortAr: 'أكت',
    shortEn: 'Oct',
    people: [
      { nameAr: 'م. فاطمة نور', nameEn: 'Fatima Noor', day: 24, roleAr: 'مهندسة بيانات', roleEn: 'Data Engineer' },
    ],
  },
  {
    monthIndex: 10,
    nameAr: 'نوفمبر',
    nameEn: 'November',
    shortAr: 'نوف',
    shortEn: 'Nov',
    people: [
      { nameAr: 'م. بلال حيدر', nameEn: 'Bilal Haider', day: 8, roleAr: 'مهندس موثوقية SRE', roleEn: 'SRE Specialist' },
    ],
  },
  {
    monthIndex: 11,
    nameAr: 'ديسمبر',
    nameEn: 'December',
    shortAr: 'ديس',
    shortEn: 'Dec',
    people: [
      { nameAr: 'م. سارة إقبال', nameEn: 'Sara Iqbal', day: 19, roleAr: 'مهندسة ضمان جودة', roleEn: 'QA Engineer' },
    ],
  },
];

export const CELEBRATION_MOMENTS: CelebrationMoment[] = [
  {
    id: 'moment-eid',
    titleAr: 'بهجة العيد وتبادل الحلويات',
    titleEn: 'Eid Feast & Sweets Exchange',
    categoryAr: 'مناسبة دينية ووطنية',
    categoryEn: 'Cultural Milestone',
    descriptionAr: 'اجتماع كامل الفريق لتبادل التهاني وتناول المأكولات التقليدية والحلويات الشعبية في بهو المكتب.',
    descriptionEn: 'The full pod gathers to share traditional festive meals and celebrate shared cultural bonds.',
    image: '/life/celebrations/eid-celebration.svg',
    tag: 'EID MUBARAK',
  },
  {
    id: 'moment-iftar',
    titleAr: 'إفطار رمضان السنوي لفريق الهندسة',
    titleEn: 'Annual Ramadan Engineering Iftar',
    categoryAr: 'روحانيات وتواصل',
    categoryEn: 'Team Gathering',
    descriptionAr: 'أمسية دافئة حول مائدة إفطار موحدة تكسر روتين العمل البرمجي وتعزز روابط الأخوة والزمالة.',
    descriptionEn: 'A twilight gathering breaking bread together during holy Ramadan, stepping back from the terminal.',
    image: '/life/celebrations/annual-iftar.svg',
    tag: 'RAMADAN KAREEM',
  },
  {
    id: 'moment-cake',
    titleAr: 'كعكة الإطلاق والوصول للإنتاج',
    titleEn: 'Production Ship Cake & Claps',
    categoryAr: 'إنجاز تسليم تقني',
    categoryEn: 'Sprint Release',
    descriptionAr: 'كل إطلاق ناجح لنظام عميل في بيئة الإنتاج يرافقه تقطيع كعكة خاصة وتصفيق حار لكل المهندسين المساهمين.',
    descriptionEn: 'Every major zero-downtime production deployment is celebrated with custom cake and squad applause.',
    image: '/life/celebrations/cake-ship-milestone.svg',
    tag: 'SHIP DAY',
  },
  {
    id: 'moment-dinner',
    titleAr: 'العشاء الفصلي المفتوح',
    titleEn: 'Quarterly Off-Grid Team Dinner',
    categoryAr: 'لقاء اجتماعي',
    categoryEn: 'Quarterly Offsite',
    descriptionAr: 'ليلة استراحة في مطعم محلي مفتوح بدون حواسيب محمولة؛ أحاديث عن الطموحات والكتب والهوايات.',
    descriptionEn: 'A night out in the capital with laptops left behind; talking books, cinema, and ambitious futures.',
    image: '/life/celebrations/team-dinner.svg',
    tag: 'QUARTERLY DINNER',
  },
  {
    id: 'moment-hackathon',
    titleAr: 'عرض مشاريع الابتكار واستعراض الجمعة',
    titleEn: 'Friday Demos & Chai Pour',
    categoryAr: 'ابتكار أسبوعي',
    categoryEn: 'Weekly Demo',
    descriptionAr: 'ساعة مخصصة نهاية كل أسبوع حيث يعرض المهندسون تجاربهم الشخصية وأدوات المصادر المفتوحة مع الشاي الطازج.',
    descriptionEn: 'Friday golden hour: engineers showcase experimental side-projects and OSS contributions over freshly brewed tea.',
    image: '/life/celebrations/hackathon-demo.svg',
    tag: 'FRIDAY DEMO',
  },
];
