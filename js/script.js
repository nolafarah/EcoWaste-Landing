const hamburger=document.querySelector(".hamburger");
const navMenu=document.querySelector(".nav-menu");

hamburger.addEventListener("click",()=>{
    navMenu.classList.toggle("active");
});

const imageInput=document.getElementById("imageInput");
const previewImage=document.getElementById("previewImage");
const previewPlaceholder=document.getElementById("previewPlaceholder");
const uploadBtn=document.getElementById("uploadBtn");
const cameraBtn=document.getElementById("cameraBtn");
const analyzeBtn=document.getElementById("analyzeBtn");
const analysisTitle=document.getElementById("analysisTitle");
const emptyState=document.getElementById("emptyState");
const resultContent=document.getElementById("resultContent");

uploadBtn.onclick=()=>imageInput.click();
cameraBtn.onclick=()=>imageInput.click();

imageInput.addEventListener("change",function(){
    const file=this.files[0];
    if(!file) return;

    previewImage.src=URL.createObjectURL(file);
    previewImage.style.display="block";
    previewPlaceholder.style.display="none";
    analyzeBtn.disabled=false;
});

analyzeBtn.addEventListener("click",function(){
    analysisTitle.innerHTML="Sedang Menganalisis...";
    analyzeBtn.disabled=true;

    setTimeout(()=>{
        analysisTitle.innerHTML="Analisis Berhasil";
        emptyState.style.display="none";
        resultContent.style.display="block";

        document.getElementById("wasteName").innerHTML="Botol Plastik";
        document.getElementById("wasteCategory").innerHTML="Anorganik";
        document.getElementById("wasteStatus").innerHTML="Dapat didaur ulang";
        document.getElementById("confidence").innerHTML="96%";
    },2000);
});