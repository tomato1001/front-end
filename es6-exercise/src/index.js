import 'babel-polyfill';

const indentStr = (num, showSymbol, ...rest) => {
    var prefix = "";
    for (var i = 0; i < num; i++) {
        prefix += "  ";
    }
    var sbl = showSymbol ? "\u2714" : "";
    console.log(`${prefix} ${sbl}`, ...rest);
};

const indentWithoutSymbol = (num, ...rest) => {
    return indentStr(num, false, ...rest);
};

const indentWithSymbol = (num, ...rest) => {
  return indentStr(num, true, ...rest);
};


console.log("Arrow function");
const arrowFunc = () => {
    indentWithoutSymbol(1, "Empty arrow function");
};
arrowFunc();

// forEach used for array or set or map
console.log("forEach");
const ids = [5, 1, 2, 8, 9];
indentWithSymbol(1, "Array");
ids.forEach((v, idx, arr) => {
    indentWithoutSymbol(2, v, idx, arr);
});

console.log("Map");
var users = new Map();
users.set("name", "pw").set("age", 34);
users.forEach((v, k, o) => {
    indentWithoutSymbol(1, v, k, o);
});

// for of with map
indentWithSymbol(1, "for of")

for (var [k, v] of users) {
    indentWithoutSymbol(2, k, v)
}

// map used for array
console.log("map");
indentWithSymbol(1, "array")
const mapIds = ids.map(v => v + 1);
indentWithoutSymbol(2, mapIds);

// template string
console.log("Template string");
indentWithoutSymbol(1, `Template string ${users.get('name')}: ${users.get('age')}`);

// Destructuring
console.log("Destructuring");

var obj = {
    name: "pw",
    age: 55
};
var {
    name,
    age
} = obj; // object matching
indentWithSymbol(2, "map")
indentWithoutSymbol(3, name, age);

indentWithSymbol(2, "map with default value");
var {
    desc = "default desc"
} = obj;
indentWithoutSymbol(3, desc);

indentWithSymbol(2, "array")
var [id1 = 33, id2, ...rest] = ids;
indentWithoutSymbol(3, id1, id2, rest); // array matching


console.log("Array");
const arr = [4, 1, 2, 3];

indentWithSymbol(1, "find. return first matched");
var res = arr.find((v, i) => v > 1);
indentWithoutSymbol(2, res);

indentWithSymbol(1, "filter. return a new array of matched");
var res = arr.filter(v => v > 1);
indentWithoutSymbol(2, res);

indentWithSymbol(1, "from. return a new array");
var res = Array.from(arr, x => x + x);
indentWithoutSymbol(2, res);

indentWithSymbol(1, "of.");
var res = Array.of(1, "2", 3);
indentWithoutSymbol(2, res);

console.log("Object");
var obj = {name: "pw", age: 34};

indentWithSymbol(1, "assign");
var copyObj = Object.assign({}, obj, {name: "copy"});
indentWithoutSymbol(2, copyObj);


