// Define
var backimgurl = "";
var canvas = new fabric.Canvas("editor");

// Define an array with all fonts
var fonts = ["Pacifico", "VT323", "Quicksand", "Inconsolata"];
fonts.unshift("Times New Roman");

var select = document.getElementById("fontFamily");
fonts.forEach(function(font) {
  var option = document.createElement("option");
  option.innerHTML = font;
  option.value = font;
  select.appendChild(option);
});

//Insert and display image
function readURL(input) {
  if (input.files && input.files[0]) {
    // alert("fileselected");
    var reader = new FileReader();

    reader.onload = function(e) {
      backimgurl = e.target.result;
      fabric.Image.fromURL(e.target.result, function(img) {
        canvas.add(img);
      });
    };

    reader.readAsDataURL(input.files[0]);
  }
}

var rect = new fabric.Rect({ width: 100, height: 50, fill: "green" });
rect.on("selected", function() {
  console.log("selected a rectangle");
});

//Set Image as BAckground
function saveasBack() {
  canvas.setBackgroundImage(backimgurl, canvas.renderAll.bind(canvas), {
    // Optionally add an opacity lvl to the image
    backgroundImageOpacity: 0.5,
    // should the image be resized to fit the container?
    backgroundImageStretch: true
  });
}
function addText() {
  var iTextSample = new fabric.IText("Add Custom Text", {
    left: 50,
    top: 70,
    fontFamily: "Times New Roman",
    angle: 10,
    caching: false
  });
  canvas.add(iTextSample).setActiveObject(iTextSample);
}

//change the font style.
// Apply selected font on change
document.getElementById("fontFamily").onchange = function() {
  if (this.value != "Times New Roman") {
    alert(this.value);
    loadAndUse(this.value);
  } else {
    canvas.getActiveObject().set("fontfamily", this.value);
    canvas.requestRenderAll();
  }
};

function loadAndUse(font) {
  //alert(font);
  var myfont = new FontFaceObserver(font);

  myfont
    .load()
    .then(function() {
      // when font is loaded, use it.
      canvas.getActiveObject().set("fontfamily", font);
      canvas.requestRenderAll();
    })
    .catch(function(e) {
      console.log(e);
      alert("font loading failed " + font);
    });
}

var imageSaver = document.getElementById("download");
imageSaver.addEventListener("click", saveImage, false);

function saveImage(e) {
  this.href = canvas.toDataURL({
    format: "png",
    quality: 0.8
  });
  this.download = "canvas.png";
}

function generateJSON() {
  alert("Hello");
  var json_data = JSON.stringify(canvas.toDatalessJSON());
  console.log(json_data);
}
function loadJSON() {
  var json_data = {
    version: "2.4.3",
    objects: [
      {
        type: "i-text",
        version: "2.4.3",
        originX: "left",
        originY: "top",
        left: 50,
        top: 70,
        width: 283.87,
        height: 45.2,
        fill: "rgb(0,0,0)",
        stroke: null,
        strokeWidth: 1,
        strokeDashArray: null,
        strokeLineCap: "butt",
        strokeLineJoin: "miter",
        strokeMiterLimit: 4,
        scaleX: 1,
        scaleY: 1,
        angle: 10,
        flipX: false,
        flipY: false,
        opacity: 1,
        shadow: null,
        visible: true,
        clipTo: null,
        backgroundColor: "",
        fillRule: "nonzero",
        paintFirst: "fill",
        globalCompositeOperation: "source-over",
        transformMatrix: null,
        skewX: 0,
        skewY: 0,
        text: "Add Custom Text",
        fontSize: 40,
        fontWeight: "normal",
        fontFamily: "Times New Roman",
        fontStyle: "normal",
        lineHeight: 1.16,
        underline: false,
        overline: false,
        linethrough: false,
        textAlign: "left",
        textBackgroundColor: "",
        charSpacing: 0,
        styles: {}
      }
    ]
  };

  canvas.loadFromJSON(JSON.parse(json_data), function(obj) {
    canvas.renderAll();
    console.log(" this is a callback. invoked when canvas is loaded!xxx ");

    canvas_.forEachObject(function(obj) {
      console.log(obj.name);

      if (obj.name === "recta") {
        obj.set({
          left: 0,
          top: 0,
          height: 500,
          width: 500,
          lockScalingY: 0.35
        });

        canvas_.add(obj);
      }
    });
  });
}
