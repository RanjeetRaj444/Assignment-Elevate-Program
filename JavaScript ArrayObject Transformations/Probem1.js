// 🔹 Question 1: Deep Flattening of Arrays
// Problem:
// Write a function deepFlatten(arr) that accepts a deeply nested array of arbitrary 
// depth and returns a flattened array with all values at a single level.
console.log(deepFlatten([1, [2, [3, [4]], 5]]),"deepFlatten([1, [2, [3, [4]], 5]])")

function deepFlatten(arr){
    let res=[]
for(let i=0;i<arr.length;i++){
if(Array.isArray(arr[i])){
    res=res.concat(deepFlatten(arr[i]))
}else{
    res.push(arr[i])
}
}
return res
}