// HeadlessSurveyExample.jsx
// yarn add survey-core
import React, { useEffect, useMemo, useState } from "react";
import { Model } from "survey-core";

/** -----------------------
 *  Example JSON
 *  ---------------------- */
const surveyJson = {
  title: "HSBC Headless Survey (Demo)",
  pages: [
    {
      name: "p1",
      elements: [
        {
          type: "text",
          name: "firstName",
          title: "First name",
          isRequired: true,
        },
        {
          type: "text",
          name: "email",
          title: "Email",
          inputType: "email",
          isRequired: true,
          validators: [{ type: "email" }],
        },
        {
          type: "boolean",
          name: "hasCar",
          title: "Do you have a car?",
          labelTrue: "Yes",
          labelFalse: "No",
        },
        {
          type: "text",
          name: "carModel",
          title: "Car model",
          visibleIf: "{hasCar} = true",
          isRequired: true,
        },
      ],
    },
    {
      name: "p2",
      elements: [
        {
          type: "comment",
          name: "notes",
          title: "Notes (optional)",
        },
      ],
    },
  ],
};

/** -----------------------
 *  Helpers
 *  ---------------------- */
const cx = (...xs) => xs.filter(Boolean).join(" ");

const getFirstErrorText = (q) => (q?.errors?.[0]?.text ? q.errors[0].text : "");

/** -----------------------
 *  Headless hook
 *  ---------------------- */
const useHeadlessSurvey = (json) => {
  const model = useMemo(() => {
    const m = new Model(json);
    m.checkErrorsMode = "onValueChanged";
    return m;
  }, [json]);

  const [, force] = useState(0);

  useEffect(() => {
    const rerender = () => force((x) => x + 1);

    model.onValueChanged.add(rerender);
    model.onCurrentPageChanged.add(rerender);
    model.onVisibleChanged.add(rerender);
    model.onComplete.add(rerender);

    return () => {
      model.onValueChanged.remove(rerender);
      model.onCurrentPageChanged.remove(rerender);
      model.onVisibleChanged.remove(rerender);
      model.onComplete.remove(rerender);
    };
  }, [model]);

  const page = model.currentPage;

  const questions = (page?.questions || []).filter((q) => q.isVisible);

  const setValue = (name, value) => {
    model.setValue(name, value);
    const q = model.getQuestionByName(name);
    if (q) q.validate();
  };

  const validatePage = () => {
    const ok = page?.validate?.() ?? true;
    force((x) => x + 1);
    return ok;
  };

  const next = () => {
    if (!validatePage()) return false;
    model.nextPage();
    return true;
  };

  const prev = () => {
    model.prevPage();
  };

  const complete = () => {
    if (!validatePage()) return false;
    model.completeLastPage();
    force((x) => x + 1);
    return true;
  };

  return {
    model,
    page,
    questions,
    data: model.data,
    setValue,
    next,
    prev,
    complete,
  };
};

/** -----------------------
 *  UI fields (simple)
 *  ---------------------- */
const FieldShell = ({ label, error, children }) => (
  <div className="grid gap-1.5">
    <label className="text-sm font-semibold text-slate-900">{label}</label>
    {children}
    {error ? <div className="text-xs text-red-600">{error}</div> : null}
  </div>
);

const TextField = ({ label, value, onChange, error, type = "text" }) => (
  <FieldShell label={label} error={error}>
    <input
      type={type}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className={cx(
        "h-11 w-full rounded-2xl border bg-white px-4 text-[15px] outline-none",
        error ? "border-red-400" : "border-slate-200",
        "focus:border-[#3d7c84]"
      )}
    />
  </FieldShell>
);

const TextAreaField = ({ label, value, onChange, error }) => (
  <FieldShell label={label} error={error}>
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className={cx(
        "w-full resize-none rounded-2xl border bg-white px-4 py-3 text-[15px] outline-none",
        error ? "border-red-400" : "border-slate-200",
        "focus:border-[#3d7c84]"
      )}
    />
  </FieldShell>
);

const BooleanField = ({ label, value, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!value)}
    className={cx(
      "flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3",
      "active:scale-[0.99]"
    )}
  >
    <span className="text-sm font-semibold text-slate-900">{label}</span>
    <span className={cx("text-sm font-semibold", value ? "text-[#3d7c84]" : "text-slate-500")}>
      {value ? "Yes" : "No"}
    </span>
  </button>
);

/** -----------------------
 *  Question renderer
 *  ---------------------- */
const Question = ({ q, model, setValue }) => {
  const value = model.getValue(q.name);
  const error = getFirstErrorText(q);

  if (q.getType() === "text") {
    const type = q.inputType === "email" ? "email" : "text";
    return (
      <TextField
        label={q.title}
        type={type}
        value={value}
        error={error}
        onChange={(v) => setValue(q.name, v)}
      />
    );
  }

  if (q.getType() === "comment") {
    return (
      <TextAreaField
        label={q.title}
        value={value}
        error={error}
        onChange={(v) => setValue(q.name, v)}
      />
    );
  }

  if (q.getType() === "boolean") {
    return (
      <BooleanField
        label={q.title}
        value={!!value}
        onChange={(v) => setValue(q.name, v)}
      />
    );
  }

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-slate-900">
      Unsupported question type: <b>{q.getType()}</b> (name: <b>{q.name}</b>)
    </div>
  );
};

/** -----------------------
 *  Full example component
 *  ---------------------- */
export default function HeadlessSurveyExample() {
  const { model, questions, data, setValue, next, prev, complete } =
    useHeadlessSurvey(surveyJson);

  const isLast = model.isLastPage;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-xl px-4 py-10">
        <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                {model.title}
              </h1>
              <div className="mt-1 text-xs text-slate-500">
                Page {model.currentPageNo + 1} / {model.visiblePageCount}
              </div>
            </div>

            <div className="h-10 rounded-2xl bg-[#3d7c84]/10 px-3 py-2 text-xs font-semibold text-[#3d7c84]">
              Headless
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {questions.map((q) => (
              <Question key={q.name} q={q} model={model} setValue={setValue} />
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={model.isFirstPage}
              className={cx(
                "h-11 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold",
                "disabled:opacity-40"
              )}
            >
              Back
            </button>

            {!isLast ? (
              <button
                type="button"
                onClick={next}
                className="h-11 rounded-2xl bg-[#3d7c84] px-5 text-sm font-semibold text-white"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const ok = complete();
                  if (ok) {
                    console.log("SUBMIT", model.data);
                    alert("Submitted! Check console.");
                  }
                }}
                className="h-11 rounded-2xl bg-[#3d7c84] px-5 text-sm font-semibold text-white"
              >
                Submit
              </button>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-700">
              Live data
            </div>
            <pre className="mt-2 overflow-auto text-xs text-slate-800">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
