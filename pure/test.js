import { generateQuestion } from './question-gen';


test('Gives a question of the asked length', () => {
    expect(generateQuestion(4).length).toBe(4);
});