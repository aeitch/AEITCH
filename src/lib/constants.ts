export const BRAND = {
  name: 'AEITCH',
  nameArabic: 'إيتش',
  hook: 'Silicon Valley-Grade Cloud Architecture. Tailored for Saudi Arabia’s Digital Frontier.',
  hookArabic: 'هندسة سحابية بمعايير وادي السيليكون. مصممة خصيصاً للريادة الرقمية في المملكة العربية السعودية.',
  tagline: 'Accelerating the Kingdom’s Digital Future with Cloud-First Engineering & Enterprise DevOps',
  taglineArabic: 'تسريع المستقبل الرقمي للمملكة بهندسة سحابية متقدمة وحلول ديف أوبس مؤسسية',
  description:
    'We combine US product governance with high-velocity engineering pods to build mission-critical digital platforms compliant with Saudi data sovereignty and security standards.',
  descriptionArabic:
    'نجمع بين الحوكمة المعمارية الأمريكية وفرق الهندسة المتسارعة لبناء منصات رقمية سيادية فائقة الحصانة متوافقة مع ضوابط الأمن والسيادة السعودية.',
  email: 'engineering@aeitch.com',
  location: 'Riyadh (King Fahd Road / KAFD) & Global Engineering Hubs',
  locationArabic: 'الرياض (طريق الملك فهد / مركز الملك عبدالله المالي) ومراكز الهندسة العالمية',
  gulfTimezone: 'GMT+3 (Riyadh / Mecca)',
  foundedYear: 2022,
  founder: 'Haseeb Ur Rehman Khan',
  phonePlaceholder: '+966 11 829 4400',
  whatsappDirect: '+966 11 829 4400',
  whatsappUrl: 'https://wa.me/966118294400?text=Hello%20AEITCH%20Riyadh,%20I%20would%20like%20to%20inquire%20about%20cloud%20architecture%20and%20compliance%20for%20our%20enterprise.',
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
  { name: 'Services', nameAr: 'الخدمات الهندسية', href: '/services' },
  { name: 'Vision 2030', nameAr: 'رؤية 2030', href: '/#vision-2030' },
  { name: 'Delivery Model', nameAr: 'محرك الإنجاز', href: '/delivery-engine' },
  { name: 'Case Studies', nameAr: 'دراسات النجاح', href: '/case-studies' },
  { name: 'About', nameAr: 'من نحن', href: '/about-us' },
  { name: 'Contact', nameAr: 'تواصل معنا', href: '/contact-us' },
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
