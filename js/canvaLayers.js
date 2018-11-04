var concreteContainer = document.getElementById("editor");

// create wrapper
var viewport = new Concrete.Viewport({
  width: 500,
  height: 500,
  container: concreteContainer
});

document.getElementById("destroy").addEventListener("click", function() {
  var circle = getSelectedCircle();

  if (circle) {
    circle.layer.destroy();
    viewport.render();
  }
});

document.getElementById("download").addEventListener("click", function() {
  alert("Hello");
  this.href = canvas.toDataURL({
    format: "png",
    quality: 0.8
  });
  this.download = "canvas.png";
});
