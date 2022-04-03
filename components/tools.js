import { v4 as uuidv4 } from 'uuid';

export function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export function generateUUIDs(amount) {
  const ids = [uuidv4()];
  for (let i = 0; i < amount; i++) {
    ids.push(uuidv4());
  }
  return ids;
}

export function parseState(state) {
  return JSON.parse(JSON.stringify(state))
}

export function fakeRequest (data, response) {
  console.log('requestBody: ', data);
  return new Promise((resolve, reject) => {
    setTimeout (resolve, getRandomNumber(1, 5) * 1000, response);
  });
}
