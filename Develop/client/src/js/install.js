const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  const deferredPrompt = event;

  butInstall.style.display = 'block';

  butInstall.addEventListener('click', async () => {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User choice: ${outcome}`);
    deferredPrompt = null;
    butInstall.style.display = 'none';
  });
});

window.addEventListener('appinstalled', (event) => {
  console.log('App installed successfully');
});
