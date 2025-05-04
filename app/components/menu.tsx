"use client";
import React, { useState } from "react";
import { boosterSets, starterDecks, prerelease, extra } from "./cardsets";
type DeckItem = [string, number][];
interface ItemValueProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}
const sLst: [DeckItem, string][] = [
  [boosterSets, "Booster Sets"],
  [starterDecks, "Starter Decks"],
  [prerelease, "Pre-Release"],
  [extra, "Extra/Promotional"],
];

export default function Menu({ value, setValue }: ItemValueProps) {
  const [Selection, setSelection] = useState(0);
  const MapDeck = ({ deck }: { deck: DeckItem }) => {
    return (
      <div className="flex text-xs">
        <select
          className="bg-white border rounded-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-1"
          onChange={(e) => setValue(parseInt(e.target.value))}
          value={value}
        >
          {deck.map((item) => (
            <option key={item[1]} value={item[1]}>
              {item[0]}
            </option>
          ))}
        </select>
      </div>
    );
  };
  const MapSelect = () => {
    return (
      <div className="flex p-2">
        <select
          className="bg-white border rounded-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-1 "
          value={Selection}
          onChange={(e) => {
            setSelection(parseInt(e.target.value));
            setValue(sLst[parseInt(e.target.value)][0][0][1]);
          }}
        >
          {sLst.map((item, index) => (
            <option key={index} value={index}>
              {item[1]}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="flex gap-4 text-center items-center text-xs text-black ">
      <MapSelect />
      <MapDeck deck={sLst[Selection][0]} />
    </div>
  );
}
