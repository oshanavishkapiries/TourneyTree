import type { TournamentData } from "./tournamentLayout";

// export const sampleTournamentData: TournamentData = {
//   "Round-01": [
//     {
//       seed: "1 vs 2",
//       player1: "Kasun Perera",
//       player2: "Oshan Avishka",
//       winner: "Kasun Perera",
//     },
//     {
//       seed: "3 vs 4",
//       player1: "Jane Smith",
//       player2: "Alex Johnson",
//       winner: "Alex Johnson",
//     },
//     { seed: "5", player1: "John Doe", isBye: true, winner: "John Doe" },
//     { seed: "6", player1: "Jane Doe", isBye: true, winner: "Jane Doe" },
//   ],
//   "Round-02": [
//     {
//       seed: "1 vs 3",
//       player1: "Kasun Perera",
//       player2: "Alex Johnson",
//       winner: "Kasun Perera",
//     },
//     {
//       seed: "5 vs 6",
//       player1: "John Doe",
//       player2: "Jane Doe",
//       winner: "John Doe",
//     },
//   ],
//   "Round-03": [
//     {
//       seed: "Final",
//       player1: "Kasun Perera",
//       player2: "John Doe",
//       winner: "Kasun Perera",
//     },
//   ],
// };

export const sampleTournamentData: TournamentData = {
  "Round-01": [
    { seed: "1 vs 2", player1: "Kasun", player2: "Oshan", winner: "Kasun" },
    { seed: "3 vs 4", player1: "Jane", player2: "Alex", winner: "Jane" },
    { seed: "BYE", player1: "John", isBye: true, winner: "John" },
  ],
  "Round-02": [
    { seed: "1 vs 3", player1: "Kasun", player2: "Jane", winner: "Kasun" },
    { seed: "BYE", player1: "John", isBye: true, winner: "John" },
  ],
  "Round-03": [
    { seed: "Final", player1: "Kasun", player2: "John", winner: "Kasun" },
  ],
};
