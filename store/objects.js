import { v4 as uuidv4 } from 'uuid';
import {fakeRequest, getRandomNumber, parseState} from "../components/tools";

export const state = () => ({
  objects: [],
  savedObjects: [],
  chosenObject: {},
})
export const getters = {
  getObjects: (state) => {
    return state.objects
  },
  getSaveObjects: (state) => {
    return state.savedObjects
  },
  getChosenObject: (state) => {
    return state.chosenObject;
  },
}

export const mutations = {
  addObject: (state, object) => {
    state.objects.push(object);
  },
  deleteObject: (state, objToDeleteId) => {
    state.objects = state.objects.filter(object => object.name !== objToDeleteId);
  },
  setChosenObject: (state, chosenObjId) => {
    const chosen = state.objects.find(object => object.name === chosenObjId);
    state.chosenObject = chosen ? chosen : {};
  },

  addObjectFiles: (state, updatedObject) => {
    const objectToUpdate = state.objects.find(object => object.name === updatedObject.name);
    objectToUpdate.files_ids.push(updatedObject.files_ids)
  },
  deleteObjectFile: (state, object) => {
    const obj = state.objects.find(object => object.name === object.name);
    obj.files_ids = obj.files_ids.filter(file => file[0] !== object.fileId);
    console.log(obj, object.fileId);
  },
  saveObject: (state, savedObject) => {
    state.savedObjects.push(savedObject);
  },
}

