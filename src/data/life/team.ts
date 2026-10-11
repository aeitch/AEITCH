export interface TeamMember {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  category: 'ai' | 'product' | 'cloud' | 'software';
  image: string;
  funFactAr: string;
  funFactEn: string;
  favoriteTool: string;
  quoteAr: string;
  quoteEn: string;
  consent: boolean;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'haseeb',
    nameAr: 'م. حسيب الرحمن',
    nameEn: 'Haseeb ur Rehman',
    roleAr: 'الرئيس التنفيذي والشريك المؤسس',
    roleEn: 'Chief Executive Officer (CEO)',
    category: 'software',
    image: '/life/team/haseeb-ur-rehman.jpg',
    funFactAr: 'مهندس رؤيوي ومؤسس إيتش، يبدأ يومه مبكراً بالتخطيط الاستراتيجي ومتابعة مستهدفات التوسع.',
    funFactEn: 'CEO & Founder driving sovereign digital engineering and enterprise scale across the GCC.',
    favoriteTool: 'Enterprise Architecture + Strategic Vision',
    quoteAr: 'البرمجيات الحقيقية تُبنى بالانضباط والحرفة العالية، وليس بالاختصارات السريعة.',
    quoteEn: 'Extraordinary systems are forged through discipline, craft, and unwavering long-term vision.',
    consent: true,
  },
  {
    id: 'umer',
    nameAr: 'م. عمر عوان',
    nameEn: 'Umer Awan',
    roleAr: 'المدير التقني ورئيس إدارة المنتجات',
    roleEn: 'CTO & Product Manager',
    category: 'product',
    image: '/life/team/umer-awan.png',
    funFactAr: 'يجمع بين عمق الهندسة المعمارية الموزعة وحس تصميم المنتجات الرقمية الاستثنائية.',
    funFactEn: 'Bridges deep systems architecture with high-velocity product delivery and user empathy.',
    favoriteTool: 'Next.js + Distributed Architecture + Figma',
    quoteAr: 'المنتج العظيم هو التقاء الهندسة المعمارية المتقنة بالتجربة السلسة التي يحبها العميل.',
    quoteEn: 'A great product is where uncompromising engineering meets human-centric craft.',
    consent: true,
  },
  {
    id: 'hasan',
    nameAr: 'م. حسن بت',
    nameEn: 'Hasan Butt',
    roleAr: 'المدير التقني وهندسة السحابة',
    roleEn: 'Chief Technology Officer (CTO)',
    category: 'cloud',
    image: '/life/team/hasan-butt.jpg',
    funFactAr: 'مهندس سحابي خبير يركز على استقرار البنى التحتية وتحقيق أعلى معدلات التوفر 99.99%.',
    funFactEn: 'Cloud architect obsessed with high availability, resilient topologies, and rock-solid systems.',
    favoriteTool: 'Kubernetes + Cloud Topologies + Terraform',
    quoteAr: 'البنية التحتية الصلبة كالهواء النقي، قوتها في استقرارها الدائم وعدم انقطاعها.',
    quoteEn: 'Bulletproof infrastructure is the quiet superpower behind every enduring digital system.',
    consent: true,
  },
  {
    id: 'ayesha',
    nameAr: 'أ. عائشة مظفر',
    nameEn: 'Ayesha Muzaffar',
    roleAr: 'مسؤولة الموارد البشرية وثقافة الفريق',
    roleEn: 'HR Executive',
    category: 'software',
    image: '/life/team/ayesha-muzaffar.jpg',
    funFactAr: 'صانعة الابتسامة ومحرك ثقافة العمل الإيجابية والرحلات الميدانية والاحتفالات في إيتش.',
    funFactEn: 'The driving force behind AEITCH company culture, team well-being, and memorable expeditions.',
    favoriteTool: 'People Ops + Culture Frameworks + Team Syncs',
    quoteAr: 'نجاح إيتش ينبع من إيماننا بأن الإنسان والبيئة الإيجابية هما أساس كل إبداع تقني.',
    quoteEn: 'AEITCH’s true engineering prowess starts with empowering every single person on the squad.',
    consent: true,
  },
  {
    id: 'amna',
    nameAr: 'أ. آمنة سفر',
    nameEn: 'Amna Safar',
    roleAr: 'مسؤولة تطوير الأعمال والشراكات',
    roleEn: 'Business Development Executive',
    category: 'ai',
    image: '/life/team/amna-safar.jpg',
    funFactAr: 'تبني جسور الشراكات الاستراتيجية للمؤسسات والشركات الناشئة بحماس ودقة واحترافية عالية.',
    funFactEn: 'Connects enterprise vision with actionable growth, driving key client partnerships and market expansion.',
    favoriteTool: 'Enterprise Partnerships + Strategic Growth + CRM',
    quoteAr: 'التوسع الحقيقي يقوم على بناء علاقات ثقة مستدامة تخدم أهداف العميل وتطلعاته.',
    quoteEn: 'Sustainable growth is built on genuine partnerships and delivering undisputed enterprise value.',
    consent: true,
  },
];
