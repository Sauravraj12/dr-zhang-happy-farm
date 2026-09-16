export const CRM_KEY = "dr-zhang-happy-farm-crm";
export const ACTIVE_MEMBER_KEY = "dr-zhang-happy-farm-current-member";

export type PetType = "Dog" | "Cat";
export type MemberTier = "free" | "paid";

export interface MemberFormData {
  ownerName: string;
  mobile: string;
  email: string;
  lineId: string;
  petType: PetType;
  breed: string;
  age: number;
  sex: string;
  weight: number;
  bcs: string;
  activity: string;
  diet: string;
  conditions: string;
}

export interface MemberRecord extends MemberFormData {
  memberId: string;
  uniqueIdentifier: string;
  tier: MemberTier;
  createdAt: string;
  tags: string[];
  riskSummary: PetRiskSummary;
  breedInsight: BreedInsight;
}

export interface PetRiskSummary {
  bmr: number;
  obesityIndex: number;
  riskScore: number;
  riskLevel: "Low" | "Moderate" | "Elevated" | "High";
  riskFactors: string[];
  healthSignals: string[];
}

export interface BreedInsight {
  title: string;
  summary: string;
  prevention: string;
}

export interface ProductRecommendation {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  cta: string;
  url: string;
}

const bcsMap: Record<string, number> = {
  "1 - Very Underweight": 1,
  "2 - Underweight": 2,
  "3 - Ideal": 3,
  "4 - Overweight": 4,
  "5 - Obese": 5,
};

export function getMemberIdentifier(data: Partial<MemberFormData>): string {
  const value = data.mobile?.trim() || data.email?.trim() || data.lineId?.trim();
  return value || "guest-member";
}

export function computeHealthSummary(data: MemberFormData): PetRiskSummary {
  const bcsValue = bcsMap[data.bcs] ?? 3;
  const obesityIndex = Math.min(100, Math.max(10, Math.round((bcsValue / 5) * 100)));
  const ageFactor = Math.max(0, data.age - 2) * 3;
  const activityFactor =
    data.activity === "Low" ? 18 : data.activity === "Moderate" ? 10 : 4;
  const dietFactor =
    data.diet === "Raw / Other" ? 14 : data.diet === "Home Cooked" ? 10 : 6;
  const breedFactor = getBreedRiskFactor(data.breed, data.petType);
  const bmr = Math.round(data.weight * 30 + data.age * 18 + 80);
  const riskScore = Math.min(
    100,
    Math.max(
      18,
      Math.round(obesityIndex * 0.45 + ageFactor + activityFactor + dietFactor + breedFactor),
    ),
  );

  const riskLevel: PetRiskSummary["riskLevel"] =
    riskScore <= 34 ? "Low" : riskScore <= 59 ? "Moderate" : riskScore <= 79 ? "Elevated" : "High";

  const riskFactors: string[] = [];
  if (obesityIndex >= 55) riskFactors.push("Obesity risk");
  if (data.activity === "Low") riskFactors.push("Reduced activity" );
  if (data.diet === "Raw / Other" || data.diet === "Home Cooked") riskFactors.push("Diet consistency risk");
  if (data.age >= 7) riskFactors.push("Age-related metabolic concern");
  if (data.conditions.trim()) riskFactors.push("Condition monitoring needed");
  if (riskFactors.length === 0) riskFactors.push("Stable baseline");

  const healthSignals = [
    `${data.petType} profile: ${data.breed}`,
    `BCS ${bcsValue}/5 recorded`,
    `Estimated BMR ${bmr} kcal/day`,
    riskLevel === "Low" ? "Current risk remains manageable with routine monitoring." : "Lifestyle adjustments may improve long-term resilience.",
  ];

  return {
    bmr,
    obesityIndex,
    riskScore,
    riskLevel,
    riskFactors,
    healthSignals,
  };
}

export function getBreedInsight(data: MemberFormData): BreedInsight {
  const breed = data.breed.toLowerCase();

  if (breed.includes("corgi") || breed.includes("welsh")) {
    return {
      title: "Intervertebral Disc Disease risk",
      summary:
        "Corgis are predisposed to spinal stress and disc degeneration, especially when exercise intensity and body condition are not managed well.",
      prevention:
        "Keep daily activity low-impact, support spinal mobility, and monitor for reluctance to jump or changes in gait.",
    };
  }

  if (breed.includes("shiba")) {
    return {
      title: "Metabolic and weight management risk",
      summary:
        "Shiba Inus often maintain strong metabolic output, but obesity, high-calorie treats, and inconsistent exercise can contribute to metabolic stress.",
      prevention:
        "Balance energy intake, maintain regular walks, and favor nutrient-dense, lower-fat formula support.",
    };
  }

  if (breed.includes("persian")) {
    return {
      title: "Kidney and urinary tract risk",
      summary:
        "Persian cats can be more sensitive to urinary or kidney strain, particularly when hydration and diet quality are inconsistent.",
      prevention:
        "Encourage steady water intake, monitor urine habits, and maintain a consistent, moderate-protein diet with moisture support.",
    };
  }

  if (breed.includes("siamese") || breed.includes("maid")) {
    return {
      title: "Cardiomyopathy monitoring",
      summary:
        "Some pedigree cats show stronger tendency toward cardiomyopathy or heart-related changes that need early detection.",
      prevention:
        "Maintain routine wellness checks, watch for exercise intolerance, and keep taurine and cardiac-supportive nutrition in alignment.",
    };
  }

  return {
    title: "Breed-awareness screening",
    summary:
      "This profile is being monitored under general pet health guidance, with breed-specific risk patterns reviewed for preventive support.",
    prevention:
      "Continue regular preventive monitoring, maintain body condition within target range, and adjust diet based on activity and age.",
  };
}

