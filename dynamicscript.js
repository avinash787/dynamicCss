
    // Step 1: Define the CustomElement class that extends HTMLElement
    class CustomElement extends HTMLElement {
      constructor() {
        super();

        // Your custom element's initialization and setup can be done here.
        // For example, setting up shadow DOM, attaching event listeners, etc.
      }
    }
    //hello3
    // Step 2: Define the function to create custom elements with a specific name
    function createCustomElement(tag) {
      // Check if the tag is a valid HTML tag
      //console.log(tag)
      const isValidTag = document.createElement(tag).toString() !== '[object HTMLUnknownElement]';
      if (isValidTag) {
        return document.createElement(tag);
      } else {
        // If the tag is not a valid HTML tag, create a custom element with the specified tag name
        class CustomTagElement extends CustomElement {}
        customElements.define(tag, CustomTagElement);
        return new CustomTagElement();
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      const SimpleHTMLGenerator = {
        parseInput(statement, targetElement) {
          input = statement.replace(/\{(.+?)\}/sg,'')
          const matchStyles = statement.match(/\{(.+?)\}/s)
          input.replace(/\{(.+?)\}/sg,'')
      const regex = /([^>\[]+)(?:>([^=\[]+))?(?:\[(.+?)\])?(?:\{(.+?)\})?(?:=(.+))?\s*=\s*(.*)/s;
      const match = input.match(regex);
      ;
     
     
      if (!match) {
        throw new Error('Invalid input format');
      }

      const parts = input.replace(/\[.+\]|\{.+\}/g,'').split('=');
      const tagContent = parts[0].trim();
      const tag = match[1].trim();
      const content = match[2] ? match[2].trim() : '';
      const attributes = match[3] ? match[3].replace(/(\]\[)/,'|').split("|") : '';;
      const value = match[6] ? match[6].trim() : '';
      const style = matchStyles ? matchStyles[1]: '';

      const attributeValue = {};
      if (attributes) {
        for (const pair of attributes) {
          const [key, val] = pair.split('=');
          if (key && val) {
            attributeValue[key.trim()] = val.trim().replace(/\\=/g, '=').replace(/\"/g,'');
          }
        }
      }

      //console.log({ tag, content, attributes: attributeValue, value, tagContent, style })

      return { tag, content, attributes: attributeValue, value, tagContent, style };
    },

        generateAndAppendElement(parsedInput, parent) {
  const { tagContent, value, attributes, style } = parsedInput;
  console.log(tagContent,value)
  if(tagContent == 'body'){
    const textNode = document.createTextNode(value);
    document.body.appendChild(textNode);
    return
  }
  const parts = tagContent.split('>');
  const tag = parts.pop().trim();

  const element = createCustomElement(tag);

  // Set text content or 'value' attribute if provided
  if (value) {
    element.textContent = value;
  }

  // Apply attributes
  if (attributes && Object.keys(attributes).length > 0) {
    for (const [key, val] of Object.entries(attributes)) {
      element.setAttribute(key, val);
    }
  }

  // Apply styles
   if (style) {
    const stylePairs = style.split(';');
    for (const stylePair of stylePairs) {
      const [property, propertyValue] = stylePair.split(':');
      if (property && propertyValue) {
        element.style[property.trim()] = propertyValue.trim();
      }
    }
  }

  if (parts.length > 0) {
    const parentTag = parts.join('>');
    const existingParent = this.findExistingParent(parent, parentTag);
    if (existingParent) {
      existingParent.appendChild(element);
    } else {
      const parentElement = this.generateAndAppendElement(
        { tagContent: parentTag },
        parent
      );
      parentElement.appendChild(element);
    }
  } else {
    parent.appendChild(element);
  }
  return element;
}
,

        findExistingParent(parent, tag) {

          const children = parent.children;
          for (let i = 0; i < children.length; i++) {
            if (children[i].tagName.toLowerCase() === tag.toLowerCase()) {
              return children[i];
            }
          }
          return null;
        },

        parseAndGenerate(input, targetElement) {
          const parsedInput = this.parseInput(input,targetElement);
          const target = document.querySelector(targetElement);
          this.generateAndAppendElement(parsedInput, target);
        },
      };


let style = fetch('styles.dcss')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch DCSS file');
    }
    return response.text();
  })
  .then(cssText => {
    let val = cssText
    let matchRoot = /:root\s*{([^}]*)}/gmi
let matchRules = val.match(/(.*({([^}]*)})?\s*=\s*([^\n]*\S))/g)

for (let x = 0 ; x < matchRules.length; x++){
let parent = matchRules[x].match(/(.*)>{2}/)
let target = parent == null ? "html" : parent[1]
let input = matchRules[x].replace(/(.*)>{2}/,'')
  SimpleHTMLGenerator.parseAndGenerate( input, target);
  
}

  })
  .catch(error => {
    console.error('Error fetching DCSS file:', error);
});
 







 
    });

