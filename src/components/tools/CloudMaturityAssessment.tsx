"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Server,
  Cloud,
  Lock,
  Sparkles,
  Download,
  RotateCcw,
  Activity,
  FileCheck,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface Question {
  id: number;
  category: string;
  categoryAr: string;
  question: string;
  questionAr: string;
  options: {
    text: string;
    textAr: string;
    points: number;
    hint: string;
    hintAr: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Hyperscaler Strategy',
    categoryAr: 'استراتيجية السحابة الإقليمية',
    question: 'Where is your primary application data and core infrastructure hosted?',
    questionAr: 'أين يتم استضافة بيانات وتطبيقات منظومتكم الأساسية حالياً؟',
    options: [
      {
        text: 'Legacy on-premise servers or offshore cloud outside Saudi Arabia',
        textAr: 'خوادم تقليدية داخلية أو سحابة أجنبية خارج حدود المملكة',
        points: 5,
        hint: 'Exposed to latency penalties and cross-border data sovereignty non-compliance.',
        hintAr: 'معرض لتأخر الاستجابة ومخالفة ضوابط نقل البيانات عبر الحدود.',
      },
      {
        text: 'Hybrid setup with basic in-country presence, planning cloud migration',
        textAr: 'بيئة هجينة مع استضافة محلية جزئية، ونخطط للهجرة السحابية',
        points: 15,
        hint: 'Good foundation, requiring architectural roadmapping to eliminate double costs.',
        hintAr: 'أساس جيد، يتطلب خارطة طريق معمارية لتفادي ازدواجية التكاليف.',
      },
      {
        text: 'Local Saudi Hyperscalers (Google Cloud Dammam, Azure Riyadh, AWS KSA, Oracle)',
        textAr: 'سحابة سعودية محلية معتمدة (Google Cloud Dammam أو Azure Riyadh أو AWS KSA)',
        points: 20,
        hint: 'Full alignment with national in-country cloud mandates.',
        hintAr: 'مواءمة معمارية كاملة مع استراتيجية السحابة أولاً الوطنية.',
      },
    ],
  },
  {
    id: 2,
    category: 'Data Sovereignty & PDPL',
    categoryAr: 'سيادة البيانات ونظام PDPL',
    question: 'How does your system enforce Saudi PDPL Class 3 personal data isolation?',
    questionAr: 'كيف تضمن منظومتكم حماية وعزل البيانات الشخصية وفق نظام PDPL السعودي؟',
    options: [
      {
        text: 'No formal automated data classification or encryption at rest',
        textAr: 'لا يوجد تصنيف آلي للبيانات أو تشفير كامل أثناء السكون والحركة',
        points: 5,
        hint: 'High regulatory risk under SDAIA and PDPL statutory enforcement.',
        hintAr: 'مخاطرة نظامية عالية تحت إشراف سدايا وضوابط حماية البيانات.',
      },
      {
        text: 'Database encryption active, but manual access audits and boundary checks',
        textAr: 'تشفير قواعد البيانات مفعّل، ولكن التدقيق والتحكم بالوصول يدوي',
        points: 12,
        hint: 'Security active but vulnerable to privileged credential abuse.',
        hintAr: 'التشفير نشط ولكن التدقيق اليدوي يفتقر إلى الحصانة الكاملة.',
      },
      {
        text: 'Automated KMS encryption, zero-leak bastions, and strict in-kingdom residency',
        textAr: 'تشفير مؤتمت عبر KMS، وصول Zero-Trust سيادي، وحظر تام لخروج البيانات',
        points: 20,
        hint: 'Gold standard compliance ready for immediate enterprise audit certification.',
        hintAr: 'المعيار الذهبي للامتثال المؤسسي الجاهز للتدقيق الرسمي فوراً.',
      },
    ],
  },
  {
    id: 3,
    category: 'Software Architecture',
    categoryAr: 'معمارية النظم والبرمجيات',
    question: 'What is the architectural topology of your core backend applications?',
    questionAr: 'ما هي المعمارية البرمجية الحالية لتطبيقاتكم المؤسسية؟',
    options: [
      {
        text: 'Tightly coupled monolithic architecture with frequent deployment outages',
        textAr: 'منظومة أحادية مدمجة (Monolith) مع توقف الخدمة أثناء التحديثات',
        points: 5,
        hint: 'Scalability bottleneck; difficult to maintain multi-squad velocity.',
        hintAr: 'عائق كبير أمام التوسع وتطوير الميزات بسرعة واستقرار.',
      },
      {
        text: 'Service-oriented architecture with REST APIs and basic Docker containerization',
        textAr: 'بنية موجهة للخدمات (SOA) عبر واجهات برمجة REST وحاويات Docker',
        points: 14,
        hint: 'Moderate scalability, but inter-service synchronous calls risk cascading latency.',
        hintAr: 'مرونة متوسطة ولكن الاتصالات التزامنية قد تسبب بطئاً تراكمياً.',
      },
      {
        text: 'Decoupled event-driven microservices (Kafka) with Kubernetes autoscaling',
        textAr: 'خدمات مصغرة مستقلة قائمة على الأحداث (Kafka) وحاويات Kubernetes ذاتية التوسع',
        points: 20,
        hint: 'Ultra-resilient, capable of sustaining 100k+ concurrent requests under 80ms.',
        hintAr: 'أقصى درجات المرونة، قادرة على استيعاب مئات آلاف العمليات بزمن < 80ms.',
      },
    ],
  },
  {
    id: 4,
    category: 'DevSecOps & GitOps',
    categoryAr: 'ديف سيك أوبس والأتمتة الأمنية',
    question: 'How are deployments and security vulnerability scanning executed?',
    questionAr: 'كيف تتم دورة النشر وفحص الثغرات الأمنية في خطوط الإنتاج لديكم؟',
    options: [
      {
        text: 'Manual deployments via scripts or SSH; ad-hoc manual testing',
        textAr: 'نشر يدوي عبر البرامج النصية أو SSH؛ واختبارات أمنية دورية يدوية',
        points: 5,
        hint: 'Prone to human error, configuration drift, and undocumented release changes.',
        hintAr: 'عرضة للأخطاء البشرية وفقدان السيطرة على سجل التغييرات.',
      },
      {
        text: 'Automated CI/CD pipelines with unit tests, but secrets stored in environment vars',
        textAr: 'خطوط CI/CD مؤتمتة مع اختبارات، ولكن إدارة المفاتيح تتم بمتغيرات بيئية عادية',
        points: 12,
        hint: 'Solid developer velocity, but secrets sprawl creates credential theft vectors.',
        hintAr: 'سرعة تطوير جيدة، ولكن انتشار المفاتيح يشكل ثغرة أمنية محتملة.',
      },
      {
        text: 'Infrastructure as Code (Terraform), Vault dynamic secrets & automated SAST/DAST scans',
        textAr: 'بنية تحتية برمجية (Terraform)، إدارة أسرار عبر Vault، وفحص أمني آلي في CI/CD',
        points: 20,
        hint: 'NCA ECC & CCC ready; zero secret hardcoding and zero-downtime blue-green deploys.',
        hintAr: 'مطابق لضوابط NCA للأمن السيبراني مع نشر مستمر دون انقطاع إطلاقاً.',
      },
    ],
  },
  {
    id: 5,
    category: 'Reliability & High Availability',
    categoryAr: 'الموثوقية والجاهزية العالية',
    question: 'What is your target uptime SLA and multi-zone disaster recovery posture?',
    questionAr: 'ما هو معدل التوافر المستهدف (SLA) وجاهزية التعافي من الكوارث لديكم؟',
    options: [
      {
        text: 'Single availability zone; Recovery Time Objective (RTO) > 4 hours',
        textAr: 'نطاق توفر فردي (Single AZ) وزمن التعافي عند العطل يتجاوز 4 ساعات',
        points: 5,
        hint: 'Severe business continuity vulnerability in the event of cloud outage.',
        hintAr: 'تهديد حقيقي لاستمرارية الأعمال في حال تعطل المنطقة السحابية.',
      },
      {
        text: 'Multi-AZ setup with database replicas; manual failover procedures',
        textAr: 'توزيع عبر نطاقين مع نسخ لقاعدة البيانات؛ والتحويل عند العطل يدوي',
        points: 14,
        hint: 'Good fault tolerance, with 15-30 minute downtime during failover events.',
        hintAr: 'تحمل جيد للأعطال مع توقف محتمل يتراوح بين 15 و 30 دقيقة.',
      },
      {
        text: 'Active-active multi-region failover with 99.99% SLA guarantee and automated health checks',
        textAr: 'تشغيل نشط متزامن مع نسبة توافر 99.99% وتحويل آلي فوري لحركة المرور',
        points: 20,
        hint: 'Tier-4 mission-critical resilience suitable for FinTech and Giga-Project scale.',
        hintAr: 'موثوقية فائقة ملائمة للبنوك الرقمية والمشاريع الوطنية الضخمة.',
      },
    ],
  },
];

