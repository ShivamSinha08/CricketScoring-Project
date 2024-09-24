// import express, { Request, Response } from 'express';
// import Player from '../models/Player';
// import Team from '../models/Team';

// const router = express.Router();  


// router.post('/', async (req: Request, res: Response) => {
//   try {
//     const teamExists = await Team.findById(req.body.team);
//     if (!teamExists) {
//       return res.status(400).json({ error: 'Team does not exist' });
//     }

//     const newPlayer = new Player(req.body);
//     const savedPlayer = await newPlayer.save();
//     res.status(201).json(savedPlayer);
//   } catch (err: any) { 
//     res.status(500).json({ error: 'Failed to create player', details: err.message });
//   }
// });

// router.get('/', async (req: Request, res: Response) => {
//   try {
//     const players = await Player.find();
//     res.status(200).json(players);
//   } catch (err: any) { 
//     res.status(500).json({ error: 'Failed to fetch players', details: err.message });
//   }
// });


// router.put('/:id', async (req: Request, res: Response) => {
//   try {
//     const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updatedPlayer);
//   } catch (err: any) { 
//     res.status(500).json({ error: 'Failed to update player', details: err.message });
//   }
// });


// router.delete('/:id', async (req: Request, res: Response) => {
//   try {
//     const player = await Player.findByIdAndDelete(req.params.id);
//     if (!player) {
//       return res.status(404).json({ error: 'Player not found' });
//     }
//     res.json({ message: 'Player deleted successfully' });
//   } catch (err: any) { 
//     res.status(500).json({ error: 'Failed to delete player', details: err.message });
//   }
// });

// export default router;
