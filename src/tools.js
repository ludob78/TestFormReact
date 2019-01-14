//* compare type, value & array of 2 objects
//! don't check value in deep subarray
const isEqual = function (value, other) {

	// Get the value type
	var type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// Compare the length of the length of the two items
	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	// Compare two items
	var compare = function (item1, item2) {

		// Get the object type
		var itemType = Object.prototype.toString.call(item1);

		// If an object or array, compare recursively
		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
			if (!isEqual(item1, item2)) return false;
		}

		// Otherwise, do a simple comparison
		else {

			// If the two items are not the same type, return false
			if (itemType !== Object.prototype.toString.call(item2)) return false;

			// Else if it's a function, convert to a string and compare
			// Otherwise, just compare
			if (itemType === '[object Function]') {
				if (item1.toString() !== item2.toString()) return false;
			} else {
				if (item1 !== item2) return false;
			}

		}
	};

	// Compare properties
	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	// If nothing failed, return true
	return true;

};
//! flat is experimental & define property flat on array is read only
//* to reduce deep array ex: [["a"],["b"],[["c"]]]=>["a","b",["c"]]
const myFlat = (ToFlat, depth = 1) => {
	return ToFlat.reduce((acc, currentValue) => {
		return acc.concat((Array.isArray(currentValue) && (depth - 1)) ? currentValue.flat(depth - 1) : currentValue);
	}, [])
}
//* Get a random item from an array */
const randomGetItem = (items) => {
	return items[Math.floor(Math.random() * items.length)]
}
//* Get a random number in a specific range */
const randomGetInRange = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//* Generate an array of numbers with numbers from 0 to max */ ex:numbers = [1,2,3 ... 100] 
const generateArray = (maxLength) => {
	var numbersArray = [],
		max = maxLength;
	for (var i = 1; numbersArray.push(i++) < max;);
	return numbersArray
}
//* Shuffle an array of numbers */
const shuffleArray = (arrayToShuffle) => {
	return arrayToShuffle.sort(function () {
		return Math.random() - 0.5
	})
}
//*Merge multiple Array */
const mergeArrays = (array1, array2) => {
	return Array.prototype.push.apply(array1, array2);
}
//* empty array */
const emptyArray = (array) => {
	array.splice(0, array.length)
}
//* Remove elt of array */
const removeFromArray=(elt,array)=>{
	let indexToElt=array.indexOf(elt)
	array.splice(indexToElt,1)
}
//*Move Down value in array */
const moveDownInArray = (toMove, currentArray) => {
	let newArray = currentArray.sort().slice();
	let i = newArray.indexOf(toMove);
	if (i < newArray.length - 1) {
		//get elt to move
		let removedValue = newArray.splice(i, 1);
		// add elt to his new place
		newArray.splice(i + 1, 0, removedValue[0]);
		return newArray
	}
	return newArray
}
//*Move UP value in array */
const moveUpInArray=(toMove, currentArray)=>{
	let newArray = currentArray.sort().slice();
	let i = newArray.indexOf(toMove);
	if (i > 0) {
		//get elt to move
		let removedValue = newArray.splice(i, 1);
		// add elt to his new place
		newArray.splice(i - 1, 0, removedValue[0]);
		return newArray
	}
	return newArray
}
export {
	isEqual,
	myFlat,
	randomGetItem,
	randomGetInRange,
	generateArray,
	shuffleArray,
	mergeArrays,
	emptyArray,
	moveUpInArray,
	moveDownInArray,
	removeFromArray,
}