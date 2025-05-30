//// parameters

//////////////////////////Monitor 
// number of pixels per degres:
let viewer_dist = 50;
function get_ppd(viewer_dist, screen_params){
    return (viewer_dist*Math.tan(Math.PI/180)) * screen_params;
}
let window_availw = window.screen.availWidth;
let window_availh = window.screen.availHeight;

//let window_availw = window.screen.width;
//let window_availh = window.screen.height;

//let size_screen_cm_w = 34.25; // width pixels/cm in sawayama's monitor
//let screen_params = 1920/34.25; // width pixels/cm in sawayama's monitor
//let screen_params = window_availw/size_screen_cm_w;
let ppd = get_ppd(viewer_dist, size_screen_cm_w);
//////////////////////////Monitor 


// Characters:
let researcher_1_path = 'static/images/researcher/researcher_1.png';
let researcher_2_path = 'static/images/researcher/researcher_2.png';
let researcher_3_path = 'static/images/researcher/researcher_3.png';
let bubble_path = 'static/images/pre-post-imgs/tutorial/bubble_line.png';
let researcher_1, researcher_2,researcher_3;
let researcher_width = window_availw/4;
let researcher_height = researcher_width;
let bubble_img;

let fname_success = 'static/images/icons/success.png';
let fname_bkg = 'static/images/pre-post-imgs/bkg_largewindow.png';
let fname_obj = 'static/images/pre-post-imgs/obj_mot.png';
let size_bkg_width_orig = 1440; //original in pix
let size_bkg_height_orig = 1080; //original in pix
let ratio_center =  0; 
let ratio_monitor = 0.706;
Pos = new PositionManager(window_availw,window_availh);
Pos.adjust_to_bkg(size_bkg_width_orig,size_bkg_height_orig,ratio_center);
let img_bkg;


let flag_practice = true;
let flag_break = true;
let count_break = 0;
let max_break = 2;

// 3 blocks * 3 trials * 9 cdts = 81 trials ~ 810 secs = 12 min
// 3 blocks * 2 trials * 9 cdts = 54 trials ~ 540 secs ~ 10 min

let num_rep_main = 1; // Params.num_rep
// debug let num_rep_main = 1;
let num_rep_practice = 1;

// let num_target_main = [3, 5]; //Experimental condition. Params.num_target
// debug let num_target_main = [1]; //Experimental condition.
// let num_target_practice = [5]; //Experimental condition.
// debug let num_target_practice = [1]; //Experimental condition.

//let array_target_main = [3,4,5]; //Number of targets.
let array_target_main = [1,2,3,4,5]; //Number of targets.
let array_target_practice = [3]; //Number of targets.
let array_speed_main = [1,4,8];  //speed condition
let array_speed_practice = [1,4,8];  // speed condition
// let array_stimcond_main = [1,4,8]; // Params.array_stimcond
// let array_stimcond_tutorial = [1,4];

let velocity_dot = (1*ppd)/60; //in pix/frame 
let direction_dot_mini = 5 //in degrees
let direction_dot_range = 350 //in degrees
let num_totaldot = 10;
let duration_target = 1000; //in ms
// debug let duration_target = 100; //in ms
let time_totalstimduration = 8000; //in ms
let duration_stop = 500; //in ms
let size_obj = Math.round(1.2*ppd); //in pix. in diameter

let roi_obj = [Math.round(12*ppd),Math.round(12*ppd)]; //in pix. in diameter.
let col_target = [128,0,0,128];
let col_target2 = [0,0,0,0];


let time_startblank = 300;
// debug let time_startblank = 100;
let time_fixation = 500; // in millisecond
// debug let time_fixation = 100; // in millisecond
let col_bkg = 0;

// fixation 
let len_fixation = Math.round(0.5*ppd); // in pix
let col_fixation = 20; // in rgb
let thick_fixation = Math.round(0.1*ppd); // in pix


// text 
let col_text = 255;
let size_text = Math.round(0.7*ppd); //in pixel
let size_text_button = 1*ppd; //in pix
////

let shift_position = Math.round(3.0*ppd); //in pix

let Button = [];

let x_ok = -Math.round(0*ppd);
let y_ok = Math.round(4*ppd);
let x_restart = -Math.round(5.5*ppd); //in pixel
let y_restart = -Math.round(4*ppd); //in pixel

let col_check = [128,0,0,128];

//end button;
let size_end_w = Math.round(2.5*ppd); //in pixel
let size_end_h = Math.round(1.5*ppd); //in pixel
let x_end = Pos.center_x- (size_end_w/2); //in pixel
let y_end = Pos.center_y+Math.round(2*ppd)-(size_end_h/2); //in pixel
let size_end_text = Math.round(0.5*ppd);

let bar, success;
// exit task
let exit_view = "exit_view_cognitive_task"
if(debug.toLowerCase() === "true"){
    time_fixation = 100; // in millisecond
    time_startblank = 100;
    duration_stop = 100; //in ms
    duration_target = 100; //in ms
    num_rep_main = 1;
    time_totalstimduration = 100;
    array_target_main = [1]
}