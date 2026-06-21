import { ProblemVisualizerMeta } from "../visualizerRegistry";
import { step1ArraysRegistry } from "./step1_arrays";
import { step2BinarySearchRegistry } from "./step2_binarysearch";
import { step3StringsRegistry } from "./step3_strings";
import { step4LinkedListsRegistry } from "./step4_linkedlists";
import { step5RecursionRegistry } from "./step5_recursion";
import { step6TwoPointersRegistry } from "./step6_twopointers";
import { step7StringsHardRegistry } from "./step7_strings_hard";

export const combinedRegistry: Record<string, ProblemVisualizerMeta> = {
  ...step1ArraysRegistry,
  ...step2BinarySearchRegistry,
  ...step3StringsRegistry,
  ...step4LinkedListsRegistry,
  ...step5RecursionRegistry,
  ...step6TwoPointersRegistry,
  ...step7StringsHardRegistry,
};
