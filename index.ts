const  h1:any = document.querySelector('h1');
const btnContainer:any = document.querySelector(".btn-container");



const main:any = document.querySelector('main');
let basicArray = [
    {
        pic: 0,
        min:1
    },
    {
        pic: 1,
        min:1
    },
    {
        pic: 2,
        min:1
    },
    {
        pic: 3,
        min:1
    },
    {
        pic: 4,
        min:1
    },
    {
        pic: 5,
        min:1
    },
    {
        pic: 6,
        min:1
    },
    {
        pic: 7,
        min:1
    },
    {
        pic: 8,
        min:1
    },
    {
        pic: 9,
        min:1
    }

];
let exerciceArray:any =[];

// fonction appeler une fois / s'il y a un localstorage existant alors tu me récupère les données qui sont dedans sinon si t'es vide je t'affect le basicArray 
(()=>{
    if(localStorage.exercice){
        // dans notre tableau on transforme les string en objet 
        exerciceArray = JSON.parse(localStorage.exercice)
    
       
    }else {
        exerciceArray = basicArray
        console.log(exerciceArray)
        // localStorage.setItem('exercice', JSON.stringify(exerciceArray) )
    }

})()


class Exercice{
    index: number;
    minutes:number;
    seconds: any;
    constructor(){
        this.index = 0;
        this.minutes = exerciceArray[this.index].min;
        this.seconds = 0;
    }

    updateCountdown(){
        this.seconds = this.seconds < 10 ? "0"+this.seconds : this.seconds;

        // on fait des fonction récursive qui se lance toute seule 
        setTimeout(() =>{
            // si minute = a 0 et que seconde aussi alors 
            if(this.minutes === 0 && this.seconds === "00"){
                // on passe a l'index suivant 
                this.index++;
                // petite sonette a la fin de chaque exercice  
                this.ring();
                // tant que l'index est inférieur a la longueur du tableau on continu 
                if( this.index < exerciceArray.length){
                    this.minutes= exerciceArray[this.index].min;
                    this.seconds = 59;
                    this.updateCountdown();

                }else{
                    // si on arrive a la fin du tableau alors on lance une nouvelle page 
                    return page.finish()
                }
            }else if(this.seconds === "00"){
                this.minutes--;
                this.seconds = 59;
                this.updateCountdown();
            }
            else{
                this.seconds--;
                this.updateCountdown();
            }

        },10);

       return main.innerHTML = `
        <div class="exercice-container">
            <p>${this.minutes} : ${this.seconds}</p>
            <img src="./img/${exerciceArray[this.index].pic}.png" />
            <div>${this.index + 1} / ${exerciceArray.length}</div>
        </div>
        `
    }

    ring(){
        const audio = new Audio();
        audio.src = "ring.mp3";
        audio.play();
    }
}

const utils ={
    pageContent: function(title:string, content:any, btn:any){
        h1.innerHTML= title;
        main.innerHTML = content;
        btnContainer.innerHTML = btn;
    },
    handleEventMinutes : function(){
        let inputNumbers:any= document.querySelectorAll("input[type='number']");
        inputNumbers.forEach((inputNumber:any) =>
            inputNumber.addEventListener('input', (e:any)=> {

                exerciceArray.map((exo:any)=>{
                    console.log(exo);
                    if(exo.pic == e.target.id){
                        // les minutes seront stocké dans l'objet dans min  
                       exo.min = parseInt(e.target.value)
                       this.store();
                    }
                })
                
            })
           
        )

    },
    handleEventArrow: function(){
        let arrows = document.querySelectorAll('.arrow');
        
        arrows.forEach((arrow:any) =>{
            arrow.addEventListener('click', (e:any)=> {
                let position =0;
                exerciceArray.map((exo:any) =>{
                    // position !==0 la sécurité pour ne pas qu'il le face au premiere element 
                    if(exo.pic == e.target.dataset.pic && position !==0){
                        // pour intervertir les positions 
                     [exerciceArray[position],exerciceArray[position- 1]] = [exerciceArray[position- 1],exerciceArray[position]]
                     console.log(exerciceArray)
                     page.lobby();
                     this.store();
                    }else{
                        position++;
                      
                    }
                })
            })
        })
    },
    deleteItem: function(){
        let deleteBtns = document.querySelectorAll('.deleteBtn');
        deleteBtns.forEach((btn:any)=>{
            btn.addEventListener('click', (e:any)=>{
                console.log(e.target.dataset.pic)
               
                    let result = exerciceArray.filter((exo:any) =>
                    // retourne tous les items sauf celui sur lequel j'ai cliqué 
                        exo.pic != e.target.dataset.pic

                    )
                    // on donne nos nouveau resultats à exerciceArray
                    exerciceArray = result;
                    console.log(exerciceArray)
                
                   this.store()
                
                // on recharge la page pour actualiser les cartes 
                page.lobby();

            })

        })

       
    },
    reboot: function(){
        const reboot:any = document.querySelector("#reboot");
        reboot.addEventListener('click', ()=> {
            exerciceArray = basicArray;
            page.lobby();
            console.log(exerciceArray);
            // on est déja dans l'objet utils alors pour lui faire réference on met this
           this.store()

        })
    },
    store: function(){
        // dans le localStorage on transforme les données objet en string lisible 
        localStorage.exercice = JSON.stringify(exerciceArray)
    }

}

// au lieu de faire trois fois une page et ce répéter on va fair eune fonction global qu'on va écrire une fois 
// lobby: function(){
//     h1.innerHTML= "Parametrage <i id='reboot' class='fas fa-undo'></i> ";
//     main.innerHTML = "Exercice";
//     btnContainer.innerHTML='<button id="start"> Commencer <i class="far fa-play-circle"></i></button>'
// },
const page = {
    lobby: function(){

console.log(exerciceArray)

        let mapArray = exerciceArray.map((exo:any) =>{

   return `<li>
    <div class="card-header">
      <input type="number" id=${exo.pic} min="1" max="10" value="${exo.min}">
      <span>min</span>
    </div>
    <img src=./img/${exo.pic}.png alt="position yoga" />
    <i class="fas fa-arrow-alt-circle-left arrow" data-pic=${exo.pic} ></i>
    <i class="fas fa-times-circle deleteBtn" data-pic=${exo.pic} ></i>
  </li>` 
        }).join("");

       

        utils.pageContent( 
       "Parametrage <i id='reboot' class='fas fa-undo'></i> ",
        "<ul>" + mapArray + "</ul>",
       '<button id="start"> Commencer <i class="far fa-play-circle"></i></button>'
       );

       utils.handleEventMinutes();
       utils.handleEventArrow();
       utils.deleteItem();
       utils.reboot();
       const start:any = document.querySelector('#start');
       start.addEventListener('click',() => {this.routine()})
  

    },
    routine : function(){
        const exercice = new Exercice();

        utils.pageContent(
            "Routine",
            exercice.updateCountdown(),
            null
        )

    },

    finish : function(){
        utils.pageContent(
            "C'est terminé !",
            "<button id='start'>Recommencer</button>",
            "<button id='reboot' class='btn-reboot' >Réinitialiser <i class='fas fa-times-circle'></i></button>"
        )

        const restart:any = document.querySelector('#start')
        restart.addEventListener('click', ()=> this.routine())
        const reboot:any = document.querySelector('#reboot')
        reboot.addEventListener('click', ()=> utils.reboot())
    }
}

page.lobby()