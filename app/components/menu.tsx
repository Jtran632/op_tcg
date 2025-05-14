"use client";
import React, { useState, useEffect } from "react";
interface ItemValueProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}
interface groupObject {
  name: string;
  abbreviation: string;
  groupId: number;
}
export default function Menu({ value, setValue }: ItemValueProps) {
  const [allSets, setAllSets] = useState<[groupObject[], string][]>([]);
  useEffect(() => {
    async function fetchSets() {
      const res = await fetch("https://tcgcsv.com/tcgplayer/68/groups");
      const data = await res.json();
      const fBooster = data.results
        .sort((item: groupObject) => item.abbreviation)
        .reverse()
        .filter((item: groupObject) =>
          //match  /^ OP / \d+ number / $ nothing after so we can filter only op01 - opXX
          /^OP\d+$/.test(item.abbreviation)
        );
      const fPre = data.results
        .sort((item: groupObject) => item.abbreviation)
        .reverse()
        .filter(
          (item: groupObject) =>
            /PRE$/.test(item.abbreviation) && !/^ST/.test(item.abbreviation)
        );
      const fSuperPre = data.results
        .sort((item: groupObject) => item.abbreviation)
        .reverse()
        .filter(
          (item: groupObject) =>
            /PRE$/.test(item.abbreviation) && /^ST/.test(item.abbreviation)
        );
      const fStarter = data.results.filter(
        (item: groupObject) =>
          /^ST/.test(item.abbreviation) && !/PRE$/.test(item.abbreviation)
      );
      const starter = fStarter.sort((a: groupObject, b: groupObject) => {
        const valA = a.abbreviation.replace("ST", "").replace("-", "");
        const valB = b.abbreviation.replace("ST", "").replace("-", "");
        return valA.localeCompare(valB);
      });
      const extraSets = data.results.filter((item: groupObject) => {
        return (
          !fBooster.includes(item) &&
          !fPre.includes(item) &&
          !fSuperPre.includes(item) &&
          !fStarter.includes(item)
        );
      });
      const preSets = [...fSuperPre, ...fPre].reverse();
      if (
        fBooster.length > 0 &&
        preSets.length > 0 &&
        fStarter.length > 0 &&
        extraSets.length > 0
      ) {
        setAllSets([
          [fBooster, "Booster Sets"],
          [starter, "Starter Decks"],
          [preSets, "Pre-Release"],
          [extraSets, "Extra/Promotional"],
        ]);
      }
    }
    fetchSets();
    console.log(allSets);
  }, []);
  useEffect(() => {
    console.log(allSets);
  }, [allSets]);
  const [Selection, setSelection] = useState(0);

  const MapDeck = ({ deck }: { deck: groupObject[] }) => {
    return (
      <div className="flex text-xs">
        <select
          className="bg-white border rounded-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-1"
          onChange={(e) => [
            setValue(parseInt(e.target.value)),
            console.log(parseInt(e.target.value)),
          ]}
          value={value}
        >
          {deck.map(
            (item: { groupId: number; name: string; abbreviation: string }) => (
              <option key={item.groupId} value={item.groupId}>
                {item.abbreviation === "ST21" ? "ST-21" : item.abbreviation}
                {" - " + item.name}
              </option>
            )
          )}
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
            console.log(parseInt(e.target.value));
            setValue(allSets[parseInt(e.target.value)][0][0].groupId);
          }}
        >
          {allSets.map((item: [groupObject[], string], idx: number) => (
            <option key={idx} value={idx}>
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
      {Selection >= 0 && Selection < allSets.length && (
        <MapDeck deck={allSets[Selection][0]} />
      )}
    </div>
  );
}
