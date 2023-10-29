const range = (size, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);

const choose = (choices) => {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

const nRandom = (seq, n) => range(n).map(() => choose(seq));

const compareArrays = (a, b) => a.length === b.length && a.every((el, idx) => el === b[idx]);

const zip = (a, b) => a.map((k, i) => [k, b[i]]);


export { nRandom, range, compareArrays, zip }