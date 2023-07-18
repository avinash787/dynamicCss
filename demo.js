document.getElementById("body").innerHTML="hgsdjwh";
fetch('demo.css')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch CSS file');
    }
    return response.text();
  })
  .then(cssText => {
    console.log(cssText); // Outputs the CSS content as text
  })
  .catch(error => {
    console.error('Error fetching CSS file:', error);
  });



