export const BRAND = {
  name: 'AEITCH',
  nameArabic: 'إيتش',
  hook: 'Digital engineering for enterprises.',
  hookArabic: 'إيتش — هندسة رقمية للمؤسسات.',
  tagline: 'Four services. One engineering standard.',
  taglineArabic: 'أربع خدمات. هندسة واحدة متقنة.',
  description:
    'We build AI automation, digital products, cloud infrastructure and custom software, with senior engineers, in step with Saudi Vision 2030.',
  descriptionArabic:
    'نبني حلول الذكاء الاصطناعي والمنتجات الرقمية والبنية السحابية والبرمجيات المخصصة، بفرق هندسية senior، وبما يخدم مستهدفات رؤية المملكة 2030.',
  email: 'hello@aeitch.com',
  location: 'Saudi Arabia & Global Engineering Pods',
  locationArabic: 'المملكة العربية السعودية وفرق الهندسة المتخصصة',
  gulfTimezone: 'GMT+3 (Riyadh / Mecca)',
  foundedYear: 2022,
  founder: 'Haseeb Ur Rehman Khan',
  phone: '+92 318 4055723',
  phoneDisplay: '+92 318 4055723',
  phonePlaceholder: '0318-4055723',
  whatsappDirect: '+92 318 4055723',
  whatsappUrl: 'https://wa.me/923184055723?text=Hello%20AEITCH,%20I%20would%20like%20to%20inquire%20about%20a%20technical%20consultation.',
  colors: {
    bg: '#000000',
    bgElevated: '#0a0a0a',
    surface1: '#111111',
    surface2: '#181818',
    surfaceBorder: 'rgba(255, 255, 255, 0.10)',
    surfaceBorderStrong: 'rgba(255, 255, 255, 0.18)',
    accent: '#e9800a',
    accentHover: '#ff9420',
    accentPress: '#c96d05',
    accentSoft: 'rgba(233, 128, 10, 0.12)',
    accentGlow: 'rgba(233, 128, 10, 0.35)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.64)',
    textSubtle: 'rgba(255, 255, 255, 0.42)',
    onAccent: '#000000',
    accentFlare: '#ff9420',
    accentEmber: '#e9800a',
  },
};

export const NAV_LINKS = [
  { name: 'Services', nameAr: 'الخدمات', href: '/services' },
  { name: 'Vision 2030', nameAr: 'رؤية 2030', href: '/vision-2030' },
  { name: 'Our Work', nameAr: 'أعمالنا', href: '/case-studies' },
  { name: 'About', nameAr: 'من نحن', href: '/about-us' },
  { name: 'Blog', nameAr: 'المدونة', href: '/insights' },
  { name: 'Contact', nameAr: 'تواصل معنا', href: '/contact-us' },
];

export const OUR_WORK_LINKS = [
  {
    name: 'Case Studies',
    nameAr: 'دراسات الحالة',
    href: '/case-studies',
    desc: 'Real enterprise production deliveries',
    descAr: 'مشاريع مؤسسية حقيقية',
  },
  {
    name: 'Our Products',
    nameAr: 'منتجاتنا',
    href: '/our-products',
    desc: 'ParkKaro and Paylink in market',
    descAr: 'منتجات حقيقية أطلقناها في السوق',
  },
];

export const TRUST_BADGES = [
  { ar: 'مهندسون senior', en: 'Senior engineers', icon: 'Users' },
  { ar: 'إصدارات أسبوعية', en: 'Weekly releases', icon: 'Rocket' },
  { ar: 'ملكية كاملة للكود', en: 'Full code ownership', icon: 'KeyRound' },
  { ar: 'الأمان من أول يوم', en: 'Security from day one', icon: 'ShieldCheck' },
  { ar: 'تواصل بالعربية والإنجليزية', en: 'Arabic and English communication', icon: 'Globe' },
];

