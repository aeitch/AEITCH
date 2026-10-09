"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Layers,
  Server,
  Database,
  Radio,
  Workflow,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { viewportOnce } from '@/lib/motion';

type CategoryId = 'all' | 'runtimes' | 'streaming' | 'data' | 'mesh';

interface ToolchainItem {
  name: string;
  category: 'runtimes' | 'streaming' | 'data' | 'mesh';
  roleEn: string;
  roleAr: string;
  metricEn: string;
  metricAr: string;
  ksaDeploymentEn: string;
  ksaDeploymentAr: string;
  tag: string;
}

const TOOLCHAIN: ToolchainItem[] = [
  {
    name: 'Go (Golang)',
    category: 'runtimes',
    roleEn: 'High-Concurrency Streaming & Computation Services',
    roleAr: 'محركات البث فائق السرعة والمعالجة الحسابية المتزامنة',
    metricEn: '< 1.8ms p99 execution, 65k req/s',
    metricAr: 'زمن استجابة أقل من 1.8 ميلي ثانية، 65 ألف طلب/ثانية',
    ksaDeploymentEn: 'AWS Riyadh (me-central-1) & Azure KSA',
    ksaDeploymentAr: 'سحابة أمازون الرياض وسحابة أزور بالمملكة',
    tag: 'COMPILED NATIVE',
  },
  {
    name: 'TypeScript / Node.js',
    category: 'runtimes',
    roleEn: 'Enterprise Domain APIs, BFF, & Orchestration',
    roleAr: 'واجهات برمجة التطبيقات المؤسسية وبوابات BFF',
    metricEn: 'Strict Type-Safety & OpenAPI 3.1 Synchronicity',
    metricAr: 'أمان أنماط البيانات الصارم وتوافق OpenAPI 3.1',
    ksaDeploymentEn: 'Zero-Egress Private Subnet Pods',
    ksaDeploymentAr: 'حاويات معزولة بالشبكات الخاصة الداخلية',
    tag: 'TYPE SAFE',
  },
  {
    name: 'Python (FastAPI & AsyncIO)',
    category: 'runtimes',
    roleEn: 'AI Agent Pipelines, Data Transformation, & OCR',
    roleAr: 'خطوط معالجة الذكاء الاصطناعي ومعالجة البيانات والوثائق',
    metricEn: 'GPU-Accelerated Inference & Async Batching',
    metricAr: 'استدلال مدعوم بمعالجات الرسوميات ومعالجة متوازية',
    ksaDeploymentEn: 'Sovereign Private VPC Worker Pods',
    ksaDeploymentAr: 'بيئات سحابية خاصة خاضعة لسيادة البيانات',
    tag: 'AI RUNTIME',
  },
  {
    name: 'Apache Kafka',
    category: 'streaming',
    roleEn: 'Decoupled Event Streaming Backbone & Replay Buffer',
    roleAr: 'الناقل الموزع لبث الأحداث وتخزين سجل المعاملات',
    metricEn: 'Zero Message Loss, 850 MB/s Throughput',
    metricAr: 'انعدام فقدان الرسائل، تدفق يفوق 850 ميجابايت/ثانية',
    ksaDeploymentEn: '3-Node Strimzi Quorum on Kubernetes',
    ksaDeploymentAr: 'عنقود Strimzi ثلاثي العقد على كوبرنيتس',
    tag: 'EVENT STREAMING',
  },
  {
    name: 'AWS EventBridge / RabbitMQ',
    category: 'streaming',
    roleEn: 'Fine-Grained Routing & Scheduled Task Distribution',
    roleAr: 'التوجيه الدقيق للأحداث وتوزيع المهام المجدولة',
    metricEn: 'Content-Based Filtering & Dead Letter Queues',
    metricAr: 'فلترة حسب المحتوى وقوائم انتظار للأخطاء',
    ksaDeploymentEn: 'Native AWS Riyadh Integration',
    ksaDeploymentAr: 'تكامل مباشر مع منطقة سحابة أمازون الرياض',
    tag: 'ROUTING MESH',
  },
  {
    name: 'PostgreSQL / AWS Aurora',
    category: 'data',
    roleEn: 'Distributed Relational Store & Tenant RLS Isolation',
    roleAr: 'قواعد البيانات العلائقية الموزعة وعزل المستأجرين RLS',
    metricEn: 'Multi-AZ Active Storage, Sub-Millisecond Reads',
    metricAr: 'تخزين نشط متعدد المناطق وقراءة فائقة السرعة',
    ksaDeploymentEn: 'In-Kingdom Encrypted Data Sovereignty',
    ksaDeploymentAr: 'تشفير كامل للبيانات داخل حدود المملكة',
    tag: 'RELATIONAL',
  },
  {
    name: 'Redis Cluster',
    category: 'data',
    roleEn: 'Distributed State, Micro-Caching, & Rate Limiting',
    roleAr: 'إدارة الحالة الموزعة والتخزين المؤقت وتحديد معدل الطلبات',
    metricEn: '< 1ms Latency, Distributed Redlock Protection',
    metricAr: 'استجابة أقل من ميلي ثانية مع حماية Redlock الموزعة',
    ksaDeploymentEn: 'High-Availability In-Memory Tier',
    ksaDeploymentAr: 'طبقة ذاكرة حية عالية التوافر والاستمرارية',
    tag: 'IN-MEMORY',
  },
  {
    name: 'Kong / Envoy API Gateway',
    category: 'mesh',
    roleEn: 'Edge Ingress, Nafath SSO Auth, & mTLS Service Mesh',
    roleAr: 'بوابات الحافة وتوثيق نفاذ الموحد وشبكة mTLS الآمنة',
    metricEn: '120k req/s Ingress with Hardware Acceleration',
    metricAr: 'معالجة 120 ألف طلب/ثانية مع تسريع عتادي',
    ksaDeploymentEn: 'Hardened DMZ Edge in Riyadh Hyperscaler',
    ksaDeploymentAr: 'بوابات حافة مؤمنة بمناطق الرياض السحابية',
    tag: 'INGRESS MESH',
  },
];

