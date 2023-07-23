let style = fetch('styles.css')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch CSS file');
    }
    return response.text();
  })
  .then(cssText => {
    return cssText; // Outputs the CSS content as text
  })
  .catch(error => {
    console.error('Error fetching CSS file:', error);
});

// regex

let matchRoot = /:root\s*{([^}]*)}/gmi
let wholevalue = /.*{([^}]*)}\s*=\s*([^\n]*\S)/gmi
//make style tag dynamically 

 function StyleSheet(name = 'dynamic-styleSheet') {
  this.styleSheet = this.getStyleSheet(name);
}

StyleSheet.prototype.getStyleSheet = function (name) {
  if (!document.getElementById(name)) {
    const style = document.createElement('style');
    style.title = name;
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  let styleSheet = null;
  for (let i = 0; i < document.styleSheets.length; i++) {
    styleSheet = document.styleSheets[i];
    if (styleSheet.title === name) {
      break;
    }
  }
  return styleSheet;
};

StyleSheet.prototype.insertRule = function (css, index) {
  return this.styleSheet.insertRule(css, index);
};

StyleSheet.prototype.deleteRule = function (index) {
  this.styleSheet.deleteRule(index);
};

console.log(document.styleSheets)
console.log(style)
