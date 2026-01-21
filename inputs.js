const TextField = ({ label, value, onChange, error, type = "text" }) => (
  <div className="grid gap-1.5">
    <label className="text-sm font-semibold">{label}</label>
    <input
      type={type}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className={cx(
        "h-11 rounded-2xl border px-4 outline-none",
        error ? "border-red-400" : "border-slate-200"
      )}
    />
    {error ? <div className="text-xs text-red-600">{error}</div> : null}
  </div>
);

const SwitchField = ({ label, value, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!value)}
    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
  >
    <span className="text-sm font-semibold">{label}</span>
    <span className={cx("text-sm", value ? "text-emerald-700" : "text-slate-500")}>
      {value ? "Yes" : "No"}
    </span>
  </button>
);
