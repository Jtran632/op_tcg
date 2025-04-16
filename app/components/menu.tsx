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
      <div className="flex flex-col text-xs ml-6 w-1/4">
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 w-full text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block px-4 py-1"
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
      <div className="flex p-2 w-1/12">
        <select
          className="bg-white text-black text-md px-4 py-1 rounded-sm"
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
    <div className="flex text-center gap-4 items-center">
      <MapSelect />
      <MapDeck deck={sLst[Selection][0]} />
    </div>
  );
}
