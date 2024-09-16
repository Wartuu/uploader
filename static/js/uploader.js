document.getElementById('upload').addEventListener('click', () => {
  const text = document.getElementById('text').value;

  fetch('/api/v1/upload', {
    method: 'POST',
    body: text,
  });
});

function sendFile(content) {
  console.log(content);
}
