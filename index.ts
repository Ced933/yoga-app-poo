const  h1:any = document.querySelector('h1');
const btnContainer:any = document.querySelector(".btn-container");



const main:any = document.querySelector('main');
let rebootArray = [
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

]

let exerciceArray = [
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

]

class Exercice{

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
                exerciceArray.map((exo)=>{
                    let result = exerciceArray.filter((exo) =>
                    // retourne tous les items sauf celui sur lequel j'ai cliqué 
                        exo.pic != e.target.dataset.pic
                    )
                    // on donne nos nouveau resultats à exerciceArray
                    exerciceArray = result;
                    console.log(exerciceArray)
                })
                // on recharge la page pour actualiser les cartes 
                page.lobby();
            })

        })

       
    },
    reboot: function(){
        const reboot:any = document.querySelector("#reboot");
        reboot.addEventListener('click', ()=> {
            exerciceArray = rebootArray;
            page.lobby();
            console.log(exerciceArray);

        })
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
       utils.reboot()
  

    },
    routine : function(){
        utils.pageContent(
            "Routine",
            "Exercice avec chronos",
            null
        )

    },

    finish : function(){
        utils.pageContent(
            "C'est terminé !",
            "<button id='start'>Recommencer</button>",
            "<button id='reboot' class='btn-reboot' >Réinitialiser <i class='fas fa-times-circle'></i></button>"
        )
    }
}

page.lobby()