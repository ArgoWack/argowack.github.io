// Define an array of image URLs
const imageUrls = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  'image4.jpg',
  'image5.jpg',
  'image6.jpg',
  'image7.jpg',
  'image8.jpg',
  'image9.jpg',
];

// Shuffle the array of image URLs
const shuffledImageUrls = imageUrls.sort(() => Math.random() - 0.5);

// Set the background images of the puzzle pieces
const puzzlePieces = document.querySelectorAll('.puzzle-piece');
for (let i = 0; i < puzzlePieces.length; i++) {
  puzzlePieces[i].style.backgroundImage = `url(${shuffledImageUrls[i]})`;
  puzzlePieces[i].setAttribute('draggable', 'true');
  puzzlePieces[i].addEventListener('dragstart', handleDragStart);
  puzzlePieces[i].addEventListener('dragover', handleDragOver);
  puzzlePieces[i].addEventListener('drop', handleDrop);
}

// Define a function to check if the puzzle is solved

// Except it's the only part that doesn't work as intended. Currently is compares position of images relative to the starting positions after shuffle
// instead of the order from imageUrls. 
function isPuzzleSolved() {
  const pieces = document.querySelectorAll('.puzzle-piece');
  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].id !== `piece-${i + 1}`) {
      return false;
    }
  }
  return true;
}

// Define a function to handle drag start event
function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  event.dataTransfer.effectAllowed = 'move';
}

// Define a function to handle drag over event
function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

// Define a function to handle drop event
function handleDrop(event) {
  event.preventDefault();
  const source = document.getElementById(event.dataTransfer.getData('text'));
  const target = event.target;
  if (source !== target && source.parentNode === target.parentNode) {
    const tempId = source.id;
    source.id = target.id;
    target.id = tempId;
    const tempBackgroundImage = source.style.backgroundImage;
    source.style.backgroundImage = target.style.backgroundImage;
    target.style.backgroundImage = tempBackgroundImage;
  }
  if (isPuzzleSolved()) {
    alert('Congratulations, you solved the puzzle!');
  }
}

// Define a function to reset the puzzle
function resetPuzzle() {
  // Shuffle the array of image URLs
  const shuffledImageUrls = imageUrls.sort(() => Math.random() - 0.5);

  // Set the background images of the puzzle pieces
  const puzzlePieces = document.querySelectorAll('.puzzle-piece');
  for (let i = 0; i < puzzlePieces.length; i++) {
    puzzlePieces[i].style.backgroundImage = `url(${shuffledImageUrls[i]})`;
    puzzlePieces[i].id = `piece-${i + 1}`;
  }

  // Set the empty piece to its initial position
  const empty = document.getElementById('empty');
  empty.id = 'piece-9';
}

// Add an event listener to the reset button
const resetButton = document.getElementById('reset-btn');
resetButton.addEventListener('click', resetPuzzle);
