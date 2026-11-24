// PatternBattle demo judge: runs a visitor's Python in Pyodide (CPython compiled to
// WebAssembly) inside this worker, so the page stays responsive and an infinite loop
// can be killed by terminating the worker. The real platform judges in Docker sandboxes.
const PYODIDE = "https://cdn.jsdelivr.net/npm/pyodide@314.0.8/";

const HARNESS = `
import sys, io, traceback
def run_case(code, data):
    out = io.StringIO()
    sys.stdin = io.TextIOWrapper(io.BytesIO(data.encode()), encoding="utf-8")
    sys.stdout = out
    kind, err = "", ""
    try:
        exec(compile(code, "solution.py", "exec"), {"__name__": "__main__"})
    except SystemExit:
        pass
    except SyntaxError:
        kind, err = "CE", traceback.format_exc(limit=0)
    except BaseException as e:
        kind, err = "RE", "".join(traceback.format_exception(type(e), e, e.__traceback__.tb_next))
    finally:
        sys.stdout, sys.stdin = sys.__stdout__, sys.__stdin__
    return [out.getvalue(), kind, err]
`;

let py;

self.onmessage = async ({ data }) => {
  if (data.type === "init") {
    try {
      const { loadPyodide } = await import(PYODIDE + "pyodide.mjs");
      py = await loadPyodide({ indexURL: PYODIDE });
      py.runPython(HARNESS);
      self.postMessage({ type: "ready" });
    } catch (e) {
      self.postMessage({ type: "fatal", message: String(e) });
    }
    return;
  }
  if (data.type === "run") {
    const t0 = performance.now();
    const res = py.globals.get("run_case")(data.code, data.input);
    const [stdout, kind, err] = res.toJs();
    res.destroy();
    self.postMessage({ type: "result", id: data.id, stdout, kind, err, ms: performance.now() - t0 });
  }
};
