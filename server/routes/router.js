
Main.on('create-user', (event, userData) => {
    const newUser = new User(userData);
    newUser.save()
      .then(() => {
        event.reply('user-created', { success: true });
      })
      .catch((error) => {
        event.reply('user-created', { success: false, error: error.message });
      });
  });
  