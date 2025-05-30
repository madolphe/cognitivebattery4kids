let prompt_start, prompt_gratitude, prompt_button_end, prompt_button_restart, prompt_button_click;
let text_title_0, text_tutorial_0_0, text_tutorial_0_1, text_tutorial_0_2, text_tutorial_0_3;
let text_tutorial_1_0, text_tutorial_2_0, text_tutorial_3_0, text_tutorial_4_0, text_tutorial_5_0, text_tutorial_6_1, text_tutorial_6_2;
let text_start, text_end;
let text_button_next, text_button_previous, text_button_start;
let text_tutorial_6_3, text_tutorial_6_4;
let button_end_label;


if(language_code==='fr'){
    button_end_label = "Attendez...";
    prompt_start = "Cliquez sur la souris pour débuter l'activité";
    prompt_gratitude = "Merci d'avoir participé à l'expérience";
    prompt_button_end = "FIN";
    prompt_button_restart = "Redémarrer";
    prompt_button_click = "Cliquer dans l'ordre";
    // TUTORIAL
    text_title_0 = "INSTRUCTIONS" ;
    text_tutorial_0_0 = "Le but de cette expérience est de mesurer votre capacité de suivi.";
    text_tutorial_0_1 = "A chaque essai, cinq disques se distingueront par leurs couleurs en rouge, puis " ;
    text_tutorial_0_2 = "tous les disques vont commencer à bouger. Votre tâche consiste à vous souvenir " ;
    text_tutorial_0_3 = "des disques cibles en surbrillance et de suivre leurs positions." ;
    text_tutorial_1_0 = "Ceci est un exemple de présentation de stimulus." ;
    text_tutorial_2_0 = "Suivez les cibles et cliquez dessus lorsqu'elles s'arrêteront.";
    text_tutorial_2_1 =  "Lorsqu’il y a beaucoup de cibles, il est difficile de réussir à toutes les retrouver."
    text_tutorial_2_2 =  "Ce qui compte, c’est d’en identifier le plus possible."; 
    text_tutorial_3_0 = "Commençons les exercices." ;
    text_tutorial_4_0 = "Commençons l'expérience principale." ;
    text_tutorial_5_0 = "Temps de pause." ;
    text_tutorial_6_1 = "Merci pour votre effort. Lorsque vous êtes prêts, " ;
    text_tutorial_6_2 = "veuillez cliquer sur le bouton de \"Démarrer\" pour redémarrer" ;
    text_tutorial_6_3 = "Complètez encore" ;
    text_tutorial_6_4 = " bloc(s) pour finir le jeu." ;
    // TASK
    text_start = "Veuillez cliquer sur la souris pour commencer cette expérience" ;
    text_end = "Merci de participer à l'expérience" ;
    text_button_next = "Suivant";
    text_button_previous = "Précédent";
    text_button_start = "Démarrer"
}else{
    button_end_label = "Wait...";
    prompt_start = "Please click the mouse to start this experiment";
    prompt_gratitude = "Thank you for joining the experiment.";
    prompt_button_end = "END";
    prompt_button_restart = "RESTART";
    prompt_button_click = "Click in order";
    // TUTORIAL
    text_title_0 = "INSTRUCTIONS";
    text_tutorial_0_0 = "The goal of this experiment is to measure your tracking ability.";
    text_tutorial_0_1 = "On each trial,  five discs will be highlighted in red, and then ";
    text_tutorial_0_2 = "all disks will start to move. Your task is to remember the";
    text_tutorial_0_3 = "highlighted target discs and track these positions.";
    text_tutorial_1_0 = "This is an example of stimulus presentation.";
    text_tutorial_2_0 = "Your task is to follow the target disc, and click on them when they stop.";
    text_tutorial_3_0 = "Let's start the practices.";
    text_tutorial_4_0 = "Let's start the main experiment.";
    text_tutorial_5_0 = "Break time.";
    text_tutorial_6_1 = "Thank you for your effort. When you are ready,";
    text_tutorial_6_2 = "please click the start button to restart.";
    text_tutorial_6_3 = "Complete " ;
    text_tutorial_6_4 = " more block(s) to finish the game." ;
    // TASK
    text_start = "Please click the mouse to start this experiment";
    text_end = "Thank you for joining the experiment.";
    text_button_next = "Next";
    text_button_previous = "Previous";
    text_button_start = "Start";
}