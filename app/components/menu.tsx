const starterDecks = [
  ["Starter Deck 1: Straw Hat Crew", 3189],
  ["Starter Deck 2: Worst Generation", 3191],
  ["Starter Deck 3: The Seven Warlords of The Sea", 3192],
  ["Starter Deck 4: Animal Kingdom Pirates", 3190],
  ["Starter Deck 5: Film Edition", 17687],
  ["Starter Deck 6: Absolute Justice", 17699],
  ["Starter Deck 7: Big Mom Pirates", 22930],
  ["Starter Deck 8: Monkey.D.Luffy", 22956],
  ["Starter Deck 9: Yamato", 22957],
  ["Starter Deck 11: Uta", 23250],
  ["Starter Deck 12: Zoro and Sanji", 23348],
  ["Starter Deck 14: 3D2Y", 23489],
  ["Starter Deck 15: RED Edward.Newgate", 23490],
  ["Starter Deck 16: GREEN Uta", 23491],
  ["Starter Deck 17: BLUE Donquixote Doflamingo", 23492],
  ["Starter Deck 18: PURPLE Monkey.D.Luffy", 23493],
  ["Starter Deck 19: BLACK Smoker", 23494],
  ["Starter Deck 20: YELLOW Charlotte Katakuri", 23495],
  ["Starter Deck EX: Gear 5", 23991],
];

export default function Menu() {
  return (
    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
      {starterDecks.map(([name, id]) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
}
