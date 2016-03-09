document.getElementById('text').addEventListener('change', doTransform);
document.getElementById('text').addEventListener('keyup', doTransform);

var beginnings = ['Therefore', 'However', 'And so', 'Likewise',
                  'On the other hand', 'Thereupon', 'Indeed', 'Heretoforward'];
var verilies = ['verily', 'indubitably', 'undoubtedly', 'quite', 'very',
                'unassumedly', 'assuredly'];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function doTransform() {
  var input = document.getElementById('text').value;
  var output = transform(input);
  document.getElementById('output').innerHTML = output;
}

function transform(input) {
  var words = input.match(/\w+|[,;:.'"-]| +|\n/g);
  var output = '';
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    if (word === ' ') {
      output += word;
    } else if (word === '.') {
      output += word;
      if (i < words.length - 3) {
        output += ' ';
        output += randomChoice(beginnings);
        output += ',';
        i++;
        output += words[i];
        i++;
        if (words[i] !== 'I') {
          output += words[i].toLowerCase();
        } else {
          output += words[i];
        }
      }
    } else if (word === ',') {
      output += '&mdash;';
      if (words[i + 1] === ' ') {
        i++;
      }
    } else if (word.substr(word.length - 2) === 'ed') {
      output += randomChoice(verilies);
      output += ' ' + word;
    } else {
      output += word;
    }
  }
  return output;
}

doTransform();
