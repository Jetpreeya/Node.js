'use strict';

// TODO: Write the homework code in this file
var fs = require('fs');

var args = process.argv.slice(2);
if (args.length === 0) {
  showHelp();
}
else {
  switch (args[0]) {
    case 'help':
      showHelp();
      break;

    case 'list':
      showList();
      break;

    case 'add':
      var item = args.slice(1).join(' ');
      addItem(item);
      break;

    default:
      console.error('Unknow command:' + args[0] + '. Type "node . help" for info.');
      break;
  }
}

console.log(args);

function showHelp() {
  fs.readFile(__dirname +'/help.txt', 'utf-8', function(error, data) {
    if (error == null) {
      console.log(data);
    }
    else {
      console.error('Error reading help');
    }
  });
}

function showList() {
  fs.readFile(__dirname + '/todo.txt', 'utf8', function(error, data) {
    if (error == null) {
      data = data.slice(0, data.length - 1);
      var items = data.split(/\n/);
      console.log('To-do items:');
      for (var i = 0; i < items.length; i++) {
        console.log('Item' + (i + 1) + ': ' + items[i]);
      }
      console.log(items);
    }
    else if (error.code == 'ENOENT') {
      console.log('The to do list is empty');
    }
    else {
      console.error('Error reading to do list');
    }
  });
}

function addItem(item) {
  fs.appendFile(__dirname + '/todo.txt', item + '\n');
}
