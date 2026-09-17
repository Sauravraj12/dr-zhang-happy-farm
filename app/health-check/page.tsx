"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ACTIVE_MEMBER_KEY,
  createMemberRecord,
  getMemberRecords,
  MemberFormData,
  saveCurrentMember,
  saveMemberRecords,
} from "@/app/lib/pet-health";

export default function HealthCheckPage() {
  const [submitted, setSubmitted] = useState(false);
  const [memberId, setMemberId] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const data: MemberFormData = {
      ownerName: String(form.get("ownerName") || "").trim(),
      mobile: String(form.get("mobile") || "").trim(),
      email: String(form.get("email") || "").trim(),
      lineId: String(form.get("lineId") || "").trim(),
      petType: (form.get("petType") as "Dog" | "Cat") || "Dog",
      breed: String(form.get("breed") || "").trim(),
      age: Number(form.get("age") || 0),
      sex: String(form.get("sex") || "").trim(),
      weight: Number(form.get("weight") || 0),
      bcs: String(form.get("bcs") || "3 - Ideal"),
      activity: String(form.get("activity") || "Moderate"),
      diet: String(form.get("diet") || "Commercial Food"),
      conditions: String(form.get("conditions") || "").trim(),
    };

    const validIdentifier = data.mobile || data.email || data.lineId;
    if (!data.ownerName || !validIdentifier || !data.breed) {
      window.alert("Please complete your owner name, at least one contact identifier (mobile, email, or LINE ID), and pet breed before submitting.");
      return;
    }

    const record = createMemberRecord(data);
    const records = getMemberRecords();
    const existingIndex = records.findIndex((member) => member.memberId === record.memberId);

    if (existingIndex >= 0) {
      records[existingIndex] = record;
    } else {
      records.unshift(record);
    }

    saveMemberRecords(records);
    saveCurrentMember(record);
    window.localStorage.setItem(ACTIVE_MEMBER_KEY, JSON.stringify(record));
    setMemberId(record.memberId);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-lime-50 px-6 py-10">
        <div className="w-full max-w-xl rounded-[28px] border border-emerald-100 bg-white p-8 text-center shadow-[0_20px_60px_rgba(16,185,129,0.12)]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl shadow-inner">
            ✓
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">Health Check Submitted</h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Your free member profile has been created successfully and is bound to {memberId || "your contact record"}.
          </p>

          <p className="mt-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            CRM status: Free membership created • pet tags attached • AI report unlocked.
          </p>

          <Link
            href="/report"
            className="mt-8 inline-block rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:translate-y-[-1px] hover:shadow-xl"
          >
            View Free Report →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-lg">🐾</span>
            <div>
              <Link href="/" className="block font-bold text-slate-900">
                Dr. Zhang&apos;s Happy Farm
              </Link>
              <p className="text-[9px] font-medium lowercase tracking-[0.12em] text-slate-500">
                smart pet health & wellness
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10 lg:py-14">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Professional AI Health Check
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-5xl">
              Tell Us About Your Pet
            </h1>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            Free screening • Member profile auto-created
          </div>
        </div>

        <p className="mb-8 max-w-2xl text-slate-600">
          Complete the information below to generate your free AI-assisted health screening report.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)] md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-xl">👤</span>
              <h2 className="text-xl font-bold text-slate-900">Owner Information</h2>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Input label="Owner Name" name="ownerName" placeholder="Enter your name" required />
              <Input label="Mobile Number" name="mobile" placeholder="+886 912 345 678" />
              <Input label="Email" name="email" type="email" placeholder="you@example.com" />
              <Input label="LINE ID" name="lineId" placeholder="Your LINE ID" />
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Member ID can be created or bound using mobile, email, or LINE ID.
            </p>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)] md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-xl">🐶</span>
              <h2 className="text-xl font-bold text-slate-900">Pet Information</h2>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Select label="Pet Type" name="petType" options={["Dog", "Cat"]} required />
              <Input label="Breed" name="breed" placeholder="e.g. Corgi, Shiba Inu, Persian" required />
              <Input label="Age (years)" name="age" type="number" placeholder="e.g. 4" min="0" max="30" required />
              <Select label="Sex" name="sex" options={["Male", "Female"]} required />
              <Input label="Weight (kg)" name="weight" type="number" placeholder="e.g. 12.5" step="0.1" min="0" required />
              <Select
                label="Body Condition Score (BCS)"
                name="bcs"
                options={["1 - Very Underweight", "2 - Underweight", "3 - Ideal", "4 - Overweight", "5 - Obese"]}
                required
              />
              <Select label="Activity Level" name="activity" options={["Low", "Moderate", "High"]} required />
              <Select label="Diet Type" name="diet" options={["Commercial Food", "Home Cooked", "Mixed", "Raw / Other"]} required />
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)] md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-xl">🩺</span>
              <h2 className="text-xl font-bold text-slate-900">Health Information</h2>
            </div>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Existing Health Conditions</span>
                <textarea
                  name="conditions"
                  rows={4}
                  placeholder="Describe any known conditions, symptoms or concerns..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                />
              </label>

              <label className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <input type="checkbox" required className="mt-1 h-4 w-4 accent-emerald-600" />
                <span>
                  I agree that the information provided may be used to generate an AI-assisted pet health screening report.
                </span>
              </label>
            </div>
          </section>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:translate-y-[-1px] hover:shadow-xl"
          >
            Generate My Free Health Report →
          </button>

          <p className="text-center text-xs text-slate-500">
            This assessment is for informational and preventive screening purposes and does not replace veterinary diagnosis or treatment.
          </p>
        </form>
      </div>

      <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-200">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_0.8fr_1fr]">
          <div className="max-w-md">
            <h3 className="text-xl font-bold text-white">Dr. Zhang&apos;s Happy Farm</h3>
            <p className="mt-2 text-[9px] font-medium lowercase tracking-[0.16em] text-green-300">
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

function Input({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  min,
  max,
  step,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: string;
  max?: string;
  step?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <select
        name={name}
        required={required}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}