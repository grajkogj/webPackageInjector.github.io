//bookmarklet code:      javascript:(function () {var script = document.createElement('script');script.id="packageInjectorShell";script.src="https://grajkogj.github.io/webPackageInjector.github.io/injector.js";document.body.appendChild(script);}()) 
//command dev code: (copy and paste all the code below into the console to get the final result)


var injectorUI = '<div id="packageInjector"> <script src="injector.js"></script> <div id="injectorStyles"> <style> #packageInjector { width: 450px; min-height: 250px; position: absolute; top: 20px; left: 20px; z-index: 9999; border-radius: 5px; background:rgb(80, 80, 80); border: solid; border-width: 5px; border-color: rgb(0, 151, 238); } #packageInjector-header { background: rgb(0, 151, 238); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; width: 100%; height: 50px; } #closeInjectorButton { color: white; font-size: 40px; background-color: red; outline: none; border: none; border-radius: 5px; width: 50px; height: 50px; display: inline-block; } #closeInjectorButton:hover { cursor: pointer; background-color:rgb(184, 35, 35) } #packageInjector-body { background:rgb(80, 80, 80); width: 100%; height: 100%; border-radius: 5px; display: grid; place-items: center; } #injectorTitle { display: inline-block; font-family: Arial, Helvetica, sans-serif; color: #FFF; } #uploadedFile { color: #FFF; display: inline-block; } [injector-spacer] { height: 30px; } #inject-button { color: white; font-size: 40px; background-color: rgb(0, 151, 238); outline: none; border: none; border-radius: 5px; min-width: 50px; height: 50px; display: inline-block; } #inject-button:hover { cursor: pointer; background-color:rgb(41, 124, 172); } </style> </div> <div id="packageInjector-header"> <button id="closeInjectorButton" onclick="killInjector()"> X </button> <h3 id="injectorTitle"> Enjin Injector </h3> <p style="display:inline-block;font-size: 16px; color:white;"> Created by Gavin Grajkowski </p> </div> <div id="packageInjector-body"> <div injector-spacer></div> <input type="file" id="uploadedFile"> <div injector-spacer></div> <div style="color: #FFF;"> <input name="type" type="radio" id="isPackageCheck"> HTML Package <input name="type" type="radio" id="isScriptCheck"> Script Package <input name="type" type="radio" id="isStyleCheck"> Style Package </div> <div injector-spacer></div> <input type="button" id="inject-button" onclick="inject()" value="Inject"> <p id="injector-feedback" style="color: white;"> Waiting to inject </p> <div injector-spacer></div> </div></div>';

function launchInjector() {
        if(document.getElementById("packageInjector")) {return;} else {
                injector = document.createElement('div');
                injector.innerHTML = injectorUI;
                document.body.appendChild(injector);
        };
};

launchInjector();



function killInjector() {
        document.getElementById("packageInjector").remove();
};


var content;

function inject() {
        var fileToLoad = document.getElementById("uploadedFile").files[0];
      
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent){
            var textFromFileLoaded = fileLoadedEvent.target.result;
            content = textFromFileLoaded;
        };
        
        fileReader.readAsText(fileToLoad, "UTF-8");
        setTimeout(
                function() {
                        injectCompiled();
                },100
        );
};

function injectCompiled() {
        var feedback = document.getElementById("injector-feedback");
        let s = document.getElementById("isScriptCheck");
        let h = document.getElementById("isPackageCheck");
        let t = document.getElementById("isStyleCheck");
        
        if(s.checked == true && h.checked == false && t.checked == false) {
                script = document.createElement('script');
                script.id = "injected-script";
                script.innerHTML = content;
                document.body.appendChild(script);
                if(document.getElementById("injected-script")) {
                        feedback.innerHTML = "Injection Successfull!"
                } else {
                        feedback.innerHTML = "Injection encountered an unexpected error. Please try again."
                };
        } else if(h.checked == true && s.checked == false && t.checked == false) {
                div = document.createElement('div');
                div.id = "injected-div";
                div.innerHTML = content;
                document.body.appendChild(div);
                if(document.getElementById("injected-div")) {
                        feedback.innerHTML = "Injection Successfull!"
                } else {
                        feedback.innerHTML = "Injection encountered an unexpected error. Please try again."
                };
        } else if(t.checked == true && h.checked == false && s.checked == false) {
                style = document.createElement('style');
                style.id = "injected-style";
                style.innerHTML = content + 
                document.body.appendChild(style);
                if(document.getElementById("injected-style")) {
                        feedback.innerHTML = "Injection Successfull!"
                } else {
                        feedback.innerHTML = "Injection encountered an unexpected error. Please try again."
                };
        } else if(h.checked == false && s.checked == false && t.checked == false) {
                feedback.innerHTML = "Please select a package type before injecting.";
        } else {
                feedback.innerHTML = "Please select a .enj or .txt pagkage file to inject."
                return;
        };
        
      
        
};



function checkInjection() {
        if(document.getElementById("injected-div").innerHTML == "undefined") {
                document.getElementById("injected-div").remove();
                setTimeout(
                        function() {
                                inject();
                        },100
                );
        };
        if(document.getElementById("injected-script").innerHTML == "undefined") {
                document.getElementById("injected-script").remove();
                setTimeout(
                        function() {
                                inject();
                        },100
                );
        };
        if(document.getElementById("injected-style").innerHTML == "undefined") {
                document.getElementById("injected-style").remove();
                setTimeout(
                        function() {
                                inject();
                        },100
                );
        };
};



dragElement(document.getElementById("packageInjector"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
};



