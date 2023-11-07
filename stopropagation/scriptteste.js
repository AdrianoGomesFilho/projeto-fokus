const parent = document.getElementById('parent');
const child = document.getElementById('child');

child.addEventListener('click', (event) => {
  alert('Child button clicked!');
//   event.stopPropagation(); // Stops the event from propagating further
});

parent.addEventListener('click', () => {
  alert('Parent div clicked!');
});
