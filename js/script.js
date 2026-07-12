const hamburger=document.querySelector(".hamburger");
const navMenu=document.querySelector(".nav-menu");

hamburger.addEventListener("click",()=>{
    navMenu.classList.toggle("active");
});

const uploadInput=document.getElementById("uploadInput");
const cameraPreview=document.getElementById("cameraPreview");
const cameraCanvas=document.getElementById("cameraCanvas");

const previewImage=document.getElementById("previewImage");
const previewPlaceholder=document.getElementById("previewPlaceholder");

const cameraBtn=document.getElementById("cameraBtn");
const uploadBtn=document.getElementById("uploadBtn");
const analyzeBtn=document.getElementById("analyzeBtn");

const analysisTitle=document.getElementById("analysisTitle");
const emptyState=document.getElementById("emptyState");
const resultContent=document.getElementById("resultContent");

let stream=null;
let cameraMode=false;

function setTitle(text){
    analysisTitle.textContent=text;
}

function enableAnalyze(text){
    analyzeBtn.disabled=false;
    analyzeBtn.textContent=text;
}

function disableAnalyze(){
    analyzeBtn.disabled=true;
    analyzeBtn.textContent="Analisis Sekarang";
}

function stopCamera(){
    if(stream){
        stream.getTracks().forEach(track=>track.stop());
        stream=null;
    }
}

async function startCamera(){
    stopCamera();

    stream=await navigator.mediaDevices.getUserMedia({
        video:{
            facingMode:"environment"
        },
        audio:false
    });
    cameraPreview.srcObject=stream;

    previewPlaceholder.style.display="none";
    previewImage.style.display="none";
    cameraPreview.style.display="block";

    cameraMode=true;

    setTitle("Arahkan Kamera ke Sampah");
    enableAnalyze("Ambil Foto & Analisis");
}

function previewFile(file){
    if(!file) return;

    previewImage.src=URL.createObjectURL(file);

    previewImage.style.display="block";
    previewPlaceholder.style.display="none";
    cameraPreview.style.display="none";

    cameraMode=false;

    setTitle("Gambar Siap Dianalisis");
    enableAnalyze("Analisis Sekarang");
}

cameraBtn.addEventListener("click",()=>{
    startCamera();
});

uploadBtn.addEventListener("click",()=>{
    uploadInput.click();
});

uploadInput.addEventListener("change",function(){
    previewFile(this.files[0]);
});

analyzeBtn.addEventListener("click",()=>{

    if(cameraMode){
        const ctx=cameraCanvas.getContext("2d");

        cameraCanvas.width=cameraPreview.videoWidth;
        cameraCanvas.height=cameraPreview.videoHeight;

        ctx.drawImage(cameraPreview,0,0);

        previewImage.src=cameraCanvas.toDataURL("image/png");

        previewImage.style.display="block";
        cameraPreview.style.display="none";

        stopCamera();
    }
    cameraMode=false;

    setTitle("Sedang Menganalisis...");
    disableAnalyze();

    setTimeout(showResult,2000);
});

function showResult(){
    setTitle("Analisis Berhasil");

    emptyState.style.display="none";
    resultContent.style.display="block";

    wasteName.textContent="Botol Plastik";
    wasteCategory.textContent="Anorganik";
    wasteStatus.textContent="Dapat didaur ulang";
    confidence.textContent="96%";

    enableAnalyze("Analisis Sekarang");
}