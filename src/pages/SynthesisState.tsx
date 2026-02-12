import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Loader2, Circle, Info, X } from "lucide-react";

// Progress step states
type StepState = "waiting" | "active" | "completed";

interface Step {
  id: number;
  label: string;
  state: StepState;
}

const SynthesisState = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prompt = location.state?.prompt || "Modern Worship Visuals for the theme Grace & Redemption";

  const [percentage, setPercentage] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, label: "Parsing theological context & keywords", state: "active" },
    { id: 2, label: "Curating seasonal color palette & typography", state: "waiting" },
    { id: 3, label: "Drafting 3 variant layout options", state: "waiting" },
    { id: 4, label: "Optimizing for ProPresenter/EasyWorship exports", state: "waiting" },
  ]);

  useEffect(() => {
    const timeline = [
      { time: 0, percentage: 0, stepIndex: 0 },
      { time: 1000, percentage: 30, stepIndex: 1 },
      { time: 2500, percentage: 64, stepIndex: 2 },
      { time: 4000, percentage: 100, stepIndex: 3 },
    ];

    let currentTimelineIndex = 0;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      // Find current and next timeline points
      const nextPoint = timeline[currentTimelineIndex + 1];
      const currentPoint = timeline[currentTimelineIndex];

      if (nextPoint && elapsed >= nextPoint.time) {
        currentTimelineIndex++;
        setPercentage(nextPoint.percentage);
        setCurrentStepIndex(nextPoint.stepIndex);

        // Update step states
        setSteps((prevSteps) =>
          prevSteps.map((step, index) => {
            if (index < nextPoint.stepIndex) return { ...step, state: "completed" as StepState };
            if (index === nextPoint.stepIndex) return { ...step, state: "active" as StepState };
            return { ...step, state: "waiting" as StepState };
          })
        );
      } else if (currentPoint && nextPoint) {
        // Interpolate percentage between points
        const progress = (elapsed - currentPoint.time) / (nextPoint.time - currentPoint.time);
        const interpolated = currentPoint.percentage + (nextPoint.percentage - currentPoint.percentage) * progress;
        setPercentage(Math.min(100, Math.floor(interpolated)));
      }

      // Complete at 100%
      if (elapsed >= 4000) {
        clearInterval(interval);
        setPercentage(100);
        
        // Mark all steps as completed
        setSteps((prevSteps) => prevSteps.map((step) => ({ ...step, state: "completed" as StepState })));

        // Navigate to editor after a brief pause
        setTimeout(() => {
          navigate("/editor", { state: { generatedPrompt: prompt } });
        }, 800);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [navigate, prompt]);

  const handleStop = () => {
    navigate("/ai-create");
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#05050A]">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-blue-600/20 blur-[150px] rounded-full" />

      {/* AI Engine Active Badge */}
      <div className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
        <div className="relative">
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
          <div className="absolute inset-0 h-2 w-2 bg-blue-500 rounded-full animate-ping" />
        </div>
        <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">
          AI Engine Active
        </span>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-3xl px-8 space-y-8">
        {/* Original Intent Section */}
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
            Original Intent
          </p>
          <blockquote className="text-3xl font-light leading-relaxed">
            <span className="text-white font-medium">"{prompt}"</span>
          </blockquote>
        </div>

        {/* Synthesis Card */}
        <div className="bg-white/[0.05] border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Synthesizing Content</h2>
              <p className="text-slate-400">The AI is crafting your ministry-ready assets...</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-blue-500">{percentage}%</div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-6 mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="space-y-2">
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  {step.state === "completed" && (
                    <CheckCircle className="h-5 w-5 text-blue-500 shrink-0" />
                  )}
                  {step.state === "active" && (
                    <Loader2 className="h-5 w-5 text-blue-500 animate-spin shrink-0" />
                  )}
                  {step.state === "waiting" && (
                    <Circle className="h-5 w-5 text-slate-600 shrink-0" />
                  )}

                  {/* Label */}
                  <span
                    className={`text-base ${
                      step.state === "completed"
                        ? "text-slate-500 line-through"
                        : step.state === "active"
                        ? "text-white font-medium"
                        : "text-slate-600"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Progress Bar (only show for active step) */}
                {step.state === "active" && (
                  <div className="ml-8 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${((percentage % 30) / 30) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <p className="text-sm text-slate-500 italic">
              Tip: You can change the translation of scriptures later in the editor.
            </p>
            <button
              onClick={handleStop}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-sm text-white hover:bg-white/5 transition-colors"
            >
              <X className="h-4 w-4" />
              Stop Generation
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Toast Notification */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-md shadow-lg">
        <Info className="h-4 w-4 text-blue-400" />
        <span className="text-sm text-slate-300">Generating 4K liturgical textures...</span>
      </div>
    </div>
  );
};

export default SynthesisState;
