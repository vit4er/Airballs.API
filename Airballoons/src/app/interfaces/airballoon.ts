import {Color} from './color';

export interface Airballoon {
  id: number;
  name: string;
  description: string;
  colorCode: string;
  price: number;
  quantity: number;
}

export interface AirballoonListItem {
  id: number;
  name: string;
  description: string;
  colorCode: string;
  color: Color;
  price: number;
  quantity: number;
}
