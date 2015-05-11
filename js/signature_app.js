var wrapper = document.getElementById("signature-pad"),
    clearButton = wrapper.querySelector("[data-action=clear]"),
    saveButton = wrapper.querySelector("[data-action=save]"),
    canvas = wrapper.querySelector("canvas"),
    signaturePad;

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    // When zoomed out to less then 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

signaturePad = new SignaturePad(canvas);

$('.button.clear').click(function(e){
  e.preventDefault();
  signaturePad = new SignaturePad(canvas);

  clearButton.addEventListener("click", function (event) {
      signaturePad.clear();
  });
});
saveButton.addEventListener("click", function (event) {
       event.preventDefault();
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
        $('.signerror').text('Please enter your signature').css('display','block');      
        return false;
    } else {
       // window.open(signaturePad.toDataURL());
       $('.signerror').css('display','none');
       console.log(signaturePad.toDataURL());
       var src = signaturePad.toDataURL();
       $('#verifySign').attr('src',src);
    }
});
