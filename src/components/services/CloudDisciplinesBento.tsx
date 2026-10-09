"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  Workflow,
  Radio,
  Code2,
  Database,
  Cpu,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  GitBranch,
  Terminal,
  Activity,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { viewportOnce } from '@/lib/motion';

export function CloudDisciplinesBento() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  return (
    <section className="relative py-24 sm:py-32 bg-[#09090b] text-white overflow-hidden border-b border-white/10" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#1c1208]/30 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-4">
              <Layers className="h-3.5 w-3.5" />
              <span>{isAr ? 'التخصصات الهندسية المعمارية' : 'ENGINEERING DISCIPLINES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              {isAr ? 'بناء متين بدون تنازلات تقنية' : 'Engineered for Scale, Speed, and Zero Regrets'}
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              {isAr
                ? 'معايير هندسية متقدمة تفصل منطق الأعمال المعقد إلى أنظمة مستقلة تضمن استمرارية الأعمال وقابلية التوسع المليوني.'
                : 'Advanced architectural principles separating complex business logic into sovereign, decoupled services that sustain multi-million transaction spikes.'}
            </p>
          </motion.div>

          <div className="font-mono text-xs text-white/50 border-s-2 border-[#e9800a] ps-4 py-1">
            <span>DISCIPLINE_FRAMEWORK // V4.2</span>
            <span className="block text-[#e9800a] font-bold">100% PRODUCTION PROVEN</span>
          </div>
        </div>

        {/* Asymmetric Bento Grid (2.0 Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Greenfield Multi-Tenant SaaS Engine (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45 }}
            className="md:col-span-8 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#131215] to-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div className="absolute top-0 end-0 -mt-10 -me-10 h-64 w-64 rounded-full bg-[#e9800a]/10 blur-[100px] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Layers className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  MULTI-TENANT DDD
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'معمارية برمجيات SaaS خضراء من الصفر' : 'Greenfield Multi-Tenant SaaS Architecture'}
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mb-6">
                {isAr
                  ? 'بناء منتجات برمجية متعددة المستأجرين من الألف إلى الياء، مدعومة بمبادئ التصميم القائم على النطاق (Domain-Driven Design)، وفصل صارم بين البيانات باستخدام Row-Level Security أو قواعد بيانات معزولة لكل عميل.'
                  : 'Ground-up engineering of multi-tenant enterprise SaaS platforms using Domain-Driven Design (DDD) bounded contexts, tenant isolation schemes (RLS & schema-per-tenant), and automated tenant onboarding pipelines.'}
              </p>
            </div>

            {/* Technical Sub-badges */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-white/80">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a]" />
                <span>Tenant Schema Isolation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a]" />
                <span>Row-Level Security (RLS)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a]" />
                <span>Automated Pod Provisioning</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Strangler-Fig Monolith Decomposition (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#121114] to-[#0c0c0e] p-8 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Workflow className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#e9800a] bg-[#e9800a]/10 border border-[#e9800a]/30 px-3 py-1 rounded-full">
                  ZERO DOWNTIME
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'تفكيك الأنظمة القديمة (Strangler Fig)' : 'Monolith-to-Microservices Decomposition'}
              </h3>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'هجرة تدريجية آمنة تعتمد على نمط التين الخانق (Strangler-Fig) وتتبع تغييرات البيانات (CDC)، لعزل قواعد البيانات وفصل الخدمات الحيوية دون توقف النظام التشغيلي ثانية واحدة.'
                  : 'Systematic strangler-fig pattern migration separating monolithic databases and tangled logic into isolated services using Change Data Capture (CDC) with zero user-facing downtime.'}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-white/60">
              <span>CDC via Debezium • Traffic Canary Flipping</span>
            </div>
          </motion.div>

          {/* Card 3: Event-Driven Streaming & Decoupled Bus (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#121114] to-[#0c0c0e] p-8 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Radio className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                  KAFKA / RABBITMQ
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'البث الموجه بالأحداث والناقل الموزع' : 'Event-Driven Streaming & Decoupling'}
              </h3>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'خطوط نقل رسائل فائقة السرعة تمنع الانهيارات المتتالية، وتضمن معالجة متزامنة وغير متزامنة للأحداث مع ضمان وصول الرسائل دون أي فقدان.'
                  : 'High-throughput asynchronous message backbones utilizing Apache Kafka, RabbitMQ, and AWS EventBridge to decouple critical systems and prevent cascading latency failures.'}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-white/60">
              <span>Partition Balancing • Dead-Letter Queues (DLQ)</span>
            </div>
          </motion.div>

          {/* Card 4: Contract-First API Ecosystems & gRPC (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#121114] to-[#0c0c0e] p-8 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Code2 className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                  OPENAPI 3.1 & gRPC
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'منظومة واجهات API المعتمدة على العقود' : 'Contract-First API Ecosystems & gRPC'}
              </h3>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'تصميم الواجهات البرمجية أولاً بموجب مواصفات صارمة، مع بوابات GraphQL موحدة وتوليد آلي لمكتبات الربط مع فحص تطابق الأنماط البرمجية.'
                  : 'Rigorous OpenAPI/Swagger & Protocol Buffer contract specifications with federated GraphQL gateways and automated end-to-end type validation between client and service.'}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-white/60">
              <span>Type-Safe Client SDKs • Sub-1ms gRPC Transport</span>
            </div>
          </motion.div>

          {/* Card 5: In-Memory Micro-Caching & Distributed State (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#121114] to-[#0c0c0e] p-8 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Database className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                  REDIS CLUSTER
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'التخزين المؤقت الموزع وحالات النظام' : 'In-Memory Micro-Caching & Distributed State'}
              </h3>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'أوقات استجابة فائقة السرعة أقل من 2 ميلي ثانية باستخدام عناقيد Redis، مع أقفال موزعة وإدارة ذكية للجلسات وقراءة متفائلة.'
                  : 'Sub-2ms query response times using Redis Cluster tiers, distributed locking (Redlock), and optimistic read-replicas capable of handling extreme concurrency.'}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-white/60">
              <span>Distributed Redlock • Optimistic Replication</span>
            </div>
          </motion.div>

          {/* Card 6: Polyglot High-Performance Microservices (12 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="md:col-span-12 group relative rounded-3xl border border-[#e9800a]/30 bg-gradient-to-r from-[#171410] via-[#12100d] to-[#0d0c0b] p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_-20px_rgba(233,128,10,0.15)]"
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#e9800a]">
                  {isAr ? 'هندسة متعددة اللغات' : 'POLYGLOT RUNTIME EXCELLENCE'}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a]" />
                <span className="font-mono text-xs text-white/60">
                  GO • TYPESCRIPT • PYTHON
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                {isAr
                  ? 'خدمات برمجية متعددة اللغات مخصصة للأداء الأقصى'
                  : 'Polyglot High-Performance Microservices Runtime'}
              </h3>

              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                {isAr
                  ? 'نستخدم اللغة المناسبة للوظيفة المناسبة: لغة Go للمعالجة الحسابية المتزامنة والبث السريع، وTypeScript/Node.js لواجهات التطبيقات الغنية، وPython لخطوط تدريب الذكاء الاصطناعي ومعالجة البيانات الضخمة.'
                  : 'We pair language characteristics to precise operational workloads: Go for low-latency streaming and concurrency engines, TypeScript/Node.js for rich domain APIs and BFF layers, and Python for asynchronous AI/ML pipeline workers.'}
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 shrink-0">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center font-mono">
                <span className="text-2xl font-bold text-white block">Go</span>
                <span className="text-[10px] text-white/50 uppercase">Concurrency</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center font-mono">
                <span className="text-2xl font-bold text-white block">Node.js</span>
                <span className="text-[10px] text-white/50 uppercase">Domain APIs</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center font-mono">
                <span className="text-2xl font-bold text-white block">Python</span>
                <span className="text-[10px] text-white/50 uppercase">AI Workers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
