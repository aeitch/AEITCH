export interface InsightSection {
  headingAr: string;
  headingEn: string;
  paragraphsAr: string[];
  paragraphsEn: string[];
  bulletPointsAr?: string[];
  bulletPointsEn?: string[];
  calloutAr?: string;
  calloutEn?: string;
}

export interface InsightArticle {
  slug: string;
  serviceId: 'ai-automation' | 'product-development' | 'cloud-devops' | 'custom-software' | 'vision-2030';
  category: {
    ar: string;
    en: string;
  };
  readTime: {
    ar: string;
    en: string;
  };
  date: {
    ar: string;
    en: string;
  };
  title: {
    ar: string;
    en: string;
  };
  excerpt: {
    ar: string;
    en: string;
  };
  takeaway: {
    ar: string;
    en: string;
  };
  relatedService: {
    nameAr: string;
    nameEn: string;
    href: string;
  };
  sections: InsightSection[];
}

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    slug: 'ai-agents-arabic-english-documents',
    serviceId: 'ai-automation',
    category: {
      ar: 'الذكاء الاصطناعي والأتمتة',
      en: 'AI Automation & Integration',
    },
    readTime: {
      ar: '7 دقائق قراءة',
      en: '7 min read',
    },
    date: {
      ar: 'أكتوبر 2026',
      en: 'October 2026',
    },
    title: {
      ar: 'من التجربة إلى الإنتاج: كيف تبني وكيل ذكاء اصطناعي فوق وثائق مؤسستك العربية والإنجليزية',
      en: 'From Pilot to Production: Building an AI Agent Over Your Arabic and English Documents',
    },
    excerpt: {
      ar: 'دليل معماري عملي للانتقال من النماذج التجريبية البسيطة إلى وكلاء أذكياء يعتمدون RAG ويتعاملون بدقة مع المستندات المؤسسية ثنائية اللغة، مع ضمان عدم تسريب البيانات.',
      en: 'A practical architectural guide for transitioning from basic chatbot prototypes to production-grade RAG agents that accurately query bilingual Arabic/English enterprise corpora without data leakage.',
    },
    takeaway: {
      ar: 'تشغيل وكيل استرجاع ذكي (RAG) للوثائق ثنائية اللغة في الإنتاج يتطلب ثلاثة شروط معمارية: تقسيم النصوص مع مراعاة الصرف العربي (Morphology-Aware Chunking)، واعتماد نماذج تضمين متعددة اللغات مدربة على المصطلحات التقنية والتشغيلية، وتطبيق عزل صارم لأذونات الوصول (Role-Based ACLs) على مستوى متجهات البحث قبل إرسال السياق للنموذج.',
      en: 'Running production bilingual RAG requires three architectural imperatives: morphology-aware Arabic text chunking, multilingual embeddings calibrated on enterprise vernacular, and strict role-based access control (ACL) filtering at the vector retrieval layer before context is injected into the LLM.',
    },
    relatedService: {
      nameAr: 'الذكاء الاصطناعي والأتمتة',
      nameEn: 'AI Automation & Integration',
      href: '/services/ai-automation',
    },
    sections: [
      {
        headingAr: '1. معضلة الانتقال من بيئة التجارب إلى بيئة الإنتاج',
        headingEn: '1. The Pilot-to-Production Chasm',
        paragraphsAr: [
          'تبدأ معظم المؤسسات مشاريع الذكاء الاصطناعي بنموذج تجريبي (PoC) سريع مبني فوق واجهات برمجة عامة. تبدو النتائج مبهرة في أول 50 استعلاماً بسيطاً، ولكن عندما يُطرح النظام لمئات الموظفين للبحث في آلاف المستندات واللوائح الداخلية، تظهر التشققات المعمارية: إجابات غير دقيقة (هلوسة)، استرجاع نصوص من وثائق سرية لا يملك الموظف حق الاطلاع عليها، وبطء شديد في معالجة المستندات العربية الممسوحة ضوئياً.',
          'الانتقال للإنتاج ليس مجرد زيادة في موارد الخادم، بل إعادة هندسة شاملة لدورة حياة البيانات، بدءاً من استخراج النصوص وتنظيفها، وحتى حوكمة السياق ومراقبة التكاليف.',
        ],
        paragraphsEn: [
          'Most enterprise AI initiatives launch with an ad-hoc Proof of Concept (PoC) wrapping a public API. While initial demos look promising across simple prompt queries, structural cracks appear once rolled out to hundreds of corporate users: subtle hallucinations, retrieval of confidential documents without authorization, and sluggish latency across scanned Arabic PDFs.',
          'Crossing into production is not an infrastructure scaling exercise; it is an end-to-end data pipeline refactor—from token extraction and semantic chunking to context governance and deterministic evaluation.',
        ],
      },
      {
        headingAr: '2. التحديات الفريدة للمستندات العربية وثنائية اللغة',
        headingEn: '2. Unique Challenges of Bilingual Arabic & English Corpora',
        paragraphsAr: [
          'تحتوي المستندات المؤسسية في السوق السعودي غالباً على مزيج من المصطلحات الإنجليزية الفنية والصياغات القانونية أو الإدارية باللغة العربية الفصحى. تفشل محركات التقطيع التقليدية المعتمدة على عدد الكلمات أو الأحرف في فهم البنية الصرفية للجملة العربية، مما يؤدي إلى قطع الكلمات المفتاحية وفقدان الرابط الدلالي.',
          'علاوة على ذلك، فإن الاعتماد على نماذج تضمين إنجليزية بحتة يؤدي إلى تمثيل ضعيف للمفردات العربية، مما يقلل من دقة استرجاع المستندات ذات الصلة.',
        ],
        paragraphsEn: [
          'Enterprise documentation in the Kingdom routinely interweaves English technical terminology with formal Arabic regulatory and operational prose. Naive fixed-token chunking strategies split composite Arabic syntax and compound terms across chunk boundaries, degrading retrieval recall.',
          'Furthermore, relying on English-centric embedding models produces sparse, distorted vector representations for Arabic vernacular, causing the retrieval pipeline to miss critical clauses in contracts and operational manuals.',
        ],
        bulletPointsAr: [
          'تقطيع ذكي قائم على الفقرات والترقيم اللغوي وليس الأطوال الثابتة العشوائية.',
          'استخدام نماذج تضمين ثنائية اللغة مدعومة بتقييمات معيارية واقعية (مثل BAAI أو Cohere Embed Multilingual).',
          'الاحتفاظ بالبيانات الوصفية (Metadata) لكل فقرة تشمل تاريخ الإصدار والقسم والدرجة الأمنية.',
        ],
        bulletPointsEn: [
          'Implement semantic chunking bounded by paragraph structure and punctuation rather than arbitrary character counts.',
          'Deploy high-rank multilingual embeddings benchmarked against formal Arabic text (e.g. BAAI BGE-M3 or Cohere Embed v3).',
          'Attach granular metadata tags to each vector: document version, originating department, and security classification tier.',
        ],
      },
      {
        headingAr: '3. المعمارية الهندسية: استرجاع مقيد بالأذونات (ACL-Aware RAG)',
        headingEn: '3. Architectural Blueprint: ACL-Aware Vector Retrieval',
        paragraphsAr: [
          'أخطر ثغرة في أنظمة RAG غير المهندسة هي "تجاوز صلاحيات الوصول". إذا كان النموذج قادراً على قراءة كل متجهات قاعدة البيانات، فإنه قد يسترجع تقرير رواتب أو مذكرة اندماج سرية لعرضها في إجابة موظف مبتدئ.',
          'الحل المعماري هو تطبيق التصفية الأمنية المبكرة (Pre-filtering) على مستوى قاعدة بيانات المتجهات (Vector Database)؛ بحيث يتم تضمين هويات الأذونات (Access Control Lists) في استعلام البحث قبل احتساب تشابه المتجهات.',
        ],
        paragraphsEn: [
          'The most critical vulnerability in immature RAG implementations is authorization leakage. If the vector retrieval layer queries the entire database without tenant and user restrictions, sensitive executive payroll data or Board memos can easily surface in a junior analyst’s response.',
          'The engineering solution is metadata pre-filtering directly at the vector query tier: the user’s validated security tokens and Active Directory / IAM groups are injected into the vector query filter before cosine similarity calculations occur.',
        ],
        calloutAr: 'القاعدة الذهبية: لا ترسل أي معلومة إلى النموذج التوليدي ما لم يكن المستخدم الحالي مخولاً نظامياً برؤيتها في نظام المصدر الأصلي.',
        calloutEn: 'Golden Rule: Never pass an enterprise document chunk into the LLM context window unless the requesting identity has verified source-system read permissions.',
      },
      {
        headingAr: '4. القياس والمراقبة وتقليل الهلوسة في بيئة الإنتاج',
        headingEn: '4. Operational Telemetry & Hallucination Mitigation',
        paragraphsAr: [
          'لضمان استقرار الوكيل، يجب قياس ثلاث معايير رئيسية لكل إجابة: ملاءمة السياق المسترجع (Context Relevance)، وأمانة الإجابة للمصدر (Faithfulness)، وملاءمة الإجابة لسؤال المستخدم (Answer Relevance).',
          'من خلال توثيق كل عملية استدعاء في سجل تدقيق غير قابل للتعديل وتحديد مسارات التحقق المستمر، تضمن المؤسسة تقليص نسبة الهلوسة إلى ما يقارب الصفر والامتثال لمتطلبات التدقيق الداخلي.',
        ],
        paragraphsEn: [
          'Production reliability demands automated evaluation across three core telemetry axes: Context Precision (did we pull the right snippets?), Faithfulness (is the answer strictly grounded in the retrieved chunks?), and Answer Relevance (does the response directly address user intent?).',
          'By logging full trace lineage into tamper-evident telemetry stores, engineering teams achieve near-zero hallucination rates while fulfilling regulatory audit requirements.',
        ],
      },
    ],
  },
  {
    slug: 'pdpl-compliant-ai-systems',
    serviceId: 'ai-automation',
    category: {
      ar: 'الذكاء الاصطناعي والامتثال',
      en: 'AI & PDPL Compliance',
    },
    readTime: {
      ar: '8 دقائق قراءة',
      en: '8 min read',
    },
    date: {
      ar: 'أكتوبر 2026',
      en: 'October 2026',
    },
    title: {
      ar: 'تصميم أنظمة الذكاء الاصطناعي مع مراعاة نظام حماية البيانات الشخصية (PDPL)',
      en: 'Designing AI Systems with Saudi PDPL in Mind',
    },
    excerpt: {
      ar: 'كيف تصمم معمارية بيانات لأنظمة الذكاء الاصطناعي تتوافق مع نظام حماية البيانات الشخصية السعودي وضوابط سدايا (SDAIA) من اليوم الأول دون إعاقة الابتكار.',
      en: 'How enterprise architects can engineer AI data pipelines, LLM fine-tuning, and inference layers that conform to Saudi Arabia’s Personal Data Protection Law (PDPL) and SDAIA guidelines by design.',
    },
    takeaway: {
      ar: 'الامتثال لنظام PDPL في مشاريع الذكاء الاصطناعي لا يحل عبر إخلاء مسؤولية قانوني، بل يتطلب معمارية تقنية تحمي الخصوصية بالبناء (Privacy by Design): تطهير آلي لبيانات الهوية (PII Sanitization) قبل تدفقها لنماذج التوليد، واستضافة المعالجة والاستدلال داخل النطاق السيادي للمملكة، وتوثيق مسوغات القرارات الخوارزمية مع إمكانية حذف بيانات صاحب الطلب فوراً عند رغبته.',
      en: 'Saudi PDPL compliance cannot be satisfied with generic disclaimers. It mandates privacy-by-design at the architecture level: automated token pseudonymization prior to inference, localized computing within certified Kingdom cloud availability zones, and explicit data subject rights automation for rapid record destruction.',
    },
    relatedService: {
      nameAr: 'الذكاء الاصطناعي والأتمتة',
      nameEn: 'AI Automation & Integration',
      href: '/services/ai-automation',
    },
    sections: [
      {
        headingAr: '1. ركائز نظام PDPL المؤثرة مباشرة على فرق الهندسة',
        headingEn: '1. Core PDPL Pillars Impacting Software Engineering',
        paragraphsAr: [
          'يفرض نظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم (م/19) ولائحته التنفيذية الصادرة عن الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا) معايير صارمة على جمع ومعالجة وتخزين البيانات الشخصية داخل المملكة.',
          'بالنسبة لفرق هندسة الذكاء الاصطناعي، يعني هذا أن أي استخدام لبيانات العملاء أو الموظفين لتدريب النماذج، أو توليد متجهات البحث، أو حتى تمريرها في prompts لنماذج عامة خارجية، يقع تحت طائلة المساءلة القانونية ما لم تتوافر موافقة صريحة ومسوغ نظامي موثق.',
        ],
        paragraphsEn: [
          'The Saudi Personal Data Protection Law (Royal Decree M/19) and its executive regulations administered by SDAIA establish rigorous controls governing the collection, processing, and retention of personal data within the Kingdom.',
          'For AI engineering squads, this mandates that using customer or employee data for fine-tuning, vectorization, or prompt augmentation via external public endpoints introduces substantial compliance liability unless explicit consent and verifiable legitimate interests are codified in the architecture.',
        ],
      },
      {
        headingAr: '2. خط أنابيب التطهير الآلي للبيانات (Automated PII Sanitization)',
        headingEn: '2. Automated PII Sanitization at the Ingestion Tier',
        paragraphsAr: [
          'الخطوة الأولى في معمارية الذكاء الاصطناعي المتوافقة هي وضع طبقة تنقية وسيطة (Sanitization Gateway) بين مصادر البيانات المؤسسية وبين محرك الذكاء الاصطناعي. تقوم هذه الطبقة باكتشاف أرقام الهوية الوطنية، وأرقام الهواتف، والأسماء الصريحة، وأرقام الحسابات البنكية (IBAN) وتعميتها أو استبدالها برموز بديلة قبل توليد المتجهات.',
          'بهذا الشكل، حتى لو تم اختراق قاعدة بيانات المتجهات أو حدوث تسريب في السياق، لا يمكن ربط البيانات المسترجعة بهوية شخصية محددة.',
        ],
        paragraphsEn: [
          'The primary defensive construct is an automated PII Sanitization Gateway positioned between operational source systems and the AI embedding tier. This middleware scans incoming payloads for National IDs, phone numbers, individual names, and IBANs, hashing or pseudonymizing them before vector storage.',
          'Consequently, even in the adversarial scenario of a vector store breach, the indexed corpus cannot be reconciled to identified or identifiable natural persons.',
        ],
        bulletPointsAr: [
          'كشف الأنماط المخصصة للهويات السعودية وأرقام السجلات التجارية ومطابقتها خوارزمياً.',
          'استبدال البيانات الصريحة بهويات رقمية مؤقتة (Synthetic Tokens) تُعاد فكها فقط في الواجهة النهائية للمستخدم المخول.',
          'فصل بيئات التدريب والتطوير كلياً عن بيانات الإنتاج الحقيقية عبر إنشاء بيانات تركيبية (Synthetic Data).',
        ],
        bulletPointsEn: [
          'Deploy regex and NER models fine-tuned to detect Saudi National IDs, Commercial Registration numbers, and local phone structures.',
          'Substitute sensitive tokens with reversible cryptographic pseudonyms decoded strictly at the authorized user client layer.',
          'Completely isolate staging environments using high-fidelity synthetic datasets to prevent non-production data exposure.',
        ],
      },
      {
        headingAr: '3. استضافة النماذج ونقل البيانات عبر الحدود',
        headingEn: '3. Localized Inference & Cross-Border Data Constraints',
        paragraphsAr: [
          'يحظر نظام PDPL نقل البيانات الشخصية خارج أراضي المملكة إلا وفق شروط وضوابط محددة وبموجب اتفاقيات ملزمة تضمن مستوى حماية مكافئ. ولتفادي أي مخاطر نظامية، فإن المعمارية الأكثر أماناً للمؤسسات السعودية هي نشر نماذج الذكاء الاصطناعي في مناطق الحوسبة السحابية المحلية داخل المملكة (مثل مناطق AWS وGoogle Cloud وAzure في الرياض والدمام) أو على خوادم خاصة (On-Premises).',
          'هذا العزل الجغرافي يضمن بقاء البيانات تحت السيادة الوطنية الكاملة ويمنع استغلالها من قبل مزودي الذكاء الاصطناعي لتدريب نماذجهم الخاصة.',
        ],
        paragraphsEn: [
          'The PDPL regulates cross-border personal data transfers, requiring stringent transfer assessments and binding safeguards. To eliminate regulatory friction, the gold standard for Saudi enterprise architecture is deploying self-hosted or managed open-weight models directly within in-Kingdom cloud regions (AWS, Google Cloud, or Azure in Riyadh and Dammam) or private sovereign data centers.',
          'Geographical localization ensures all inference payloads remain strictly under Kingdom jurisdiction while precluding multi-tenant public AI vendors from recycling proprietary data into public model weights.',
        ],
      },
      {
        headingAr: '4. حقوق أصحاب البيانات والقرارات المؤتمتة',
        headingEn: '4. Managing Data Subject Rights & Algorithmic Accountability',
        paragraphsAr: [
          'يمنح النظام صاحب البيانات حق طلب إتلاف بياناته أو الاعتراض على القرارات المبنية على المعالجة المؤتمتة. ولتلبية هذا الحق في أنظمة الذكاء الاصطناعي، يجب تصميم قاعدة البيانات بحيث يمكن حذف كافة المتجهات المرتبطة بمستخدم معين فوراً (Cascade Deletion)، وتوفير آلية للمراجعة البشرية (Human-in-the-Loop) لأي قرار مالي أو تشغيلي يصدره الوكيل الذكي.',
        ],
        paragraphsEn: [
          'Data subjects possess explicit rights to request record destruction and contest fully automated decisions. AI architectures must support programmatic cascade deletion across vector indices, accompanied by auditable human-in-the-loop escalation paths for all high-stakes algorithmic determinations.',
        ],
      },
    ],
  },
  {
    slug: 'mvp-in-8-weeks-what-to-cut',
    serviceId: 'product-development',
    category: {
      ar: 'تطوير المنتجات',
      en: 'Product Development',
    },
    readTime: {
      ar: '6 دقائق قراءة',
      en: '6 min read',
    },
    date: {
      ar: 'أكتوبر 2026',
      en: 'October 2026',
    },
    title: {
      ar: 'من الفكرة إلى MVP في 8 أسابيع: ما الذي نقطعه وما الذي نبقيه',
      en: 'Idea to MVP in 8 Weeks: What to Cut and What to Keep',
    },
    excerpt: {
      ar: 'منهجية هندسية صارمة لتحديد النطاق الأساسي لمنتجك الرقمي وإطلاقه في 8 أسابيع للمستخدمين الأوائل في السوق السعودي دون تراكم ديون تقنية قاتلة.',
      en: 'A rigorous engineering prioritization framework to scope and ship a production-grade MVP in 8 weeks to Saudi and GCC early adopters without accumulating fatal technical debt.',
    },
    takeaway: {
      ar: 'المنتج الأولي (MVP) الناجح ليس نظاماً ناقصاً أو رديء الجودة، بل شريحة عمودية كاملة (Vertical Slice) تحل مشكلة واحدة رئيسية بكفاءة عالية. في نافذة الـ 8 أسابيع: اقطع الصلاحيات المعقدة، والتحليلات المتشعبة، والإشعارات المتعددة؛ وأبقِ على: تجربة تسجيل سلسة، ومسار القيمة الأساسي، وتتبع التحويل، وبنية برمجية معيارية قابلة للتوسع.',
      en: 'A production MVP is not substandard code; it is a razor-thin, fully polished vertical slice solving one high-friction problem with extreme reliability. In an 8-week cycle: cut complex role matrices, speculative microservices, and deep settings. Retain: frictionless authentication, the single transactional value moment, instrumented funnel telemetry, and clean modular code.',
    },
    relatedService: {
      nameAr: 'تطوير المنتجات',
      nameEn: 'Product Development',
      href: '/services/product-development',
    },
    sections: [
      {
        headingAr: '1. فخ "المنتج الكامل" وأسباب تعثر المشاريع الجديدة',
        headingEn: '1. The All-in-One Trap: Why Early Products Stumble',
        paragraphsAr: [
          'الخطأ الأكثر شيوعاً الذي نراه لدى رواد الأعمال والشركات في الخليج هو محاولة إطلاق "منصة شاملة" تحتوي على كل ميزة يقدمها المنافسون العالميون. هذه المقاربة تؤدي حتماً إلى تأخر الإطلاق لأشهر، واستنزاف الميزانية، واكتشاف أن 80% من الميزات المطورة لا يستخدمها العميل الحقيقي.',
          'الهدف الحقيقي من المنتج الأولي (MVP) ليس إبهار الجميع، بل إدخال شفرتك البرمجية إلى أيدي مستخدمين حقيقيين لاختبار فرضية القيمة في أسرع وقت ممكن وبأقل هدر هندسي.',
        ],
        paragraphsEn: [
          'The most recurring pitfall among regional founders and enterprise innovation labs is the urge to launch an exhaustive, all-encompassing suite on Day One. This instinct invariably induces schedule slippage, budget exhaustion, and the bitter discovery that 80% of speculative features are ignored by real users.',
          'The true objective of an MVP is not aesthetic perfection or feature vanity; it is placing hardened software into real hands to validate the core value hypothesis with zero wasted engineering cycles.',
        ],
      },
      {
        headingAr: '2. مصفوفة الفرز: ما يُحذف، ما يُؤجل، وما يُبنى بحزم',
        headingEn: '2. The Triage Matrix: What to Cut, What to Keep',
        paragraphsAr: [
          'خلال جلسات التخطيط المعماري، نلزم فرق العمل بفرز المتطلبات وفق قاعدة حاسمة: هل سيتوقف المستخدم عن دفع المقابل أو استخدام النظام إذا لم تكن هذه الميزة موجودة في اليوم الأول؟ إذا كانت الإجابة لا، تُستبعد فوراً من نطاق الـ 8 أسابيع.',
        ],
        paragraphsEn: [
          'During sprint zero scoping, we subject every backlog item to a ruthless architectural filter: Will users refuse to adopt or pay if this exact feature is omitted on launch day? If no, it is quarantined from the 8-week deployment perimeter.',
        ],
        bulletPointsAr: [
          'ما يُحذف فوراً: تسجيل الدخول عبر 10 منصات تواصل مختلفة، لوحات تحكم متقدمة بمؤشرات افتراضية، خوارزميات التوصية المعقدة قبل وجود بيانات كافية.',
          'ما يُؤجل: إدارة الفرق والمؤسسات متعددة الطبقات (Enterprise RBAC)، وأدوات التصدير بصيغ متعددة.',
          'ما يُبنى بحزم: مسار التسجيل السهل (سواء برقم الجوال أو OTP)، التدفق الأساسي الذي يحقق القيمة للمستخدم، والتكامل المباشر مع بوابات الدفع المحلية المعتمدة في المملكة.',
        ],
        bulletPointsEn: [
          'Cut immediately: Omni-channel social auth, speculative customizable dashboards, multi-tiered loyalty engines before validating customer demand.',
          'Postpone: Multi-tenant organizational RBAC hierarchies, advanced export suites, multi-currency invoicing.',
          'Build with obsession: Seamless mobile OTP auth, the single core transactional journey, and rock-solid local GCC payment gateway integration.',
        ],
      },
      {
        headingAr: '3. المعمارية الهندسية: رشيقة ولكن بدون ديون تقنية قاتلة',
        headingEn: '3. Architectural Rigor: Fast Without Technical Rot',
        paragraphsAr: [
          'السرعة لا تعني كتابة كود فوضوي. إذا بنيت منتجك ككتلة متشابكة غير منظمة لتوفير يومين، ستدفع الثمن بعد الإطلاق عندما تنهار الخوادم مع أول دفعة من المستخدمين أو عندما يستحيل إضافة ميزة جديدة.',
          'المعادلة الصحيحة هي: "Modular Monolith" مبني بلغات موثوقة (مثل TypeScript / Next.js مع PostgreSQL)، ونظام توثيق محكم، واختبارات تكامل للمسارات الحرجة فقط.',
        ],
        paragraphsEn: [
          'Speed is never an excuse for brittle spaghetti code. Scaffolding a tangled mess to shave forty-eight hours creates an existential debt ceiling that implodes under real production traffic or freezes iterative roadmap releases.',
          'The proven strategy is a disciplined Modular Monolith (e.g. Next.js / TypeScript backed by PostgreSQL), strict domain boundaries, automated CI linting, and targeted integration tests covering the payment and activation flows.',
        ],
      },
      {
        headingAr: '4. دورة الـ 8 أسابيع: خارطة الطريق من الفكرة للإطلاق',
        headingEn: '4. The 8-Week Cadence: Blueprint to Production',
        paragraphsAr: [
          'الأسبوع 1-2: تحديد النطاق المعماري، وتصميم واجهات Figma عالية الدقة، وتجهيز البيئة السحابية.\nالأسبوع 3-5: تطوير المسار الأساسي (Core Flow) والتكامل مع قواعد البيانات وواجهات البرمجة.\nالأسبوع 6-7: تكامل بوابات الدفع وأنظمة الرسائل النصية والاختبارات الأمنية المكثفة.\nالأسبوع 8: مرحلة النشر في بيئة الإنتاج وإجراء تجارب الاستخدام الحقيقية وإطلاق المنتج للمستخدمين الأوائل.',
        ],
        paragraphsEn: [
          'Weeks 1–2: Architectural boundary definition, high-fidelity Figma sprint, CI/CD and cloud foundation.\nWeeks 3–5: Core transactional flow engineering, domain models, and relational schema migrations.\nWeeks 6–7: Regional payment gateway hooks, SMS/OTP integration, and end-to-end stress testing.\nWeek 8: Staged canary deployment, live telemetry verification, and controlled cohort rollout.',
        ],
      },
    ],
  },
  {
    slug: 'saudi-cloud-regions-ccc-architecture',
    serviceId: 'cloud-devops',
    category: {
      ar: 'DevOps وهندسة السحابة',
      en: 'DevOps & Cloud Engineering',
    },
    readTime: {
      ar: '9 دقائق قراءة',
      en: '9 min read',
    },
    date: {
      ar: 'أكتوبر 2026',
      en: 'October 2026',
    },
    title: {
      ar: 'اختيار منطقة السحابة داخل المملكة: ماذا تعني «السحابة أولًا» وضوابط CCC لمعماريتك',
      en: 'Choosing a Cloud Region in the Kingdom: What Cloud First and CCC Mean for Your Architecture',
    },
    excerpt: {
      ar: 'تحليل معماري لمناطق السحابة المعتمدة في السعودية (AWS وGoogle Cloud وAzure)، مع متطلبات الامتثال لضوابط الأمن السيبراني للحوسبة السحابية (NCA CCC-2:2024).',
      en: 'An architectural comparison of in-Kingdom cloud regions (AWS, Google Cloud, Azure) and a technical blueprint for adhering to NCA Cloud Cybersecurity Controls (CCC-2:2024).',
    },
    takeaway: {
      ar: 'سياسة "السحابة أولاً" والامتثال لضوابط NCA CCC-2:2024 تتطلب من مهندسي الأنظمة: تصميم شبكات معزولة تماماً (VPC Isolation)، وإدارة مفاتيح التشفير محلياً (KMS Key Sovereignty)، وتفعيل سجلات التدقيق غير القابلة للتعديل والاحتفاظ بها داخل المملكة، مع بناء بنية تحتية كشيفرة (Terraform) لتسهيل التدقيق النظامي المستمر.',
      en: 'Executing under Saudi Arabia’s Cloud First policy and NCA CCC-2:2024 controls demands: isolated VPC perimeters without public ingress shortcuts, customer-managed KMS encryption, localized immutable audit logging with regulated retention, and full Infrastructure-as-Code (Terraform) to guarantee continuous auditability.',
    },
    relatedService: {
      nameAr: 'DevOps وهندسة السحابة',
      nameEn: 'DevOps & Cloud Engineering',
      href: '/services/cloud-devops',
    },
    sections: [
      {
        headingAr: '1. المشهد السحابي في المملكة وسياسة «السحابة أولاً»',
        headingEn: '1. The Saudi Cloud Landscape & The Cloud-First Mandate',
        paragraphsAr: [
          'مع إطلاق مناطق السحابة الكبرى في الرياض والدمام، لم يعد هناك أي مبرر فني أو تشغيلي لاستضافة بيانات المؤسسات السعودية خارج حدود المملكة. تفرض سياسة "الحوسبة السحابية أولاً" الصادرة عن هيئة الحكومة الرقمية على الجهات الحكومية والشركات التابعة لها إعطاء الأولوية للحلول السحابية المعتمدة.',
          'لكن اختيار المزود (AWS, Google Cloud, Microsoft Azure, أو المزودين المحليين) ليس مجرد مقارنة أسعار، بل يرتبط بمستويات تصنيف البيانات وتوافر الخدمات المدارة والامتثال التنظيمي.',
        ],
        paragraphsEn: [
          'With hyperscale cloud regions operational in Riyadh and Dammam, the technical and compliance justification for hosting Saudi enterprise payloads abroad has evaporated. The Kingdom’s Cloud First mandate compels government and private sector organizations to prioritize compliant cloud deployments.',
          'However, selecting an infrastructure vendor (AWS, Google Cloud, Microsoft Azure, or certified local cloud providers) involves evaluating data classification tiers, managed service availability, and regulatory certification rather than unit VM pricing alone.',
        ],
      },
      {
        headingAr: '2. فهم ضوابط الهيئة الوطنية للأمن السيبراني (NCA CCC-2:2024)',
        headingEn: '2. Decoding NCA Cloud Cybersecurity Controls (CCC-2:2024)',
        paragraphsAr: [
          'تعد ضوابط CCC-2:2024 الإطار المرجعي الإلزامي لأمن الحوسبة السحابية في المملكة. تنقسم الضوابط إلى متطلبات مخصصة لمزودي الخدمة (CSPs) وأخرى للمشتركين والمستفيدين (Cloud Subscribers).',
          'بصفتك مطوراً أو مدير بنية تحتية، أنت مسؤول عن جانب المشترك: تأمين الهويات، ضبط جدران الحماية، تشفير البيانات أثناء النقل وبالسكون، وإدارة دورة حياة الوصول.',
        ],
        paragraphsEn: [
          'NCA CCC-2:2024 represents the regulatory cybersecurity baseline for cloud infrastructure across Saudi Arabia. The standard divides responsibilities between Cloud Service Providers (CSPs) and Cloud Subscribers under a shared responsibility model.',
          'Engineering teams are accountable for the subscriber realm: identity governance, firewall routing, data encryption at rest and in transit, and lifecycle secret rotation.',
        ],
        bulletPointsAr: [
          'تشفير كافة البيانات المخزنة بقواعد بيانات S3 أو RDS باستخدام مفاتيح مدارة ذاتياً (Customer Managed Keys).',
          'عزل بيئات التطوير والاختبار والإنتاج في حسابات سحابية منفصلة تماماً بدون ترابط شبكي عشوائي.',
          'إلزامية المصادقة متعددة العوامل (MFA) لكافة الحسابات الإدارية وربط الوصول بأنظمة تسجيل أحداث أمنية (SIEM).',
        ],
        bulletPointsEn: [
          'Enforce AES-256 encryption at rest across all storage buckets and relational instances with Customer Managed Keys (CMKs).',
          'Strictly segregate dev, staging, and production environments into isolated AWS Organizations / Azure Subscriptions.',
          'Mandate hardware MFA for all privileged IAM roles and stream audit events into in-Kingdom SIEM solutions.',
        ],
      },
      {
        headingAr: '3. تصميم الشبكات السحابية السيادية (Sovereign VPC Topologies)',
        headingEn: '3. Sovereign VPC Topologies & Zero-Trust Ingress',
        paragraphsAr: [
          'المعمارية الصحيحة تلغي فكرة "الخوادم ذات العناوين العامة". يجب أن تكون خوادم التطبيقات وقواعد البيانات داخل شبكات فرعية خاصة (Private Subnets)، مع حصر حركة المرور الواردة من خلال بوابات موحدة ومحمية بجدار حماية ضد هجمات حجب الخدمة (WAF & DDoS Mitigation).',
          'يتم ربط فروع الشركة ومكاتبها بالبنية السحابية عبر أنفاق مشفرة (IPsec VPN) أو خطوط اتصال مخصصة، لضمان عدم مرور البيانات الداخلية عبر شبكة الإنترنت العامة.',
        ],
        paragraphsEn: [
          'Zero-trust topologies discard public-facing application servers. All container nodes and database replicas must reside in isolated private subnets, with ingress restricted through managed Application Load Balancers fortified by Cloud WAF rules.',
          'Enterprise headquarters and on-premises centers connect via site-to-site IPsec VPNs or dedicated Direct Connect tunnels, preventing operational telemetry from traversing the public internet.',
        ],
      },
      {
        headingAr: '4. البنية كشيفرة (Terraform) والامتثال المستمر',
        headingEn: '4. Infrastructure-as-Code & Continuous Auditability',
        paragraphsAr: [
          'لتجنب أخطاء التهيئة اليدوية، يتم نشر كافة الموارد عبر نصوص Terraform موثقة في مستودع الكود (Git). هذا يتيح فحص البنية التحتية آلياً قبل النشر باستخدام أدوات مثل tfsec وCheckov للتأكد من عدم وجود أي مخالفة لضوابط NCA قبل وصول التعديلات إلى السحابة الحقيقية.',
        ],
        paragraphsEn: [
          'Manual console configurations represent a critical audit failure. Standardizing all cloud resources via declarative Terraform pipelines allows automated pre-commit scanning (via tfsec and Checkov) to block non-compliant security groups before provisioning takes place.',
        ],
      },
    ],
  },
  {
    slug: 'when-to-choose-custom-software',
    serviceId: 'custom-software',
    category: {
      ar: 'تطوير البرمجيات المخصصة',
      en: 'Custom Software Development',
    },
    readTime: {
      ar: '7 دقائق قراءة',
      en: '7 min read',
    },
    date: {
      ar: 'أكتوبر 2026',
      en: 'October 2026',
    },
    title: {
      ar: 'متى تختار البرمجيات المخصصة على المنتج الجاهز؟',
      en: 'When to Choose Custom Software Over Off-the-Shelf',
    },
    excerpt: {
      ar: 'معادلة التكلفة الإجمالية للملكية (TCO)، وحدود مرونة الأنظمة الجاهزة، وأهمية امتلاك الشيفرة المصدرية عند بناء ميزة تنافسية حقيقية لشركتك.',
      en: 'Evaluating Total Cost of Ownership (TCO), proprietary operational edge, and the strategic imperative of full IP ownership when outgrowing commercial off-the-shelf software.',
    },
    takeaway: {
      ar: 'القاعدة الهندسية واضحة: اشترِ البرمجيات الجاهزة (SaaS) للمهام الإدارية الروتينية التي لا تشكل ميزة تنافسية (مثل مسيرات الرواتب والمحاسبة الأساسية). وابنِ برمجياتك المخصصة (Custom Software) عندما تكون العملية التشغيلية هي جوهر قوتك التجارية في السوق، أو عندما تصبح رسوم الاشتراكات المتكررة وقيود التخصيص في الأنظمة الجاهزة عائقاً أمام نمو منشأتك.',
      en: 'The definitive architectural heuristic: Buy off-the-shelf software for standardized back-office workflows that provide no market differentiation (general ledger, payroll). Build custom bespoke systems when the software represents your core commercial advantage, or when escalating subscription licenses and rigid vendor roadmaps handicap operational growth.',
    },
    relatedService: {
      nameAr: 'تطوير البرمجيات المخصصة',
      nameEn: 'Custom Software Development',
      href: '/services/custom-software',
    },
    sections: [
      {
        headingAr: '1. مغالطة "الحل الجاهز أرخص وأسرع دائماً"',
        headingEn: '1. The SaaS Fallacy: Hidden Costs & Customization Caps',
        paragraphsAr: [
          'يغري الحل التجاري الجاهز (COTS) فرق الإدارة بوعد الإطلاق الفوري بتكلفة اشتراك شهرية تبدو منخفضة في البداية. لكن الحقيقة تظهر بعد 6 إلى 12 شهراً: رسوم تراخيص تتصاعد مع كل مستخدم جديد، تكاليف باهظة للاستشاريين الخارجيين لمحاولة تطويع النظام ليناسب طريقة عملك، وتنازلات تشغيلية مؤلمة لأن البرنامج يرفض التعديل.',
          'الأسوأ من ذلك هو الارتهان لمزود الخدمة (Vendor Lock-in)؛ فإذا قرر رفع أسعاره أو إلغاء ميزة حيوية لعملك، تكون منشأتك رهينة لقراراته.',
        ],
        paragraphsEn: [
          'Off-the-shelf enterprise software seduces executive decision-makers with the promise of turnkey onboarding and predictable subscription tiers. The operational hangover hits months later: punitive per-seat licensing escalation, exorbitant consultant fees for custom modules, and compromised workflows because the package cannot adapt to company nuances.',
          'Worst of all is acute vendor lock-in. If the proprietary SaaS provider hikes pricing or shutters key APIs, your operating model is held hostage.',
        ],
      },
      {
        headingAr: '2. مصفوفة القرار: متى تشتري ومتى تبني؟',
        headingEn: '2. The Strategic Decision Matrix: Buy vs. Build',
        paragraphsAr: [
          'لتحديد المسار الصحيح، نقترح استخدام مصفوفة بسيطة تعتمد على بعدين: مدى تميز العملية التشغيلية وتكرار التعديل المطلوب.',
        ],
        paragraphsEn: [
          'To determine the optimal engineering path, we assess candidate projects along two essential axes: competitive differentiation and workflow customization frequency.',
        ],
        bulletPointsAr: [
          'اشترِ فوراً (Buy): للمهام العامة التي لا تختلف فيها شركتك عن المنافسين (إدارة المهام الداخلية، المراسلات البريدية، المحاسبة الضريبية العامة).',
          'ابنِ برمجياتك (Build): لمنصات الخدمات الأساسية، ومحركات التسعير المعقدة، وبوابات العملاء الاستراتيجية، وأي نظام يتكامل مع آلات المصنع أو شبكات التوريد الخاصة.',
          'الهجين الذكي (Hybrid): بناء واجهات مخصصة ونظام وسيط (Middleware) يربط الأنظمة الجاهزة مع محرك العمليات الأساسي الخاص بشركتك.',
        ],
        bulletPointsEn: [
          'Buy outright: Commoditized utility workflows with zero strategic differentiation (internal chat, general ledger, standard email marketing).',
          'Build custom: Proprietary pricing engines, mission-critical logistics routing, specialized client portals, and IoT factory telemetry pipelines.',
          'Smart Hybrid: Engineering bespoke integration layers and custom microservices that wrap commodity legacy systems without modifying core code.',
        ],
      },
      {
        headingAr: '3. ملكية الشيفرة المصدرية (100% IP) وحرية التطوير',
        headingEn: '3. 100% Code Ownership & Autonomous Evolution',
        paragraphsAr: [
          'عندما تبني برنامجك المخصص مع شركة إيتش، فإنك تمتلك 100% من الشيفرة المصدرية والمخططات الهندسية وقواعد البيانات فور سداد مستحقات المشروع. لا توجد رسوم خفية لكل مستخدم، ولا قيود على إضافة ميزات جديدة، ويمكن لفريقك الداخلي تولي الصيانة أو التوسع مستقبلاً بكل حرية.',
        ],
        paragraphsEn: [
          'When commissioning custom engineering with AEITCH, you acquire 100% unrestricted intellectual property ownership over all delivered source repositories, architectural assets, and data schemas. There are zero ongoing per-seat tolls or restrictive usage barriers.',
        ],
      },
      {
        headingAr: '4. حساب التكلفة الإجمالية (TCO) على مدى 3 إلى 5 سنوات',
        headingEn: '4. Total Cost of Ownership (TCO) Over a 3–5 Year Horizon',
        paragraphsAr: [
          'عند مقارنة التكاليف على مدى خمس سنوات لشركة تضم 200 مستخدم: نجد أن تكلفة البرمجيات الجاهزة مع الرسوم السنوية والتعديلات تتجاوز غالباً تكلفة بناء وتطوير نظام مخصص بالكامل، فضلاً عن أن النظام المخصص يمثل أصلاً رأسمالياً (Capital Asset) يرفع من القيمة السوقية لشركتك.',
        ],
        paragraphsEn: [
          'Modeling a 5-year financial timeline for a 200-seat enterprise demonstrates that compounding SaaS fees and custom integration consulting frequently outstrip the capex of an in-house bespoke build—while the bespoke platform stands as an institutional balance-sheet asset boosting company valuation.',
        ],
      },
    ],
  },
  {
    slug: 'vision-2030-engineering-teams',
    serviceId: 'vision-2030',
    category: {
      ar: 'رؤية السعودية 2030',
      en: 'Saudi Vision 2030',
    },
    readTime: {
      ar: '8 دقائق قراءة',
      en: '8 min read',
    },
    date: {
      ar: 'أكتوبر 2026',
      en: 'October 2026',
    },
    title: {
      ar: 'ماذا يعني التحول الرقمي في رؤية 2030 لفريقك الهندسي؟',
      en: 'What Does Vision 2030’s Digital Transformation Mean for Your Engineering Team?',
    },
    excerpt: {
      ar: 'كيف تترجم أهداف رؤية 2030 إلى معايير معمارية يومية: السيادة البيانية، الموثوقية العالية لمشاريع المستقبل، وتحديث الأنظمة القديمة للمشاركة في الاقتصاد الرقمي.',
      en: 'How engineering leaders translate Saudi Vision 2030 national mandates into tangible architectural standards: sovereign data persistence, giga-project resiliency, and modernizing legacy stacks for the digital economy.',
    },
    takeaway: {
      ar: 'التحول الرقمي وفق مستهدفات رؤية 2030 ليس مجرد رقمنة للأوراق أو إطلاق تطبيق جوال، بل إعادة هندسة شاملة للبنية التحتية التقنية للمنشآت: الالتزام الصارم بضوابط الأمن السيبراني الوطنية (NCA ECC & CCC)، والتكامل السلس مع المنظومات الرقمية الموحدة (نفاذ، فاتورة ZATCA، منصة سبل)، وبناء أنظمة برمجية قابلة للتوسع تدعم نمو القطاعات غير النفطية.',
      en: 'Digital transformation under Vision 2030 objectives transcends paperless workflows or mobile UI facelifts. It demands architectural reconstruction: absolute adherence to NCA cybersecurity mandates (ECC-2:2024, CCC-2:2024), interoperability with national digital utilities (Nafath, ZATCA e-invoicing, SPL), and hyper-scalable foundations engineered for non-oil economic velocity.',
    },
    relatedService: {
      nameAr: 'رؤية السعودية 2030',
      nameEn: 'Saudi Vision 2030 Engineering',
      href: '/vision-2030',
    },
    sections: [
      {
        headingAr: '1. التحول من إدارة تقنية المعلومات التقليدية إلى الهندسة الرقمية السيادية',
        headingEn: '1. The Shift from Traditional IT to Sovereign Digital Engineering',
        paragraphsAr: [
          'في عصر رؤية 2030، لم تعد إدارة التقنية في الشركات السعودية قسماً خدمياً يقتصر على صيانة الحواسيب وإدارة الشبكات. أصبحت التقنية هي المحرك الأساسي لنموذج الأعمال ورافعة الكفاءة الكبرى في قطاعات اللوجستيات، والصناعة، والتقنية المالية، والسياحة.',
          'هذا التحول يتطلب من قادة التقنية (CTOs) تبني معايير هندسية سيادية ترتكز على حماية البيانات الحساسة وفق لوائح سدايا، والاستثمار في الشيفرات البرمجية التي تمنح المنشأة استقلالية تامة وقدرة على التطور المستمر.',
        ],
        paragraphsEn: [
          'Under Vision 2030, technology is no longer a corporate maintenance cost center responsible for desktop support. Digital engineering is the core economic engine driving margin expansion and market share across logistics, manufacturing, fintech, and tourism.',
          'This paradigm shift requires CTOs and engineering directors to institute sovereign standards anchored in SDAIA data protection, local cloud hosting, and proprietary software equity that equips the enterprise with strategic autonomy.',
        ],
      },
      {
        headingAr: '2. موثوقية الأنظمة على مستوى المشاريع الوطنية الكبرى',
        headingEn: '2. Giga-Project Resiliency & High-Availability Benchmarks',
        paragraphsAr: [
          'المشاريع العملاقة ومبادرات التحول تتطلب أنظمة قادرة على معالجة ملايين العمليات اليومية بمعدل جاهزية 99.99%. لا مجال للأخطاء التي تتسبب في توقف سلاسل التوريد أو تعطل بوابات الدفع.',
          'تحقيق هذه الموثوقية يعتمد على تطبيق أفضل ممارسات هندسة الموثوقية (SRE): النشر بدون توقف (Zero-Downtime Deployments)، والمراقبة الاستباقية للأنظمة، وخطط التعافي من الكوارث (Disaster Recovery) الموزعة عبر مناطق سحابية متعددة داخل المملكة.',
        ],
        paragraphsEn: [
          'National initiatives and giga-project ecosystems require software topologies capable of processing high-frequency throughput with guaranteed 99.99% availability. Unplanned outages in supply-chain or transaction backbones are unacceptable.',
          'Engineering resilience demands mature Site Reliability Engineering (SRE) disciplines: zero-downtime rolling deploys, continuous automated health checks, and geographically separated disaster recovery zones situated inside Saudi borders.',
        ],
      },
      {
        headingAr: '3. التكامل مع المنظومة الوطنية الموحدة (APIs First)',
        headingEn: '3. Deep Integration with National Digital Gateways',
        paragraphsAr: [
          'التميز في السوق السعودي يتطلب ترابطاً سلساً مع الخدمات الرقمية الحكومية الموحدة: التحقق من الهوية عبر "نفاذ"، والفوترة الإلكترونية عبر منظومة "فاتورة" لهيئة الزكاة والضريبة والجمارك (ZATCA)، وخدمات العنوان الوطني والمواقع.',
          'الأنظمة التي تُبنى بدون واجهات برمجة حديثة (RESTful & Event-Driven APIs) تعجز عن مواكبة هذه المتطلبات التنظيمية وتفقد قدرتها على التنافسية بسرعة.',
        ],
        paragraphsEn: [
          'Commercial velocity in the Kingdom mandates effortless API interoperability with national digital utilities: identity verification via Nafath, Phase 2 electronic invoicing via ZATCA Fatoora, and sovereign spatial address protocols.',
          'Enterprises architected without modern API-first and event-driven patterns struggle to fulfill regulatory milestones and risk commercial marginalization.',
        ],
      },
      {
        headingAr: '4. بناء وتطوير الكفاءات الهندسية للشراكة طويلة المدى',
        headingEn: '4. Fostering Sovereign Engineering Excellence',
        paragraphsAr: [
          'تؤمن إيتش بأن الشراكة الحقيقية لا تنتهي بتسليم المشروع، بل بنقل المعرفة الكاملة لفرق العمل المحلية، وتوثيق كافة المسارات المعمارية لتمكين الكفاءات الوطنية من قيادة المستقبل الرقمي بثقة واستقلالية.',
        ],
        paragraphsEn: [
          'At AEITCH, we believe sustainable engineering partnerships culminate in thorough knowledge transfer, explicit architectural documentation, and empowering regional client teams to steer their sovereign digital roadmap independently.',
        ],
      },
    ],
  },
];

export function getAllInsightSlugs(): string[] {
  return INSIGHTS_ARTICLES.map((article) => article.slug);
}

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return INSIGHTS_ARTICLES.find((article) => article.slug === slug);
}
