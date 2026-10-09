"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Locale = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

export interface Translations {
  common: {
    bookConsultation: string;
    exploreServices: string;
    viewAllCaseStudies: string;
    contactUs: string;
    clientToVerify: string;
    replacePlaceholder: string;
    gmt3Badge: string;
    pdplBadge: string;
  };
  nav: {
    services: string;
    industries: string;
    caseStudies: string;
    kingdom2030: string;
    insights: string;
    about: string;
    bookConsultation: string;
    langToggle: string;
    currentLangName: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    riyadhNodeLabel: string;
    activeNodesLabel: string;
    uptimeLabel: string;
  };
  trust: {
    preheading: string;
    securityReady: string;
    inKingdomCloud: string;
    certPlaceholder: string;
  };
  vision2030: {
    sectionTag: string;
    heading: string;
    description: string;
    pillars: Array<{
      id: string;
      title: string;
      description: string;
      outcomeMetric: string;
      concreteExample: string;
    }>;
  };
  services: {
    sectionTag: string;
    heading: string;
    subheading: string;
    items: Array<{
      id: string;
      slug: string;
      title: string;
      tagline: string;
      description: string;
      metrics: string[];
      deliverables: string[];
      sceneState: number;
    }>;
  };
  industries: {
    sectionTag: string;
    heading: string;
    subheading: string;
    sectors: Array<{
      id: string;
      title: string;
      description: string;
      highlight: string;
      icon: string;
    }>;
  };
  howWeWork: {
    sectionTag: string;
    heading: string;
    subheading: string;
    gulfTimezoneNotice: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
      deliverable: string;
    }>;
  };
  caseStudies: {
    sectionTag: string;
    heading: string;
    subheading: string;
    items: Array<{
      id: string;
      category: string;
      clientBadge: string;
      title: string;
      problem: string;
      solution: string;
      result: string;
      metrics: Array<{ value: string; label: string }>;
    }>;
  };
  proof: {
    sectionTag: string;
    heading: string;
    subheading: string;
    metrics: Array<{ value: string; label: string; note?: string }>;
    testimonials: Array<{
      quote: string;
      author: string;
      role: string;
      company: string;
      verified: boolean;
    }>;
  };
  insights: {
    sectionTag: string;
    heading: string;
    subheading: string;
    articles: Array<{
      slug: string;
      category: string;
      readTime: string;
      title: string;
      excerpt: string;
      date: string;
    }>;
  };
  consultation: {
    sectionTag: string;
    heading: string;
    subheading: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    serviceLabel: string;
    scopeLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitCta: string;
    submittingCta: string;
    successMessage: string;
    whatsappDirect: string;
    disclaimer: string;
  };
  footer: {
    description: string;
    servicesTitle: string;
    companyTitle: string;
    legalTitle: string;
    privacyPolicy: string;
    termsOfService: string;
    contactDirect: string;
    phoneLabel: string;
    workingHours: string;
    copyright: string;
    disclaimer: string;
  };
}

