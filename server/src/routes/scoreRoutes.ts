import express, { Request, Response } from 'express';
const router = express.Router();

type ScoringActionType =
  | "newBall"
  | "endBall"
  | "normal"
  | "wide"
  | "noBall"
  | "bye"
  | "legBye"
  | "wicket"
  | "overthrow";

interface ScoreRequestBody {
  action: ScoringActionType;
  runs?: number;
  secondaryAction?: ScoringActionType;
  secondaryRuns?: number;
}

let teamStats = {
  teamA: {
    score: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
    noBalls: 0,
    wides: 0,
    byes: 0,
    legByes: 0,
  },
  teamB: {
    score: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
    noBalls: 0,
    wides: 0,
    byes: 0,
    legByes: 0,
  },
};

let currentBatsmen = [
  { name: "Batsman 1", runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false },
  { name: "Batsman 2", runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false },
];

let currentBowler = {
  name: "Bowler 1",
  overs: 0,
  balls: 0,
  runsConceded: 0,
  wickets: 0,
  maidens: 0,
};

let commentary: string[] = [];
let actionList: string[] = [];
let isNewBall = false;
let isFreeHit = false;

const scoringActions: Record<ScoringActionType, (runs?: number) => void> = {
  newBall: () => {
    isNewBall = true;
    actionList = [];
    commentary.push("A new delivery is underway.");
  },

  endBall: () => {
    if (!isNewBall) {
      throw new Error("No new ball has been delivered.");
    }
  
    const isWide = actionList.some(action => action.startsWith("wide-"));
    const isNoBall = actionList.includes("noBall");
    const isLegalDelivery = !isWide && !isNoBall;
  
    // Update balls and overs only for legal deliveries
    if (isLegalDelivery) {
      teamStats.teamA.balls += 1;
      currentBowler.balls += 1;
  
      // Update overs: If 6 legal deliveries have been bowled
      if (teamStats.teamA.balls === 6) {
        teamStats.teamA.overs += 1;  
        teamStats.teamA.balls = 0;   
        currentBowler.overs += 1;    
        currentBowler.balls = 0;     
      } else {
    
        teamStats.teamA.overs = Math.floor(teamStats.teamA.overs) + (teamStats.teamA.balls / 10);
      }
    }
  
   
    if (isLegalDelivery && !actionList.some(action => ["runs-1", "runs-2", "runs-3", "runs-4", "runs-6"].includes(action))) {
      currentBowler.maidens += 1; 
    }
  
    // Handling wide specifically
    if (isWide) {
      const wideAction = actionList.find(action => action.startsWith("wide-"));
      if (wideAction) {
        const wideRuns = parseInt(wideAction.split('-')[1]);
        teamStats.teamA.score += wideRuns;
        currentBowler.runsConceded += wideRuns;
        teamStats.teamA.wides += wideRuns;
      }
    }
  
    // Handling other scoring actions
    actionList.forEach(action => {
      if (action.startsWith("runs-")) {
        const runs = parseInt(action.split('-')[1]);
        teamStats.teamA.score += runs;
        currentBowler.runsConceded += runs;
      }
    });
  
    if (actionList.length === 0) {
      throw new Error("No valid action taken for the current ball.");
    }
  
    commentary.push(`End of the delivery. Actions performed: ${actionList.join(", ")}.`);
    isNewBall = false;
    isFreeHit = false;
    actionList = [];
  },
  normal: (runs?: number) => {
    if (runs !== undefined) {
      const batsman = currentBatsmen[0];
      batsman.runs += runs;
      batsman.balls += 1;
      teamStats.teamA.score += runs;
      currentBowler.runsConceded += runs;

      if (runs === 4) batsman.fours += 1;
      if (runs === 6) batsman.sixes += 1;

      if (runs % 2 !== 0) {
        currentBatsmen = [currentBatsmen[1], currentBatsmen[0]];
      }

      actionList.push(`runs-${runs}`);
      commentary.push(`${batsman.name} scores ${runs} run${runs > 1 ? "s" : ""}.`);
    }
  },
  wide: (runs?: number) => {
    const extraRuns = runs || 0;
    const totalRuns = extraRuns + 1; 
    actionList.push(`wide-${totalRuns}`);
    commentary.push(`Wide ball! ${totalRuns} run${totalRuns > 1 ? 's are' : ' is'} added to the total.`);

  },

  noBall: (runs?: number) => {
    teamStats.teamA.score += 1;
    currentBowler.runsConceded += 1;
    teamStats.teamA.noBalls += 1;
    isFreeHit = true;

    if (runs !== undefined) {
      teamStats.teamA.score += runs;
      currentBowler.runsConceded += runs;
      currentBatsmen[0].runs += runs;
      currentBatsmen[0].balls += 1;
    }

    actionList.push(`noBall-${runs || 0}`);
    commentary.push(`No Ball! ${1 + (runs || 0)} run${1 + (runs || 0) > 1 ? "s are" : " is"} awarded, and a free hit follows.`);
  },

  bye: (runs?: number) => {
    if (runs !== undefined) {
      teamStats.teamA.score += runs;
      teamStats.teamA.byes += runs;
      currentBatsmen[0].balls += 1;

      if (runs % 2 !== 0) {
        currentBatsmen = [currentBatsmen[1], currentBatsmen[0]];
      }

      actionList.push(`bye-${runs}`);
      commentary.push(`${runs} bye${runs > 1 ? "s are" : " is"} taken.`);
    }
  },

  legBye: (runs?: number) => {
    if (runs !== undefined) {
      teamStats.teamA.score += runs;
      teamStats.teamA.legByes += runs;
      currentBatsmen[0].balls += 1;

      if (runs % 2 !== 0) {
        currentBatsmen = [currentBatsmen[1], currentBatsmen[0]];
      }

      actionList.push(`legBye-${runs}`);
      commentary.push(`${runs} leg bye${runs > 1 ? "s are" : " is"} taken.`);
    }
  },

  wicket: () => {
    if (!isFreeHit) {
      teamStats.teamA.wickets += 1;
      currentBowler.wickets += 1;
      currentBatsmen[0].balls += 1;

      currentBatsmen[0].isOut = true;
      commentary.push(`${currentBatsmen[0].name} is dismissed.`);

      currentBatsmen.shift();
      currentBatsmen.push({
        name: `Batsman ${teamStats.teamA.wickets + 2}`,
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        isOut: false,
      });
    } else {
      commentary.push("Batsman dismissed on a free hit! No wicket falls.");
    }
    actionList.push("wicket");
  },

  overthrow: (runs?: number) => {
    if (runs !== undefined) {
      teamStats.teamA.score += runs;
      currentBowler.runsConceded += runs;
      currentBatsmen[0].runs += runs;
      actionList.push(`overthrow-${runs}`);
      commentary.push(`Overthrow! ${runs} additional run${runs > 1 ? "s are" : " is"} added to the total.`);
    }
  },
};


