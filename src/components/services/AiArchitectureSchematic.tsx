"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Layers,
  FileCode,
  Copy,
  Check,
  Server,
  Terminal,
  Activity,
  ChevronRight,
  ShieldCheck,
  Database,
  Workflow,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface AiStage {
  id: string;
  stageNum: string;
  titleEn: string;
  titleAr: string;
  roleEn: string;
  roleAr: string;
  technology: string;
  telemetryEn: string;
  telemetryAr: string;
  manifestFile: string;
  manifestCode: string;
}

const AI_STAGES: AiStage[] = [
  {
    id: 'stage-ingestion',
    stageNum: '01',
    titleEn: 'Data Ingestion & Semantic Chunking',
    titleAr: 'استيعاب البيانات والتقطيع الدلالي الذكي',
    roleEn: 'OCR parsing, recursive semantic chunking, metadata extraction, and in-kingdom embedding generation with BGE-M3.',
    roleAr: 'استخراج النصوص بدقة، وتقطيع دلالي ذكي، واستخلاص البيانات الوصفية وتوليد التضمينات محلياً عبر BGE-M3.',
    technology: 'Docling • Unstructured • BGE-M3 Embeddings',
    telemetryEn: 'Throughput: 1,400 docs/min • 512-Token Overlap',
    telemetryAr: 'معدل المعالجة: 1,400 وثيقة/دقيقة • تداخل 512 رمز',
    manifestFile: 'pipeline/semantic_chunker.py',
    manifestCode: `from docling.document_converter import DocumentConverter
from langchain_text_splitters import RecursiveCharacterTextSplitter

converter = DocumentConverter()
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1024,
    chunk_overlap=128,
    separators=["\\n\\n", "\\n", " ", ""]
)

def process_enterprise_document(file_path: str):
    doc = converter.convert(file_path)
    markdown_text = doc.document.export_to_markdown()
    chunks = splitter.split_text(markdown_text)
    return [{"text": c, "source": file_path, "residency": "ksa"} for c in chunks]`,
  },
  {
    id: 'stage-vector',
    stageNum: '02',
    titleEn: 'Hybrid Vector Index & Re-Ranking Bus',
    titleAr: 'محرك الفهرسة الهجين وإعادة الترتيب',
    roleEn: 'Dense vector retrieval in Qdrant combined with BM25 sparse keyword indices, followed by BGE cross-encoder re-ranking.',
    roleAr: 'استرجاع متجهات دلالي عبر Qdrant مدمج مع بحث نصي BM25، تليه إعادة ترتيب بالغة الدقة عبر نموذج BGE.',
    technology: 'Qdrant In-Kingdom • Cohere / BGE Re-Ranker',
    telemetryEn: 'Retrieval Latency: 24ms P99 • Top-K Faithfulness: 98.2%',
    telemetryAr: 'زمن الاسترجاع: 24ms • دقة أعلى النتائج: 98.2%',
    manifestFile: 'retrieval/hybrid_search.py',
    manifestCode: `from qdrant_client import QdrantClient
from qdrant_client.models import Prefetch, SearchRequest

client = QdrantClient(url="http://qdrant-cluster.internal:6333", api_key="vault_secret")

def hybrid_query(query_dense: list[float], query_sparse: dict, limit: int = 5):
    return client.query_points(
        collection_name="sovereign_enterprise_kb",
        prefetch=[
            Prefetch(query=query_dense, using="dense", limit=20),
            Prefetch(query=query_sparse, using="sparse", limit=20),
        ],
        query=query_dense,
        limit=limit,
    )`,
  },
  {
    id: 'stage-inference',
    stageNum: '03',
    titleEn: 'Private In-Kingdom Inference Core',
    titleAr: 'محرك الاستدلال الخاص والمسرع محلياً',
    roleEn: 'High-throughput open-weight model execution on Saudi NVIDIA H100 clusters using vLLM PagedAttention and speculative decoding.',
    roleAr: 'تشغيل عالي التدفق للنماذج المفتوحة على خوادم H100 السعودية باستخدام vLLM PagedAttention وفك التشفير التخميني.',
    technology: 'vLLM v0.6.4 • TensorRT-LLM • NVIDIA H100',
    telemetryEn: 'TTFT: 62ms • Throughput: 380 tokens/sec • 0 Public API Egress',
    telemetryAr: 'زمن أول رمز: 62ms • سرعة البث: 380 رمز/ثانية • انعدام الخروج السحابي',
    manifestFile: 'docker/vllm-sovereign-serve.sh',
    manifestCode: `#!/bin/bash
# Dedicated in-kingdom vLLM inference server
python3 -m vllm.entrypoints.openai.api_server \\
    --model /models/llama-3.3-70b-instruct-awq \\
    --tensor-parallel-size 2 \\
    --gpu-memory-utilization 0.92 \\
    --max-model-len 8192 \\
    --enable-chunked-prefill \\
    --host 0.0.0.0 --port 8000 \\
    --trust-remote-code`,
  },
  {
    id: 'stage-guardrails',
    stageNum: '04',
    titleEn: 'Deterministic Guardrails & Agent Pods',
    titleAr: 'بوابات الأمان الحتمية وشبكة الوكلاء',
    roleEn: 'NeMo Guardrails for zero hallucination enforcement, PII masking, and LangGraph autonomous tool execution with human sign-off.',
    roleAr: 'حواجز NeMo لمنع الهلوسة وحجب البيانات الحساسة، مع إدارة وكلاء LangGraph المستقلين بموافقة بشرية.',
    technology: 'NeMo Guardrails • LangGraph • Human-in-the-Loop',
    telemetryEn: 'Hallucination Rate: 0.0% • 100% PII Masked • Audited Trails',
    telemetryAr: 'معدل الهلوسة: 0.0% • حجب 100% للبيانات الشخصية • سجلات تدقيق',
    manifestFile: 'guardrails/config/rails.colang',
    manifestCode: `define flow check input
  user said something
  $is_safe = execute check_pii_and_injection(text=$user_message)
  if not $is_safe
    bot refuse unsafe prompt
    stop

define flow answer with citations
  bot provide grounded answer
  $verified = execute verify_context_faithfulness(answer=$bot_message)
  if not $verified
    bot fallback to safe disclaimer`,
  },
];

