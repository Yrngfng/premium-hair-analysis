"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Sparkles,
  Leaf,
  Users,
  ChevronRight,
  Check,
  CreditCard,
  Lock,
  Droplets,
  Wind,
  Sun,
  Scissors,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

// Types
type AppStage = "hero" | "quiz" | "loading" | "paywall" | "results";
type Texture = "straight" | "wavy" | "curly" | "coily";
type Thickness = "fine" | "medium" | "thick";
type Concern = "volume" | "frizz" | "hold" | "scalp";
type StyleGoal = "fringe" | "flow" | "curls" | "slick";

interface QuizAnswers {
  texture: Texture | null;
  thickness: Thickness | null;
  concern: Concern | null;
  styleGoal: StyleGoal | null;
}

// Data
const loadingMessages = [
  "Analyzing hair texture patterns...",
  "Evaluating thickness and volume constraints...",
  "Matching optimal clean ingredients to style goals...",
  "Generating custom routine...",
];

const textureLabels: Record<Texture, string> = {
  straight: "Straight",
  wavy: "Wavy",
  curly: "Curly",
  coily: "Coily",
};

const thicknessLabels: Record<Thickness, string> = {
  fine: "Fine/Thin",
  medium: "Medium",
  thick: "Thick/Coarse",
};

const concernLabels: Record<Concern, string> = {
  volume: "Lack of volume/Flat hair",
  frizz: "Frizz/Dryness",
  hold: "Lack of hold/Shape",
  scalp: "Scalp health/Oiliness",
};

const styleGoalLabels: Record<StyleGoal, string> = {
  fringe: "Textured Fringe/Crop",
  flow: "Classic Middle Part/Flow",
  curls: "Natural Curls/Definition",
  slick: "Clean Slick-Back/Pompadour",
};

