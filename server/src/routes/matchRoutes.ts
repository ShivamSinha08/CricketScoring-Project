// import express from 'express';
// import Match from '../models/Match';

// const router = express.Router();


// router.post('/', async (req, res) => {
//     try {
//       const newMatch = new Match(req.body);
//       const savedMatch = await newMatch.save();
//       res.status(201).json(savedMatch);
//     } catch (err) {
//       const error = err as Error; 
//       console.error("Error while creating match:", error.message);
//       res.status(500).json({ error: 'Failed to create match', details: error.message });
//     }
//   });
  
  

// router.get('/', async (req, res) => {
//   try {
//     const matches = await Match.find();
//     res.status(200).json(matches);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch matches' });
//   }
// });

// router.put('/:id', async (req, res) => {
//   try {
//     const updatedMatch = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updatedMatch);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update match' });
//   }
// });

// export default router;
