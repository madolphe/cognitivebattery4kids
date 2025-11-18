let prompt_start, prompt_gratitude, prompt_button_end, prompt_button_restart, prompt_button_click;
let text_title_0, text_tutorial_0_0, text_tutorial_0_1, text_tutorial_0_2, text_tutorial_0_3;
let text_tutorial_1_0, text_tutorial_2_0, text_tutorial_3_0, text_tutorial_4_0, text_tutorial_5_0, text_tutorial_6_1, text_tutorial_6_2;
let text_start, text_end;
let text_button_next, text_button_previous, text_button_start;
let text_tutorial_6_3, text_tutorial_6_4;
let button_end_label;


if(language_code==='fr'){
    button_end_label = "Attendez...";
    prompt_start = "Clique sur la souris pour commencer l’activité.";
    prompt_gratitude = "Merci d'avoir participé à l'expérience";
    prompt_button_end = "FIN";
    prompt_button_restart = "Redémarrer";
    prompt_button_click = "Cliquer dans l'ordre";
    // TUTORIAL
    text_title_0 = "INSTRUCTIONS" ;
    text_tutorial_0_0 = "Le but de cette activité est de voir comment tu arrives à suivre ";
    text_tutorial_0_1 = "des objets qui bougent. Au début de chaque essai, cinq disques deviennent" ;
    text_tutorial_0_2 = "rouges pour te montrer lesquels tu dois suivre, puis tous les disques " ;
    text_tutorial_0_3 = "se mettent à bouger en même temps. Ta mission est de retenir";  
    text_tutorial_0_4 = " quels disques étaient rouges et de suivre leurs déplacements.";
    text_tutorial_1_0 = "Voici un exemple de ce que tu vas voir à l’écran." ;
    text_tutorial_2_0 = "Regarde bien les cibles et suis-les pendant qu’elles bougent. ";
    text_tutorial_2_1 = "Quand elles s’arrêtent, clique sur celles que tu penses être les bonnes.";
    text_tutorial_2_2 =  "Quand il y en a beaucoup, c’est normal que ce soit difficile.";
    text_tutorial_2_3 =  "Ce qui compte, c’est d’en retrouver le plus possible."; 
    text_tutorial_3_0 = "Commençons les exercices." ;
    text_tutorial_4_0 = "Commençons l'expérience principale." ;
    text_tutorial_5_0 = "Temps de pause." ;
    text_tutorial_6_1 = "Merci pour tes efforts ! Quand tu es prêt·e," ;
    text_tutorial_6_2 = "clique sur le bouton « Démarrer » pour recommencer." ;
    text_tutorial_6_3 = "Il te reste encore" ;
    text_tutorial_6_4 = " bloc(s) pour finir le jeu." ;
    // TASK
    text_start = "Clique sur la souris pour commencer l’activité." ;
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