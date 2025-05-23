//// parameters

//////////////////////////Monitor 
// number of pixels per degres:
let viewer_dist = 50;
/*
function get_ppd(viewer_dist, screen_params){
    return (viewer_dist*Math.tan(Math.PI/180)) * screen_params;
}
*/
let window_availw = window.screen.availWidth;
let window_availh = window.screen.availHeight;

//let window_availw = window.screen.width;
//let window_availh = window.screen.height;

// let size_screen_cm_w = 34.25; // width pixels/cm in sawayama's monitor
// let screen_params = 1920/34.25; // width pixels/cm in sawayama's monitor
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
let fname_obj = 'static/images/pre-post-imgs/obj_workingmemory.png';
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

let num_rep_main = 1;
// debug let num_rep_main = 1;
let num_rep_practice = 1;

let num_memory_main = [2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8]; //Experimental condition.
let num_memory_practice = [3,4]; //Experimental condition.

let array_stimcond = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

let time_onestimduration = 900; //in ms
// debug let time_onestimduration = 100; //in ms
let time_startblank = 300;
// debug let time_startblank = 100;
let time_fixation = 1000; // in millisecond
// debug let time_fixation = 100; // in millisecond
let size_target = Math.round(2.0*ppd); //in pixel

let col_target = [255,0,0,128];

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
    time_onestimduration = 100; //in ms
    num_rep_main = 1;
    num_memory_main = [1,2,3]; //Experimental condition
}