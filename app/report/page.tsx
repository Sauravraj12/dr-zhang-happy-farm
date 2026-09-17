"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CRM_KEY,
  getProductRecommendations,
  loadCurrentMember,
  MemberRecord,
  saveCurrentMember,
  saveMemberRecords,
} from "@/app/lib/pet-health";

export default function ReportPage() {
  const [member, setMember] = useState<MemberRecord | null>(null);

  useEffect(() => {
    const current = loadCurrentMember();
    if (current) {
      setMember(current);
      return;
    }

    const records = JSON.parse(window.localStorage.getItem(CRM_KEY) || "[]") as MemberRecord[];
    if (records.length > 0) {
      setMember(records[0]);
      saveCurrentMember(records[0]);
    }
  }, []);

  if (!member) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold">No health report found</h1>
          <p className="mt-4 text-slate-600">Complete the pet health check to create a free member profile and unlock your report.</p>
          <Link href="/health-check" className="mt-8 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white">
            Start Health Check
          </Link>
        </div>
      </main>
    );
  }

  const recommendations = getProductRecommendations(member, member.riskSummary);

  const upgradeToPaid = () => {
    const updatedMember = { ...member, tier: "paid" as const };
    setMember(updatedMember);
    saveCurrentMember(updatedMember);

    try {
      const raw = window.localStorage.getItem(CRM_KEY);
      const records = raw ? (JSON.parse(raw) as MemberRecord[]) : [];
      const nextRecords = records.map((item) =>
        item.memberId === updatedMember.memberId ? updatedMember : item,
      );
      saveMemberRecords(nextRecords);
    } catch {
      // ignore storage errors in demo mode
    }
  };

  const isPaid = member.tier === "paid";

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <Link href="/" className="block font-bold text-slate-900">
              Dr. Zhang&apos;s Happy Farm
            </Link>
            <p className="text-[10px] font-medium lowercase tracking-[0.12em] text-slate-500">
              smart pet health & wellness
            </p>
          </div>
          <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {isPaid ? "Paid Member" : "Free Member"}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row">
            <div>
              <p className="font-semibold uppercase tracking-[0.2em] text-green-600">
                {isPaid ? "PREMIUM AI HEALTH REPORT" : "FREE AI HEALTH REPORT"}
              </p>
              <h1 className="mt-2 text-3xl font-bold">{member.ownerName}&apos;s Health Screening</h1>
              <p className="mt-2 text-slate-500">
                {member.petType} • {member.breed} • {member.age} years • Member ID: {member.uniqueIdentifier}
              </p>
            </div>
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-4xl">
              {member.petType === "Dog" ? "🐶" : "🐱"}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <ReportCard title="BMR" value={`${member.riskSummary.bmr} kcal`} description="Estimated daily energy need" />
            <ReportCard title="Obesity Index" value={`${member.riskSummary.obesityIndex}/100`} description="Current weight profile" />
            <ReportCard title="Health Risk" value={`${member.riskSummary.riskScore}/100`} description={member.riskSummary.riskLevel} />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl bg-green-50 p-6">
              <h2 className="text-xl font-bold">Rapid Health Assessment</h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                {member.riskSummary.riskFactors.map((factor) => (
                  <li key={factor}>✓ {factor}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-xl font-bold">Key Signals</h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                {member.riskSummary.healthSignals.map((signal) => (
                  <li key={signal}>• {signal}</li>
                ))}
              </ul>
            </div>
          </div>

          {!isPaid ? (
            <div className="relative mt-10 overflow-hidden rounded-2xl border-2 border-dashed border-green-300 p-8 text-center">
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
              <div className="relative">
                <div className="text-3xl">🔒</div>
                <h2 className="mt-4 text-2xl font-bold">Unlock Advanced Pet Health Analysis</h2>
                <p className="mx-auto mt-3 max-w-xl text-slate-600">
                  Get deeper breed-aware risk analysis, explainable AI insights, preventive-care recommendations and personalized guidance.
                </p>
                <button
                  type="button"
                  onClick={upgradeToPaid}
                  className="mt-6 rounded-xl bg-green-600 px-7 py-3 font-bold text-white hover:bg-green-700"
                >
                  Upgrade to Premium
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Breed insight</p>
                  <h2 className="mt-2 text-2xl font-bold">{member.breedInsight.title}</h2>
                </div>
                <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm font-semibold text-white">Premium</span>
              </div>

              <p className="mt-4 text-slate-700">{member.breedInsight.summary}</p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-5">
                  <h3 className="font-bold">Veterinarian-level prevention plan</h3>
                  <p className="mt-3 text-slate-700">{member.breedInsight.prevention}</p>
                </div>
                <div className="rounded-2xl bg-white p-5">
                  <h3 className="font-bold">Risk watchlist</h3>
                  <ul className="mt-3 space-y-2 text-slate-700">
                    {member.riskSummary.riskFactors.map((factor) => (
                      <li key={factor}>• {factor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 rounded-2xl bg-slate-900 p-6 text-white">
            <h2 className="text-xl font-bold">Recommended Happy Farm Products</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {recommendations.map((product) => (
                <div key={product.id} className="rounded-2xl bg-slate-800 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">{product.category}</p>
                  <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
                  <p className="mt-3 text-sm text-slate-300">{product.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xl font-bold text-white">{product.price}</span>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400"
                    >
                      {product.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/brief" className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100">
              View Academic Brief
            </Link>
            <Link href="/health-check" className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800">
              Update Pet Profile
            </Link>
          </div>
        </div>
      </div>

      <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-200">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_0.8fr_1fr]">
          <div className="max-w-md">
            <h3 className="text-xl font-bold text-white">Dr. Zhang&apos;s Happy Farm</h3>
            <p className="mt-2 text-[10px] font-medium lowercase tracking-[0.18em] text-green-300">
              smart pet health & wellness
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Smart pet health screening and wellness guidance built around preventive care, evidence-based insights, and better owner decisions.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-green-300">Quick Links</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/" className="transition hover:text-white">Home</Link>
              </li>
              <li>
                <Link href="/brief" className="transition hover:text-white">Academic Brief</Link>
              </li>
              <li>
                <Link href="/health-check" className="transition hover:text-white">Health Check</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-green-300">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Email: hello@happyfarm.pet</li>
              <li>Support: 24/7 pet wellness guidance</li>
              <li>Location: Digital-first care platform</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Dr. Zhang&apos;s Happy Farm</p>
            <p>AI screening for informational purposes only.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ReportCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}
