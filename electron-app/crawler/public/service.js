const {ipcMain} = require('electron')

ipcMain.on("asyncMsg", (event, arg) => {
  console.log(arg)
  event.sender.send("asyncMsg-reply", "pong")
})

ipcMain.on('syncMsg', (event, arg) => {
  console.log(arg)
  event.returnValue = 'pong'
});
