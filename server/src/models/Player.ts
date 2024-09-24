// import mongoose, { Schema, Document } from 'mongoose';

// export interface IPlayer extends Document {
//   name: string;
//   role: string; 
//   team: mongoose.Schema.Types.ObjectId; 
//   runs: number;
//   wickets: number;
//   overs: number;
//   matchesPlayed: number;
// }

// const PlayerSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   role: { type: String, enum: ['batsman', 'bowler', 'allrounder'], required: true },
//   team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
//   runs: { type: Number, default: 0 },
//   wickets: { type: Number, default: 0 },
//   overs: { type: Number, default: 0 },
//   matchesPlayed: { type: Number, default: 0 },
// });

// export default mongoose.model<IPlayer>('Player', PlayerSchema);