export function AiArchitectureSchematic() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  const [activeStageId, setActiveStageId] = useState<string>('stage-inference');
  const [copied, setCopied] = useState<boolean>(false);

  const activeStage = AI_STAGES.find((s) => s.id === activeStageId) || AI_STAGES[2];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeStage.manifestCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-architecture-schematic" className="relative py-24 sm:py-32 bg-[#080808] text-white overflow-hidden border-b border-white/10" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#1d1408]/30 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-4">
            <Layers className="h-3.5 w-3.5" />
            <span>{isAr ? 'المعمارية الهندسية لمنظومة الذكاء الاصطناعي' : 'SOVEREIGN AI PIPELINE ARCHITECTURE'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isAr ? 'من معالجة البيانات الخام إلى استدلال الوكلاء المستقلين' : '4-Tier Sovereign AI Pipeline & Agent Topology'}
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            {isAr
              ? 'تصميم معماري متكامل يضمن السرعة الفائقة والحتمية المطلقة وبقاء البيانات داخل المملكة دون الاعتماد على واجهات برمجة عامة.'
              : 'An end-to-end enterprise blueprint ensuring low-latency retrieval, verifiable factual attribution, and airtight in-kingdom data residency.'}
          </p>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stages Selector (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {AI_STAGES.map((stage) => {
              const isSelected = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`w-full text-start p-5 rounded-2xl border transition-all relative overflow-hidden ${
                    isSelected
                      ? 'border-[#e9800a] bg-gradient-to-r from-[#17130f] to-[#121114] shadow-[0_0_25px_rgba(233,128,10,0.18)]'
                      : 'border-white/10 bg-[#0d0d0f] hover:border-white/20 hover:bg-[#121114]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 bottom-0 start-0 w-1 bg-[#e9800a]" />
                  )}

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-[#e9800a] tracking-wider">
                      TIER {stage.stageNum}
                    </span>
                    <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                      ACTIVE_TIER
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {isAr ? stage.titleAr : stage.titleEn}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-3">
                    {isAr ? stage.roleAr : stage.roleEn}
                  </p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                    <span>{stage.technology}</span>
                    <ChevronRight className={`h-3.5 w-3.5 text-[#e9800a] transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Code & Manifest Inspector (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-[#0c0c0e] p-6 shadow-2xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e9800a]/15 border border-[#e9800a]/30 text-[#e9800a]">
                    <Terminal className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-white/90 font-bold block">
                      {activeStage.manifestFile}
                    </span>
                    <span className="font-mono text-[10px] text-white/40">
                      {isAr ? activeStage.telemetryAr : activeStage.telemetryEn}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{isAr ? 'تم النسخ' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>{isAr ? 'نسخ الكود' : 'Copy Manifest'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Snippet Container */}
              <div className="relative rounded-2xl bg-black/80 border border-white/5 p-4 sm:p-5 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed text-white/90">
                <pre>
                  <code>{activeStage.manifestCode}</code>
                </pre>
              </div>

              {/* Explanatory Context Footer */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#e9800a]" />
                  <span>
                    {isAr
                      ? 'تم التحقق من الامتثال لضوابط الهيئة الوطنية للأمن السيبراني ونظام حماية البيانات'
                      : 'Verified for Saudi PDPL & NCA sovereign cloud compliance'}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded">
                  SOVEREIGN_READY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
