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
      { nameAr: 'م. حسيب الرحمن', nameEn: 'Haseeb ur Rehman', day: 5, roleAr: 'الرئيس التنفيذي والشريك المؤسس', roleEn: 'Chief Executive Officer (CEO)' },
      { nameAr: 'أ. آمنة سفر', nameEn: 'Amna Safar', day: 20, roleAr: 'مسؤولة تطوير الأعمال والشراكات', roleEn: 'Business Development Executive' },
    ],
  },
  {
    monthIndex: 1,
    nameAr: 'فبراير',
    nameEn: 'February',
    shortAr: 'فبر',
    shortEn: 'Feb',
    people: [],
  },
  {
    monthIndex: 2,
    nameAr: 'مارس',
    nameEn: 'March',
    shortAr: 'مار',
    shortEn: 'Mar',
    people: [
      { nameAr: 'م. عمر عوان', nameEn: 'Umer Awan', day: 1, roleAr: 'المدير التقني ورئيس إدارة المنتجات', roleEn: 'CTO & Product Manager' },
    ],
  },
  {
    monthIndex: 3,
    nameAr: 'أبريل',
    nameEn: 'April',
    shortAr: 'أبر',
    shortEn: 'Apr',
    people: [],
  },
  {
    monthIndex: 4,
    nameAr: 'مايو',
    nameEn: 'May',
    shortAr: 'ماي',
    shortEn: 'May',
    people: [],
  },
  {
    monthIndex: 5,
    nameAr: 'يونيو',
    nameEn: 'June',
    shortAr: 'يون',
    shortEn: 'Jun',
    people: [],
  },
  {
    monthIndex: 6,
    nameAr: 'يوليو',
    nameEn: 'July',
    shortAr: 'يول',
    shortEn: 'Jul',
    people: [],
  },
  {
    monthIndex: 7,
    nameAr: 'أغسطس',
    nameEn: 'August',
    shortAr: 'أغس',
    shortEn: 'Aug',
    people: [],
  },
  {
    monthIndex: 8,
    nameAr: 'سبتمبر',
    nameEn: 'September',
    shortAr: 'سبت',
    shortEn: 'Sep',
    people: [],
  },
  {
    monthIndex: 9,
    nameAr: 'أكتوبر',
    nameEn: 'October',
    shortAr: 'أكت',
    shortEn: 'Oct',
    people: [
      { nameAr: 'أ. عائشة مظفر', nameEn: 'Ayesha Muzaffar', day: 28, roleAr: 'مسؤولة الموارد البشرية وثقافة الفريق', roleEn: 'HR Executive' },
    ],
  },
  {
    monthIndex: 10,
    nameAr: 'نوفمبر',
    nameEn: 'November',
    shortAr: 'نوف',
    shortEn: 'Nov',
    people: [],
  },
  {
    monthIndex: 11,
    nameAr: 'ديسمبر',
    nameEn: 'December',
    shortAr: 'ديس',
    shortEn: 'Dec',
    people: [
      { nameAr: 'م. حسن بت', nameEn: 'Hasan Butt', day: 8, roleAr: 'المدير التقني وهندسة السحابة', roleEn: 'Chief Technology Officer (CTO)' },
    ],
  },
];

export const CELEBRATION_MOMENTS: CelebrationMoment[] = [
  {
    id: 'moment-cake',
    titleAr: 'احتفالات أعياد الميلاد وإطلاق الإنتاج',
    titleEn: 'Birthday Celebrations & Release Cake',
    categoryAr: 'فرحة الفريق وإنجاز التسليم',
    categoryEn: 'Team Milestone',
    descriptionAr: 'كل مناسبة ميلاد وإطلاق ناجح لنظام عميل في بيئة الإنتاج يرافقه تقطيع كعكة خاصة وتصفيق حار لكل المساهمين.',
    descriptionEn: 'Every squad member birthday and zero-downtime client production deployment is celebrated with cake and applause.',
    image: '/life/celebrations/birthday-cake.png',
    tag: 'BIRTHDAY & SHIP',
  },
  {
    id: 'moment-terrace',
    titleAr: 'استراحة شاي كرك على التراس الجبلي',
    titleEn: 'Mountain Terrace Tea Gathering',
    categoryAr: 'لقاء مفتوح وأحاديث ملهمة',
    categoryEn: 'Offsite Retreat',
    descriptionAr: 'أمسية دافئة حول أكواب الشاي الطازجة في الهواء الطلق، حيث نتبادل النقاشات المعمارية والرؤى المستقبلية.',
    descriptionEn: 'Gathering on the mountain terrace overlooking alpine valleys, discussing engineering futures over fresh tea.',
    image: '/life/trips/mushkpuri-terrace.jpg',
    tag: 'CHAI & PERSPECTIVE',
  },
  {
    id: 'moment-summit',
    titleAr: 'تحدي القمة وروح الفريق العالية',
    titleEn: 'Summit Ridge & Team Synergy',
    categoryAr: 'استكشاف وتحدي جبلي',
    categoryEn: 'Alpine Expedition',
    descriptionAr: 'صعود جماعي إلى قمة الجبل على ارتفاع 2,800م؛ إصرار متبادل يعكس قوة الفريق وتكامله في مواجهة التحديات البرمجية المعقدة.',
    descriptionEn: 'Summiting 2,800m alpine peaks together—solidifying our shared resilience, high spirits, and collaborative power.',
    image: '/life/trips/mushkpuri-summit.jpg',
    tag: 'SUMMIT 2,800M',
  },
  {
    id: 'moment-joy',
    titleAr: 'طاقة إيجابية وضحكات لا تنقطع',
    titleEn: 'Trail Laughter & Camaraderie',
    categoryAr: 'ثقافة إنسانية مرحة',
    categoryEn: 'Team Culture',
    descriptionAr: 'أجواء عفوية وضحكات مشتركة تكسر الجدية الهندسية الصارمة وتجعل من بيئة العمل مجتمعاً إنسانياً حقيقياً.',
    descriptionEn: 'Unfiltered joy and genuine smiles along the trek, proving high-performance engineering thrives best with true camaraderie.',
    image: '/life/trips/mushkpuri-joy.jpg',
    tag: 'TEAM CAMARADERIE',
  },
  {
    id: 'moment-culture',
    titleAr: 'لقاءات دورية لتبادل الأفكار وتكريم المتميزين',
    titleEn: 'Quarterly Offsite & Recognition',
    categoryAr: 'تكريم وإنجازات',
    categoryEn: 'Quarterly Gathering',
    descriptionAr: 'لحظات استراحة واحتفاء بكل جهد يبذله الفريق، مع تسليط الضوء على الإنجازات التقنية الاستثنائية.',
    descriptionEn: 'Quarterly milestones celebrating dedicated craft, peer recognition, and bold ambitious roadmap targets.',
    image: '/life/hero/polaroid-team.jpg',
    tag: 'COMPANY CULTURE',
  },
];
