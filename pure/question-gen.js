import { range, choose, randomInt } from './utils.js';

// Notes in the vocal range of the user.
const notes = ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"];

const bbb = [
    ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"],
    ["E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"],
]


var idx = 0;
const debugPickRange = () => {
    let res;
    if (idx === 0) {
       console.log('Using octaves 3-4');
       res = bbb[0];
       idx = 1
    } else {
       console.log('Using octaves 4-5');
       res = bbb[1];
       idx = 0;
    }
    return res;
}

const pickRange = () => {
     // Ensure that after the first note there are 7 more in the vocal range of the user.
     const firstIdx = randomInt(0, notes.length - 8);
     return notes.slice(firstIdx, firstIdx + 8);
}

const generateQuestion = (length) => {
    const allowed = pickRange()

    let choice = choose(allowed);
    const result = [choice];
    for (let _ of range(length - 1)) {
        // We increase the probability of choosing smaller intervals by duplicating them in the population.
        let choiceIdx = allowed.indexOf(choice);
        let threeBefore = allowed.slice(choiceIdx - 3, choiceIdx);
        let threeAfter = allowed.slice(choiceIdx + 1, choiceIdx + 4);
        choice = choose([...threeBefore, ...threeAfter, ...allowed]);
        result.push(choice);
    }

    return [allowed, result];
}

export { generateQuestion }
