"use client";

import { clsx } from "clsx";
import { state, useSnapshot } from "./store";
import { predictWord } from "./getSuggestions";

const Div = ({ letter, x, y }: { letter: string; x: number; y: number }) => {
  const { spaces, search } = useSnapshot(state);
  // find all the positions in spaces where the letter is
  const positions = spaces
    .flatMap((row, i) => row.map((l, j) => (l === letter ? [i, j] : null)))
    .filter((p) => p !== null);
  const firstLetterX = positions[0][0];
  const firstLetterY = positions[0][1];

  const isFirstLetter = firstLetterX === x && firstLetterY === y;
  const rightNeighbor = y < spaces[0].length - 1 && spaces[x][y + 1] === letter;
  const leftNeighbor = y > 0 && spaces[x][y - 1] === letter;
  const topNeighbor = x > 0 && spaces[x - 1][y] === letter;
  const bottomNeighbor = x < spaces.length - 1 && spaces[x + 1][y] === letter;
  const noNeighbor =
    !rightNeighbor && !leftNeighbor && !topNeighbor && !bottomNeighbor;

  async function handleClick() {
    // within spaces, find the clicked position & change all the letters to the immediate right, left, top, and bottom to the clicked letter
    state.spaces[x][y] = letter;
    if (x > 0) state.spaces[x - 1][y] = letter;
    if (x < spaces.length - 1) state.spaces[x + 1][y] = letter;
    if (y > 0) state.spaces[x][y - 1] = letter;
    if (y < spaces[0].length - 1) state.spaces[x][y + 1] = letter;

    state.search += letter;
  }

  return (
    <div
      className={clsx({
        "border-r": !rightNeighbor,
        "border-l": !leftNeighbor,
        "border-b": !bottomNeighbor,
        "border-t": !topNeighbor,
      })}
      onClick={() => handleClick()}
    >
      {isFirstLetter ? letter : ""}
    </div>
  );
};

export default function Home() {
  const { spaces, search } = useSnapshot(state);
  return (
    <main
      style={{
        gridTemplateColumns: `repeat(${state.spaces[0].length}, 1fr)`,
        gridTemplateRows: `auto repeat(${state.spaces.length}, 1fr)`,
      }}
    >
      <div className="col-span-9 bg-red-500 text-lg h-10">{search}</div>
      {spaces.map((row, i) =>
        row.map((letter, j) => <Div key={j} x={i} y={j} letter={letter} />)
      )}
    </main>
  );
}