export default function HairProfileApp() {
  const [stage, setStage] = useState<AppStage>("hero");
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    texture: null,
    thickness: null,
    concern: null,
    styleGoal: null,
  });
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionTo = useCallback((newStage: AppStage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStage(newStage);
      setIsTransitioning(false);
    }, 300);
  }, []);

  // Loading screen message cycling
  useEffect(() => {
    if (stage !== "loading") return;

    const messageInterval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 750);

    const loadingTimeout = setTimeout(() => {
      transitionTo("paywall");
    }, 3000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(loadingTimeout);
    };
  }, [stage, transitionTo]);

  const handleStartQuiz = () => {
    transitionTo("quiz");
  };

  const handleQuizAnswer = (key: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));

    if (quizStep < 3) {
      setTimeout(() => setQuizStep((prev) => prev + 1), 200);
    } else {
      setTimeout(() => transitionTo("loading"), 300);
    }
  };

  const handlePayment = () => {
    transitionTo("results");
  };

  return (
    <main
      className={`min-h-screen transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
    >
      {stage === "hero" && <HeroSection onStart={handleStartQuiz} />}
      {stage === "quiz" && (
        <QuizSection
          step={quizStep}
          answers={answers}
          onAnswer={handleQuizAnswer}
        />
      )}
      {stage === "loading" && (
        <LoadingSection messageIndex={loadingMessageIndex} />
      )}
      {stage === "paywall" && <PaywallSection onPayment={handlePayment} />}
      {stage === "results" && <ResultsSection answers={answers} />}
    </main>
  );
}

// Hero Section
function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground tracking-tight">
            HairProfile
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            About
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Products
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>
      </header>

      {/* Main Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm">
            <Sparkles className="w-4 h-4" />
            <span>100% Organic & Clean Product Focus</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground leading-tight text-balance">
            Stop Guessing.
            <br />
            <span className="text-primary">
              Discover Your Exact Hair Type.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Take the 2-minute dynamic analysis to unlock a personalized, 100%
            natural and clean styling routine tailored to your hair texture,
            thickness, and style goals.
          </p>

          {/* CTA Button */}
          <button
            onClick={onStart}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl text-lg font-medium shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Start Free Hair Analysis
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-primary" />
              <span>100% Organic & Clean</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>Over 5,000 Profiles Analyzed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
    </div>
  );
}

// Quiz Section
function QuizSection({
  step,
  answers,
  onAnswer,
}: {
  step: number;
  answers: QuizAnswers;
  onAnswer: (key: keyof QuizAnswers, value: string) => void;
}) {
  const questions = [
    {
      key: "texture" as const,
      question: "What is your natural hair texture?",
      options: [
        { value: "straight", label: "Straight", icon: "—" },
        { value: "wavy", label: "Wavy", icon: "∿" },
        { value: "curly", label: "Curly", icon: "∞" },
        { value: "coily", label: "Coily", icon: "◎" },
      ],
    },
    {
      key: "thickness" as const,
      question: "How does your hair feel?",
      options: [
        { value: "fine", label: "Fine/Thin", icon: "╱" },
        { value: "medium", label: "Medium", icon: "║" },
        { value: "thick", label: "Thick/Coarse", icon: "▓" },
      ],
    },
    {
      key: "concern" as const,
      question: "What is your biggest hair struggle?",
      options: [
        { value: "volume", label: "Lack of volume", description: "Flat hair" },
        { value: "frizz", label: "Frizz/Dryness", description: "Unmanageable" },
        {
          value: "hold",
          label: "Lack of hold",
          description: "Won't stay styled",
        },
        {
          value: "scalp",
          label: "Scalp health",
          description: "Oiliness issues",
        },
      ],
    },
    {
      key: "styleGoal" as const,
      question: "What look are you trying to achieve?",
      options: [
        {
          value: "fringe",
          label: "Textured Fringe/Crop",
          description: "Modern & edgy",
        },
        {
          value: "flow",
          label: "Classic Middle Part/Flow",
          description: "Effortless style",
        },
        {
          value: "curls",
          label: "Natural Curls/Definition",
          description: "Embrace texture",
        },
        {
          value: "slick",
          label: "Clean Slick-Back/Pompadour",
          description: "Polished look",
        },
      ],
    },
  ];

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto w-full mb-12">
        <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
          <span>
            Question {step + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-serif text-foreground text-center mb-10 text-balance">
          {currentQuestion.question}
        </h2>

        {/* Options Grid */}
        <div
          className={`grid gap-4 w-full ${currentQuestion.options.length <= 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}
        >
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onAnswer(currentQuestion.key, option.value)}
              className={`group p-6 rounded-xl border-2 text-left transition-all duration-200 hover:border-primary hover:shadow-lg hover:-translate-y-1 ${
                answers[currentQuestion.key] === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card"
              }`}
            >
              {"icon" in option && (
                <span className="text-3xl mb-3 block text-primary">
                  {option.icon}
                </span>
              )}
              <span className="font-medium text-foreground block mb-1">
                {option.label}
              </span>
              {"description" in option && (
                <span className="text-sm text-muted-foreground">
                  {option.description}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Loading Section
function LoadingSection({ messageIndex }: { messageIndex: number }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-8">
        {/* Animated Loader */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-secondary" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
          <div className="absolute inset-4 rounded-full bg-primary/10 animate-pulse-soft" />
          <Leaf className="absolute inset-0 m-auto w-8 h-8 text-primary animate-float" />
        </div>

        {/* Loading Message */}
        <div className="space-y-3">
          <p className="text-lg font-medium text-foreground transition-all duration-300">
            {loadingMessages[messageIndex]}
          </p>
          <div className="flex items-center justify-center gap-1.5">
            {loadingMessages.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === messageIndex ? "bg-primary w-6" : "bg-secondary"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Paywall Section
function PaywallSection({ onPayment }: { onPayment: () => void }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPayment();
    }, 1500);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : v;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Success Icon */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-foreground mb-3 text-balance">
            Your Custom Hair Profile & Routine is Ready!
          </h1>
          <p className="text-muted-foreground">
            Unlock your personalized analysis now
          </p>
        </div>

        {/* Value Props */}
        <div className="bg-card rounded-xl p-6 border border-border space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-primary" />
            </div>
            <p className="text-sm text-foreground">
              Comprehensive breakdown of your hair type and behavior
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-primary" />
            </div>
            <p className="text-sm text-foreground">
              Step-by-step styling guide for your exact chosen aesthetic
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-primary" />
            </div>
            <p className="text-sm text-foreground">
              Curated list of 100% natural, sulfate-free, and healthy styling
              products with direct purchase links
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="text-center">
          <div className="inline-flex items-baseline gap-1">
            <span className="text-4xl font-bold text-foreground">$4.99</span>
            <span className="text-muted-foreground">one-time</span>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Card Number
            </label>
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
                maxLength={19}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Expiry
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                maxLength={5}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">CVV</label>
              <input
                type="text"
                placeholder="123"
                value={cvv}
                onChange={(e) =>
                  setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                maxLength={4}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-medium shadow-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Unlock My Custom Routine
              </>
            )}
          </button>

          <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Secure payment powered by industry-standard encryption
          </p>
        </form>
      </div>
    </div>
  );
}

// Results Section
function ResultsSection({ answers }: { answers: QuizAnswers }) {
  const { texture, thickness, concern, styleGoal } = answers;

  // Generate profile description
  const profileTitle = `${thicknessLabels[thickness!]}, ${textureLabels[texture!]} Hair with ${concernLabels[concern!].split("/")[0]} Issues`;

  // Generate routine based on answers
  const routine = getRoutine(texture!, thickness!, concern!, styleGoal!);
  const products = getProducts(texture!, thickness!, concern!, styleGoal!);

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Your Personalized Profile
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-foreground text-balance">
            {profileTitle}
          </h1>
          <p className="text-muted-foreground">
            Achieving the {styleGoalLabels[styleGoal!].toLowerCase()} look
          </p>
        </div>

        {/* Profile Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProfileCard
            label="Texture"
            value={textureLabels[texture!]}
            icon={<Wind className="w-5 h-5" />}
          />
          <ProfileCard
            label="Thickness"
            value={thicknessLabels[thickness!].split("/")[0]}
            icon={<Droplets className="w-5 h-5" />}
          />
          <ProfileCard
            label="Concern"
            value={concernLabels[concern!].split("/")[0]}
            icon={<Sun className="w-5 h-5" />}
          />
          <ProfileCard
            label="Goal"
            value={styleGoalLabels[styleGoal!].split("/")[0]}
            icon={<Scissors className="w-5 h-5" />}
          />
        </div>

        {/* Styling Routine */}
        <div className="space-y-6">
          <h2 className="text-xl font-serif text-foreground">
            Your 3-Step Styling Routine
          </h2>

          <div className="space-y-4">
            {routine.map((step, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Recommendations */}
        <div className="space-y-6">
          <h2 className="text-xl font-serif text-foreground">
            Recommended Clean Products
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-secondary flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <Leaf className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-medium text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.reason}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium justify-center hover:bg-primary/90 transition-colors group"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Buy on Amazon (Best Price)
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Questions about your routine?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact our hair experts
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function ProfileCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border text-center">
      <div className="w-10 h-10 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
        {icon}
      </div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="font-medium text-foreground text-sm">{value}</p>
    </div>
  );
}

// Helper functions for generating personalized content
function getRoutine(
  texture: Texture,
  thickness: Thickness,
  concern: Concern,
  styleGoal: StyleGoal
) {
  const baseRoutine = [
    {
      title: "Step 1: Wash & Prep",
      description: "",
    },
    {
      title: "Step 2: Pre-Style & Blowdry",
      description: "",
    },
    {
      title: "Step 3: Style & Finish",
      description: "",
    },
  ];

  // Customize wash step
  if (concern === "scalp") {
    baseRoutine[0].description =
      "Use a clarifying, sulfate-free shampoo to remove buildup without stripping natural oils. Focus on massaging the scalp for 60 seconds to stimulate circulation and cleanse pores. Rinse thoroughly with lukewarm water.";
  } else if (concern === "frizz") {
    baseRoutine[0].description =
      "Apply a hydrating, sulfate-free shampoo focusing only on the scalp. Follow with a deep-conditioning mask from mid-length to ends. Leave for 3-5 minutes before rinsing with cool water to seal the cuticle.";
  } else if (concern === "volume") {
    baseRoutine[0].description =
      "Use a volumizing, lightweight shampoo at the roots only. Avoid heavy conditioners—apply a light detangler to ends only. Rinse with cool water and gently squeeze out excess moisture without rubbing.";
  } else {
    baseRoutine[0].description =
      "Cleanse with a gentle, pH-balanced shampoo. Apply a strengthening conditioner from mid-length to ends to maintain hair integrity and prevent breakage. Rinse thoroughly.";
  }

  // Customize pre-style step based on texture and goal
  if (styleGoal === "slick") {
    baseRoutine[1].description =
      "Towel dry gently, then apply a heat protectant evenly throughout. Using a round brush, blow dry hair back and away from the face on medium heat. Create lift at the roots by directing airflow upward while brushing.";
  } else if (styleGoal === "curls") {
    baseRoutine[1].description =
      "Scrunch hair gently with a microfiber towel to remove excess water while maintaining curl pattern. Apply a curl-defining cream by scrunching upward. Diffuse on low heat or air dry completely before touching.";
  } else if (styleGoal === "flow") {
    baseRoutine[1].description =
      "Apply a sea salt spray or texturizing mist to damp hair. Blow dry using your fingers to direct hair, alternating sides to create movement. Finish with a cool shot to set the style.";
  } else {
    baseRoutine[1].description =
      "Rough dry hair to about 80% using your fingers to create natural texture. Apply a pre-styler to the front section where you want the most texture. Direct the fringe forward while drying.";
  }

  // Customize finish step based on thickness and goal
  if (thickness === "fine") {
    if (styleGoal === "slick") {
      baseRoutine[2].description =
        "Warm a small amount of lightweight pomade between palms. Apply to dry hair, working from back to front. Use a fine-tooth comb to create a sleek finish, then set with a flexible hold hairspray.";
    } else {
      baseRoutine[2].description =
        "Use a matte clay or powder for weightless texture. Work a pea-sized amount through fingertips, then pinch and pull strands for separation. Avoid product buildup which weighs down fine hair.";
    }
  } else if (thickness === "thick") {
    if (styleGoal === "slick") {
      baseRoutine[2].description =
        "Apply a strong-hold pomade generously to control thickness. Comb through for even distribution, then use a boar bristle brush to smooth any flyaways. Finish with a shine serum on top for a polished look.";
    } else {
      baseRoutine[2].description =
        "Work a generous amount of texturizing clay through dry hair, focusing on the ends. Use your fingers to twist and separate sections for definition. Layer with a flexible hairspray for all-day hold.";
    }
  } else {
    baseRoutine[2].description =
      "Apply your styling product of choice evenly through dry hair. Work it in using your fingers to create your desired shape. Finish by refining individual strands and setting with a light mist of hairspray.";
  }

  return baseRoutine;
}

function getProducts(
  texture: Texture,
  thickness: Thickness,
  concern: Concern,
  styleGoal: StyleGoal
) {
  const products = [];

  // Primary styling product based on style goal and thickness
  if (styleGoal === "slick" || styleGoal === "flow") {
    if (thickness === "fine") {
      products.push({
        name: "Organic Light-Hold Pomade with Jojoba",
        reason:
          "Perfect for fine hair seeking a sleek look without weighing it down. The jojoba base provides moisture while the light hold keeps hair in place naturally.",
      });
    } else {
      products.push({
        name: "Premium Matte Clay with Bentonite",
        reason:
          "Ideal for your hair type, providing strong hold with a natural matte finish. Bentonite clay absorbs excess oil while adding texture and volume.",
      });
    }
  } else if (styleGoal === "curls") {
    products.push({
      name: "Curl Defining Cream with Argan Oil",
      reason:
        "Specifically formulated to enhance your natural curl pattern. Argan oil provides deep hydration while eliminating frizz for defined, bouncy curls.",
    });
  } else {
    products.push({
      name: "Texturizing Sea Salt Spray",
      reason:
        "Creates effortless, beachy texture perfect for the textured crop look. Adds grip and separation without making hair feel crunchy or stiff.",
    });
  }

  // Secondary product based on concern
  if (concern === "frizz") {
    products.push({
      name: "Anti-Frizz Smoothing Serum with Marula Oil",
      reason:
        "Targets your frizz concerns directly. Marula oil penetrates the hair shaft to moisturize from within, creating a smooth, frizz-free finish that lasts all day.",
    });
  } else if (concern === "volume") {
    products.push({
      name: "Volumizing Root Powder with Rice Starch",
      reason:
        "Addresses your volume concerns by adding instant lift at the roots. Rice starch absorbs oil and creates grip for lasting fullness without residue.",
    });
  } else if (concern === "scalp") {
    products.push({
      name: "Clarifying Scalp Treatment with Tea Tree",
      reason:
        "Perfect for your scalp health concerns. Tea tree oil naturally balances oil production and soothes irritation while keeping hair fresh longer.",
    });
  } else {
    products.push({
      name: "Flexible Hold Hairspray with Bamboo Extract",
      reason:
        "Provides lasting hold without stiffness. Bamboo extract strengthens hair over time while the flexible formula allows for restyling throughout the day.",
    });
  }

  // Third product - finishing/care product based on texture
  if (texture === "curly" || texture === "coily") {
    products.push({
      name: "Deep Conditioning Hair Mask with Shea Butter",
      reason:
        "Essential for curly and coily textures that need extra moisture. Use weekly to maintain elasticity, reduce breakage, and keep curls healthy and defined.",
    });
  } else if (texture === "wavy") {
    products.push({
      name: "Wave Enhancing Mousse with Coconut Water",
      reason:
        "Enhances your natural wave pattern while adding body and bounce. Coconut water provides lightweight hydration without weighing down your waves.",
    });
  } else {
    products.push({
      name: "Heat Protectant Spray with Vitamin E",
      reason:
        "Essential protection for styling your straight hair. Vitamin E nourishes while shielding from heat damage up to 450°F for healthier-looking results.",
    });
  }

  return products;
}
