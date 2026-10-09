"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Sliders,
  Cpu,
  ArrowRight,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Layers,
  Database,
  Calendar,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

type AiUseCase = 'rag-kb' | 'agents-flow' | 'custom-llm';
type DataScale = 'scale-docs' | 'scale-medium' | 'scale-enterprise';

interface FeasibilityResult {
  modelEn: string;
  modelAr: string;
  gpuEn: string;
  gpuAr: string;
  latencyEn: string;
  latencyAr: string;
  timelineEn: string;
  timelineAr: string;
  deliverablesEn: string[];
  deliverablesAr: string[];
}

const FEASIBILITY_MATRIX: Record<AiUseCase, Record<DataScale, FeasibilityResult>> = {
  'rag-kb': {
    'scale-docs': {
      modelEn: 'Llama 3.3 8B Instruct / Mistral Small (Fine-Tuned Embeddings)',
      modelAr: 'نموذج Llama 3.3 8B أو Mistral مع تضمينات دلالية مخصصة',
      gpuEn: '1x NVIDIA A10G or L4 (24GB VRAM) In-Kingdom',
      gpuAr: 'بطاقة NVIDIA A10G واحدة داخل المملكة',
      latencyEn: '< 45ms TTFT • 95 tokens/sec',
      latencyAr: '< 45ms لزمن أول رمز • 95 رمز/ثانية',
      timelineEn: '2 - 3 Weeks to Production Staging',
      timelineAr: '2 - 3 أسابيع للإطلاق على بيئة Staging',
      deliverablesEn: ['Qdrant Hybrid Vector Store', 'Semantic Parsing Pipeline', 'RAGAS Accuracy Test Suite'],
      deliverablesAr: ['قاعدة متجهات Qdrant هجينة', 'خط معالجة وتقطيع دلالي', 'حزمة اختبارات دقة RAGAS'],
    },
    'scale-medium': {
      modelEn: 'Llama 3.3 70B AWQ Quantized + BGE-M3 Dense/Sparse',
      modelAr: 'نموذج Llama 3.3 70B مكمم مع نموذج BGE-M3 للبحث المزدوج',
      gpuEn: '2x NVIDIA H100 (80GB SXM5) on AWS/Oracle Riyadh',
      gpuAr: 'خادما NVIDIA H100 في منطقة الرياض السحابية',
      latencyEn: '< 65ms TTFT • 80 tokens/sec',
      latencyAr: '< 65ms لزمن أول رمز • 80 رمز/ثانية',
      timelineEn: '3 - 5 Weeks to Enterprise Deployment',
      timelineAr: '3 - 5 أسابيع للنشر المؤسسي الكامل',
      deliverablesEn: ['Distributed Qdrant Multi-Node Cluster', 'NeMo Guardrails & Hallucination Filter', 'Continuous LLMOps Pipeline'],
      deliverablesAr: ['عنقود Qdrant موزع متعدد العقد', 'بوابات NeMo لمنع الهلوسة', 'خط حوكمة مستمر للنماذج LLMOps'],
    },
    'scale-enterprise': {
      modelEn: 'DeepSeek R1 / Llama 3.3 70B Full Precision + Cohere Re-Ranker',
      modelAr: 'نموذج DeepSeek R1 أو Llama 70B بالدقة الكاملة مع إعادة ترتيب متقدمة',
      gpuEn: '4x to 8x NVIDIA H100 Clustered Mesh (NVLink)',
      gpuAr: 'شبكة من 4 إلى 8 بطاقات NVIDIA H100 مترابطة عبر NVLink',
      latencyEn: '< 80ms TTFT • 120+ tokens/sec Aggregate',
      latencyAr: '< 80ms لزمن أول رمز • 120+ رمز/ثانية إجمالي',
      timelineEn: '6 - 8 Weeks Enterprise Rollout',
      timelineAr: '6 - 8 أسابيع لتطبيق مؤسسي واسع النطاق',
      deliverablesEn: ['High-Throughput pgvector / Qdrant Mesh', 'Role-Based Document Access Control', 'Automated Regulatory Audit Export'],
      deliverablesAr: ['نسيج استرجاع عالي الأداء', 'تحكم بصلاحيات الوثائق حسب الدور', 'تصدير مؤتمت لتقارير الامتثال التنظيمي'],
    },
  },
  'agents-flow': {
    'scale-docs': {
      modelEn: 'Llama 3.3 70B Instruct with Structured Tool Call Outputs',
      modelAr: 'نموذج Llama 3.3 70B مع مخرجات JSON منضبطة للأدوات',
      gpuEn: '2x NVIDIA L40S or A100 (80GB)',
      gpuAr: 'خادما NVIDIA L40S أو A100 (80GB)',
      latencyEn: '< 70ms Tool Invocation Turnaround',
      latencyAr: '< 70ms لسرعة استدعاء الأدوات',
      timelineEn: '3 - 4 Weeks Agent Implementation',
      timelineAr: '3 - 4 أسابيع لتطوير شبكة الوكلاء',
      deliverablesEn: ['LangGraph Stateful Agent State Machine', 'External REST API Tool Connector', 'Human Approval Checkpoint UI'],
      deliverablesAr: ['آلة حالة الوكلاء عبر LangGraph', 'موصلات برمجية للأنظمة الخارجية', 'واجهة اعتماد بشري للعمليات الحساسة'],
    },
    'scale-medium': {
      modelEn: 'Multi-Agent Specialized Pods (Planner, Executor, Reviewer)',
      modelAr: 'مجموعة وكلاء متخصصين (المخطط، المنفذ، والمدقق)',
      gpuEn: '2x to 4x NVIDIA H100 Cluster in Riyadh',
      gpuAr: '2 إلى 4 خوادم NVIDIA H100 في الرياض',
      latencyEn: '< 60ms Step Latency • Resilient Retries',
      latencyAr: '< 60ms لكل خطوة • إعادة محاولة ذاتية',
      timelineEn: '4 - 6 Weeks Multi-Agent Orchestration',
      timelineAr: '4 - 6 أسابيع لتنسيق شبكة الوكلاء المتعددة',
      deliverablesEn: ['Agentic Task Decomposition Bus', 'Automated Error Recovery Logic', 'Comprehensive Audit Logging Database'],
      deliverablesAr: ['ناقل تفكيك المهام للوكلاء', 'منطق معالجة الأخطاء الذاتي', 'قاعدة بيانات شاملة لسجلات العمليات'],
    },
    'scale-enterprise': {
      modelEn: 'Autonomous Enterprise Operation Cluster with Speculative Decoding',
      modelAr: 'عنقود تشغيل ذاتي للمؤسسات مع فك تشفير تخميني مسرع',
      gpuEn: '8x NVIDIA H100 GPU Pod with InfiniBand',
      gpuAr: 'مجموعة 8 خوادم NVIDIA H100 عبر شبكة InfiniBand',
      latencyEn: '< 50ms Real-Time Autonomous Response',
      latencyAr: '< 50ms استجابة فورية للعمليات الذاتية',
      timelineEn: '8 - 10 Weeks Enterprise Integration',
      timelineAr: '8 - 10 أسابيع للتكامل المؤسسي الشامل',
      deliverablesEn: ['Enterprise Agent Governance Framework', 'SOC2 / SAMA Audited Tool Access', 'Self-Healing Workflow Architecture'],
      deliverablesAr: ['إطار حوكمة وكلاء معتمد مؤسسياً', 'صلاحيات أدوات متوافقة مع SAMA و SOC2', 'معمارية معالجة ذاتية للأعطال'],
    },
  },
  'custom-llm': {
    'scale-docs': {
      modelEn: 'Domain-Adapted QLoRA Fine-Tuned 8B / 14B Foundation Model',
      modelAr: 'نموذج أساسي 8B أو 14B مضبوط بتقنية QLoRA على مجال التخصص',
      gpuEn: '1x to 2x NVIDIA A100 (80GB) Training Node',
      gpuAr: 'خادم أو خادما تدريب NVIDIA A100',
      latencyEn: '< 40ms TTFT • High Reasoning Accuracy',
      latencyAr: '< 40ms لزمن أول رمز • دقة استدلال عالية',
      timelineEn: '3 - 4 Weeks Dataset Curation & Training',
      timelineAr: '3 - 4 أسابيع لتنقية البيانات والتدريب',
      deliverablesEn: ['Synthetic Data Generation Pipeline', 'LoRA Weights Package', 'vLLM Serving Container'],
      deliverablesAr: ['خط توليد البيانات الاصطناعية', 'حزمة أوزان LoRA المخصصة', 'حاوية تشغيل vLLM السحابية'],
    },
    'scale-medium': {
      modelEn: 'Full Parameter / DPO Aligned 70B Specialized Enterprise LLM',
      modelAr: 'نموذج 70B مواءم بتقنية DPO ومخصص للمصطلحات والأنظمة المؤسسية',
      gpuEn: '4x to 8x NVIDIA H100 High-Speed Interconnect',
      gpuAr: '4 إلى 8 خوادم NVIDIA H100 بروابط فائقة السرعة',
      latencyEn: '< 60ms TTFT • Verified Domain Mastery',
      latencyAr: '< 60ms لزمن أول رمز • إتقان تام لمجال العمل',
      timelineEn: '5 - 7 Weeks Training, DPO & Validation',
      timelineAr: '5 - 7 أسابيع للتدريب والمواءمة والتحقق',
      deliverablesEn: ['DPO Preference Alignment Dataset', 'Private Model Registry Artifacts', 'Automated Red-Teaming Benchmark'],
      deliverablesAr: ['مجموعة بيانات تفضيل DPO', 'أصول مستودع النماذج الخاص', 'اختبارات الاختراق والأمان المؤتمتة'],
    },
    'scale-enterprise': {
      modelEn: 'Dual-Language (Arabic/English) Enterprise Reasoning Model (R1/Llama)',
      modelAr: 'نموذج استدلال مؤسسي ثنائي اللغة (عربي/إنجليزي) فائق الدقة',
      gpuEn: 'Dedicated Sovereign GPU Cluster (16x H100/H200)',
      gpuAr: 'عنقود GPU سيادي مخصص (16 بطاقة H100/H200)',
      latencyEn: '< 55ms TTFT • Native Arabic Dialect & Nuance',
      latencyAr: '< 55ms استجابة • فهم طبيعي للهجات وسياق الأعمال السعودي',
      timelineEn: '8 - 12 Weeks Sovereign Foundation Pipeline',
      timelineAr: '8 - 12 أسبوعاً لتطوير النموذج السيادي المتكامل',
      deliverablesEn: ['100% Client-Owned Model Checkpoints', 'Air-Gapped Sovereign Serving Stack', 'Long-Term Continuous Fine-Tuning Harness'],
      deliverablesAr: ['ملكية 100% لأوزان النموذج', 'بنية تشغيل معزولة تماماً داخل المملكة', 'منظومة تدريب وتحسين مستمر للنموذج'],
    },
  },
};

