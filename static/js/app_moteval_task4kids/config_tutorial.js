//general title text
let pos_title_x = Pos.center_x;
let pos_title_y = Pos.center_y - Math.round(0.24*Pos.canvas_height);
let size_titletext = Math.round(0.12*Pos.canvas_height);
//let col_titletext = [170,170,60];
let col_titletext = 'white';

//general button
let size_next_w = Math.round(0.12*Pos.canvas_height); //in pixel
let size_next_h = Math.round(0.07*Pos.canvas_height); //in pixel
let x_next = Pos.center_x+Math.round(0.14*Pos.canvas_height)-(size_next_w/2); //in pixel
let y_next = Pos.canvas_height-Math.round(0.14*Pos.canvas_height)-(size_next_h/2); //in pixel
let size_next_text = Math.round(0.02*Pos.canvas_height);

let size_previous_w = Math.round(0.12*Pos.canvas_height); //in pixel
let size_previous_h = Math.round(0.07*Pos.canvas_height); //in pixel
let x_previous = Pos.center_x-Math.round(0.14*Pos.canvas_height)-(size_previous_w/2); //in pixel
let y_previous = Pos.canvas_height-Math.round(0.14*Pos.canvas_height)-(size_previous_h/2); //in pixel
let size_previous_text = Math.round(0.02*Pos.canvas_height); //in pixel

let text_font = 'Helvetica';

//scene 0 
let pos_tutorialtext_x = Pos.center_x;
let pos_tutorialtext_y = Pos.center_y+Math.round(0.04*Pos.canvas_height);;
let size_tutorialtext = Math.round(0.025*Pos.canvas_height);
// let col_tutorialtext = [220,220,255];
let col_tutorialtext = "white";
let shift_text = Math.round(0.04*Pos.canvas_height);

//scene 1
let flag_disp = false;
let num_demotargnum = 5;

let pos_tutorialtext_x1 = Pos.center_x;
//let pos_tutorialtext_y1 = Pos.center_y-Math.round(5*ppd);
let pos_tutorialtext_y1 = Pos.center_y+Math.round(0.23*Pos.canvas_height);
let shift_tuto_y = Math.round(0.23*Pos.canvas_height);

//scene 2
let pos_tutorialtext_x2 = Pos.center_x;
let pos_tutorialtext_y2 = Pos.center_y+Math.round(-0.02*Pos.canvas_height);
let pos_tutorialtext_y2_1 = Pos.center_y+Math.round(0.03*Pos.canvas_height);
let pos_tutorialtext_y2_2 = Pos.center_y+Math.round(0.08*Pos.canvas_height);

//scene 3
let size_tutorialtext3 = Math.round(0.04*Pos.canvas_height);
let pos_tutorialtext_x3 = Pos.center_x;
let pos_tutorialtext_y3 = Pos.center_y-Math.round(0.12*Pos.canvas_height);

let size_start_w = Math.round(0.12*Pos.canvas_height); //in pixel
let size_start_h = Math.round(0.07*Pos.canvas_height); //in pixel
let x_start = Pos.center_x- (size_start_w/2); //in pixel
let y_start = Pos.center_y-Math.round(0.10*Pos.canvas_height)+(size_start_h/2); //in pixel
let size_start_text = Math.round(0.02*Pos.canvas_height);

//scene main ready
//scene break

let size_bubble_x = Math.round(0.38*Pos.canvas_height);
let size_bubble_y = Math.round(0.08*Pos.canvas_height);
let pos_bubble_y = Pos.center_y + Math.round(0.150*Pos.canvas_height);
let pos_bubble_y1 = Pos.center_y + Math.round(0.25*Pos.canvas_height); 
let pos_bubble_y2 = Pos.center_y + Math.round(0.2*Pos.canvas_height);
let pos_bubble_y3 = Pos.center_y + Math.round(0.12*Pos.canvas_height);

let pos_researcher_x = window_availw/3.9;
let pos_researcher_y = 4*window_availh/5;
