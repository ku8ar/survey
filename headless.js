import { useEffect, useMemo, useState } from "react";
import { Model } from "survey-core";

const cx = (...xs) => xs.filter(Boolean).join(" ");

export const useHeadlessSurvey = (json) => {
  const model = useMemo(() => {
    const m = new Model(json);
    m.checkErrorsMode = "onValueChanged"; // na bieżąco
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

  const getError = (q) => (q.errors?.[0]?.text ? q.errors[0].text : "");

  const setValue = (name, value) => {
    model.setValue(name, value);
    // przy checkErrorsMode=onValueChanged Survey sam odpala walidacje,
    // ale możesz też jawnie:
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
    getError,
    next,
    prev,
    complete,
  };
};
