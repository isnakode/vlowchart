import type { Dimensions } from "@vue-flow/core";

export const templates = [
  { width: 100, height: 40, type: "start" },
  { width: 100, height: 60, type: "io" },
  { width: 80, height: 80, type: "decision" },
  { width: 100, height: 60, type: "process" },
  { width: 100, height: 60, type: "doc" },
  { width: 100, height: 60, type: "prep" },
  { width: 100, height: 60, type: "loop" },
  { width: 100, height: 60, type: "input" },
  { width: 100, height: 60, type: "stored-data" },
  { width: 100, height: 60, type: "loop-limit" },
  { width: 100, height: 60, type: "delay" },
  { width: 100, height: 60, type: "display" },
  { width: 50, height: 45, type: "offpage" },
  { width: 100, height: 60, type: "multi-doc" },
  { width: 100, height: 60, type: "direct-data" },
  { width: 100, height: 60, type: "instorage" },
  { width: 100, height: 60, type: "preprocess" },
  { width: 40, height: 40, type: "circle" },
  { width: 60, height: 30, type: "merge" },
  { width: 100, height: 100, type: "db" }
]

export const scaleToMax = (size: Dimensions, targetMax: number) => {
  const maxVal = Math.max(size.width, size.height);
  return {
    width: size.width * targetMax / maxVal,
    height: size.height * targetMax / maxVal
  };
}