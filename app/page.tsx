"use client";

import Link from "next/link";
import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Tell Us About Your Pet",
    text: "Enter your pet's breed, age, weight, BCS, diet and lifestyle.",
  },
  {
    number: "02",
    title: "AI Screening",
    text: "Our screening engine analyzes the submitted health characteristics.",
  },
  {
    number: "03",
    title: "Free Report",
    text: "Receive a basic health and risk-factor summary.",
  },
  {
    number: "04",
    title: "Advanced Care",
    text: "Unlock deeper analysis and personalized prevention recommendations.",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-bold sm:text-xl">Dr. Zhang&apos;s Happy Farm</h1>
            <p className="text-[10px] font-medium lowercase tracking-[0.12em] text-slate-500 sm:text-[10px]">
              smart pet health & wellness
            </p>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/brief" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Academic Brief
            </Link>
            <Link href="/health-check" className="rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700">
              Start Health Check
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
          >
            <span className="sr-only">Open menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span className="block h-0.5 rounded-full bg-current" />
              <span className="block h-0.5 rounded-full bg-current" />
              <span className="block h-0.5 rounded-full bg-current" />
            </div>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t bg-white md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3">
              <Link
                href="/brief"
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Academic Brief
              </Link>
              <Link
                href="/health-check"
                className="rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Health Check
              </Link>
            </div>
          </div>
        )}
      </nav>

      <section className="bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              AI-Assisted Pet Health Screening
            </span>

            <h2 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
              Understand Your Pet&apos;s
              <span className="block text-green-600">Health Better.</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Complete a simple pet wellness screen, create a free member file, unlock your basic report, and discover the products and preventive care that match your pet&apos;s risk profile.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/health-check" className="rounded-xl bg-green-600 px-7 py-4 font-semibold text-white shadow-lg hover:bg-green-700">
                Start Free Health Check →
              </Link>
              <Link href="/brief" className="rounded-xl border border-slate-300 px-7 py-4 font-semibold hover:bg-slate-50">
                Academic & Marketing Brief
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              AI screening is for informational and preventive purposes and does not replace professional veterinary diagnosis.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="rounded-3xl border bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Example Health Report</p>
                  <h3 className="mt-1 text-xl font-bold">Your Pet&apos;s Health</h3>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">🐶</div>
              </div>

              <div className="mt-8">
                <div className="flex items-end justify-between">
                  <span className="text-sm text-slate-500">Health Screening Score</span>
                  <span className="text-3xl font-bold text-green-600">82</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[82%] rounded-full bg-green-500" />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Weight Status</p>
                  <p className="mt-1 font-bold">Normal</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Activity</p>
                  <p className="mt-1 font-bold">Moderate</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Risk Factors</p>
                  <p className="mt-1 font-bold">2 detected</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Report</p>
                  <p className="mt-1 font-bold text-green-600">Available</p>
                </div>
              </div>

              <Link href="/health-check" className="mt-6 block rounded-xl bg-slate-900 py-3 text-center font-semibold text-white hover:bg-slate-800">
                Check My Pet
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-green-600">SIMPLE PROCESS</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">From Health Check to Personalized Care</h2>
            <p className="mt-4 text-slate-600">A simple digital workflow designed for pet owners.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {steps.map((item) => (
              <div key={item.number} className="rounded-2xl border bg-white p-6 shadow-sm">
                <span className="text-sm font-bold text-green-600">{item.number}</span>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-200">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_0.8fr_1fr]">
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
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Dr. Zhang&apos;s Happy Farm</p>
            <p>AI screening for informational purposes only.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}