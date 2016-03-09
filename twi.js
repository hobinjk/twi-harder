document.getElementById('text').addEventListener('change', doTransform);
document.getElementById('text').addEventListener('keyup', doTransform);

var beginnings = ['Therefore', 'However', 'And so', 'Likewise',
                  'On the other hand', 'Thereupon', 'Indeed', 'Heretoforward',
                  'Furthermore', 'Moreover', 'Additionally', 'Nonetheless',
                  'Notwithstanding', 'All the same', 'Be that as it may'];
var verilies = ['verily', 'indubitably', 'undoubtedly', 'quite',
                'unassumedly', 'assuredly', 'indeed', 'absolutely',
                'thoroughly', 'altogether', 'entirely', 'largely', 'perfectly',
                'precisely', 'purely'];

var helpingVerbs = ['did', 'would', 'might', 'were', 'is', 'are', 'was', 'can',
  'could', 'may', 'will', 'should', 'have', 'has', 'shall', 'must', 'ought',
  'am', 'can'];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

var lastInput = '';
function doTransform() {
  var input = document.getElementById('text').value;
  if (input == lastInput) {
    return;
  }
  lastInput = input;
  var output = transform(input);
  document.getElementById('output').innerHTML = output;
}

function transform(input) {
  input = input.replace(/’/g, '\'');
  input = input.replace(/'ve /g, ' have ');
  input = input.replace(/ ain't /g, ' is not ');
  input = input.replace(/n't /g, ' not ');
  input = input.replace(/'d /g, ' would ');
  input = input.replace(/'ll /g, ' will ');
  input = input.replace(/'m /g, ' am ');
  input = input.replace(/ let's /g, ' let us ');
  input = input.replace(/'s /g, ' is ');
  input = input.replace(/'re /g, ' are ');
  var words = input.match(/\w+|[,;:.'"-]| +|\n|./g);
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
    } else if (helpingVerbs.indexOf(word) >= 0) {
      if (Math.random() > 0.4) {
        output += word;
        output += ' ';
        output += randomChoice(verilies);
      } else {
        output += randomChoice(verilies);
        output += ' ';
        output += word;
      }
    } else {
      output += word;
    }
  }
  output = output.replace(/\n/g, '<br/>');
  return output;
}

doTransform();
