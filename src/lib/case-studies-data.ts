export interface CaseStudyData {
  id: string;
  slug: string;
  serviceCategory: 'ai-automation' | 'product-development' | 'cloud-devops' | 'custom-software';
  serviceNameAr: string;
  serviceNameEn: string;
  clientName: string;
  clientIndustryAr: string;
  clientIndustryEn: string;
  durationAr: string;
  durationEn: string;
  titleAr: string;
  titleEn: string;
  challengeAr: string;
  challengeEn: string;
  approachAr: string;
  approachEn: string;
  outcomeAr: string;
  outcomeEn: string;
  techStack: string[];
  websiteUrl?: string;
  saudiContextAr?: string;
  saudiContextEn?: string;
  results?: Array<{ metric: string; labelAr: string; labelEn: string }>;
}

export const CANONICAL_CASE_STUDIES: CaseStudyData[] = [
  {
    id: 'cs-01',
    slug: 'rag-powered-ai-agent',
    serviceCategory: 'ai-automation',
    serviceNameAr: 'الذكاء الاصطناعي والأتمتة',
    serviceNameEn: 'AI Automation & Integration',
    clientName: 'FinShield Financials',
    clientIndustryAr: 'التقنية المالية والخدمات المصرفية',
    clientIndustryEn: 'Fintech / Banking',
    durationAr: '6 أسابيع',
    durationEn: '6 weeks',
    titleAr: 'وكيل ذكاء اصطناعي يعتمد RAG يُسرّع الامتثال التنظيمي في التقنية المالية',
    titleEn: 'RAG-Powered AI Agent for Regulatory Fintech Compliance',
    challengeAr:
      'تعدد اللوائح المتغيرة وحجم وثائق الامتثال الكبير وبطء المراجعة اليدوية، مع أنظمة قائمة على القواعد لا تفهم السياق التشغيلي.',
    challengeEn:
      'Evolving regulations, large volumes of compliance documents, and slow manual review, with rule-based systems that could not understand context.',
    approachAr:
      'بنينا وكيلًا يجمع بين الاسترجاع المعزَّز بالتوليد (RAG) ووكلاء ذكيين لتحليل الوثائق التنظيمية والسياسات الداخلية والبيانات التشغيلية، مع أتمتة التقارير.',
    approachEn:
      'We combined retrieval-augmented generation (RAG) with intelligent agents to analyze regulatory documents, internal policies, and transactional data with automated reporting.',
    outcomeAr:
      'إطار امتثال أكثر موثوقية وتقليل مخاطر التشغيل وتقصير وقت التحضير للتدقيق من أسابيع إلى ساعات معدودة.',
    outcomeEn:
      'A dependable compliance framework, lower operational risk, and audit preparation shortened from weeks to verified hours.',
    techStack: ['Python', 'Pinecone', 'OpenAI', 'AWS'],
    saudiContextAr:
      'تتطلب القطاعات المنظمة في المملكة أنظمة ذكاء اصطناعي قابلة للتفسير والتدقيق فوق وثائقها الخاصة، بما يتوافق مع ضوابط حماية البيانات الحساسة.',
    saudiContextEn:
      'Regulated sectors require auditable, explainable AI over internal documents, aligned with data residency and privacy principles.',
    results: [
      { metric: '< 2h', labelAr: 'زمن التحضير للتدقيق', labelEn: 'Audit Prep Time' },
      { metric: '100%', labelAr: 'فهرسة وتوثيق الوثائق', labelEn: 'Document Indexing' },
    ],
  },
  {
    id: 'cs-02',
    slug: 'autonomous-predictive-procurement',
    serviceCategory: 'ai-automation',
    serviceNameAr: 'الذكاء الاصطناعي والأتمتة',
    serviceNameEn: 'AI Automation & Integration',
    clientName: 'Global Logistics Corp',
    clientIndustryAr: 'سلاسل الإمداد والخدمات اللوجستية',
    clientIndustryEn: 'Supply Chain & Logistics',
    durationAr: '10 أسابيع',
    durationEn: '10 weeks',
    titleAr: 'وكيل ذكاء اصطناعي مستقل لمشتريات استباقية',
    titleEn: 'Autonomous AI Agent for Predictive Procurement',
    challengeAr:
      'قرارات شراء رد فعلية وبيانات موردين مبعثرة ودقة تنبؤ محدودة وتحليل يدوي يسبب التأخير وتراكم المخزون الزائد.',
    challengeEn:
      'Reactive purchasing, fragmented supplier data, limited forecasting accuracy, and manual analysis causing delays and excess inventory.',
    approachAr:
      'طبقة تنسيق ذكية تحلل إشارات الطلب وأداء الموردين واتجاهات السوق وتقدم توصيات فورية للتوريد والتعويض وتقليل المخاطر، ومتكاملة مع أنظمة ERP واللوجستيات.',
    approachEn:
      'An orchestration layer analyzing demand signals, supplier performance, and market trends to deliver real-time sourcing, replenishment, and risk recommendations integrated with ERPs.',
    outcomeAr:
      'تحسين دقة التنبؤ، خفض تكاليف الشراء غير المبررة، وزيادة مرونة سلسلة الإمداد ضد تقلبات السوق.',
    outcomeEn:
      'Measurable boost in forecast accuracy, reduced procurement overhead, and stronger end-to-end supply chain resilience.',
    techStack: ['Python', 'LangGraph', 'Pinecone', 'OpenAI', 'GitHub Actions'],
    websiteUrl: 'https://globallogisticscorp.com',
    results: [
      { metric: '94%', labelAr: 'دقة التنبؤ بالطلب', labelEn: 'Demand Forecast Accuracy' },
      { metric: 'Real-time', labelAr: 'توصيات التوريد الفورية', labelEn: 'Real-time Sourcing' },
    ],
  },
  {
    id: 'cs-03',
    slug: 'enterprise-knowledge-retrieval',
    serviceCategory: 'ai-automation',
    serviceNameAr: 'الذكاء الاصطناعي والأتمتة',
    serviceNameEn: 'AI Automation & Integration',
    clientName: 'MetroTech Enterprises',
    clientIndustryAr: 'تقنية المعلومات المؤسسية',
    clientIndustryEn: 'Enterprise IT',
    durationAr: '8 أسابيع',
    durationEn: '8 weeks',
    titleAr: 'وكيل مؤسسي للوصول الفوري إلى المعرفة',
    titleEn: 'Enterprise AI Agent for Instant Knowledge Retrieval',
    challengeAr:
      'مصادر بيانات مبعثرة وبحث يدوي بطيء عن المعلومات داخل الأدوات والوثائق الداخلية، يهدر مئات الساعات شهريًا من وقت الفرق.',
    challengeEn:
      'Scattered data sources and slow manual search across internal tools and documents, wasting team hours every month.',
    approachAr:
      'طبقة استرجاع معرفة تربط قواعد البيانات والوثائق والأنظمة التشغيلية، وتفهم نية المستخدم وتجيب بدقة وسياق مع ضوابط وصول متكاملة مع أمان المؤسسة.',
    approachEn:
      'A knowledge-retrieval layer connecting databases, documents, and operational systems that understands intent and context, with enterprise-grade access control.',
    outcomeAr:
      'تقليل وقت البحث عن المستندات والمعلومات بنسبة تفوق 70% وتحسين سرعة ودقة اتخاذ القرار التشغيلي.',
    outcomeEn:
      'Substantial reduction in internal information search time and accelerated cross-functional decision accuracy.',
    techStack: ['Python', 'Pinecone', 'OpenAI', 'AWS VPC'],
    saudiContextAr:
      'يُعد المساعد الرقمي فوق الوثائق الداخلية ثنائية اللغة (عربي وإنجليزي) نقطة بداية مثالية للتحول الرقمي المؤسسي.',
    saudiContextEn:
      'Internal knowledge assistants indexing bilingual documents represent an ideal foundation for institutional modernization.',
    results: [
      { metric: '< 3s', labelAr: 'متوسط زمن استرجاع المعلومة', labelEn: 'Mean Query Latency' },
      { metric: '100%', labelAr: 'عزل البيانات المشفرة', labelEn: 'Private VPC Isolation' },
    ],
  },
  {
    id: 'cs-04',
    slug: 'ai-predictive-manufacturing',
    serviceCategory: 'ai-automation',
    serviceNameAr: 'الذكاء الاصطناعي والأتمتة',
    serviceNameEn: 'AI Automation & Integration',
    clientName: 'Precision Manufacturing Ltd',
    clientIndustryAr: 'التصنيع الصناعي وسلاسل الإنتاج',
    clientIndustryEn: 'Industrial Manufacturing',
    durationAr: '12 أسبوعًا',
    durationEn: '12 weeks',
    titleAr: 'تحليلات تنبؤية بالذكاء الاصطناعي لتقليل التوقف في التصنيع',
    titleEn: 'AI Predictive Analytics for Zero-Downtime Manufacturing',
    challengeAr:
      'أعطال معدات غير مخططة وصيانة رد فعلية ورؤية محدودة لحالة الآلات الحساسة على خطوط التجميع.',
    challengeEn:
      'Unplanned equipment failures, reactive maintenance, and limited visibility into machine health across assembly lines.',
    approachAr:
      'إطار تحليلات يراقب أداء المعدات والإشارات التشغيلية والمتغيرات البيئية، ويكتشف أنماط العطل مبكرًا ويتنبأ بحاجة الصيانة مع لوحات فورية لفرق التشغيل.',
    approachEn:
      'An analytics framework monitoring equipment performance, telemetry signals, and environmental metrics to flag failure patterns before breakdowns occur.',
    outcomeAr:
      'تحقيق استمرارية تشغيلية في خطوط الإنتاج الحرجة، خفض تكلفة الصيانة الطارئة، والسعي نحو التوقف الصفري غير المخطط.',
    outcomeEn:
      'Continuous line uptime, reduced emergency maintenance expenditure, and actionable predictive maintenance schedules.',
    techStack: ['Python', 'PyTorch', 'AWS', 'Grafana', 'Prometheus'],
    websiteUrl: 'https://precisionmfg.example.com',
    saudiContextAr:
      'تولي المشاريع الصناعية الكبرى في المملكة اهتمامًا بالغًا بسلامة الأصول واستمرارية العمليات دون توقف.',
    saudiContextEn:
      'Industrial and mega-infrastructure operators prioritize predictive maintenance and uninterrupted asset longevity.',
    results: [
      { metric: 'Early Alert', labelAr: 'تنبيه مبكر قبل 72 ساعة', labelEn: '72h Pre-failure Alert' },
      { metric: '24/7', labelAr: 'مراقبة حية للمعدات', labelEn: 'Continuous Telemetry' },
    ],
  },
  {
    id: 'cs-05',
    slug: 'ai-marketing-intelligence-suite',
    serviceCategory: 'ai-automation',
    serviceNameAr: 'الذكاء الاصطناعي والأتمتة',
    serviceNameEn: 'AI Automation & Integration',
    clientName: 'AdCraft AI',
    clientIndustryAr: 'برمجيات التسويق الرقمي وSaaS',
    clientIndustryEn: 'SaaS & Digital Marketing',
    durationAr: '10 أسابيع',
    durationEn: '10 weeks',
    titleAr: 'منصة ذكاء تسويقي مؤتمتة بالذكاء الاصطناعي',
    titleEn: 'AI Marketing Intelligence Automation Suite',
    challengeAr:
      'رؤى التسويق محبوسة في أدوات منفصلة، مع تقارير يدوية وتأخر في استخلاص الرؤى وتحسين غير متسق للحملات.',
    challengeEn:
      'Marketing insights trapped in disconnected tools, manual reporting, delayed insights, and inconsistent campaign optimization.',
    approachAr:
      'منصة تحلل فعالية المحتوى لحظيًا وتتنبأ باتجاهات الأداء وتؤتمت سير تحسين الحملات عبر القنوات المتعددة، متكاملة مع مصادر البيانات الحالية.',
    approachEn:
      'A platform analyzing content effectiveness in real time, forecasting performance trends, and automating campaign workflows across channels.',
    outcomeAr:
      'اتخاذ قرارات تسويقية أسرع، وأتمتة توليد التقارير وتوجيه الميزانيات للقنوات ذات العائد الأعلى.',
    outcomeEn:
      'Faster campaign decision loops, automated reporting pipelines, and optimized ad budget allocations.',
    techStack: ['Next.js', 'Python', 'FastAPI', 'OpenAI', 'AWS'],
    websiteUrl: 'https://adcraft.ai',
    results: [
      { metric: 'Real-time', labelAr: 'تحليل أداء متعدد القنوات', labelEn: 'Multi-Channel Analytics' },
      { metric: 'Automated', labelAr: 'تقارير أداء دورية', labelEn: 'Automated Reporting' },
    ],
  },
  {
    id: 'cs-06',
    slug: 'high-conversion-fintech-mvp',
    serviceCategory: 'product-development',
    serviceNameAr: 'تطوير المنتجات',
    serviceNameEn: 'Product Development',
    clientName: 'SwiftSpend AI',
    clientIndustryAr: 'التقنية المالية والادخار الشخصي',
    clientIndustryEn: 'FinTech & Personal Finance',
    durationAr: '8 أسابيع',
    durationEn: '8 weeks',
    titleAr: 'MVP تقني مالي عالي التحويل: محرك استثمار ذاتي',
    titleEn: 'High-Conversion Fintech MVP: Autonomous Investment Engine',
    challengeAr:
      'دخول مجال الاستثمار الرقمي بمنتج يجذب المستخدمين بسرعة ويؤتمت إدارة المحفظة بحد أدنى من التدخل اليدوي، مع تجربة مستخدم مبسطة.',
    challengeEn:
      'Entering digital investing with a product that onboarded users fast and automated portfolio distribution with seamless mobile UX.',
    approachAr:
      'حوّلنا خوارزمية معقدة إلى تطبيق استثمار صغير جاهز للإنتاج، باستخدام هندسة full-stack رشيقة، وإطار استثمار يحلل إشارات السوق وملفات المخاطر.',
    approachEn:
      'Transformed a proprietary algorithm into a production-ready micro-investing app with agile full-stack Next.js and React Native engineering.',
    outcomeAr:
      'إطلاق MVP في 8 أسابيع نجح في تسريع انضمام المستخدمين ورفع التفاعل وبناء أساس برمجي قابل للتوسع مع نمو العملاء.',
    outcomeEn:
      'An 8-week MVP launch accelerating onboarding velocity, raising user engagement, and providing a scalable foundation for institutional growth.',
    techStack: ['Next.js', 'React Native', 'TypeScript', 'PostgreSQL', 'Prisma', 'AWS'],
    websiteUrl: 'https://swiftspend.ai',
    saudiContextAr:
      'تخضع الحلول المالية في المملكة لتشريعات دقيقة، لذا نركز على المعمارية البرمجية المنضبطة والأمان دون ادعاء تقديم استشارات مالية.',
    saudiContextEn:
      'Financial applications demand strict architectural integrity, robust encryption, and absolute compliance transparency.',
    results: [
      { metric: '8 Weeks', labelAr: 'مدة الإطلاق في السوق', labelEn: 'Launch to Market' },
      { metric: 'Seamless', labelAr: 'انضمام سهل للمستخدمين', labelEn: 'Frictionless Onboarding' },
    ],
  },
  {
    id: 'cs-07',
    slug: 'gamified-wellness-portal',
    serviceCategory: 'product-development',
    serviceNameAr: 'تطوير المنتجات',
    serviceNameEn: 'Product Development',
    clientName: 'PulseWork Health',
    clientIndustryAr: 'التقنية الصحية وعافية المؤسسات',
    clientIndustryEn: 'HealthTech & Corporate Wellness',
    durationAr: '6 أسابيع',
    durationEn: '6 weeks',
    titleAr: 'بوابة تحليلات عافية الموظفين بأسلوب الألعاب التحفيزية',
    titleEn: 'Gamified Enterprise Wellness Analytics Portal',
    challengeAr:
      'ضعف مشاركة الموظفين في برامج العافية المؤسسية، ورؤية محدودة لإدارات الموارد البشرية لقياس الأثر الفعلي للمبادرات.',
    challengeEn:
      'Low employee engagement in wellness initiatives, limited HR visibility, and lack of real-time outcome tracking.',
    approachAr:
      'منظومة مخصصة تشجع المشاركة عبر آليات التحفيز (Gamification)، وتلتقط التفاعل والأداء لحظيًا، مع لوحات للقيادة وتحليلات لحماية خصوصية الموظفين.',
    approachEn:
      'A custom gamified platform capturing real-time employee engagement metrics alongside private, anonymized HR leadership dashboards.',
    outcomeAr:
      'رفع معدل التفاعل والمشاركة وتحسين مؤشرات الرضا المؤسسي مع قرارات مدفوعة بالبيانات الموثوقة.',
    outcomeEn:
      'Elevated participation rates, enhanced team wellbeing, and data-driven HR wellness strategies protected by strict privacy controls.',
    techStack: ['Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Chart.js'],
    websiteUrl: 'https://pulsework.health',
    saudiContextAr:
      'تُصنف بيانات الموظفين الصحية كبيانات حساسة وفق نظام حماية البيانات الشخصية (PDPL)، وتتطلب معمارية تكفل التشفير وعدم الكشف عن الهوية.',
    saudiContextEn:
      'Health data is treated as sensitive personal data under Saudi PDPL, requiring privacy-by-design anonymization and localized controls.',
    results: [
      { metric: '6 Weeks', labelAr: 'زمن التسليم للإنتاج', labelEn: 'Production Delivery' },
      { metric: '100%', labelAr: 'تشفير بيانات الموظفين', labelEn: 'Anonymized Health Data' },
    ],
  },
  {
    id: 'cs-08',
    slug: 'scalable-saas-logistics',
    serviceCategory: 'product-development',
    serviceNameAr: 'تطوير المنتجات',
    serviceNameEn: 'Product Development',
    clientName: 'LogiTrack Global',
    clientIndustryAr: 'البرمجيات كخدمة وسلاسل الإمداد اللوجستية',
    clientIndustryEn: 'Logistics SaaS',
    durationAr: '10 أشهر',
    durationEn: '10 months',
    titleAr: 'منصة SaaS قابلة للتوسع للوجستيات اللحظية',
    titleEn: 'Scalable SaaS Platform for Real-Time Logistics',
    challengeAr:
      'حاجة ماسة لمنصة مركزية لإدارة الشحنات وتتبع الأسطول ومعالجة بيانات تشغيلية حية دون اختناقات، مع أنظمة قديمة عجزت عن التوسع.',
    challengeEn:
      'A central platform needed to manage shipments, track fleets, and stream live operations without latency, where legacy tooling collapsed.',
    approachAr:
      'معمارية سحابية تتيح تدفق البيانات بين أنظمة الإرسال والتتبع ولوحات التشغيل، مع تحديثات فورية عبر WebSockets وتكاملات واجهات طرف ثالث.',
    approachEn:
      'Cloud-native architecture enabling continuous data streaming across dispatch, tracking, and operational screens via real-time WebSockets.',
    outcomeAr:
      'رؤية تشغيلية شاملة لكامل الأسطول، تقليل تأخير الشحنات، ونمو في السعة التشغيلية للمنصة لاستيعاب آلاف العمليات المتزامنة.',
    outcomeEn:
      'Complete fleet visibility, reduced dispatch friction, and scalable system throughput processing continuous concurrent operations.',
    techStack: ['AWS', 'Vue.js', 'Laravel', 'WebSockets', 'PostgreSQL'],
    saudiContextAr:
      'يُمثل القطاع اللوجستي إحدى الركائز الكبرى في رؤية 2030 لترسيخ مكانة المملكة كمركز لوجستي عالمي.',
    saudiContextEn:
      'Logistics is a key Vision 2030 priority pillar aimed at transforming the Kingdom into a global logistics and transport hub.',
    results: [
      { metric: 'Real-time', labelAr: 'تتبع فوري عبر WebSockets', labelEn: 'Live WebSocket Sync' },
      { metric: 'High-Scale', labelAr: 'معالجة شحنات متزامنة', labelEn: 'High-Volume Dispatch' },
    ],
  },
  {
    id: 'cs-09',
    slug: 'paylink-devops-transformation',
    serviceCategory: 'cloud-devops',
    serviceNameAr: 'DevOps وهندسة السحابة',
    serviceNameEn: 'DevOps & Cloud Engineering',
    clientName: 'PayLink Solutions',
    clientIndustryAr: 'التقنية المالية والمدفوعات',
    clientIndustryEn: 'Fintech Payments',
    durationAr: '6 أسابيع',
    durationEn: '6 weeks',
    titleAr: 'تحول DevOps لدعم نمو شركة تقنية مالية',
    titleEn: 'DevOps Transformation for a Scaling Fintech',
    challengeAr:
      'تأخر النشر وبيئات غير متسقة ورؤية محدودة لأداء النظام مع ارتفاع حجم المعاملات، وعمليات إصدار يدوية تبطئ الابتكار وتزيد المخاطر.',
    challengeEn:
      'Deployment delays, inconsistent environments, and limited observability as transaction volume spiked; manual release steps increased operational risk.',
    approachAr:
      'خطوط CI/CD مؤتمتة بالكامل، بنية تحتية كشيفرة عبر Terraform، ومراقبة أداء على مدار الساعة لتتمكن الفرق من النشر بسرعة مع ثبات الموثوقية.',
    approachEn:
      'Automated CI/CD pipelines, Infrastructure as Code with Terraform, and 24/7 observability enabling faster deployments with strict reliability.',
    outcomeAr:
      'تقصير دورات النشر من ساعات إلى دقائق، تحسين الجاهزية التشغيلية بنسبة 99.99%، وتسريع إطلاق الميزات في السوق.',
    outcomeEn:
      'Dramatically shorter deployment cycles, resilient 99.99% multi-AZ uptime, and accelerated feature delivery into production.',
    techStack: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'Prometheus'],
    results: [
      { metric: '99.99%', labelAr: 'جاهزية النظام وسرعة الاستجابة', labelEn: 'Uptime Reliability' },
      { metric: 'Minutes', labelAr: 'زمن النشر الآلي المستمر', labelEn: 'Automated CI/CD Deploy' },
    ],
  },
  {
    id: 'cs-10',
    slug: 'microservices-system-modernization',
    serviceCategory: 'cloud-devops',
    serviceNameAr: 'DevOps وهندسة السحابة',
    serviceNameEn: 'DevOps & Cloud Engineering',
    clientName: 'OmniMarket Retail',
    clientIndustryAr: 'التجزئة والتجارة الإلكترونية العالمية',
    clientIndustryEn: 'Global Retail & E-commerce',
    durationAr: '24 أسبوعًا',
    durationEn: '24 weeks',
    titleAr: 'التحول إلى الخدمات المصغرة لتحديث الأنظمة',
    titleEn: 'Microservices Transformation for System Modernization',
    challengeAr:
      'نظام قديم شديد الترابط يبطئ التطوير ويرفع تكلفة الصيانة، وكل تحديث برمجيات يتطلب اختبارات واسعة وتوقفًا غير مرغوب فيه للخدمة.',
    challengeEn:
      'A monolithic legacy system slowing development and escalating maintenance overhead; each release required extensive testing and downtime.',
    approachAr:
      'نهج تحول على مراحل يقسّم النظام الأحادي إلى خدمات مصغرة قابلة للنشر باستقلال عبر Kubernetes، مع ربط المكونات القديمة بالجديدة دون تعطيل.',
    approachEn:
      'A phased migration decomposing the monolith into independently deployable containerized microservices managed on Kubernetes without business downtime.',
    outcomeAr:
      'دورات تطوير أسرع، موثوقية تشغيلية أعلى، وبنية مرنة تدعم الابتكار المستمر والتوسع في مواسم الذروة.',
    outcomeEn:
      'Accelerated release velocity, independent service scalability during peak shopping seasons, and minimal operational downtime.',
    techStack: ['AWS', 'Python', 'Kubernetes', 'Docker', 'Postman'],
    results: [
      { metric: 'Zero Loss', labelAr: 'هجرة بدون توقف للخدمة', labelEn: 'Zero-Downtime Migration' },
      { metric: 'Independent', labelAr: 'نشر منفصل للخدمات', labelEn: 'Decoupled Releases' },
    ],
  },
  {
    id: 'cs-11',
    slug: 'insurance-automation-api',
    serviceCategory: 'custom-software',
    serviceNameAr: 'البرمجيات المخصصة',
    serviceNameEn: 'Custom Software Development',
    clientName: 'SecureGuard Insurance',
    clientIndustryAr: 'التأمين والتقنية التأمينية (InsurTech)',
    clientIndustryEn: 'Insurance & InsurTech',
    durationAr: '12 أسبوعًا',
    durationEn: '12 weeks',
    titleAr: 'تكامل واجهات API لأتمتة التأمين على نطاق واسع',
    titleEn: 'API System Integration for Insurance Automation at Scale',
    challengeAr:
      'أنظمة منفصلة لإدارة الوثائق والمطالبات وبيانات العملاء، وعمليات يدوية تسبب التأخير وتكرار الأخطاء الإدارية.',
    challengeEn:
      'Disconnected legacy platforms for policy management, claims, and policyholders; manual steps caused processing backlogs and reconciliation errors.',
    approachAr:
      'طبقة تكامل مرنة قائمة على واجهات API تتيح تبادل البيانات لحظيًا بين المنصات القديمة والخدمات الرقمية الحديثة مع قواعد عمل تتكيف بسرعة.',
    approachEn:
      'An event-driven API integration layer synchronizing data in real time between core insurance platforms and modern digital distribution channels.',
    outcomeAr:
      'إصدار وثائق أسرع، أتمتة سير معالجة المطالبات، وتحسين الرؤية التشغيلية والتدقيق المالي الداخلي.',
    outcomeEn:
      'Streamlined policy issuance, automated straight-through claims workflows, and enhanced end-to-end operational visibility.',
    techStack: ['Python', 'AWS', 'Terraform', 'Swagger', 'GitLab CI'],
    results: [
      { metric: 'Instant', labelAr: 'مزامنة فورية للوثائق', labelEn: 'Instant Sync' },
      { metric: 'Automated', labelAr: 'معالجة مؤتمتة للمطالبات', labelEn: 'Automated Claims' },
    ],
  },
  {
    id: 'cs-12',
    slug: 'scalable-healthtech-platform',
    serviceCategory: 'custom-software',
    serviceNameAr: 'البرمجيات المخصصة',
    serviceNameEn: 'Custom Software Development',
    clientName: 'CareLink Systems',
    clientIndustryAr: 'الرعاية الصحية والتقنية الطبية',
    clientIndustryEn: 'Healthcare & HealthTech',
    durationAr: '16 أسبوعًا',
    durationEn: '16 weeks',
    titleAr: 'هندسة برمجية متكاملة لمنصة تقنية صحية قابلة للتوسع',
    titleEn: 'End-to-End Engineering for a Scalable HealthTech Platform',
    challengeAr:
      'حاجة إلى نهج هندسي موحد لتحديث الحل الصحي مع الحفاظ على الأداء وأمن البيانات والجاهزية التنظيمية وسرية السجلات الطبية.',
    challengeEn:
      'A unified engineering approach needed to modernize a clinical platform while guaranteeing zero latency, strict data privacy, and regulatory readiness.',
    approachAr:
      'إدارة التخطيط المعماري وتطوير النظام والتكامل وتحسين الأداء على مدار دورة المنتج كاملة، ونشر سحابي يتيح معالجة آمنة للبيانات.',
    approachEn:
      'Full lifecycle systems engineering, responsive clinical portal development, and resilient cloud hosting enforcing healthcare data protection standards.',
    outcomeAr:
      'منصة تقنية صحية قابلة للتوسع، أكثر كفاءة تشغيليًا، وأكثر موثوقية في خدمة الأطباء والمرضى.',
    outcomeEn:
      'A high-performance HealthTech platform providing reliable uptime, rapid patient record queries, and rock-solid privacy governance.',
    techStack: ['AWS', 'Python', 'Pinecone', 'React', 'PostgreSQL'],
    saudiContextAr:
      'تخضع السجلات الصحية في المملكة لمعايير حماية مشددة، ونلتزم بهندسة أنظمة متوافقة مع متطلبات حماية البيانات الصحية الوطنية.',
    saudiContextEn:
      'Healthcare data mandates the highest tier of confidentiality and data residency under national health data protection guidelines.',
    results: [
      { metric: '16 Weeks', labelAr: 'تسليم النظام المتكامل', labelEn: 'Full Delivery' },
      { metric: 'Compliant', labelAr: 'جاهزية أمنية وتشغيلية', labelEn: 'Security Ready' },
    ],
  },
];
