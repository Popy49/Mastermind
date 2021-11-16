let x =0;
let y=0;
let turn = 0;
let sub = false;
var run = true;
let black = 0;
let white =0;
var solution = [];

var masterMind={
    name : "masterMind",

    colors : {
        1: 'rgb(0, 0, 0)', // noir
        2: 'rgb(255, 255, 255)', // blanc
        3: 'rgb(204, 51, 51)', // rouge
        4: 'rgb(255, 150, 0)', // orange
        5: 'rgb(255, 240, 0)', // jaune
        6: 'rgb(0, 5, 194)', // bleu
        },
    
    settings : {
        lines: 12, //lignes test pour trouver resultats
        columns: 4, //colone de couleur
        colors:6, //couleurs dispo
    },



    drawBoard : function(){
        guessBoard=document.getElementById("guess");
        helperBoard=document.getElementById("help");
        var table = document.createElement('table');
        var table2 = document.createElement('table');
        guessBoard.appendChild(table);
        helperBoard.appendChild(table2);
        for (let i=0; i<this.settings.lines; i++){
            var line = document.createElement('tr');
            var line2 = document.createElement('tr');
            table.appendChild(line);
            table2.appendChild(line2);
            for (let j=0; j<this.settings.columns; j++){
                var cell = document.createElement('td');
                var cell2 = document.createElement('td');
                line.appendChild(cell);
                line2.appendChild(cell2);
            }
        }
    },

    drawColors : function(){
            guessColors = document.getElementById("selection");
            for (let i=1; i<=Object.values(this.colors).length; i++){
                var choice = document.createElement('button');
                guessColors.appendChild(choice);
                choice.style.backgroundColor = this.colors[i];
                choice.setAttribute('onclick', this.name+'.selectColor('+i+');');
                choice.className = "choix";
            };
            var reset = document.createElement('button');
            guessColors.appendChild(reset);
            reset.innerHTML = 'reset';
            reset.setAttribute('onclick', this.name+'.selectColor('+7+');');
            choice.className = "choix";
    },

    defineSolution : function(){
        
        for (let i=0; i<this.settings.columns; i++){
            let x = Math.ceil(Math.random()*Object.values(this.colors).length)
            solution.push(this.colors[x])
        } console.log(solution);
   },

    selectColor : function(color){
        console.log(y)
        if(run==false){
            return;
        }
        if (color==7){
            if(y==0 || sub==true){
                return;
            }
            guessBoard.children[0].children[x].children[y-1].style.backgroundColor = "rgb(11, 11, 51)";
            y--;
            return;
        }

        if (y/this.settings.columns==1 && sub==true){
            y=0;
            sub = false;
            turn++;
            x++;
        }
        guessBoard.children[0].children[x].children[y].style.backgroundColor = this.colors[color];
        guessBoard.children[0].children[x].children[y].values = this.colors[color];
        y++;

    },

    setAnswer : function(){
        console.log(y/this.settings.columns);
        
        if(run==false && y/this.settings.columns!==1){
            return;
        } else {
        masterMind.endGameLoose();
        black = 0;
        white = 0;
        if(y/masterMind.settings.columns==1){
            sub = true;
        }

        // copie du jeu en cour
        let solutionInterm = solution.slice(0);

        //calcul des bonnes reponses
        for (let i=0; i<this.settings.columns; i++){
           if(guessBoard.children[0].children[x].children[i].style.backgroundColor == solutionInterm[i]){
               black++;
               solutionInterm[i]=0;
           } 
           }
           console.log(black);
           console.log(white);
           console.log(solutionInterm);
        for (let i=0; i<this.settings.columns; i++){
            if (solutionInterm[i] == 0){
                continue;
               }

            let misplaced = solutionInterm.indexOf(guessBoard.children[0].children[x].children[i].style.backgroundColor);

            if (misplaced != -1) {
                guessBoard.children[0].children[x].children[i].style.backgroundColor = 0;
                solutionInterm[misplaced] = 0;
                white++;
            }
        }
        }

        // affichage bonnes reponses
        if(y/this.settings.columns!==1){
            return;
        } else {
            for (let i=0; i<black; i++){
                helperBoard.children[0].children[x].children[i].style.backgroundColor = "black";
            }

            for (let i=0; i<white; i++){
                helperBoard.children[0].children[x].children[i+black].style.backgroundColor = "white";
            }
            masterMind.endGameWin();
        }
        
    },

    endGameLoose : function(){
        if (turn == this.settings.lines-1){
            document.getElementById("answerBox").innerHTML = "LOOSER !!";
            console.log(solution);
            affichageSolution=document.getElementById("answerBox");
            var table3 = document.createElement('table');
            affichageSolution.appendChild(table3);
            var line3 = document.createElement('tr');
            table3.appendChild(line3);
                for (let j=0; j<solution.length; j++){
                    var cell3 = document.createElement('td');
                    line3.appendChild(cell3);
                    affichageSolution.children[0].children[0].children[j].style.backgroundColor = solution[j];
                }
            run = false;
        }
    },

    endGameWin : function(){
        if (black == 4){
            document.getElementById("answerBox").innerHTML = "you WIN !!" + {solution};
            run = false;
       }
   },
}


window.onload = function() {
    masterMind.drawBoard();
    masterMind.drawColors();
    masterMind.defineSolution();
}

replay = function() {
    let x =0;
    let y=0;
    let turn = 0;
    let sub = false;
    var run = true;
    let black = 0;
    let white =0;
    var solution = [];
    masterMind.defineSolution();
    masterMind.drawBoard();

}


