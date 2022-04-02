import { v4 as uuidv4 } from 'uuid';


export function delay(ms, data) {
  return new Promise((resolve, reject) => {
    setTimeout (resolve, ms, data);
  });
}

export function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export function fakeFilesUpload(files, uploadLimit, handleUpload, handleUploadAll) {
  let i = files.length;
  const filesToUpload = files.splice(0, uploadLimit);
  const queue = [...files];

  uploadAsync(filesToUpload, queue);

  function uploadAsync(filesToUpload, queue) {
    filesToUpload.forEach(async (file) => {
      const res = await delay(getRandomNumber(1, 5) * 1000, generateUUIDs(Math.round(getRandomNumber(1, 5))));
      if (queue.length)
        uploadAsync(queue.splice(0,1), queue);
      handleUpload(file, res);
      i--;
      if (!i)
        handleUploadAll();
    });
  }

}

// function uploadAsync(filesToUpload, queue) {
//   filesToUpload.forEach(async (file) => {
//     const res = await delay(getRandomNumber(1, 5), generateUUIDs(getRandomNumber(1, 5) * 1000));
//     if (queue.length)
//       uploadAsync(queue.splice(0,1), queue, cb, i);
//     console.log(res);
//     i--;
//     console.log(i)
//     if (!i)
//       cb()
//   });
// }

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

// function uploadAsync(filesToUpload, queue, uploadLimit, cb, i) {
//   for (let j = 0; j < uploadLimit; j++) {
//     delay(filesToUpload[i]).then((res) => {
//       console.log(res);
//       if (queue.length)
//         uploadAsync(queue.splice(0, 1), queue, 1);
//       i--;
//       if (!i)
//         cb()
//     });
//   }
// }


export function fakeRequest (data, response) {
  console.log('requestBody: ', data);
  return new Promise((resolve, reject) => {
    setTimeout (resolve, getRandomNumber(1, 5) * 1000, response);
  });
}