export function CloudMaturityAssessment() {
  const { locale, direction } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [leadFormSubmitted, setLeadFormSubmitted] = useState(false);
  const [leadInfo, setLeadInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const totalQuestions = QUESTIONS.length;
  const currentQ = QUESTIONS[currentStep];

  const handleSelectOption = (qId: number, points: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: points }));
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const calculateScore = () => {
    const rawTotal = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    return Math.min(100, Math.max(25, rawTotal));
  };

  const score = calculateScore();

  const getTier = (scoreVal: number) => {
    if (scoreVal >= 85) {
      return {
        title: locale === 'ar' ? 'الفئة الأولى: ريادة سحابية سيادية متقدمة' : 'Tier 1: Sovereign Enterprise Leader',
        desc:
          locale === 'ar'
            ? 'منظومتكم تمتلك أسساً معمارية قوية ومتوافقة بشكل ممتاز مع متطلبات السحابة السعودية وضوابط NCA. نوصي بمراجعة تحسين التكاليف (FinOps) وحوكمة الوكلاء الأذكياء.'
            : 'Your platform displays robust enterprise maturity and strong compliance with Saudi hyperscalers. Recommended next step: FinOps cost governance and autonomous agent integration.',
        color: 'text-emerald-400',
        badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      };
    } else if (scoreVal >= 60) {
      return {
        title: locale === 'ar' ? 'الفئة الثانية: منصة قيد التحديث (أولوية تسريع الهجرة)' : 'Tier 2: Modernizing Platform (Migration Priority)',
        desc:
          locale === 'ar'
            ? 'منظومتكم تحقق بعض المعايير، ولكنها تواجه مخاطر تشغيلية تتعلق بأتمتة الأمان وتكامل الخدمات المصغرة ونقل البيانات المحلية. يُنصح بإجراء مراجعة معمارية شاملة.'
            : 'Your systems are modernizing but carry exposure in automated DevSecOps, data residency isolation, and monolithic bottlenecks. A structured architecture review is highly recommended.',
        color: 'text-accent',
        badgeBg: 'bg-accent/10 border-accent/30 text-accent',
      };
    } else {
      return {
        title: locale === 'ar' ? 'الفئة الثالثة: بيئة تقليدية معرضة للمخاطر (تحديث فوري)' : 'Tier 3: Legacy Exposure (Urgent Modernization Required)',
        desc:
          locale === 'ar'
            ? 'تعتمد منظومتكم على بنى تقليدية قد تؤدي إلى بطء في الإطلاق ومخالفات لنظام حماية البيانات الشخصية. ننصح بجدولة جلسة استكشاف معمارية لتفكيك المنظومة والانتقال للسحابة المحلية.'
            : 'Critical exposure: Monolithic dependencies and lack of automated compliance pose regulatory and scaling risks under Saudi Vision 2030 standards. Urgent cloud replatforming advised.',
        color: 'text-rose-400',
        badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
      };
    }
  };

  const tier = getTier(score);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadFormSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
    setLeadFormSubmitted(false);
  };

  return (
    <div className="relative w-full rounded-3xl border border-white/15 bg-black/95 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl text-white" dir={direction}>
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-mono font-semibold text-accent mb-2">
            <Activity className="h-3.5 w-3.5" />
            <span>{locale === 'ar' ? 'أداة التشخيص المعماري (دقيقتان)' : '2-Minute Architecture Diagnostic'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            {locale === 'ar'
              ? 'هل منصتكم التقنية جاهزة للامتثال السحابي والتوسع في المملكة؟'
              : 'Is Your Platform Ready for KSA Cloud Compliance & Hyperscaler Scaling?'}
          </h3>
        </div>

        {!isCompleted && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-fg-subtle">
              {locale === 'ar' ? `السؤال ${currentStep + 1} من ${totalQuestions}` : `Question ${currentStep + 1} of ${totalQuestions}`}
            </span>
            <div className="h-2 w-28 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Diagnostic Body */}
      {!isCompleted ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: direction === 'rtl' ? -15 : 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'rtl' ? 15 : -15 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                {locale === 'ar' ? currentQ.categoryAr : currentQ.category}
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                {locale === 'ar' ? currentQ.questionAr : currentQ.question}
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, opt.points)}
                  className="group relative flex flex-col items-start rounded-2xl border border-white/10 bg-surface p-4 text-start transition-all duration-200 hover:border-accent hover:bg-surface-2 active:scale-[0.99]"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                      {locale === 'ar' ? opt.textAr : opt.text}
                    </span>
                    {direction === 'rtl' ? (
                      <ArrowLeft className="h-4 w-4 text-fg-subtle opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                    ) : (
                      <ArrowRight className="h-4 w-4 text-fg-subtle opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    )}
                  </div>
                  <span className="text-xs text-fg-subtle">
                    {locale === 'ar' ? opt.hintAr : opt.hint}
                  </span>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <div className="pt-2">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-xs text-fg-subtle hover:text-white transition-colors"
                >
                  {locale === 'ar' ? '← العودة للسؤال السابق' : '← Previous Question'}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        /* Diagnostic Results Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Score Gauge (4 Cols) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-surface text-center">
              <span className="text-xs font-mono text-fg-subtle uppercase tracking-wider mb-2">
                {locale === 'ar' ? 'مؤشر الجاهزية المعمارية' : 'Architecture Readiness Score'}
              </span>
              <div className="relative flex items-center justify-center my-4">
                <div className="h-32 w-32 rounded-full border-4 border-white/10 flex items-center justify-center">
                  <span className="text-4xl font-extrabold text-white font-mono">
                    {score}<span className="text-accent text-xl">/100</span>
                  </span>
                </div>
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${tier.badgeBg}`}>
                {tier.title}
              </span>
            </div>

            {/* Assessment Narrative (7 Cols) */}
            <div className="md:col-span-7 space-y-4">
              <h4 className="text-xl font-bold text-white">
                {locale === 'ar' ? 'التقييم المعماري والتوصيات الأولية' : 'Architectural Summary & Key Findings'}
              </h4>
              <p className="text-sm text-fg-muted leading-relaxed">
                {tier.desc}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                  <span className="text-fg-subtle block mb-1">
                    {locale === 'ar' ? 'الامتثال لـ PDPL و NCA' : 'PDPL & NCA Security'}
                  </span>
                  <span className="font-bold text-white">
                    {score >= 80 ? (locale === 'ar' ? 'عالي الجاهزية' : 'Audit Ready') : (locale === 'ar' ? 'بحاجة لتحصين' : 'Requires Hardening')}
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                  <span className="text-fg-subtle block mb-1">
                    {locale === 'ar' ? 'معمارية السحابة المحلية' : 'Local Hyperscaler Topology'}
                  </span>
                  <span className="font-bold text-white">
                    {score >= 70 ? (locale === 'ar' ? 'معمارية مرنة' : 'Resilient Pods') : (locale === 'ar' ? 'منظومة أحادية' : 'Legacy Monolith')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Generation Capture for Full Report */}
          <div className="pt-6 border-t border-white/10">
            {!leadFormSubmitted ? (
              <div className="rounded-2xl border border-accent/30 bg-accent-soft p-6">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck className="h-5 w-5 text-accent" />
                  <h5 className="text-base font-bold text-white">
                    {locale === 'ar' ? 'احصل على التقرير المعماري التنفيذي المفصل (PDF)' : 'Download Your Comprehensive Architectural Audit (PDF)'}
                  </h5>
                </div>
                <p className="text-xs text-fg-muted mb-4 max-w-2xl">
                  {locale === 'ar'
                    ? 'أدخل بيانات عملك المهني لاستلام وثيقة التوصيات المعمارية وخطة الهجرة السحابية المقترحة لشركتك مباشرة.'
                    : 'Enter your business credentials to receive the customized migration roadmap, estimated cloud savings, and NCA compliance matrix.'}
                </p>

                <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    required
                    placeholder={locale === 'ar' ? 'الاسم الكامل' : 'Your Name'}
                    value={leadInfo.name}
                    onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                    className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white placeholder-white/30 focus:border-accent focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder={locale === 'ar' ? 'البريد المهني' : 'Work Email'}
                    value={leadInfo.email}
                    onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                    className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white placeholder-white/30 focus:border-accent focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder={locale === 'ar' ? 'الجوال / واتساب' : 'Phone / WhatsApp'}
                    value={leadInfo.phone}
                    onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                    className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white placeholder-white/30 focus:border-accent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-accent px-4 py-2 text-xs font-bold text-black hover:bg-accent-hover transition-colors shadow-glow-sm"
                  >
                    {locale === 'ar' ? 'إرسال التقرير فوراً' : 'Get Full Report'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                <h5 className="text-base font-bold text-white mb-1">
                  {locale === 'ar' ? 'تم تجهيز التقرير المعماري وإرساله بنجاح!' : 'Your Architectural Report Is On Its Way!'}
                </h5>
                <p className="text-xs text-fg-muted mb-4">
                  {locale === 'ar'
                    ? `تم إرسال التقرير التنفيذي إلى ${leadInfo.email}. يمكنك أيضاً حجز جلسة استكشاف مع أحد كبار مهندسينا.`
                    : `Dispatched to ${leadInfo.email}. You can also schedule a direct 30-minute consultation with our Principal Cloud Architect.`}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{locale === 'ar' ? 'إعادة التقييم' : 'Retake Diagnostic'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
