// import mongoose from 'mongoose';

// const matchSchema = new mongoose.Schema({
//   teamA: { type: String, required: true },
//   teamB: { type: String, required: true },
//   tossWinner: { type: String, required: true },
//   teamAStats: {
//     totalRuns: { type: Number, default: 0 },
//     wickets: { type: Number, default: 0 },
//     overs: { type: Number, default: 0 },
//     extras: {
//       byes: { type: Number, default: 0 },
//       legByes: { type: Number, default: 0 },
//       noBalls: { type: Number, default: 0 },
//       wides: { type: Number, default: 0 }
//     }
//   },
//   teamBStats: {
//     totalRuns: { type: Number, default: 0 },
//     wickets: { type: Number, default: 0 },
//     overs: { type: Number, default: 0 },
//     extras: {
//       byes: { type: Number, default: 0 },
//       legByes: { type: Number, default: 0 },
//       noBalls: { type: Number, default: 0 },
//       wides: { type: Number, default: 0 }
//     }
//   },
//   currentBatsman: { type: Array, default: [] },
//   currentBowler: {
//     runs: { type: Number, default: 0 },
//     balls: { type: Number, default: 0 },
//     wickets: { type: Number, default: 0 }
//   },
//   totalOvers: { type: Number, required: true }
// });

// const Match = mongoose.model('Match', matchSchema);
// export default Match;
