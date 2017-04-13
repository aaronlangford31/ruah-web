import { fromJS } from 'immutable';
import {
  UPDATE_INVENTORY,
  UPDATE_INVENTORY_SUCCESS,
  UPDATE_INVENTORY_ERROR,
} from './constants';

export function updateInventory(payload) {
  return {
    type: UPDATE_INVENTORY,
    payload: fromJS(payload),
  };
}

export function updateInventorySuccess() {
  return {
    type: UPDATE_INVENTORY_SUCCESS,
  };
}

export function updateInventoryError(error) {
  return {
    type: UPDATE_INVENTORY_ERROR,
    payload: fromJS({ error }),
  };
}