export const SERVICES_LINKS = [
  {
    name: 'AI Automation & Integration',
    nameAr: 'أتمتة الذكاء الاصطناعي وتكامل الأنظمة',
    href: '/services/ai-automation',
    slug: 'ai-automation',
    desc: 'Autonomous agent swarms, private sovereign LLMs (vLLM/H100), enterprise RAG & ERP integration',
    descAr: 'وكلاء ذكاء اصطناعي ذاتية، استضافة نماذج سيادية، ومحركات RAG دلالية آمنة',
    icon: 'Cpu',
  },
  {
    name: 'Product Development',
    nameAr: 'تطوير المنتجات الرقمية وهندسة الابتكار',
    href: '/services/product-development',
    slug: 'product-development',
    desc: 'Full-cycle digital product architecture, rapid 8-week MVPs & bilingual GCC SaaS platforms',
    descAr: 'هندسة المنتجات الرقمية المتكاملة، إطلاق نماذج العمل (MVP) في 8 أسابيع وتطبيقات الويب والهاتف',
    icon: 'Rocket',
  },
  {
    name: 'DevOps & Cloud Engineering',
    nameAr: 'ديف أوبس وهندسة السحابة السيادية',
    href: '/services/cloud-devops',
    slug: 'cloud-devops',
    desc: 'In-kingdom multi-cloud (AWS, Azure, GCP Dammam, Oracle), Kubernetes, GitOps & FinOps',
    descAr: 'بنى سحابية محلية متعددة، كوبرنيتيس، تيرا فورم وأتمتة النشر المستمر مع ترشيد التكاليف',
    icon: 'Cloud',
  },
  {
    name: 'Custom Software Development',
    nameAr: 'تطوير البرمجيات المؤسسية المخصصة',
    href: '/services/custom-software',
    slug: 'custom-software',
    desc: 'Mission-critical distributed systems, <80ms APIs, Kafka event streams & ZATCA/SAMA compliance',
    descAr: 'أنظمة مؤسسية موزعة فائقة الأداء، واجهات برمجية سريعة وتكامل الفاتورة وساما',
    icon: 'Code2',
  },
];

// Backwards-compatible legacy service mapping
export const LEGACY_SERVICE_LINKS = [
  { name: 'AI Automation & Integration', href: '/services/ai-automation', slug: 'ai-automation' },
  { name: 'Product Development', href: '/services/product-development', slug: 'product-development' },
  { name: 'DevOps & Cloud Engineering', href: '/services/cloud-devops', slug: 'cloud-devops' },
  { name: 'Custom Software Development', href: '/services/custom-software', slug: 'custom-software' },
];

export const CLOUD_PARTNERS = [
  { name: 'AWS Certified', desc: 'Advanced Cloud Architecture' },
  { name: 'Google Cloud Partner', desc: 'Dammam Region Specialization' },
  { name: 'Microsoft Azure Partner', desc: 'Riyadh Region Enterprise Tier' },
  { name: 'Kubernetes Certified (CKA)', desc: 'Cloud Native Computing Foundation' },
];

export const COMPLIANCE_STANDARDS = [
  { name: 'NCA ECC/CCC Aligned', desc: 'Essential & Cloud Cybersecurity Controls' },
  { name: 'Saudi PDPL Class 3', desc: 'In-Kingdom Data Sovereignty & Encryption' },
  { name: 'ISO 27001 Ready', desc: 'Information Security Management System' },
  { name: 'SOC 2 Type II Practices', desc: 'Enterprise Operational Security' },
];

export const TECH_STACK_LOGOS = [
  'Next.js 15',
  'TypeScript',
  'Go',
  'Python AI',
  'Kubernetes',
  'Terraform',
  'Kafka',
  'AWS Saudi Arabia',
  'Google Cloud Dammam',
  'Azure Riyadh',
  'Oracle Cloud KSA',
  'HashiCorp Vault',
  'PostgreSQL',
  'Redis',
  'OpenTelemetry',
  'Datadog',
  'mada / Apple Pay Ready',
];
