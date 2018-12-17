import * as moment from "moment";
import { DataType } from '../types';

const finiteNum = x => !isNaN(parseFloat(x)) && isFinite(x);
const gt0 = x => parseFloat(x) > 0;

const _String: DataType<string> = {
  name: "String",
  test: _ => true,
  cast: x => x
};

const NonEmptyString: DataType<string> = {
  name: "Non-Empty String",
  test: x => x !== "",
  cast: x => x
}

const _Number: DataType<number> = {
  name: "Number",
  test: x => !isNaN(parseFloat(x)),
  cast: parseFloat
}

const FiniteNumber: DataType<number> = {
  name: "Finite Number",
  test: finiteNum,
  cast: parseFloat
}

const PositiveFiniteNumber: DataType<number> = {
  name: "Positive Finite Number",
  test: x => finiteNum(x) && gt0(x),
  cast: parseFloat
}

const Integer: DataType<number> = {
  name: "Integer",
  test: x => finiteNum(x) && (parseFloat(x) % 1 === 0),
  cast: parseFloat
}

const PositiveInteger: DataType<number> = {
  name: "Positive Integer",
  test: x => Integer.test(x) && gt0(x),
  cast: parseFloat
}

const _Date: DataType<moment.Moment> = {
  name: "Date",
  test: x => !isNaN(Date.parse(x)),
  cast: x => moment(new Date(x))
}

const _Boolean: DataType<boolean> = {
  name: "Boolean",
  test: x => (x === "true") || (x === "false"),
  cast: x => x === "true"
}


interface AllDataTypes {
  String: DataType<string>,
  NonEmptyString: DataType<string>,
  Number: DataType<number>,
  FiniteNumber: DataType<number>,
  PositiveFiniteNumber: DataType<number>,
  Integer: DataType<number>,
  PositiveInteger: DataType<number>,
  Date: DataType<moment.Moment>,
  Boolean: DataType<boolean>
}
const dataTypes: AllDataTypes = {
  String: _String,
  NonEmptyString,
  Number: _Number,
  FiniteNumber,
  PositiveFiniteNumber,
  Integer,
  PositiveInteger,
  Date: _Date,
  Boolean: _Boolean
};

export default dataTypes;
