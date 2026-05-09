"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

type ScribbleFont = "fredoka" | "chewy";

type Scribble = {
  id: string;
  text: string;
  nx: number;
  ny: number;
  strength: number;
  font: ScribbleFont;
  className: string;
};

/** Programming & machine learning phrases only (no pure math symbols). */
const SNIPPETS = [
  "torch.nn",
  "nn.Module",
  "forward()",
  "backward()",
  "optimizer.step",
  "zero_grad",
  "torch.no_grad",
  "CrossEntropyLoss",
  "BCEWithLogits",
  "nn.Dropout",
  "BatchNorm2d",
  "LayerNorm",
  "MultiheadAttention",
  "autograd",
  "autocast",
  "GradScaler",
  "DataLoader",
  "collate_fn",
  "Dataset",
  "Subset",
  "TensorDataset",
  "train_test_split",
  "StratifiedKFold",
  "GridSearchCV",
  "RandomizedSearchCV",
  "Pipeline",
  "ColumnTransformer",
  "StandardScaler",
  "OneHotEncoder",
  "joblib.dump",
  "pickle",
  "loss.item()",
  "model.eval()",
  "tensor.cuda",
  ".detach()",
  "embedding_dim",
  "max_seq_len",
  "tokenizer.encode",
  "attention_mask",
  "past_key_values",
  "kv_cache",
  "beam_search",
  "top_p",
  "temperature",
  "langchain",
  "RunnableSequence",
  "tool calling",
  "Pydantic",
  "FastAPI",
  "Depends()",
  "APIRouter",
  "async def",
  "await",
  "pd.DataFrame",
  "df.merge",
  "groupby",
  "rolling",
  "resample",
  "np.where",
  "sklearn.pipeline",
  "SELECT *",
  "WINDOW",
  "PARTITION BY",
  "CTE",
  "LEFT JOIN",
  "EXPLAIN QUERY",
  "pytest.mark",
  "mypy --strict",
  "ruff check",
  "jupyter lab",
  ".ipynb",
  "matplotlib.pyplot",
  "seaborn",
  "plotly.express",
  "ONNX",
  "torch.onnx.export",
  "mlflow.log_metric",
  "wandb.config",
  "cuda()",
  "device",
  "mixed_precision",
  "flash_attn",
  "LoRA",
  "PEFT",
  "quantization",
  "bitsandbytes",
  "hf_hub_download",
  "transformers.AutoModel",
  "datasets.load_dataset",
  "accelerate",
  "DeepSpeed",
  "Ray Tune",
  "Optuna",
  "hyperopt",
  "SMOTE",
  "ROC-AUC",
  "precision_recall",
  "confusion_matrix",
  "silhouette_score",
  "ARIMA",
  "Prophet",
  "VAR model",
  "ARIMAX",
  "feature_importances_",
  "partial_dependence",
  "SHAP values",
  "LangGraph",
  "MessagesState",
  "human_in_the_loop",
  "structured_output",
  "JSON schema",
  "regex escape",
  "asyncio.gather",
  "httpx.AsyncClient",
  "pydantic.Field",
  "SQLModel",
  "Alembic",
  "redis.asyncio",
  "prometheus_client",
  "grpc.aio",
];

function hash01(i: number, salt: number): number {
  let x = Math.imul(i + salt, 0x9e3779b9);
  x ^= x >>> 16;
  x = Math.imul(x, 0x85ebca6b);
  x ^= x >>> 13;
  return ((x >>> 0) % 10007) / 10007;
}

/** Outer ring — placement candidates. */
function ringCandidate(seed: number): { nx: number; ny: number } {
  const cx = 0.5;
  const cy = 0.46;
  const minR = 0.4;
  const maxR = 0.52;

  const u = hash01(seed, 11);
  const v = hash01(seed, 29);
  const angle = u * Math.PI * 2;
  const r = minR + v * (maxR - minR);
  let nx = cx + Math.cos(angle) * r * 1.06;
  let ny = cy + Math.sin(angle) * r * 0.94;
  nx = Math.min(0.965, Math.max(0.035, nx));
  ny = Math.min(0.93, Math.max(0.045, ny));
  return { nx, ny };
}

/** Rough normalized radius so packed chips stay separated (nx/ny are 0–1). */
function approxRadius(text: string): number {
  const len = text.length;
  return 0.014 + len * 0.0024;
}

function buildScribbles(target: number): Scribble[] {
  const placed: { nx: number; ny: number; r: number }[] = [];
  const out: Scribble[] = [];
  let seed = 0;
  const gap = 0.012;

  while (out.length < target && seed < 120_000) {
    seed++;
    const text =
      SNIPPETS[(out.length * 41 + seed) % SNIPPETS.length];
    const r = approxRadius(text);
    const { nx: nx0, ny: ny0 } = ringCandidate(seed * 17 + out.length * 3);
    const jitterX = (hash01(seed, 71) - 0.5) * 0.012;
    const jitterY = (hash01(seed, 73) - 0.5) * 0.012;
    const nx = Math.min(0.965, Math.max(0.035, nx0 + jitterX));
    const ny = Math.min(0.93, Math.max(0.045, ny0 + jitterY));

    let ok = true;
    for (const p of placed) {
      const d = Math.hypot(nx - p.nx, ny - p.ny);
      if (d < r + p.r + gap) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;

    placed.push({ nx, ny, r });
    const strength = 0.55 + hash01(seed, 97) * 0.85;
    const long = text.length > 11;
    const tiny = text.length <= 3;
    const font: ScribbleFont = hash01(seed, 13) < 0.55 ? "chewy" : "fredoka";
    const className = tiny
      ? `text-xs sm:text-sm opacity-[0.78]`
      : long
        ? `text-[7px] sm:text-[8px] opacity-[0.72] max-w-[5rem] leading-tight`
        : `text-[8px] sm:text-[10px] opacity-[0.75] tracking-wide`;

    out.push({
      id: `s-${out.length}`,
      text,
      nx,
      ny,
      strength,
      font,
      className,
    });
  }

  return out;
}

const SCRIBBLES = buildScribbles(78);

const FONT_STACK: Record<ScribbleFont, string> = {
  fredoka: "var(--font-scribble), system-ui, sans-serif",
  chewy: "var(--font-scribble-alt), var(--font-scribble), cursive, sans-serif",
};

type ScribbleItemProps = {
  item: Scribble;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
};

function ScribbleItem({ item, springX, springY }: ScribbleItemProps) {
  const mult = 28 * item.strength;

  const tx = useTransform(springX, (cx) => (cx - 0.5) * mult);
  const ty = useTransform(springY, (cy) => (cy - 0.5) * mult);

  const leftPct = item.nx * 100;
  const topPct = item.ny * 100;

  return (
    <motion.span
      className="pointer-events-none absolute max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 select-none"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        x: tx,
        y: ty,
      }}
    >
      <span
        className={`inline-flex items-center rounded-full bg-[color-mix(in_srgb,var(--surface)_55%,transparent)] px-2 py-0.5 backdrop-blur-[6px] dark:bg-[color-mix(in_srgb,var(--surface)_45%,transparent)] ${item.className} text-[var(--ink)] [filter:blur(0.55px)]`}
        style={{ fontFamily: FONT_STACK[item.font] }}
      >
        {item.text}
      </span>
    </motion.span>
  );
}

type HeroScribbleLayerProps = {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
};

export function HeroScribbleLayer({ springX, springY }: HeroScribbleLayerProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {SCRIBBLES.map((item) => (
        <ScribbleItem
          key={item.id}
          item={item}
          springX={springX}
          springY={springY}
        />
      ))}
    </div>
  );
}
