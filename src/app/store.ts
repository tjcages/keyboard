import { proxy, useSnapshot } from "valtio";

type State = {
  spaces: string[][];
  letters: string[];
  search: string;
};

const state = proxy({
  spaces: [
    ["a", "a", "a", "b", "b", "b", "c", "c", "c"],
    ["a", "a", "a", "b", "b", "b", "c", "c", "c"],
    ["a", "a", "a", "b", "b", "b", "c", "c", "c"],
    ["d", "d", "d", "e", "e", "e", "f", "f", "f"],
    ["d", "d", "d", "e", "e", "e", "f", "f", "f"],
    ["d", "d", "d", "e", "e", "e", "f", "f", "f"],
    ["g", "g", "g", "h", "h", "h", "i", "i", "i"],
    ["g", "g", "g", "h", "h", "h", "i", "i", "i"],
    ["g", "g", "g", "h", "h", "h", "i", "i", "i"],
  ],
  letters: "abcdefghijklmnopqrstuvwxyz".split(""),
  search: "",
}) as State;

export { state, useSnapshot };
export type { State };
