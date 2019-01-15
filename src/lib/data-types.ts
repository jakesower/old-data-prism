import * as moment from "moment";
import { Ok, Err, Either } from "./monads/either";

interface BaseDataType<T> {
  name: string,
  test: (s: string) => boolean,
  cast: (s: string) => T,
  testCast?: (s: string) => Either<string,T>,
  mapTestCast?: (ss: string[]) => Either<string,T[]>,
}

export interface DataType<T> extends BaseDataType<T> {
  testCast: (s: string) => Either<string,T>,
  mapTestCast: (ss: string[]) => Either<string,T[]>,
}

const defMeths = {
  testCast: function <T>(this: BaseDataType<T>, s: string): Either<string,T> {
    return this.test(s) ? Ok(this.cast(s)) : Err("invalid data type");
  },
  mapTestCast: function <T>(this: BaseDataType<T>, ss: string[]): Either<string,T[]> {
    const l = ss.length;
    const out = <T[]>[];
    for (let i=0; i<l; i+=1) {
      const s = ss[i];
      if (!this.test(s)) {
        return Err("one or more invalid data types");
      }
      out[i] = this.cast(s);
    }
    return Ok(out);
  },
};


const withDefaults = <T>(x: BaseDataType<T>): DataType<T> => Object.assign({}, defMeths, x);


const finiteNum = x => !isNaN(parseFloat(x)) && isFinite(x);
const gt0 = x => parseFloat(x) > 0;

const _String: DataType<string> = withDefaults({
  name: "String",
  test: _ => true,
  cast: x => x,
  testCast: x => Ok(x),
  mapTestCast: xs => Ok(xs),
});

const NonEmptyString: DataType<string> = withDefaults({
  name: "Non-Empty String",
  test: x => x !== "",
  cast: x => x,
  testCast: x => x === "" ? Err("String must be empty") : Ok(x),
});

const _Number: DataType<number> = withDefaults({
  name: "Number",
  test: x => !isNaN(parseFloat(x)),
  cast: parseFloat,
  testCast: x => this.test ? Ok(this.cast(x)) : Err("must be numeric"),
});

const FiniteNumber: DataType<number> = withDefaults({
  name: "Finite Number",
  test: finiteNum,
  cast: parseFloat,
  testCast: x => this.test ? Ok(this.cast(x)) : Err("must be a finite number"),
});

const PositiveFiniteNumber: DataType<number> = withDefaults({
  name: "Positive Finite Number",
  test: x => finiteNum(x) && gt0(x),
  cast: parseFloat
});

const Integer: DataType<number> = withDefaults({
  name: "Integer",
  test: x => finiteNum(x) && (parseFloat(x) % 1 === 0),
  cast: parseFloat
});

const PositiveInteger: DataType<number> = withDefaults({
  name: "Positive Integer",
  test: x => Integer.test(x) && gt0(x),
  cast: parseFloat
});

const _Date: DataType<moment.Moment> = withDefaults({
  name: "Date",
  test: x => !isNaN(Date.parse(x)),
  cast: x => moment(new Date(x))
});

const _Boolean: DataType<boolean> = withDefaults({
  name: "Boolean",
  test: x => (x === "true") || (x === "false"),
  cast: x => x === "true"
});


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