export function AiFeasibilitySimulator() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  const [useCase, setUseCase] = useState<AiUseCase>('rag-kb');
  const [scale, setScale] = useState<DataScale>('scale-medium');

  const result = FEASIBILITY_MATRIX[useCase][scale];

  return (
    <section className="relative py-24 sm:py-32 bg-[#09090b] text-white overflow-hidden border-b border-white/10" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d1408]/30 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-4">
            <Sliders className="h-3.5 w-3.5" />
            <span>{isAr ? 'محاكي جدوى الذكاء الاصطناعي والموارد' : 'AI FEASIBILITY & COMPUTE SIZER'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isAr ? 'حساب متطلبات الحوسبة ونماذج الذكاء الاصطناعي' : 'Calculate Model Sizing, GPU Compute & Latency'}
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            {isAr
              ? 'حدد حالة الاستخدام المؤسسية وحجم البيانات لمعاينة المعمارية الموصى بها، وخوادم GPU المطلوبة، وزمن الاستجابة التقديري، ومخرجات المشروع.'
              : 'Select your enterprise workflow and data scale to project optimal model families, in-kingdom GPU hardware requirements, inference latency, and deployment timelines.'}
          </p>
        </div>

        {/* Simulator Grid (Left: Inputs, Right: Live Results) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#0d0d10] p-6 sm:p-8 space-y-8">
            {/* Input 1: Enterprise Use Case */}
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
                {isAr ? '1. حالة الاستخدام المؤسسية' : '1. Enterprise AI Workflow'}
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: 'rag-kb',
                    titleEn: 'Enterprise Knowledge RAG (Docs & Search)',
                    titleAr: 'محرك المعرفة المؤسسية واسترجاع الوثائق (RAG)',
                  },
                  {
                    id: 'agents-flow',
                    titleEn: 'Autonomous Agents & Tool Orchestration',
                    titleAr: 'الوكلاء المستقلون وتنفيذ العمليات المؤتمتة',
                  },
                  {
                    id: 'custom-llm',
                    titleEn: 'Domain-Specific Fine-Tuned Copilot',
                    titleAr: 'نموذج مخصص ومدرب على مجال الأعمال',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setUseCase(item.id as AiUseCase)}
                    className={`w-full font-mono text-xs p-3.5 rounded-xl border text-start transition-all flex items-center justify-between ${
                      useCase === item.id
                        ? 'border-[#e9800a] bg-[#e9800a]/10 text-white font-bold'
                        : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20'
                    }`}
                  >
                    <span>{isAr ? item.titleAr : item.titleEn}</span>
                    {useCase === item.id && <span className="h-2 w-2 rounded-full bg-[#e9800a]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Data Scale */}
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
                {isAr ? '2. حجم البيانات والوثائق المستهدفة' : '2. Enterprise Knowledge Corpus'}
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: 'scale-docs',
                    titleEn: '< 25,000 Documents (Targeted Scope)',
                    titleAr: '< 25,000 وثيقة (نطاق مركز ومحدد)',
                  },
                  {
                    id: 'scale-medium',
                    titleEn: '25,000 - 500,000 Documents (Mid-Market)',
                    titleAr: '25,000 - 500,000 وثيقة (مؤسسة متوسطة)',
                  },
                  {
                    id: 'scale-enterprise',
                    titleEn: '500,000 - 5M+ Enterprise Assets (High Scale)',
                    titleAr: '500,000 - 5 ملايين+ وثيقة (مؤسسة كبرى)',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setScale(item.id as DataScale)}
                    className={`w-full font-mono text-xs p-3.5 rounded-xl border text-start transition-all flex items-center justify-between ${
                      scale === item.id
                        ? 'border-[#e9800a] bg-[#e9800a]/10 text-white font-bold'
                        : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20'
                    }`}
                  >
                    <span>{isAr ? item.titleAr : item.titleEn}</span>
                    {scale === item.id && <span className="h-2 w-2 rounded-full bg-[#e9800a]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Dynamic Output Card (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-gradient-to-br from-[#121115] to-[#0a0a0c] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 end-0 -mt-10 -me-10 h-72 w-72 rounded-full bg-[#e9800a]/10 blur-[120px] pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#e9800a] font-bold block mb-1">
                  PROJECTED ARCHITECTURE SPECIFICATION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {isAr ? 'المواصفات الفنية ونموذج الاستدلال' : 'Recommended Model & Compute Topology'}
                </h3>
              </div>

              <div className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-bold">
                {isAr ? result.latencyAr : result.latencyEn}
              </div>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-white/50 font-mono text-xs mb-1.5">
                  <Cpu className="h-3.5 w-3.5 text-[#e9800a]" />
                  <span>{isAr ? 'البنية الحاسوبية المطلوبة' : 'Compute Footprint'}</span>
                </div>
                <span className="text-sm sm:text-base font-bold text-white block">
                  {isAr ? result.gpuAr : result.gpuEn}
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-white/50 font-mono text-xs mb-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{isAr ? 'المدة التقديرية للإطلاق' : 'Implementation Velocity'}</span>
                </div>
                <span className="text-sm sm:text-base font-bold text-white block">
                  {isAr ? result.timelineAr : result.timelineEn}
                </span>
              </div>
            </div>

            {/* Model Architecture */}
            <div className="mb-8">
              <span className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-2">
                {isAr ? 'النموذج التأسيسي الموصى به:' : 'Recommended Foundation Model Family:'}
              </span>
              <p className="text-sm sm:text-base text-white/90 font-mono bg-white/[0.03] border border-white/10 p-3.5 rounded-xl">
                {isAr ? result.modelAr : result.modelEn}
              </p>
            </div>

            {/* Delivered Engineering Assets */}
            <div className="mb-8 pt-6 border-t border-white/10">
              <span className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-3">
                {isAr ? 'المخرجات والأصول البرمجية المسلمة:' : 'Core Engineering Deliverables & Artifacts Handed Over:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {(isAr ? result.deliverablesAr : result.deliverablesEn).map((item, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-xs text-white/50 text-center sm:text-start">
                {isAr ? '100% ملكية تامة لأوزان النموذج والكود المصدري' : '100% Ownership of Model Weights, Embeddings & Code'}
              </span>
              <Link
                href="/contact-us#consultation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-all shadow-[0_0_20px_rgba(233,128,10,0.3)] active:scale-[0.98]"
              >
                <span>{isAr ? 'احجز استشارة الذكاء الاصطناعي' : 'Schedule AI Architecture Session'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