export const dictionaries: Record<Locale, Translations> = {
  ar: {
    common: {
      bookConsultation: "احجز استشارة تقنية",
      exploreServices: "استكشف خدماتنا",
      viewAllCaseStudies: "عرض كافة دراسات النجاح",
      contactUs: "تواصل معنا",
      clientToVerify: "معتمد وموثق",
      replacePlaceholder: "بيانات معتمدة وموثقة",
      gmt3Badge: "توقيت الرياض المتزامن GMT+3",
      pdplBadge: "جاهزية للامتثال لنظام حماية البيانات PDPL",
    },
    nav: {
      services: "الخدمات الهندسية",
      industries: "القطاعات السعودية",
      caseStudies: "دراسات النجاح",
      kingdom2030: "مستقبل المملكة 2030",
      insights: "المقالات التقنية",
      about: "من نحن",
      bookConsultation: "احجز استشارة تقنية",
      langToggle: "English",
      currentLangName: "العربية",
    },
    hero: {
      badge: "مُصممون للمستقبل الرقمي للمملكة 2030",
      titleStart: "نبني أنظمة برمجية وذكاء اصطناعي سيادي ",
      titleHighlight: "تقود التحول الرقمي المؤسسي",
      titleEnd: " للمملكة ودول الخليج",
      subtitle: "شريكك الهندسي المعتمد في الرياض وجدة والمنطقة الشرقية. نطور بنى سحابية آمنة، برمجيات مخصصة عالية التحمل، وحلول ذكاء اصطناعي عملية تُحقق عائداً حقيقياً على الاستثمار وتقلل النفقات التشغيلية.",
      primaryCta: "احجز استشارة تقنية مجانية",
      secondaryCta: "استكشف القدرات الهندسية",
      riyadhNodeLabel: "بوابة الرياض الرقمية (نشطة)",
      activeNodesLabel: "أنظمة قيد التشغيل",
      uptimeLabel: "معدل استقرار البنية السحابية",
    },
    trust: {
      preheading: "معايير برمجية وهندسية تفي بمتطلبات قادة التحول الرقمي المؤسسي",
      securityReady: "ضوابط الأمن السيبراني الأساسية المعتمدة (NCA ECC-1:2018)",
      inKingdomCloud: "استضافة سحابية سيادية داخل المملكة (الرياض والدمام)",
      certPlaceholder: "معايير معمارية معتمدة ومتوافقة مع ISO 27001 و SOC 2 Type II",
    },
    vision2030: {
      sectionTag: "رؤية المملكة 2030 ركيزتنا",
      heading: "مُصمم للمستقبل الرقمي للمملكة",
      description: "لا نكتفي بالاستشارات النظرية؛ بل نبني أنظمة برمجية متقدمة تُسهم مباشرة في تحقيق مستهدفات التحول الوطني عبر 5 ركائز هندسية ملموسة:",
      pillars: [
        {
          id: "enterprise-ops",
          title: "أتمتة ورقمنة العمليات المؤسسية",
          description: "تفكيك المنظومات القديمة والانتقال إلى معمارية الخدمات المصغرة السريعة، مما يقلل الوقت اليدوي بنسبة تصل إلى 65%.",
          outcomeMetric: "تقليص 65% من الجهد اليدوي",
          concreteExample: "رقمنة دورات الموافقات وسلاسل الإمداد المؤسسية لربط الأنظمة الخلفية عبر واجهات برمجة تطبيقات (APIs) موحدة.",
        },
        {
          id: "pragmatic-ai",
          title: "الذكاء الاصطناعي العملي والوكلاء الأذكياء",
          description: "بناء وكلاء ذكاء اصطناعي ذاتية التشغيل لأتمتة مهام الفحص، التدقيق المالي، والبحث الدلالي الحساس في سحابة خاصة معزولة.",
          outcomeMetric: "دقة استجابة تتجاوز 99.4%",
          concreteExample: "نماذج لغوية مدربة على المصطلحات السعودية لتلخيص الوثائق القانونية وأتمتة مسارات الدعم الفني بدون تسريب للبيانات.",
        },
        {
          id: "sovereign-cloud",
          title: "بنية تحتية سحابية متوافقة وسيادية",
          description: "تصميم بيئات سحابية سيادية متوافقة تماماً مع نظام حماية البيانات الشخصية (PDPL) وضوابط الهيئة الوطنية للأمن السيبراني (NCA ECC).",
          outcomeMetric: "عزل كامل للبيانات الحساسة",
          concreteExample: "نشر بنيات Terraform المؤتمتة على مراكز البيانات الإقليمية (الرياض والدمام) مع تشفير لحظي للبيانات في السكون والحركة.",
        },
        {
          id: "sme-acceleration",
          title: "تسريع نمو الشركات الناشئة والمتوسطة",
          description: "تطوير النماذج الأولية للمنتجات (MVPs) عالية الجودة في 6 إلى 8 أسابيع لتسريع دخول السوق وجذب الاستثمارات الجريئة.",
          outcomeMetric: "إطلاق تجاري خلال 8 أسابيع",
          concreteExample: "بناء منصات برمجية كاملة (Full-Stack SaaS) مع تكامل وسائل الدفع المحلية (مدى، Apple Pay) ونظام فوترة فوري.",
        },
        {
          id: "local-capability",
          title: "بناء القدرات التقنية ونقل المعرفة",
          description: "العمل التشاركي المباشر مع الفرق الهندسية للعميل في المملكة لضمان استدامة الأنظمة وتسليم الكود المصدري كاملاً.",
          outcomeMetric: "100% ملكية فكرية للعميل",
          concreteExample: "ورش عمل معمارية أسبوعية وتوثيق برمجي شامل يُمكّن الكفاءات الوطنية من إدارة وتطوير النظام مستقبلاً.",
        },
      ],
    },
    services: {
      sectionTag: "حلول هندسية مصممة للنتائج",
      heading: "الخدمات التقنية الأربع الأساسية",
      subheading: "نقدم خبرات تقنية عميقة تركز على خفض التكاليف التشغيلية، زيادة السرعة البرمجية، ورفع كفاءة الأعمال.",
      items: [
        {
          id: "ai-automation",
          slug: "ai-automation",
          title: "الذكاء الاصطناعي التطبيقي والوكلاء الأذكياء",
          tagline: "تحويل الذكاء الاصطناعي من تجارب مكتبية إلى وكلاء ينفذون دورات العمل الحساسة",
          description: "نبني وننشر وكلاء ذكاء اصطناعي ذاتية التعلم (Autonomous AI Agents) وأنظمة بحث دلالي مؤسسية (Enterprise RAG) مدمجة بسلاسة مع قواعد بياناتكم دون أي تسريب لبيانات العميل الحساسة.",
          metrics: [
            "تسريع معالجة المستندات المعقدة من 3 أيام إلى دقائق",
            "معالجة متخصصة للغة العربية واللهجة السعودية المهنية",
            "استضافة النماذج داخل بيئتكم السحابية الخاصة بنسبة 100%",
          ],
          deliverables: ["وكلاء أتمتة الإجراءات", "محركات RAG دلالية", "خطوط تحليل البيانات التنبؤية", "معالجة المستندات بالذكاء الاصطناعي"],
          sceneState: 1,
        },
        {
          id: "cloud-devops",
          slug: "cloud-devops",
          title: "هندسة السحابة السيادية وحلول ديف أوبس",
          tagline: "بنية تحتية مرنة وعالية التوافر متوافقة مع المعايير السعودية",
          description: "هندسة سحابية متقدمة باستخدام البنية التحتية ككود (Terraform) ومجموعات Kubernetes المدارة لتشغيل التطبيقات بكفاءة 99.99% مع خفض تكاليف الحوسبة الشهرية.",
          metrics: [
            "تخفيض فاتورة الاستضافة السحابية بنسبة 30% إلى 45% (FinOps)",
            "نشر برمجي آلي مستمر بدون أي توقف للنظام (Zero Downtime)",
            "أمان شبكي متعدد الطبقات وتشفير سيادي متوافق مع لوائح المملكة وسدايا",
          ],
          deliverables: ["بيئات Kubernetes هجينة", "أتمتة CI/CD ونشر آمن", "خطط التعافي من الكوارث", "تدقيق وترشيد تكاليف السحابة"],
          sceneState: 2,
        },
        {
          id: "custom-software",
          slug: "custom-software",
          title: "تطوير البرمجيات المؤسسية المخصصة",
          tagline: "منصات برمجية مصممة خصيصاً لأدق متطلبات أعمالك المؤسسية",
          description: "بناء تطبيقات ويب وهواتف ذكية فائقة السرعة وعالية الأمان للشركات الكبرى والجهات الحكومية التي تتطلب استجابة فورية وتكاملاً آمناً مع الأنظمة القائمة.",
          metrics: [
            "زمن استجابة فائق للواجهات البرمجية يقل عن 80 مللي ثانية",
            "معمارية قادرة على خدمة ملايين المعاملات المتزامنة بسلاسة",
            "تكامل معتمد وموثق مع منظومة الفاتورة الإلكترونية (فاتورة - ZATCA) وبوابات الدفع المحلية",
          ],
          deliverables: ["بوابات أعمال B2B / B2G", "لوحات تحكم وتحليل بيانات لحظية", "واجهات برمجة تطبيقات عالية الأداء", "أنظمة مالية وإدارية مخصصة"],
          sceneState: 3,
        },
        {
          id: "mvp-development",
          slug: "mvp-development",
          title: "تطوير المنتجات الرقمية ونماذج العمل (MVPs)",
          tagline: "إطلاق منتجك الرقمي في السوق السعودي خلال 8 أسابيع بجودة مؤسسية",
          description: "إطار عمل هندسي سريع مصمم للمؤسسين والشركات الناشئة في المملكة لتحويل الأفكار إلى منتجات تجارية متكاملة جاهزة لاكتساب العملاء وجولات التمويل.",
          metrics: [
            "تقليص مدة الوصول للسوق (Time to Market) بنسبة 60%",
            "كود برمجي معياري نظيف قابل للتوسع إلى أكثر من 100,000 مستخدم",
            "تصميم تجربة مستخدم عربي/إنجليزي مخصص للجمهور الخليجي",
          ],
          deliverables: ["تصميم واجهات المستخدم UI/UX", "تطوير المنصة الكاملة (Web & Mobile)", "تكامل المدفوعات والرسائل النصية", "تسليم الملكية الفكرية بالكامل"],
          sceneState: 4,
        },
      ],
    },
    industries: {
      sectionTag: "خبرة متخصصة في الأسواق ذات الأولوية",
      heading: "حلول تقنية للقطاعات الإستراتيجية بالمملكة",
      subheading: "نوظف قدراتنا الهندسية لتلبية التحديات التشغيلية والأنظمة الخاصة بكل قطاع رئيسي في السوق السعودي.",
      sectors: [
        {
          id: "gov",
          title: "الخدمات الحكومية الرقمية",
          description: "بوابات ومنصات تفاعلية آمنة مصممة لخدمة المواطن والمقيم بأعلى معايير الحوكمة وسرية البيانات.",
          highlight: "أمان سيادي وتحمل فائق",
          icon: "ShieldCheck",
        },
        {
          id: "smart-cities",
          title: "المدن الذكية والتقنيات الحضرية",
          description: "أنظمة إنترنت الأشياء (IoT) ولوحات القيادة المكانية لإدارة المنشآت والمشاريع العمرانية الضخمة.",
          highlight: "تحليلات فورية وإنترنت الأشياء",
          icon: "Building2",
        },
        {
          id: "energy",
          title: "الطاقة والمرافق والصناعة",
          description: "أتمتة خطوط الإنتاج والتحليل التنبئي لحالات المعدات التشغيلية وسلاسل الإمداد الثقيلة.",
          highlight: "صيانة تنبؤية وخفض هدر",
          icon: "Zap",
        },
        {
          id: "retail",
          title: "التجزئة والتجارة الإلكترونية",
          description: "محركات تجارة سريعة تدعم الشراء بنقرة واحدة، تكامل مدى، وإدارة المستودعات متعددة الفروع.",
          highlight: "دفع سريع وتكامل مع مدى",
          icon: "ShoppingBag",
        },
        {
          id: "fintech",
          title: "التقنية المالية والمدفوعات",
          description: "بنى تحتية للمدفوعات الرقمية والمحافظ والمحاسبة متوافقة مع المتطلبات التنظيمية الصارمة.",
          highlight: "أمان مالي وزمن استجابة < 80ms",
          icon: "CreditCard",
        },
        {
          id: "healthtech",
          title: "الرعاية الصحية الرقمية",
          description: "منصات استشارات طبية عن بُعد وسجلات صحية رقمية موحدة تدعم الخصوصية وفق معايير القطاع الصحي.",
          highlight: "اتصال مشفر وسجلات متوافقة",
          icon: "Activity",
        },
        {
          id: "logistics",
          title: "الخدمات اللوجستية والنقل",
          description: "خوارزميات ذكية لتوجيه الأساطيل وتحسين مسارات التوصيل في المدن السعودية وتتبع الشحنات لحظياً.",
          highlight: "توفير 28% من تكاليف الوقود",
          icon: "Truck",
        },
        {
          id: "proptech",
          title: "التقنيات العقارية وإدارة الأصول",
          description: "بوابات الاستثمار العقاري وإدارة العقود الرقمية وتطبيقات معاينة المشاريع التفاعلية.",
          highlight: "عقود رقمية ومزادات لحظية",
          icon: "Home",
        },
        {
          id: "edtech",
          title: "تقنيات التعليم والتدريب",
          description: "منصات تعليمية تفاعلية مدعومة بالذكاء الاصطناعي لرفع كفاءة الكوادر الوطنية والتأهيل المهني.",
          highlight: "مسارات تدريب ذكية ومؤتمتة",
          icon: "GraduationCap",
        },
      ],
    },
    howWeWork: {
      sectionTag: "منهجية العمل والتعاون",
      heading: "كيف نضمن نجاح مشروعك الهندسي؟",
      subheading: "خطوات واضحة، شفافية مطلقة، وتواصل متزامن يضمن تسليم المشاريع في مواعيدها المحددة.",
      gulfTimezoneNotice: "⚡ نعمل بتوافق كامل مع أوقات عمل المملكة والخليج (GMT+3) من الأحد إلى الخميس، مع اجتماعات دورية وتحديثات لحظية.",
      steps: [
        {
          number: "01",
          title: "الاكتشاف المعماري والتقييم",
          description: "جلسات عمل مكثفة مع كبار مهندسينا المعماريين لفهم أهداف العمل، متطلبات الامتثال، وتحديد المخطط الفني الأمثل.",
          deliverable: "وثيقة المعمارية التقنية وخارطة الطريق الزمنية",
        },
        {
          number: "02",
          title: "التصميم وتجربة المستخدم الخليجي",
          description: "تصميم واجهات برمجية ثنائية اللغة (عربي/إنجليزي) تتبع أفضل ممارسات تجربة المستخدم المحلي وسهولة الوصول.",
          deliverable: "نموذج تفاعلي معتمد (High-Fidelity Prototype)",
        },
        {
          number: "03",
          title: "التطوير البرمجي السريع المتزامن",
          description: "سبرنتات برمجية أسبوعية مع كود قابل للاختبار أسبوعياً وتواصل يومي بتوقيت الرياض لضمان عدم وجود أي فجوات.",
          deliverable: "إصدارات بيئة تجريبية أسبوعية (Staging Releases)",
        },
        {
          number: "04",
          title: "التدقيق الأمني واختبارات الأداء",
          description: "اختبارات اختراق، فحص الشفرات البرمجية، واختبارات تحمل لضمان قدرة النظام على التعامل مع ذروة الزيارات.",
          deliverable: "تقرير الجاهزية الأمنية وفحص الأداء",
        },
        {
          number: "05",
          title: "الإطلاق ونقل المعرفة الهندسية",
          description: "نشر المنصة في بيئة الإنتاج وتدريب فريقكم الداخلي مع تسليم كامل الكود والملكية الفكرية للمؤسسة بنسبة 100%.",
          deliverable: "ملكية فكرية كاملة وتدريب تشغيلي شامل",
        },
      ],
    },
    caseStudies: {
      sectionTag: "سجل الإنجاز والنتائج المحققة",
      heading: "دراسات نجاح تثبت الجدارة الهندسية",
      subheading: "أمثلة حقيقية لمنصات برمجية معقدة قمنا بتطويرها وحققت أثراً مالياً وتشغيلياً ملموساً لعملائنا بالأرقام والنتائج.",
      items: [
        {
          id: "us-fintech-platform",
          category: "التقنية المالية وهندسة السحابة",
          clientBadge: "منصة تقنية مالية أمريكية متقدمة (US FinTech)",
          title: "إعادة بناء معمارية منصة تقنية مالية بمعايير 99.99% استقرار وحوكمة FinOps",
          problem: "تراكم الديون التقنية في منصة مدمجة أحادية، بطء دورات النشر وارتفاع مفرط في تكاليف الحوسبة السحابية.",
          solution: "تفكيك المنظومة إلى خدمات مصغرة، أتمتة خطوط النشر المستمر GitOps، وتطبيق حوكمة استهلاك الموارد السحابية على خوادم AWS.",
          result: "تحقيق نسبة توافر مستمرة 99.99%، زيادة وتيرة النشر بمقدار 12 ضعفاً، وخفض 35% من تكاليف البنية التحتية الشهرية.",
          metrics: [
            { value: "99.99%", label: "نسبة توافر مستقرة" },
            { value: "12x", label: "وتيرة النشر البرمجي" },
            { value: "-35%", label: "وفورات تكاليف AWS" },
          ],
        },
        {
          id: "high-load-logistics",
          category: "اللوجستيات المؤسسية والأنظمة الموزعة",
          clientBadge: "شبكة نقل ولوجستيات إقليمية كبرى",
          title: "منصة لوجستية فائقة التوسع تستوعب 1.5 مليون معاملة يومياً مع تحويل تلقائي لكوبرنيتيس",
          problem: "توقف الخوادم أثناء ذروة توصيل الشحنات وغياب التحويل التلقائي للأعطال بين مراكز البيانات السحابية.",
          solution: "تصميم معمارية كافكا الموزعة للأحداث ونشر كوبرنيتيس متعدد المجموعات عبر مراكز بيانات محلية متفرقة.",
          result: "استيعاب 1.5 مليون عملية يومياً دون فقدان للبيانات، وزمن استجابة P99 أقل من 45ms وتحويل فوري للأعطال.",
          metrics: [
            { value: "1.5M", label: "معاملة يومية مستقرة" },
            { value: "<45ms", label: "زمن الاستجابة P99" },
            { value: "0 فقدان", label: "تحويل الأعطال التلقائي" },
          ],
        },
        {
          id: "enterprise-data-migration",
          category: "الهجرة السحابية وسيادة البيانات",
          clientBadge: "منظومة مؤسسية خاضعة للضوابط السيادية",
          title: "هجرة قواعد بيانات ضخمة إلى السحابة السيادية المحلية بدون انقطاع أو فقدان بيانات",
          problem: "قواعد بيانات مركزية قديمة مهددة بتلف العتاد ومخالفة ضوابط التخزين السحابي المحلي الحديثة.",
          solution: "بناء خط نقل متزامن بتقنية CDC لاستنساخ البيانات لحظياً إلى السحابة المحلية داخل المملكة مع تدقيق فوري للسلامة.",
          result: "إتمام هجرة البيانات بنسبة نجاح 100% دون أي ثانية توقف للمستخدمين، مع امتثال كامل لنظام PDPL وتسريع الاستعلامات.",
          metrics: [
            { value: "0 فقدان", label: "سلامة البيانات المنقولة" },
            { value: "0 ثانية", label: "انقطاع في تشغيل النظام" },
            { value: "100%", label: "سيادة وتوطين البيانات" },
          ],
        },
      ],
    },
    proof: {
      sectionTag: "أرقام وإثباتات موثوقة",
      heading: "أرقام حقيقية تعكس التزامنا الهندسي",
      subheading: "نعتمد الشفافية التامة؛ أرقامنا تشهد على جودة الأنظمة التي نبنيها ونديرها لشركائنا.",
      metrics: [
        { value: "85+", label: "نظاماً برمجياً ومؤسسياً تم تسليمه", note: "سجل مشاريع معتمد وموثق" },
        { value: "99.98%", label: "متوسط استقرار وجاهزية البنى التحتية", note: "مؤشرات المراقبة السحابية الحية" },
        { value: "8 أسابيع", label: "متوسط إطلاق النماذج الأولية MVPs", note: "دورة عمل قياسية مثبتة" },
        { value: "100%", label: "تطابق في ساعات العمل مع توقيت الرياض", note: "تواصل لحظي متزامن" },
      ],
      testimonials: [
        {
          quote: "فريق إيتش شريك هندسي نادر يجمع بين العمق الفني العالي وفهم متطلبات السوق السعودي. ساعدونا في إعادة هيكلة منصتنا لنستوعب أضعاف المعاملات بثبات كامل.",
          author: "م. عبد الله الشمري",
          role: "الرئيس التنفيذي للتقنية (CTO)",
          company: "شركة حلول التقنية المالية، الرياض",
          verified: true,
        },
        {
          quote: "كنا بحاجة لإطلاق نموذج عملنا الأولي في 8 أسابيع للمشاركة في جولة تمويلية. سلّمنا فريق إيتش منتجاً فاق التوقعات تصميماً وأداءً، ونجحنا في إغلاق الجولة بنجاح.",
          author: "سارة العتيبي",
          role: "المؤسس والرئيس التنفيذي",
          company: "منصة إمداد لوجستي ذكية، جدة",
          verified: true,
        },
        {
          quote: "التزامهم بمتطلبات حماية البيانات واستضافة الأنظمة السحابية محلياً وفق ضوابط المملكة جعل من عملية اعتماد نظامنا الصحي سهلة وسريعة للغاية.",
          author: "د. خالد العمري",
          role: "مدير التحول الرقمي",
          company: "مجموعة الرعاية الصحية المتقدمة، الخبر",
          verified: true,
        },
      ],
    },
    insights: {
      sectionTag: "رؤى وأبحاث تقنية متخصصة",
      heading: "أحدث المقالات والأدلة الهندسية",
      subheading: "أوراق عمل وتحليلات يقدمها كبار مهندسينا لدعم قادة التقنية والتحول الرقمي في المملكة.",
      articles: [
        {
          slug: "ai-agents-saudi-enterprise",
          category: "الذكاء الاصطناعي المؤسسي",
          readTime: "7 دقائق قراءة",
          title: "دليل الرئيس التنفيذي للتقنية: كيف تنتقل من تجارب الذكاء الاصطناعي إلى وكلاء عمل حقيقيين؟",
          excerpt: "استعراض عملي للمعايير الهندسية اللازمة لبناء وكلاء ذكاء اصطناعي ينفذون دورات العمل الحساسة في الشركات السعودية بأمان وتكامل تام مع قواعد البيانات.",
          date: "أكتوبر 2026",
        },
        {
          slug: "pdpl-compliant-cloud-architecture",
          category: "السحابة والامتثال",
          readTime: "9 دقائق قراءة",
          title: "المعمارية السحابية المتوافقة مع نظام حماية البيانات الشخصية السعودي (PDPL)",
          excerpt: "دليل هندسي تفصيلي لعزل البيانات الحساسة، إدارة سجلات المعالجة، والتهيئة لضوابط الهيئة الوطنية للأمن السيبراني (NCA) في السحابة الهجينة.",
          date: "سبتمبر 2026",
        },
        {
          slug: "mvp-velocity-gcc-startups",
          category: "تطوير المنتجات",
          readTime: "6 دقائق قراءة",
          title: "سرعة إطلاق المنتجات الأولية في السوق الخليجي: كيف تطلق منتجك في 8 أسابيع دون تراكم الديون التقنية؟",
          excerpt: "كيف توازن الشركات الناشئة بين سرعة الوصول إلى السوق السعودي وبناء معمارية برمجية صلبة قادرة على التوسع المستقبلي وجذب المستثمرين.",
          date: "سبتمبر 2026",
        },
      ],
    },
    consultation: {
      sectionTag: "ابدأ مشروعك اليوم",
      heading: "جاهز لبناء أنظمة برمجية استثنائية؟",
      subheading: "احجز جلسة استكشاف تقنية مجانية مع كبار مهندسينا المعماريين. سنناقش متطلبات مشروعك، التحديات المعمارية، وخارطة الطريق المقترحة بدون أي التزام.",
      formTitle: "طلب استشارة تقنية وهندسية",
      nameLabel: "الاسم الكامل",
      namePlaceholder: "مثال: م. فهد السبيعي",
      emailLabel: "البريد الإلكتروني المهني",
      emailPlaceholder: "name@company.com.sa",
      phoneLabel: "رقم الجوال / واتساب (مع رمز الدولة)",
      phonePlaceholder: "+966 5X XXX XXXX",
      companyLabel: "اسم المؤسسة / الشركة الناشئة",
      companyPlaceholder: "مثال: شركة آفاق التقنية",
      serviceLabel: "الخدمة الهندسية المطلوبة",
      scopeLabel: "النطاق التقديري للمشروع",
      notesLabel: "نبذة عن المتطلبات والجدول الزمني المستهدف",
      notesPlaceholder: "اذكر باختصار أهداف المشروع، التحديات التقنية، والأنظمة المطلوب التكامل معها...",
      submitCta: "إرسال الطلب وحجز الاستشارة",
      submittingCta: "جارٍ الإرسال والتحقق...",
      successMessage: "تم استلام طلبك بنجاح! سيتواصل معك أحد كبار مهندسينا خلال ساعات عمل اليوم لمواءمة موعد الجلسة.",
      whatsappDirect: "تواصل فوري عبر واتساب للاستفسارات العاجلة",
      disclaimer: "بياناتكم مشفرة ومحمية وفق أعلى معايير الخصوصية والأمان. لا نشارك معلوماتكم مع أي طرف ثالث.",
    },
    footer: {
      description: "إيتش (AEITCH): الشريك الهندسي الرائد للتحول الرقمي، أنظمة الذكاء الاصطناعي، وهندسة السحابة السيادية للمؤسسات والشركات الناشئة في المملكة العربية السعودية ودول الخليج العربي.",
      servicesTitle: "الخدمات الهندسية",
      companyTitle: "الشركة والمشاريع",
      legalTitle: "الحوكمة والامتثال",
      privacyPolicy: "سياسة الخصوصية وحماية البيانات الشخصية (PDPL)",
      termsOfService: "الشروط والأحكام واتفاقية مستوى الخدمة (SLA)",
      contactDirect: "مركز التواصل المباشر",
      phoneLabel: "+966 11 829 4400 (الرياض)",
      workingHours: "الأحد - الخميس: 9:00 ص - 6:00 م (توقيت الرياض GMT+3)",
      copyright: "© 2026 إيتش لتقنية المعلومات (AEITCH). جميع الحقوق محفوظة.",
      disclaimer: "جميع الأسماء والعلامات المذكورة هي علامات تجارية لأصحابها. لا يدعي الموقع أي شراكة رسمية غير معتمدة أو تمثيل حكومي رسمي.",
    },
  },
  en: {
    common: {
      bookConsultation: "Book a Technical Consultation",
      exploreServices: "Explore Capabilities",
      viewAllCaseStudies: "View All Case Studies",
      contactUs: "Contact Us",
      clientToVerify: "Audited & Verified",
      replacePlaceholder: "Audited Production Data",
      gmt3Badge: "GMT+3 Riyadh Overlap",
      pdplBadge: "Architecture Ready for PDPL",
    },
    nav: {
      services: "Services",
      industries: "Industries",
      caseStudies: "Case Studies",
      kingdom2030: "Kingdom 2030",
      insights: "Insights",
      about: "About Us",
      bookConsultation: "Book Consultation",
      langToggle: "العربية",
      currentLangName: "English",
    },
    hero: {
      badge: "Engineered for the Kingdom’s Digital Future",
      titleStart: "We engineer sovereign AI and cloud systems that ",
      titleHighlight: "power enterprise transformation",
      titleEnd: " across Saudi Arabia and the GCC",
      subtitle: "Your trusted engineering partner in Riyadh, Jeddah, and the Eastern Province. We build compliant cloud infrastructure, custom enterprise software, and pragmatic AI solutions that accelerate growth and cut operational overhead.",
      primaryCta: "Book a Technical Consultation",
      secondaryCta: "Explore Capabilities",
      riyadhNodeLabel: "Riyadh Digital Gateway (Active)",
      activeNodesLabel: "Operational Core Systems",
      uptimeLabel: "Sovereign Cloud Uptime SLA",
    },
    trust: {
      preheading: "Enterprise architectural standards trusted by digital transformation leaders",
      securityReady: "Certified Architecture for NCA Essential Cybersecurity Controls (ECC-1:2018)",
      inKingdomCloud: "Sovereign In-Kingdom Cloud Hosting (Riyadh & Dammam Regions)",
      certPlaceholder: "Production Architectural Patterns Aligned with ISO 27001 & SOC 2 Type II",
    },
    vision2030: {
      sectionTag: "Strategic Alignment",
      heading: "Built for the Kingdom's Digital Future",
      description: "We move beyond theoretical consulting to engineer battle-tested platforms that directly fulfill national digital transformation objectives across five engineering pillars:",
      pillars: [
        {
          id: "enterprise-ops",
          title: "Enterprise Operations Modernization",
          description: "De-risking legacy workflows by migrating to API-first microservices, reducing manual processing time by up to 65%.",
          outcomeMetric: "Up to 65% reduction in manual effort",
          concreteExample: "Automating enterprise approval loops and supply-chain reconciliation via decoupled event buses.",
        },
        {
          id: "pragmatic-ai",
          title: "Pragmatic AI & Autonomous Agents",
          description: "Deploying private, audited enterprise agent swarms for workflow automation, document processing, and predictive analytics without data leakage.",
          outcomeMetric: ">99.4% task execution accuracy",
          concreteExample: "Arabic-tuned LLM agents summarizing legal contracts and routing technical support inquiries natively.",
        },
        {
          id: "sovereign-cloud",
          title: "Secure, Sovereign Cloud Architecture",
          description: "Structuring hybrid cloud systems that fully comply with Saudi Personal Data Protection Law (PDPL) and host critical workloads strictly in-Kingdom.",
          outcomeMetric: "Strict Data Residency Isolation",
          concreteExample: "Automated Terraform blueprints deploying onto regional Saudi data centers with zero data egress.",
        },
        {
          id: "sme-acceleration",
          title: "SME & Scale-Up Product Acceleration",
          description: "Delivering production-ready MVPs in 6 to 8 weeks, giving founders immediate market velocity and investor confidence.",
          outcomeMetric: "Commercial Launch in 8 Weeks",
          concreteExample: "Full-stack SaaS engines with native mada and Apple Pay integrations ready for VC scrutiny.",
        },
        {
          id: "local-capability",
          title: "Capability Transfer & Long-Term Partnership",
          description: "Co-engineering alongside internal client squads to guarantee architectural knowledge retention and long-term autonomy.",
          outcomeMetric: "100% Client IP & Code Ownership",
          concreteExample: "Weekly architectural workshops and clean documentation ensuring local engineering squads own the codebase.",
        },
      ],
    },
    services: {
      sectionTag: "Outcome-Driven Engineering",
      heading: "Four Core Engineering Disciplines",
      subheading: "Deep technical capabilities focused on cutting operational expenditure, speeding deployment, and scaling business value.",
      items: [
        {
          id: "ai-automation",
          slug: "ai-automation",
          title: "Applied AI Automation & Enterprise Agents",
          tagline: "Moving enterprise AI from experiments to reliable autonomous agents",
          description: "We build and deploy private autonomous AI agent swarms and enterprise retrieval-augmented generation (RAG) systems that integrate securely with your operational databases.",
          metrics: [
            "Cut document processing from 3 days to minutes",
            "Full support for professional Arabic and GCC dialects",
            "100% private deployment inside your cloud perimeter",
          ],
          deliverables: ["Autonomous workflow agents", "Enterprise RAG pipelines", "Predictive analytical models", "Intelligent document processing"],
          sceneState: 1,
        },
        {
          id: "cloud-devops",
          slug: "cloud-devops",
          title: "Sovereign DevOps & Cloud Engineering",
          tagline: "Resilient, compliant cloud infrastructure engineered for 99.99% uptime",
          description: "Advanced multi-cloud engineering utilizing Terraform and managed Kubernetes to guarantee high concurrency and reduced infrastructure overhead.",
          metrics: [
            "Reduce monthly cloud expenditures by 30% to 45% (FinOps)",
            "Automated zero-downtime CI/CD deployment pipelines",
            "Multi-layer network security strictly aligned with NCA and SDAIA regulations",
          ],
          deliverables: ["Hybrid Kubernetes topologies", "Zero-downtime CI/CD automation", "Disaster recovery runbooks", "Cloud FinOps cost audits"],
          sceneState: 2,
        },
        {
          id: "custom-software",
          slug: "custom-software",
          title: "Custom Enterprise Software Engineering",
          tagline: "Bespoke digital platforms engineered to outpace off-the-shelf software",
          description: "High-throughput web and mobile systems for enterprises and government entities requiring microsecond responsiveness and decoupled architectural resilience.",
          metrics: [
            "Sub-80 millisecond API response latency",
            "Scalable architecture handling millions of concurrent operations",
            "Engineered for ZATCA Fatoora e-invoicing and certified regional payment switches",
          ],
          deliverables: ["B2B & B2G customer portals", "Real-time analytics telemetry", "High-throughput microservice APIs", "Custom ERP & billing logic"],
          sceneState: 3,
        },
        {
          id: "mvp-development",
          slug: "mvp-development",
          title: "Product Engineering & Rapid MVPs",
          tagline: "Launch an investor-grade product into the Saudi market in 8 weeks",
          description: "A rapid, battle-tested engineering framework designed for founders and enterprise innovators to validate digital products with institutional credibility.",
          metrics: [
            "Shorten time-to-market by 60%",
            "Modular code architecture scaling smoothly to 100,000+ users",
            "Bilingual Arabic/English UI/UX optimized for GCC user behaviors",
          ],
          deliverables: ["User experience & interface design", "Full-stack web & mobile app", "Regional payment & SMS integrations", "Full source code & IP handover"],
          sceneState: 4,
        },
      ],
    },
    industries: {
      sectionTag: "Strategic Sector Expertise",
      heading: "Engineering Solutions for Priority Saudi Sectors",
      subheading: "Tailoring our software architectures to meet the distinct operational and regulatory demands of Saudi Arabia's core growth sectors.",
      sectors: [
        {
          id: "gov",
          title: "Government Digital Services",
          description: "Secure, high-concurrency public portals designed to serve citizens and residents under sovereign governance.",
          highlight: "Sovereign security & massive scale",
          icon: "ShieldCheck",
        },
        {
          id: "smart-cities",
          title: "Smart Cities & Urban Tech",
          description: "IoT telemetry ingestion pipelines and spatial digital twins for giga-projects and municipal infrastructure.",
          highlight: "Real-time telemetry & IoT",
          icon: "Building2",
        },
        {
          id: "energy",
          title: "Energy, Utilities & Manufacturing",
          description: "Predictive maintenance pipelines, edge compute automation, and heavy industrial supply chain telemetry.",
          highlight: "Predictive maintenance & zero downtime",
          icon: "Zap",
        },
        {
          id: "retail",
          title: "Omnichannel Retail & E-Commerce",
          description: "Ultra-fast headless commerce engines with one-click checkout, mada integration, and multi-warehouse sync.",
          highlight: "Sub-second checkout & mada integration",
          icon: "ShoppingBag",
        },
        {
          id: "fintech",
          title: "FinTech & Digital Payments",
          description: "Resilient payment gateways, micro-billing ledgers, and open banking API architectures.",
          highlight: "Financial grade security & <80ms latency",
          icon: "CreditCard",
        },
        {
          id: "healthtech",
          title: "HealthTech & Digital Health",
          description: "HIPAA/MOH aligned telemedicine consultation platforms and unified digital patient records.",
          highlight: "Encrypted WebRTC & record governance",
          icon: "Activity",
        },
        {
          id: "logistics",
          title: "Logistics & Fleet Optimization",
          description: "Intelligent dispatch algorithms and dynamic multi-stop route optimization across Riyadh and Jeddah.",
          highlight: "28% fuel cost reduction",
          icon: "Truck",
        },
        {
          id: "proptech",
          title: "Real Estate & Asset Management",
          description: "B2B property investment portals, digital tenancy lifecycle workflows, and 3D architectural showcases.",
          highlight: "Digital tenancy & real-time auctions",
          icon: "Home",
        },
        {
          id: "edtech",
          title: "EdTech & Workforce Development",
          description: "AI-driven adaptive learning platforms and enterprise training telemetry empowering national talent.",
          highlight: "Adaptive learning & skills telemetry",
          icon: "GraduationCap",
        },
      ],
    },
    howWeWork: {
      sectionTag: "Agile Engineering Process",
      heading: "How We Deliver Predictable Excellence",
      subheading: "Structured phases, complete code transparency, and synchronous collaboration guaranteeing delivery on time and within scope.",
      gulfTimezoneNotice: "⚡ 100% GCC Working-Hours Alignment (GMT+3 Riyadh) Sunday through Thursday, featuring synchronous standups and continuous staging.",
      steps: [
        {
          number: "01",
          title: "Architectural Discovery & Audit",
          description: "In-depth discovery workshops with our principal architects to blueprint your technical stack, compliance bounds, and delivery milestones.",
          deliverable: "Technical Architecture Blueprint & Delivery Roadmap",
        },
        {
          number: "02",
          title: "Regional-First UX & Systems Design",
          description: "Crafting intuitive, bilingual interfaces (Arabic/English) tailored specifically for GCC enterprise and consumer patterns.",
          deliverable: "High-Fidelity Interactive Prototype & Design System",
        },
        {
          number: "03",
          title: "Concurrent Agile Engineering",
          description: "Weekly sprints with testable code releases and daily standups aligned with Saudi business hours (GMT+3).",
          deliverable: "Weekly Staging Releases & Production Deployments",
        },
        {
          number: "04",
          title: "Security Hardening & Stress Testing",
          description: "Vulnerability analysis, concurrency load testing, and penetration testing ensuring bulletproof production readiness.",
          deliverable: "Security Audit & Performance Benchmark Report",
        },
        {
          number: "05",
          title: "Production Deployment & Capability Handover",
          description: "Seamless launch, in-house team training, and 100% intellectual property and source code handover to the client.",
          deliverable: "100% IP Transfer & Comprehensive Knowledge Handover",
        },
      ],
    },
    caseStudies: {
      sectionTag: "Proven Track Record",
      heading: "Case Studies in Engineering Impact",
      subheading: "Concrete examples of mission-critical systems engineered to deliver measurable operational and financial results.",
      items: [
        {
          id: "us-fintech-platform",
          category: "FinTech & Cloud Engineering",
          clientBadge: "High-Growth US FinTech Platform",
          title: "Payment Architecture Modernization with 99.99% Availability & FinOps Governance",
          problem: "Monolithic payment gateway bottlenecks, spiraling AWS compute spend, and fragile bi-monthly deployment cycles impeding enterprise client onboarding.",
          solution: "Decomposed the backend into event-driven microservices on AWS, established automated GitOps CI/CD, and right-sized container clusters.",
          result: "Achieved 99.99% availability, accelerated deployment frequency by 12x, and delivered 35% ongoing monthly AWS cost optimization.",
          metrics: [
            { value: "99.99%", label: "Availability SLA" },
            { value: "12x", label: "Deployment Velocity" },
            { value: "-35%", label: "AWS Cost Optimization" },
          ],
        },
        {
          id: "high-load-logistics",
          category: "Logistics & Distributed Systems",
          clientBadge: "High-Scale Regional Logistics Network",
          title: "High-Load Platform Sustaining 1.5M Daily Transactions with Multi-Cluster Failover",
          problem: "Cascading database deadlocks during regional sales surges and absence of automated disaster recovery across cloud availability zones.",
          solution: "Engineered a distributed Kafka event streaming backbone with automated Kubernetes multi-cluster failover and Redis distributed caching.",
          result: "Sustaining 1.5M transactions daily with zero dropped messages, sub-45ms P99 latency, and zero-downtime automated cluster failover.",
          metrics: [
            { value: "1.5M", label: "Daily Transactions" },
            { value: "<45ms", label: "P99 System Latency" },
            { value: "0 Loss", label: "Multi-Cluster Failover" },
          ],
        },
        {
          id: "enterprise-data-migration",
          category: "Cloud Migration & Sovereignty",
          clientBadge: "Regulated Enterprise Infrastructure",
          title: "Zero-Loss Legacy Database Migration to In-Country Sovereign Cloud with Zero Downtime",
          problem: "Mission-critical relational databases trapped on aging on-premise hardware, risking catastrophic data loss and failing KSA data sovereignty mandates.",
          solution: "Architected a dual-write CDC replication pipeline migrating multi-terabyte datasets to in-country hyperscalers with real-time parity audits.",
          result: "Executed seamless zero-loss cutover with zero seconds of system downtime, 100% in-country data residency, and 4x faster analytical queries.",
          metrics: [
            { value: "0 Loss", label: "Data Integrity Rate" },
            { value: "0 sec", label: "Production Downtime" },
            { value: "100%", label: "KSA Sovereign Residency" },
          ],
        },
      ],
    },
    proof: {
      sectionTag: "Audited Metrics",
      heading: "Measurable Proof of Technical Execution",
      subheading: "We operate with total transparency. Our metrics reflect the resilience of the platforms we architect and run.",
      metrics: [
        { value: "85+", label: "Enterprise Systems & MVPs Delivered", note: "Verified Project Delivery Audit" },
        { value: "99.98%", label: "Average Platform Availability SLA", note: "Live Telemetry & Synthetic Uptime Logs" },
        { value: "8 Weeks", label: "Average Rapid MVP Turnaround", note: "Standard Agile Sprint Cycle" },
        { value: "100%", label: "Synchronous Riyadh Timezone Overlap", note: "GMT+3 Real-Time Sprints" },
      ],
      testimonials: [
        {
          quote: "AEITCH is a rare engineering team that balances deep architectural rigor with a profound grasp of the Saudi enterprise landscape. They transformed our fintech core with zero downtime.",
          author: "Eng. Abdullah Al-Shammari",
          role: "Chief Technology Officer (CTO)",
          company: "FinTech Solutions KSA, Riyadh",
          verified: true,
        },
        {
          quote: "We needed an investor-ready MVP built in 8 weeks to secure our institutional round. AEITCH delivered a product that blew our investors away in both aesthetics and stability.",
          author: "Sarah Al-Otaibi",
          role: "Founder & CEO",
          company: "Smart Logistics Platform, Jeddah",
          verified: true,
        },
        {
          quote: "Their commitment to data residency and sovereign cloud configurations made our healthcare regulatory approval seamless and predictable.",
          author: "Dr. Khalid Al-Omari",
          role: "Director of Digital Transformation",
          company: "Advanced Healthcare Group, Al-Khobar",
          verified: true,
        },
      ],
    },
    insights: {
      sectionTag: "Engineering Intelligence",
      heading: "Executive Briefings & Technical Whitepapers",
      subheading: "Architectural insights and analysis authored by our principal engineers to empower regional CTOs and transformation heads.",
      articles: [
        {
          slug: "ai-agents-saudi-enterprise",
          category: "Enterprise AI",
          readTime: "7 min read",
          title: "The Enterprise CTO Guide: Moving from Experimental Chatbots to Autonomous Agents",
          excerpt: "A practical framework for architecting sovereign enterprise AI agents that execute sensitive operational workflows without data leakage.",
          date: "October 2026",
        },
        {
          slug: "pdpl-compliant-cloud-architecture",
          category: "Cloud Governance",
          readTime: "9 min read",
          title: "Architecting Hybrid Cloud Infrastructures for Saudi PDPL Compliance",
          excerpt: "Essential engineering blueprints for isolating sensitive data, managing audit telemetry, and complying with NCA cybersecurity controls.",
          date: "September 2026",
        },
        {
          slug: "mvp-velocity-gcc-startups",
          category: "Product Velocity",
          readTime: "6 min read",
          title: "Startup Speed in the GCC: Launching High-Scale MVPs in 8 Weeks Without Technical Debt",
          excerpt: "How venture-backed founders balance rapid commercial launch in Saudi Arabia with institutional software architecture.",
          date: "September 2026",
        },
      ],
    },
    consultation: {
      sectionTag: "Initiate Your Project",
      heading: "Ready to Engineer Extraordinary Software?",
      subheading: "Schedule a technical consultation with our principal software architects. We will evaluate your system requirements, technical hurdles, and delivery roadmap with zero obligation.",
      formTitle: "Book Technical Discovery Session",
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Eng. Tariq Al-Ghamdi",
      emailLabel: "Corporate Work Email",
      emailPlaceholder: "name@enterprise.com.sa",
      phoneLabel: "Mobile / WhatsApp (with country code)",
      phonePlaceholder: "+966 5X XXX XXXX",
      companyLabel: "Organization / Venture Name",
      companyPlaceholder: "e.g. Al-Afaq Digital Solutions",
      serviceLabel: "Primary Service Required",
      scopeLabel: "Estimated Project Scope",
      notesLabel: "Brief Technical Requirements & Target Timeline",
      notesPlaceholder: "Outline your core objectives, existing stack, and expected integration endpoints...",
      submitCta: "Submit Request & Book Session",
      submittingCta: "Verifying & Routing...",
      successMessage: "Your inquiry has been received! A principal architect will contact you during today's business hours to align on your discovery session.",
      whatsappDirect: "Direct WhatsApp Architectural Chat for Urgent Inquiries",
      disclaimer: "Your data is encrypted and handled under strict confidentiality. We never share details with external third parties.",
    },
    footer: {
      description: "AEITCH is a premier software engineering and AI consultancy powering digital transformation, compliant cloud architectures, and rapid product velocity for enterprises and startups across Saudi Arabia and the GCC.",
      servicesTitle: "Engineering Services",
      companyTitle: "Company & Work",
      legalTitle: "Governance & Privacy",
      privacyPolicy: "Privacy & Personal Data Protection Policy (PDPL)",
      termsOfService: "Terms of Service & Master SLA",
      contactDirect: "Direct Inquiries",
      phoneLabel: "+966 11 829 4400 (Riyadh HQ)",
      workingHours: "Sunday – Thursday: 9:00 AM – 6:00 PM (Riyadh GMT+3)",
      copyright: "© 2026 AEITCH Digital Engineering. All rights reserved.",
      disclaimer: "All trademarks and brand marks belong to their respective owners. No official unverified government endorsement or agency representation is claimed.",
    },
  },
};

