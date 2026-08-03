import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckSquare, ClipboardCheck } from "lucide-react";
import FakeProgressBar from "./FakeProgressBar";

const FIELD_DEFAULTS = {
  name: "",
  department: "",
  accessCode: "",
  securityPhrase: "",
};

const SECURITY_LABELS = [
  "Security Phrase",
  "Security Phrase, probably",
  "Security Sentence",
  "Security Phrase again",
];

function normalize(value) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export default function VerificationForm({
  termsAccepted,
  onTermsRequest,
  onComplete,
  onTitleDiscovery,
  onProgressDiscovery,
}) {
  const [fields, setFields] = useState(FIELD_DEFAULTS);
  const [errors, setErrors] = useState({});
  const [labelIndex, setLabelIndex] = useState(0);
  const [checkboxShift, setCheckboxShift] = useState(0);

  useEffect(() => {
    const labelTimer = setInterval(() => {
      setLabelIndex((current) => (current + 1) % SECURITY_LABELS.length);
    }, 3200);

    const checkboxTimer = setInterval(() => {
      setCheckboxShift((current) => (current + 1) % 4);
    }, 2600);

    return () => {
      clearInterval(labelTimer);
      clearInterval(checkboxTimer);
    };
  }, []);

  const actualProgress = useMemo(() => {
    const filledCount = [
      fields.name,
      fields.accessCode,
      fields.securityPhrase,
      termsAccepted ? "terms" : "",
    ].filter(Boolean).length;

    return Math.round((filledCount / 4) * 100);
  }, [fields.accessCode, fields.name, fields.securityPhrase, termsAccepted]);

  const updateField = (field, value) => {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (normalize(fields.name) !== "signal accepted") {
      nextErrors.name = "The accepted signal is hiding in plain sight.";
    }

    if (normalize(fields.accessCode).replace(/[^0-9]/g, "") !== "4361") {
      nextErrors.department = "Department verification failed unexpectedly.";
    }

    if (normalize(fields.securityPhrase) !== "trust the placeholder") {
      nextErrors.securityPhrase = "The quiet field is still listening.";
    }

    if (!termsAccepted) {
      nextErrors.terms = "Terms must be closed from the correct end before submission.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onComplete();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-cyan-500/20 bg-slate-900/75 p-6 shadow-2xl shadow-cyan-950/20"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <button
          type="button"
          onDoubleClick={onTitleDiscovery}
          className="text-left"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
            Verification Request Form
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">
            Participant Identity Review
          </h1>
        </button>

        <div className="lg:w-72">
          <FakeProgressBar
            actualProgress={actualProgress}
            onHover={onProgressDiscovery}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-200">Name *</span>
          <input
            value={fields.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Answer hidden in the header: SIGNAL ACCEPTED"
            className="mt-2 w-full border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
          />
          {errors.name && <FieldError>{errors.name}</FieldError>}
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-200">Department *</span>
          <input
            value={fields.department}
            onChange={(event) => updateField("department", event.target.value)}
            placeholder="Optional: this one only pretends to matter"
            className="mt-2 w-full border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
          />
          {errors.department && <FieldError>{errors.department}</FieldError>}
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-200">Access Code *</span>
          <input
            value={fields.accessCode}
            onChange={(event) => updateField("accessCode", event.target.value)}
            placeholder="The bar keeps saying 43 then 61"
            className="mt-2 w-full border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
          />
        </label>

        <label className="block">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            {SECURITY_LABELS[labelIndex]}
            <span className="h-1.5 w-1.5 bg-cyan-300" aria-hidden="true" />
          </span>
          <input
            value={fields.securityPhrase}
            onChange={(event) => updateField("securityPhrase", event.target.value)}
            placeholder="Required phrase: TRUST THE PLACEHOLDER"
            className="mt-2 w-full border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
          />
          {errors.securityPhrase && <FieldError>{errors.securityPhrase}</FieldError>}
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-4 border border-slate-700 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onTermsRequest}
          className="inline-flex items-center gap-2 text-left text-sm font-semibold text-cyan-200 transition hover:text-white"
        >
          <ClipboardCheck size={17} />
          Terms and Conditions
        </button>

        <button
          type="button"
          onClick={onTermsRequest}
          className="flex items-center gap-3 text-left transition-transform"
          style={{
            transform: `translate(${checkboxShift * 3}px, ${checkboxShift % 2 === 0 ? 0 : 2}px)`,
          }}
        >
          <span
            className={`flex h-6 w-6 items-center justify-center border ${
              termsAccepted
                ? "border-cyan-300 bg-cyan-400/20 text-cyan-200"
                : "border-slate-600 text-transparent"
            }`}
          >
            <CheckSquare size={16} />
          </span>
          <span className="text-sm text-slate-300">I reached the bottom.</span>
        </button>
      </div>

      {errors.terms && <FieldError>{errors.terms}</FieldError>}

      <button
        type="submit"
        aria-disabled="false"
        className="mt-7 w-full border border-cyan-400/20 bg-cyan-400/20 px-6 py-4 font-bold uppercase tracking-[0.22em] text-cyan-100 opacity-55 shadow-lg shadow-cyan-950/20 transition hover:border-cyan-200 hover:bg-cyan-400 hover:text-slate-950 hover:opacity-100"
      >
        Verify Request
      </button>

      {errors.form && (
        <p className="mt-4 flex items-center gap-2 text-sm text-red-300">
          <AlertTriangle size={16} />
          {errors.form}
        </p>
      )}
    </form>
  );
}

function FieldError({ children }) {
  return (
    <p className="mt-2 flex items-center gap-2 text-sm text-red-300">
      <AlertTriangle size={15} />
      {children}
    </p>
  );
}
