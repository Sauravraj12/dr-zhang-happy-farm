import Link from "next/link";

const emphasisPoints = [
  {
    title: "1. Data Collection Pipeline",
    text: "Each wellness form captures owner identity, pet breed, age, body condition score, dietary patterns, activity level, and health concerns. The CRM layer binds records to phone, email, or LINE ID, creating a structured longitudinal profile for every household and enabling individualized pet health intelligence.",
  },
  {
    title: "2. Scientific Research Value",
    text: "The aggregated pet health dataset supports breed-specific prevalence analysis, risk pattern discovery, and early preventive medicine research. This creates a high-value evidence base suitable for journal publication, conference presentation, and veterinary nutrition discussion.",
  },
  {
    title: "3. Commercial Validation",
    text: "When risk patterns are linked to product outcomes, subscription conversion, and owner engagement, Dr. Zhang's Happy Farm gains scientific credibility for nutrient strategy, weight management, mobility support, and coat health optimization.",
  },
  {
    title: "4. Conversion Funnel",
    text: "Free member reports drive acquisition, paid reports deepen trust, and product recommendations convert screening awareness into retail action. The result is a closed loop between health data, scientific framing, monetization, and direct sales.",
  },
];

export default function BriefPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-bold text-slate-900">
            Dr. Zhang&apos;s Happy Farm
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              href="/health-check"
              className="rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
            >
              Start Health Check
            </Link>
          </div>
        </div>
      </header>

      <div className="px-6 py-10">
        <div className="mx-auto max-w-5xl rounded-[32px] bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] md:p-12">
          <p className="font-semibold uppercase tracking-[0.2em] text-green-600">
            Executive Brief
          </p>
          <h1 className="mt-4 text-3xl font-bold md:text-5xl">
            Pet Health Big Data as a Scientific and Commercial Engine
          </h1>

          <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
            <p>
              Dr. Zhang&apos;s Happy Farm operates at the intersection of preventive pet healthcare, digital member acquisition, and functional nutrition marketing. The platform captures structured pet health information from real pet owners across multiple variables—breed, age, body condition score, diet, activity level, and health concerns—and transforms this data into a reproducible evidence base for both clinical and commercial insight.
            </p>
            <p>
              This data architecture creates a strong foundation for academic output. It enables breed-specific analysis, longitudinal health tracking, and risk stratification that can be explored in veterinary journals, nutrition conferences, and companion animal health research settings. Patterns such as spinal stress in Corgis, metabolic strain in Shiba Inus, obesity risk in overweight pets, and urinary or kidney sensitivity in Persian cats can be studied as real-world evidence clusters. These findings are not only scientifically valuable but also directly relevant to product positioning and professional care guidance.
            </p>
            <p>
              From a marketing standpoint, the same data supports professional scientific endorsement for Happy Farm products. When a product is linked to observed risk factors—such as obesity, joint stress, metabolic imbalance, or coat health concerns—the brand gains stronger consumer trust and more persuasive product claims. This transforms AI screening from a simple digital tool into a health education platform and a conversion engine for premium subscriptions and functional nutrition sales.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {emphasisPoints.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-lg font-bold text-slate-900">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl bg-emerald-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Academic</p>
              <h3 className="mt-3 text-xl font-bold text-slate-900">Research Output</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                The platform creates a de-identified pet health dataset suitable for journal articles, conference abstracts, and veterinary health communications.
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Commercial</p>
              <h3 className="mt-3 text-xl font-bold text-slate-900">Product Credibility</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Risk-driven storytelling gives product claims scientific foundation and helps convert health insights into wellness product adoption.
              </p>
            </div>

            <div className="rounded-2xl bg-violet-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">Business</p>
              <h3 className="mt-3 text-xl font-bold text-slate-900">Monetization</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Free reports drive member acquisition, premium analysis improves conversion, and product recommendations create direct sales opportunities.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl bg-gradient-to-r from-green-50 to-emerald-50 p-6">
            <h2 className="text-2xl font-bold text-slate-900">Strategic Summary</h2>
            <p className="mt-4 text-slate-700 leading-8">
              The platform converts pet owners into free members through a low-friction health screening experience. The free report creates trust and captures valuable data. The premium report adds breed-aware explanations and prevention planning. Then the product recommendation engine links risk factors to functional supplements and health-support products, creating a complete business loop: screening → data accumulation → scientific interpretation → premium conversion → commercial action.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