export function PolyglotTechStackHub() {
  const { locale, direction } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  const isAr = locale === 'ar';

  const categories: Array<{ id: CategoryId; labelEn: string; labelAr: string }> = [
    { id: 'all', labelEn: 'Full Toolchain (8)', labelAr: 'كامل المنظومة (8)' },
    { id: 'runtimes', labelEn: 'Runtimes & Microservices', labelAr: 'بيئات التشغيل والخدمات' },
    { id: 'streaming', labelEn: 'Event Streaming & Brokers', labelAr: 'ناقل الأحداث والبث' },
    { id: 'data', labelEn: 'Datastores & Caching', labelAr: 'قواعد البيانات والتخزين المؤقت' },
    { id: 'mesh', labelEn: 'Ingress & Service Mesh', labelAr: 'بوابات الدخول والربط' },
  ];

  const filteredTools =
    activeCategory === 'all'
      ? TOOLCHAIN
      : TOOLCHAIN.filter((item) => item.category === activeCategory);

  return (
    <section className="relative py-24 bg-[#080808] text-white overflow-hidden border-b border-white/10" dir={direction}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-4">
              <Terminal className="h-3.5 w-3.5" />
              <span>{isAr ? 'منظومة الأدوات والتقنيات' : 'PRODUCTION-GRADE TOOLCHAIN'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              {isAr ? 'أدوات برمجية مفتوحة المصدر مجربة للأحمال الثقيلة' : 'Hardened, Polyglot Cloud Stack'}
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl">
              {isAr
                ? 'لا نعتمد على حلول تجارية تفرض التبعية (Vendor Lock-in). نستخدم تقنيات مفتوحة المصدر عالية الأداء تلبي معايير الأمن السيبراني الوطنية.'
                : 'Zero proprietary vendor lock-in. We deploy industry-standard, high-performance open-source runtimes optimized for sub-millisecond latency and national cybersecurity compliance.'}
            </p>
          </div>

          <div className="font-mono text-xs text-white/50 text-end">
            <span className="text-emerald-400 font-bold block">100% KSA REGION READY</span>
            <span>AWS • AZURE • GCP</span>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-mono text-xs transition-all ${
                  isActive
                    ? 'bg-[#e9800a] text-black font-bold shadow-[0_0_15px_rgba(233,128,10,0.35)]'
                    : 'bg-white/[0.03] text-white/70 hover:bg-white/[0.08] hover:text-white border border-white/5'
                }`}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Filtered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#131215] to-[#0c0c0e] p-6 flex flex-col justify-between hover:border-[#e9800a]/40 transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#e9800a] bg-[#e9800a]/10 px-2 py-0.5 rounded">
                      {tool.tag}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#e9800a] transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-xs text-white/70 leading-relaxed mb-4">
                    {isAr ? tool.roleAr : tool.roleEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2 font-mono text-[11px]">
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">
                      {isAr ? 'الملف الأدائي:' : 'Performance Metric:'}
                    </span>
                    <span className="text-white/90 font-semibold">
                      {isAr ? tool.metricAr : tool.metricEn}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">
                      {isAr ? 'النشر بالمملكة:' : 'KSA Deployment:'}
                    </span>
                    <span className="text-emerald-400">
                      {isAr ? tool.ksaDeploymentAr : tool.ksaDeploymentEn}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
