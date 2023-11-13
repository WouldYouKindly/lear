const range = (size, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);

const choose = (choices) => {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

const nRandom = (seq, n) => range(n).map(() => choose(seq));

const compareArrays = (a, b) => a.length === b.length && a.every((el, idx) => el === b[idx]);

const zip = (a, b) => a.map((k, i) => [k, b[i]]);

const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const downloadTemplate = async (name) => {
    const resp = await fetch(name);
    const html = await resp.text();
    return new DOMParser().parseFromString(html, 'text/html').querySelector('template');
}

// More domain-specific stuffs.
const compare = (question, answer) => {
    const numCorrect = zip(question, answer).filter(([a, b]) => a === b).length;
    const requiredForSemi = Math.ceil((question.length - 1) / 2)

    if (numCorrect == question.length){
        return "correct";
    } else if (numCorrect >= requiredForSemi) {
        return "semi-correct";
    } else {
        return "incorrect";
    }
}

export { nRandom, randomInt, range, compareArrays, zip, choose, downloadTemplate, compare }