//function to handle complex scenarios
const handleComplexScenario = (primaryAction: ScoringActionType, secondaryAction: ScoringActionType, primaryRuns?: number, secondaryRuns?: number) => {
  if (primaryAction === "noBall") {
    if (secondaryAction === "bye" || secondaryAction === "legBye") {
      teamStats.teamA.score += 1 + (secondaryRuns || 0);
      currentBowler.runsConceded += 1;
      currentBatsmen[0].balls += 1;
      teamStats.teamA.noBalls += 1;
      
      if (secondaryAction === "bye") {
        teamStats.teamA.byes += secondaryRuns || 0;
      } else {
        teamStats.teamA.legByes += secondaryRuns || 0;
      }

      commentary.push(`No Ball + ${secondaryAction}! ${1 + (secondaryRuns || 0)} runs added to the score.`);
    }
  } else if ((primaryAction === "bye" || primaryAction === "legBye") && secondaryAction === "overthrow") {
    const totalRuns = (primaryRuns || 0) + (secondaryRuns || 0);
    teamStats.teamA.score += totalRuns;
    currentBatsmen[0].balls += 1;
    
    if (primaryAction === "bye") {
      teamStats.teamA.byes += totalRuns;
    } else {
      teamStats.teamA.legByes += totalRuns;
    }

    commentary.push(`${primaryAction} + Overthrow! ${totalRuns} runs added to the score as ${primaryAction}.`);
  }

  if ((primaryRuns || 0) + (secondaryRuns || 0) % 2 !== 0) {
    currentBatsmen = [currentBatsmen[1], currentBatsmen[0]];
  }
};

router.get("/", (req: Request, res: Response) => {
  try {
   
    return res.json({
      success: true,
      teamStats,
      currentBatsmen,
      currentBowler,
      commentary,
      isNewBall,
      isFreeHit,
    });
  } catch (error) {
    console.error('Error fetching game state:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch game state.' });
  }
});

router.post("/", (req: Request, res: Response) => {
  const { action, runs, secondaryAction, secondaryRuns } = req.body as ScoreRequestBody;

  console.log("Action received:", action, "Runs:", runs, "Secondary Action:", secondaryAction, "Secondary Runs:", secondaryRuns);

  if (!action) {
    return res.status(400).json({ success: false, message: "Action is required." });
  }

  try {
    if (action === "newBall") {
      scoringActions.newBall();
    } else if (!isNewBall) {
      throw new Error("No new ball has been bowled.");
    } else if (action === "endBall") {
      if (actionList.length === 0) {
        throw new Error("No valid actions taken for the current ball.");
      }
      scoringActions.endBall();
    } else if (secondaryAction) {
      handleComplexScenario(action, secondaryAction, runs, secondaryRuns);
    } else {
      scoringActions[action](runs);
    }


    return res.json({
      success: true,
      teamStats,
      currentBatsmen,
      currentBowler,
      commentary,
      isNewBall,
      isFreeHit,
    });
  } catch (error) {
    console.error('Error processing action:', error);
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
});

export default router;