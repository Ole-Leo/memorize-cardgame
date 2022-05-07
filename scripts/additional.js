function shuffleCards(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

function generatePairCards(...arguments) {
  const newArr = [...arguments];
  return shuffleCards(newArr.flat(Infinity));
}

function equalArrays(arr1, arr2) {
  if (arr1.length != arr2.length) {
    return;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return;
    }
  }
  setTimeout(() => {
    alert('Win');
  }, 250);
}