export function createMemberRecord(data: MemberFormData): MemberRecord {
  const uniqueIdentifier = getMemberIdentifier(data);
  const riskSummary = computeHealthSummary(data);
  const breedInsight = getBreedInsight(data);

  return {
    ...data,
    memberId: uniqueIdentifier,
    uniqueIdentifier,
    tier: "free",
    createdAt: new Date().toISOString(),
    tags: [
      data.petType,
      data.breed,
      `BCS ${bcsMap[data.bcs] ?? 3}/5`,
      data.activity,
      data.diet,
      data.sex,
    ],
    riskSummary,
    breedInsight,
  };
}

export function getMemberRecords(): MemberRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CRM_KEY);
    return raw ? (JSON.parse(raw) as MemberRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveMemberRecords(records: MemberRecord[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CRM_KEY, JSON.stringify(records));
}

export function loadCurrentMember(): MemberRecord | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(ACTIVE_MEMBER_KEY);
    return raw ? (JSON.parse(raw) as MemberRecord) : null;
  } catch {
    return null;
  }
}

export function saveCurrentMember(record: MemberRecord) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ACTIVE_MEMBER_KEY, JSON.stringify(record));
}

export function getProductRecommendations(
  profile: MemberFormData,
  summary: PetRiskSummary,
): ProductRecommendation[] {
  const recommendations: ProductRecommendation[] = [];

  if (summary.obesityIndex >= 55 || profile.bcs.includes("Overweight") || profile.bcs.includes("Obese")) {
    recommendations.push({
      id: "low-fat-formula",
      name: "Low-Fat Functional Formula",
      category: "Obesity & metabolic support",
      description:
        "Balanced nutrition designed for pets needing better calorie control and long-term weight support.",
      price: "$39",
      cta: "Exclusive Discount Purchase",
      url: "https://example.com/pet-products/low-fat-formula?utm_source=dr-zhang-happy-farm&utm_campaign=health-check",
    });
  }

  if (profile.activity === "Low" || profile.bcs.includes("Underweight") || profile.conditions.toLowerCase().includes("joint")) {
    recommendations.push({
      id: "joint-support",
      name: "Joint & Mobility Egg Roll",
      category: "Joint support",
      description:
        "Functional pet snacks that help support mobility, flexibility, and comfort for active or aging pets.",
      price: "$24",
      cta: "Exclusive Discount Purchase",
      url: "https://example.com/pet-products/joint-egg-roll?utm_source=dr-zhang-happy-farm&utm_campaign=health-check",
    });
  }

  if (profile.petType === "Cat" || profile.diet.includes("Commercial") || summary.riskFactors.some((factor) => factor.includes("Diet"))) {
    recommendations.push({
      id: "lecithin-support",
      name: "Functional Lecithin Egg Nutrition",
      category: "Coat & skin wellness",
      description:
        "A nutrient-focused option to support coat quality, skin health, and daily vitality.",
      price: "$27",
      cta: "Exclusive Discount Purchase",
      url: "https://example.com/pet-products/lecithin-egg-nutrition?utm_source=dr-zhang-happy-farm&utm_campaign=health-check",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: "daily-care-bundle",
      name: "Daily Vitality Care Bundle",
      category: "General wellness",
      description:
        "A preventive daily support pack for consistency, energy, and balanced nutrition.",
      price: "$32",
      cta: "Exclusive Discount Purchase",
      url: "https://example.com/pet-products/daily-vitality-bundle?utm_source=dr-zhang-happy-farm&utm_campaign=health-check",
    });
  }

  return recommendations.slice(0, 3);
}

function getBreedRiskFactor(breed: string, petType: PetType): number {
  const normalized = breed.toLowerCase();

  if (petType === "Dog") {
    if (normalized.includes("corgi") || normalized.includes("dachshund")) return 18;
    if (normalized.includes("shiba")) return 14;
    if (normalized.includes("poodle")) return 12;
  }

  if (petType === "Cat") {
    if (normalized.includes("persian")) return 17;
    if (normalized.includes("siamese") || normalized.includes("maine")) return 15;
  }

  return 8;
}
