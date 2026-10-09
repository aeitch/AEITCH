"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Brain,
  Database,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Lock,
  Layers,
  Terminal,
  Activity,
  Zap,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { viewportOnce } from '@/lib/motion';

export function AiDisciplinesBento() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  return (
    <section className="relative py-24 sm:py-32 bg-[#09090b] text-white overflow-hidden border-b border-white/10" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#1d1408]/30 via-transparent to-transparent" />

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
              <Cpu className="h-3.5 w-3.5" />
              <span>{isAr ? 'منظومة الذكاء الاصطناعي المؤسسي' : 'SOVEREIGN AI DISCIPLINES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              {isAr ? 'بنية ذكاء اصطناعي حتمية خالية من الهلوسة' : 'Deterministic AI Infrastructure Built for Zero Leakage'}
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              {isAr
                ? 'تطوير حلول ذكاء اصطناعي إنتاجية تتجاوز النماذج التجريبية؛ استرجاع دلالي دقيق، نماذج لغوية مستضافة محلياً، ووكلاء مستقلون بمراقبة بشرية محكمة.'
                : 'Production-hardened architectures replacing toy wrappers with grounded enterprise RAG, private in-kingdom LLM serving, and deterministic multi-agent workflows.'}
            </p>
          </motion.div>

          <div className="font-mono text-xs text-white/50 border-s-2 border-[#e9800a] ps-4 py-1">
            <span>LLMOPS • AIR_GAPPED</span>
            <span className="block text-[#e9800a] font-bold">DETERMINISTIC_AI</span>
          </div>
        </div>

        {/* Asymmetric Bento Grid (2.0 Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Private Sovereign Foundation Models & vLLM Serving (8 cols) */}
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
                  <Cpu className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  IN-KINGDOM GPU SERVING
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'النماذج اللغوية السيادية الخاصة ومحركات vLLM' : 'Private Sovereign Foundation Models & vLLM Serving'}
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mb-6">
                {isAr
                  ? 'تدريب وضبط دقيق للنماذج التأسيسية المفتوحة (Llama 3.3 و DeepSeek R1 و Mistral و Qwen) على بياناتك الخاصة، ونشرها على خوادم NVIDIA H100 داخل المملكة دون مشاركة أي بيانات مع أطراف خارجية.'
                  : 'Fine-tuning and deploying open-weight foundation models (Llama 3.3, DeepSeek R1, Mistral, Qwen) on private enterprise datasets. Deployed via vLLM PagedAttention on dedicated in-kingdom GPU hardware with zero public API dependency.'}
              </p>

              {/* Dynamic vLLM Engine Telemetry Visual */}
              <div className="rounded-2xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-white/80 space-y-2">
                <div className="flex items-center justify-between text-white/40 text-[11px] border-b border-white/5 pb-2">
                  <span>INFERENCE_ENGINE • VLLM_PAGED_ATTENTION</span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    GPU_CLUSTER_ACTIVE
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-white/60">model_weights:</span>
                  <span className="text-white/90">llama-3.3-70b-instruct-awq (Local Enclave)</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-white/60">time_to_first_token:</span>
                  <span className="text-emerald-400 font-bold">62ms (P95 Latency)</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-white/60">data_residency_boundary:</span>
                  <span className="text-[#e9800a]">Saudi Arabia Region (Zero Egress to US)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-6 mt-6 border-t border-white/10 font-mono text-xs text-white/60">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{isAr ? 'ملكية فكرية كاملة بنسبة 100% لأوزان النموذج والكود' : '100% Day-1 Ownership of Fine-Tuned Model Weights'}</span>
            </div>
          </motion.div>

          {/* Card 2: Hybrid Enterprise RAG & Vector Engine (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#131215] to-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Database className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  SUB-50MS RETRIEVAL
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'محرك البحث الدلالي والهجين RAG' : 'Hybrid Enterprise RAG'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'دمج البحث المتجهي الكثيف (BGE/Cohere) مع البحث النصي الدقيق (BM25) عبر Qdrant و pgvector، مع إعادة ترتيب النتائج وضبط الصلاحيات الصارم.'
                  : 'Dense vector retrieval combined with sparse BM25 keyword matching via Qdrant and pgvector. Cross-encoder re-ranking guarantees sub-50ms retrieval precision.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>Retrieval Architecture:</span>
                <span className="text-white/90 font-bold">Hybrid Dense + Sparse</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Vector Latency:</span>
                <span className="text-emerald-400 font-bold">&lt; 28ms P99</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Deterministic Guardrails & Anti-Hallucination (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#131215] to-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#e9800a] bg-[#e9800a]/15 border border-[#e9800a]/30 px-3 py-1 rounded-full">
                  NEMO GUARDRAILS
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'بوابات الحتمية ومنع الهلوسة' : 'Deterministic Guardrails'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'بوابات فحص فورية تحظر حقن الأوامر، وتخفي البيانات الحساسة PII، وتفرض الاستشهاد الحرفي بالمصادر لضمان إجابات دقيقة خالية تماماً من الهلوسة.'
                  : 'Programmable NeMo guardrails blocking prompt injection, masking sensitive PII, and enforcing factual attribution with source-grounded citations.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>Hallucination Rate:</span>
                <span className="text-emerald-400 font-bold">0.0% (Strict Grounding)</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>PII Redaction:</span>
                <span className="text-white/90 font-bold">100% In-Pipeline Mask</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Autonomous Multi-Agent Workflows (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#131215] to-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Workflow className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  STATEFUL AGENTS
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'وكلاء الذكاء الاصطناعي المستقلون' : 'Autonomous Agent Systems'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'مجموعات وكلاء مستقلين لتنفيذ المهام المعقدة عبر واجهات برمجية وأدوات مخصصة، مع حفظ الحالة والتعافي التلقائي وموافقة بشرية في المراحل الحرجة.'
                  : 'Goal-directed autonomous agent clusters executing multi-step reasoning, external API tool invocation, and stateful recovery with human-in-the-loop checkpoints.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>Orchestration Framework:</span>
                <span className="text-white/90 font-bold">LangGraph / CrewAI</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Human Approval Gate:</span>
                <span className="text-emerald-400 font-bold">Deterministic Checkpoint</span>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Continuous LLMOps & RAGAS Evaluation (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="md:col-span-4 group relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#131215] to-[#0c0c0e] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                  <Activity className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  RAGAS EVALS
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                {isAr ? 'حوكمة النماذج والتقييم المستمر' : 'Continuous LLMOps & Evals'}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {isAr
                  ? 'اختبارات انحدار آلية مستمرة تقيس دقة السياق واسترجاع المعلومات عبر إطار RAGAS، مع مراقبة انحراف النماذج واكتشاف الثغرات استباقياً.'
                  : 'Automated regression test suites measuring context recall, answer relevance, and faithfulness via RAGAS. Real-time drift detection and red-teaming.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-white/60">
                <span>RAGAS Faithfulness:</span>
                <span className="text-emerald-400 font-bold">&gt; 96.4% Score</span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>Prompt Regression:</span>
                <span className="text-white/90 font-bold">Automated CI/CD Gate</span>
              </div>
            </div>
          </motion.div>

          {/* Card 6: Saudi PDPL & Sovereign Data Compliance Enclave (12 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="md:col-span-12 group relative rounded-3xl border border-white/10 bg-gradient-to-r from-[#121114] via-[#151419] to-[#121114] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#e9800a]/40 transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                    <Lock className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#e9800a] font-bold">
                    SAUDI PDPL & NDMO SOVEREIGNTY
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors">
                  {isAr
                    ? 'امتثال سيادي كامل لنظام حماية البيانات الشخصية PDPL وضوابط NDMO'
                    : 'Airtight In-Kingdom Data Sovereignty & Saudi PDPL Compliance'}
                </h3>

                <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mb-6">
                  {isAr
                    ? 'ضمان بقاء جميع البيانات وتضمينات المتجهات وسجلات النماذج داخل الحدود الجغرافية للمملكة، مع تشفير AES-256 مدعوم بمفاتيح HSM محلية وسجلات تدقيق غير قابلة للتعديل.'
                    : 'Guaranteed residency for all enterprise data, vector embeddings, and model inferences strictly within Saudi geographic borders. Encrypted via in-kingdom HSMs with automated audit logging for regulatory inspection.'}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Saudi PDPL Class 3 Boundary</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>NDMO Data Governance Conformance</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Zero Cross-Border Exfiltration</span>
                  </span>
                </div>
              </div>

              {/* Right Mini Compliance Telemetry */}
              <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-black/60 p-5 font-mono text-xs text-white/80 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[11px] text-white/40">
                  <span>SOVEREIGN_AI_AUDIT</span>
                  <span className="text-emerald-400 font-bold">100%_SOVEREIGN_COMPLIANT</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">Vector Database:</span>
                  <span className="text-white/90 font-bold">Qdrant Local Cluster (Riyadh)</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">Model Inference:</span>
                  <span className="text-emerald-400 font-bold">In-Kingdom AWS / Oracle GPU</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">OpenAI API Calls:</span>
                  <span className="text-emerald-400 font-bold">0 (Air-Gapped Privacy)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
