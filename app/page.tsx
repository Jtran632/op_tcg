"use client";
import { useState, useEffect } from "react";
import Menu from "./components/menu";
export default function Home() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [other, setOther] = useState([]);
  const [value, setValue] = useState(3188);
  const [rarity, setRarity] = useState<string[]>([]);
  const [curRarity, setCurRarity] = useState<string>("");
  type extendedDataItem = {
    displayName: string;
    name: string;
    value: string;
  };
  interface CardI {
    name: string;
    imageUrl: string;
    extendedData: extendedDataItem[];
    url: string;
  }
  const rarities = ["DON!!", "L", "C", "UC", "R", "SR", "SEC"];
  useEffect(() => {
    async function fetchCards() {
      setCurRarity("");
      const res = fetch(`https://tcgcsv.com/tcgplayer/68/${value}/products`);
      const data = await (await res).json();
      const cardData = data.results;
      const fCards = cardData.filter(
        (card: CardI) =>
          Array.isArray(card.extendedData) && card.extendedData.length > 0
      );
      const otherItems = cardData.filter(
        (card: CardI) =>
          Array.isArray(card.extendedData) && card.extendedData.length === 0
      );
      const sCards = fCards.sort((a: CardI, b: CardI) => {
        const cardData = (card: CardI) => {
          const num = card.extendedData.find(
            (data: extendedDataItem) => data.name === "Number"
          );
          return num ? num.value : "";
        };
        return cardData(a).localeCompare(cardData(b));
      });
      const rare: string[] = [];
      setCards(sCards);
      setFilteredCards(sCards);
      setOther(otherItems);
      for (let i = 0; i < sCards.length; i++) {
        sCards[i].extendedData.forEach((item: extendedDataItem) => {
          if (item.name === "Rarity" && !rare.includes(item.value)) {
            rare.push(item.value);
          }
        });
      }
      setRarity(rare);
    }
    fetchCards();
  }, [value]);
  useEffect(() => {
    if (curRarity === "") {
      setFilteredCards(cards);
      return;
    }
    const fCards = cards.filter((card: CardI) => {
      return card.extendedData.some(
        (item: extendedDataItem) =>
          item.name === "Rarity" && item.value === curRarity
      );
    });
    setFilteredCards(fCards);
  }, [curRarity]);
  const MapRarity = () => {
    return (
      <div className="flex border gap-1 px-4 py-4 justify-center items-center text-xs text-black ">
        {rarities
          .filter((val) => rarity.includes(val))
          .map((val, idx) => {
            return (
              <button
                key={idx}
                className={`border hover:border-green-500 w-fit h-fit text-center px-4 py-1 rounded-sm ${
                  curRarity === val ? "text-white" : "bg-white"
                }`}
                onClick={() =>
                  val === curRarity ? setCurRarity("") : setCurRarity(val)
                }
              >
                {val}
              </button>
            );
          })}
      </div>
    );
  };
  const MapCards = () => {
    return (
      <div className="flex flex-col">
        <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 border border-white gap-4 px-20 py-4 ">
          {filteredCards.map((card: CardI, idx: number) => {
            // console.log(card);
            return (
              <div
                key={idx}
                className="flex flex-col justity-center items-center text-center"
              >
                <div className="text-xs font-bold border-t-2 border-l border-r rounded-2xl w-fit">
                  <div className="flex justify-between items-center p-2">
                    <div>{card.extendedData[0].value}</div>
                    <div>{card.name}</div>
                    <button className="">
                      <a
                        className="text-center"
                        href={card.url}
                        target="_blank"
                      >
                        {">>"}
                      </a>
                    </button>
                  </div>
                  <img
                    src={card.imageUrl.replace("200w.jpg", "in_1000x1000.jpg")}
                    alt={card.name}
                    width={400}
                    className="border-2 rounded-2xl"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.png";
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const MapOther = () => {
    return (
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 border border-white gap-4 px-20 py-4 ">
        {other.map(
          (
            i: {
              name: string;
              imageUrl: string;
              presaleInfo: { isPresale: boolean; releasedOn: Date };
            },
            idx: number
          ) => {
            return (
              <div
                key={idx}
                className="flex flex-col justity-center items-center text-center"
              >
                <div className="text-xs font-bold border-2 w-full rounded-2xl p-2">
                  {i.name}
                  {i.presaleInfo.isPresale && (
                    <div>
                      {"Available after "}
                      {new Date(i.presaleInfo.releasedOn).toLocaleString()}
                    </div>
                  )}
                  <img
                    src={i.imageUrl.replace("200w.jpg", "in_1000x1000.jpg")}
                    alt={i.name}
                    width={400}
                    className="border-2 rounded-2xl"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.png";
                    }}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
    );
  };

  return (
    <div className="border">
      <div className="flex gap-4">
        <Menu value={value} setValue={setValue} />
        <MapRarity />
      </div>
      {cards.length > 0 && <MapCards />}
      {cards.length === 0 && <MapOther />}
    </div>
  );
}
