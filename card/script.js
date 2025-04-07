const card = document.querySelector('.card');

let isDragging = false;
let startX, startY;
let initialRotateY = 0, initialRotateX = 0;

// Desactivar interacción durante animación inicial
card.style.pointerEvents = 'none';

setTimeout(() => {
  card.style.pointerEvents = 'auto';
}, 1500);

// Obtener rotación actual
function getCurrentRotation(element) {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrix(style.transform);
  return {
    rotateY: Math.atan2(matrix.m21, matrix.m22) * (180/Math.PI),
    rotateX: Math.atan2(matrix.m13, matrix.m33) * (180/Math.PI)
  };
}

// Eventos mouse
card.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  const rotation = getCurrentRotation(card);
  initialRotateY = rotation.rotateY;
  initialRotateX = rotation.rotateX;
});

card.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  
  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;
  
  const rotateY = initialRotateY + deltaX * 0.5;
  const rotateX = initialRotateX - deltaY * 0.5;
  
  card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
});

['mouseup', 'mouseleave'].forEach(event => {
  card.addEventListener(event, () => isDragging = false);
});

// Eventos touch
card.addEventListener('touchstart', (e) => {
  e.preventDefault();
  isDragging = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  const rotation = getCurrentRotation(card);
  initialRotateY = rotation.rotateY;
  initialRotateX = rotation.rotateX;
});

card.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  
  const deltaX = e.touches[0].clientX - startX;
  const deltaY = e.touches[0].clientY - startY;
  
  const rotateY = initialRotateY + deltaX * 0.5;
  const rotateX = initialRotateX - deltaY * 0.5;
  
  card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
});

card.addEventListener('touchend', () => isDragging = false);


