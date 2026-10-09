export interface CultureValue {
  id: string;
  num: string; // '01' to '05'
  titleAr: string;
  titleEn: string;
  lineAr: string;
  lineEn: string;
  detailAr: string;
  detailEn: string;
  photo: string;
  aspect: string;
}

export const CULTURE_VALUES: CultureValue[] = [
  {
    id: 'val-1',
    num: '01',
    titleAr: 'الحرفة قبل المساومة',
    titleEn: 'Craft Over Compromise',
    lineAr: 'نرفض الحلول الترقيعية؛ نبني أنظمة برمجية نقية نصمد أمام اختبار الزمن.',
    lineEn: 'We reject disposable shortcuts. We architect clean software built to withstand real institutional pressure.',
    detailAr: 'السرعة في إيتش ليست فوضى، بل نتيجة إتقان المعمارية والتصميم المسبق. لا نطلق شيفرة نخجل من وضع أسمائنا عليها.',
    detailEn: 'Speed at AEITCH is the byproduct of disciplined engineering foresight. We never push a line of code we would hesitate to sign our names to.',
    photo: '/life/values/value-1.svg',
    aspect: '4:3',
  },
  {
    id: 'val-2',
    num: '02',
    titleAr: 'إلغاء الأنا والمسؤولية الكاملة',
    titleEn: 'Zero Ego, Extreme Ownership',
    lineAr: 'لا مكان للتبرير أو إلقاء اللوم؛ كل مهندس يمتلك مساره من التخطيط حتى الإنتاج.',
    lineEn: 'No blame games or finger-pointing. Every engineer owns their vertical from architectural blueprint to live telemetry.',
    detailAr: 'عندما يقع خطأ، نبحث عن الخلل في النظام وليس في الشخص. نصححه فوراً، نكتب مراجعة بأثر رجعي (Postmortem)، ونتعلم معاً.',
    detailEn: 'When anomalies emerge, we interrogate the system architecture, not individuals. We remediate immediately and publish honest postmortems.',
    photo: '/life/values/value-2.svg',
    aspect: '4:3',
  },
  {
    id: 'val-3',
    num: '03',
    titleAr: 'الشفافية الصريحة ومراجعات الكود الدقيقة',
    titleEn: 'Radical Candor & Precise PRs',
    lineAr: 'النقد الفني الصريح هدفه الارتقاء بالمستوى، ومراجعة الـ PR حق مقدس لكل سطر.',
    lineEn: 'Direct, candid technical critiques raise everyone’s caliber. Pull request review is a sacred peer-learning ritual.',
    detailAr: 'نناقش الأفكار بقوة وتجرد، ولكننا نتفق ونتحد عند التنفيذ. لا تُقبل أي شفرة دون فحص أمني واختبارات مرور آلية.',
    detailEn: 'We debate technical choices vigorously without political hesitation, then commit in unison. Zero PRs merge without automated test gates.',
    photo: '/life/values/value-3.svg',
    aspect: '4:3',
  },
  {
    id: 'val-4',
    num: '04',
    titleAr: 'التعلم المستمر وتجارب الابتكار الحرة',
    titleEn: 'Continuous Learning & Sandbox Play',
    lineAr: 'نقتطع وقتاً أسبوعياً لتجربة أحدث أوراق الذكاء الاصطناعي وبناء أدوات مفتوحة المصدر.',
    lineEn: 'We carve out deliberate weekly time to dissect bleeding-edge AI whitepapers and contribute to open source tooling.',
    detailAr: 'التفوق في السوق السعودي والخليجي يتطلب أن نكون متقدمين بخطوة على التقنيات السائدة، وتجربة النماذج الجديدة في بيئات معزولة.',
    detailEn: 'Staying ahead in the GCC enterprise ecosystem requires exploring tomorrow’s paradigms today inside sandboxed research pods.',
    photo: '/life/values/value-4.svg',
    aspect: '4:3',
  },
  {
    id: 'val-5',
    num: '05',
    titleAr: 'الهندسة السيادية ونقل المعرفة',
    titleEn: 'Sovereign Engineering & Knowledge Transfer',
    lineAr: 'نبني أنظمة يمتلكها العميل بنسبة 100%، ونمكن الفرق المحلية من إدارتها باستقلالية.',
    lineEn: 'We engineer platforms our clients own 100%, equipping regional teams to steer their sovereign digital roadmap.',
    detailAr: 'نجاحنا الحقيقي ليس في إبقاء العميل معتمداً علينا، بل في تمكينه من امتلاك زمام تقنيته وبناء فريقه الداخلي بثقة.',
    detailEn: 'Our benchmark of victory is not perpetual vendor lock-in, but conferring operational autonomy and architectural independence.',
    photo: '/life/values/value-5.svg',
    aspect: '4:3',
  },
];