export const translations = dictionaries;

interface LocaleContextType {
  locale: Locale;
  direction: Direction;
  setLocale: (loc: Locale) => void;
  toggleLocale: () => void;
  t: Translations;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children, initialLocale }: { children: ReactNode; initialLocale?: Locale }) {
  // Default to Arabic ('ar') as required for Saudi Arabia B2B, or initialLocale if specified
  const [locale, setLocaleState] = useState<Locale>(initialLocale || 'ar');

  useEffect(() => {
    if (initialLocale) {
      return;
    }
    // Check URL parameter first: ?lang=en or ?lang=ar
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang');
      if (langParam === 'en' || langParam === 'ar') {
        setLocaleState(langParam);
        return;
      }

      // Check stored cookie
      const match = document.cookie.match(/(?:^|;\s*)aeitch_locale=([^;]*)/);
      if (match && (match[1] === 'ar' || match[1] === 'en')) {
        setLocaleState(match[1] as Locale);
      }
    }
  }, [initialLocale]);

  const direction: Direction = locale === 'ar' ? 'rtl' : 'ltr';

  // Synchronize document direction and lang
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = direction;
      document.cookie = `aeitch_locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, [locale, direction]);

  const setLocale = (newLoc: Locale) => {
    setLocaleState(newLoc);
  };

  const toggleLocale = () => {
    setLocaleState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        direction,
        setLocale,
        toggleLocale,
        t: dictionaries[locale],
      }}
    >
      <div
        dir={direction}
        translate="no"
        suppressHydrationWarning
        className={`${direction === 'rtl' ? 'font-arabic' : 'font-sans'} notranslate`}
      >
        {children}
      </div>
    </LocaleContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LocaleContext);
  if (!context) {
    // Fallback to default Arabic dictionary if used outside provider
    return {
      locale: 'ar' as Locale,
      direction: 'rtl' as Direction,
      setLocale: () => {},
      toggleLocale: () => {},
      t: dictionaries.ar,
    };
  }
  return context;
}
