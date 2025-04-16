"use client";
import { useState, useEffect } from "react";
import Menu from "./components/menu";
export default function Home() {
  const [cards, setCards] = useState([]);
  const [other, setOther] = useState([]);
  const [value, setValue] = useState(3188);
  type extendedDataItem = {
    displayName: string;
    name: string;
    value: string;
  };
  interface CardI {
    name: string;
    imageUrl: string;
    extendedData: extendedDataItem[];
  }
  useEffect(() => {
    async function fetchCards() {
      const res = fetch(`https://tcgcsv.com/tcgplayer/68/${value}/products`);
      const data = await (await res).json();
      const cardData = data.results;
      const filteredCards = cardData.filter(
        (card: CardI) =>
          Array.isArray(card.extendedData) && card.extendedData.length > 0
      );
      const otherItems = cardData.filter(
        (card: CardI) =>
          Array.isArray(card.extendedData) && card.extendedData.length === 0
      );
      const sortedCards = filteredCards.sort((a: CardI, b: CardI) => {
        const cardData = (card: CardI) => {
          const num = card.extendedData.find(
            (data: extendedDataItem) => data.name === "Number"
          );
          return num ? num.value : "";
        };
        return cardData(a).localeCompare(cardData(b));
      });
      setCards(sortedCards);
      setOther(otherItems);
    }
    fetchCards();
    console.log(value);
  }, [value]);

  const MapCards = () => {
    return (
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 border border-white gap-4 px-20 py-4 ">
        {cards.map((card: CardI, idx: number) => {
          return (
            <div
              key={idx}
              className="flex flex-col justity-center items-center text-center"
            >
              <div className="text-xs font-bold border-2 w-full rounded-t-2xl p-2">
                {card.name}
              </div>
              <div className="flex justify-center items-center border-2 rounded-b-2xl bg-white h-full">
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
    );
  };
  const MapOther = () => {
    return (
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 border border-white gap-4 px-20 py-4 ">
        {other.map(
          (
            i: {
              name: string;
              imageUrl: string;
              presaleInfo: { isPresale: boolean; releasedOn: Date };
            },
            idx: number
          ) => {
            console.log(i);
            return (
              <div
                key={idx}
                className="flex flex-col justity-center items-center text-center"
              >
                <div className="text-xs font-bold border-2 w-full rounded-t-2xl p-2">
                  {i.name}
                  {i.presaleInfo.isPresale && (
                    <div>
                      {"Available after "}
                      {new Date(i.presaleInfo.releasedOn).toLocaleString()}
                    </div>
                  )}
                </div>
                <div className="flex justify-center items-center border-2 rounded-b-2xl bg-white h-full">
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
      <Menu value={value} setValue={setValue} />
      {cards.length > 0 && <MapCards />}
      {cards.length === 0 && <MapOther />}
    </div>
  );
}
