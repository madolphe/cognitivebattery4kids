// scene 6
function scene_tutorial1() {
    draw_character(researcher_3, pos_researcher_x, pos_researcher_y, researcher_width, researcher_width);
    draw_background_bubble(Pos.center_x, pos_bubble_y, size_bubble_x, size_bubble_y);
    //Title
    push();
    fill(col_titletext);
    textSize(size_titletext);
    textAlign(CENTER);
    text(text_title_0, pos_title_x, pos_title_y);
    pop();

    push();
    fill(col_tutorialtext);
    textSize(size_tutorialtext);
    textAlign(CENTER);
    text(text_tutorial_0_0, pos_tutorialtext_x, pos_tutorialtext_y - 2 * shift_text);
    text(text_tutorial_0_1, pos_tutorialtext_x, pos_tutorialtext_y - shift_text);
    text(text_tutorial_0_2, pos_tutorialtext_x, pos_tutorialtext_y);
    text(text_tutorial_0_3, pos_tutorialtext_x, pos_tutorialtext_y + shift_text);
    pop();
    //button
    button_next.mousePressed(() => {
        Params = new ParameterManager();
        button_previous.show();
        Time.update_tutorial_next();
    });
}

function create_next_button() {
    button_next = createButton(text_button_next);
    button_next.size(size_next_w, size_next_h);
    button_next.style('font-size', size_next_text + 'px');
    button_next.position(x_next, y_next);
    button_next.hide();
}

function create_previous_button() {
    button_previous = createButton(text_button_previous);
    button_previous.size(size_previous_w, size_previous_h);
    button_previous.style('font-size', size_previous_text + 'px');
    button_previous.position(x_previous, y_previous);
    button_previous.hide();
}


// scene 7
function scene_tutorial2() {
    //image
    scene_stim(demo_img0);
    draw_character(researcher_2, pos_researcher_x, pos_researcher_y, researcher_width, researcher_width);
    draw_background_bubble(Pos.center_x, pos_bubble_y1, size_bubble_x, size_bubble_y);
    //text
    push();
    fill(col_tutorialtext);
    textSize(size_tutorialtext);
    textAlign(CENTER);
    text(text_tutorial_1_0, pos_tutorialtext_x1, pos_tutorialtext_y1);
    pop();

    //buttons
    button_next.mousePressed(() => {
        Time.update_tutorial_next();
        // show_button_tutorial();
    });
    button_previous.mousePressed(() => {
        button_previous.hide();
        Time.update_tutorial_previous();
    });
}

function demo_img0() {
    Time.count();
    if (Time.activetime_block < duration_target) {
        for (let i = 0; i < num_totaldot; ++i) {
            if (i < Params.num_target) {
                push();
                fill(col_target);
                noStroke();
                Objs[i].display();
                pop();

            } else {
                push();
                fill(col_target2);
                noStroke();
                Objs[i].display();
                pop();
            }
        }

    } else if (Time.activetime_block >= duration_target && Time.activetime_block < time_totalstimduration + duration_target) {
        push();
        fill(col_target2);
        noStroke();
        for (let i = 0; i < num_totaldot; ++i) {
            Objs[i].update_pos();
            Objs[i].display();
        }
        pop();
    } else if (Time.activetime_block >= time_totalstimduration + duration_target && Time.activetime_block <
        time_totalstimduration + duration_stop + duration_target) {
        push();
        fill(col_target2);
        noStroke();
        for (let i = 0; i < num_totaldot; ++i) {
            Objs[i].display();
        }
        pop();
    }
}


// scene 8
function scene_tutorial3() {
    draw_character(researcher_3, pos_researcher_x, pos_researcher_y, researcher_width, researcher_width);
    draw_background_bubble(Pos.center_x, pos_bubble_y3, size_bubble_x, size_bubble_y);
    //image

    //text
    push();
    fill(col_tutorialtext);
    textSize(size_tutorialtext);
    textAlign(CENTER);
    text(text_tutorial_2_0, pos_tutorialtext_x2, pos_tutorialtext_y2);
    text(text_tutorial_2_1, pos_tutorialtext_x2, pos_tutorialtext_y2_1);
    text(text_tutorial_2_2, pos_tutorialtext_x2, pos_tutorialtext_y2_2);
    pop();

    //buttons
    button_next.mousePressed(() => {
        // for (let i=0; i < num_totaldot; ++i){
        //     Button[i].hide();
        //   }
        button_next.hide();
        button_start.show();
        Time.update_tutorial_next();
    });
    button_previous.mousePressed(() => {
        // for (let i=0; i < num_totaldot; ++i){
        //     Button[i].hide();
        //   }
        Params = new ParameterManager();
        Time.update_tutorial_previous();
    });
}


// scene 9
function scene_tutorial4() {
    draw_character(researcher_2, pos_researcher_x, pos_researcher_y, researcher_width, researcher_width);

    //text
    push();
    fill(col_tutorialtext);
    textSize(size_tutorialtext3);
    textAlign(CENTER);
    text(text_tutorial_3_0, pos_tutorialtext_x3, pos_tutorialtext_y3);
    pop();

    //buttons
    button_previous.mousePressed(() => {
        // show_button_tutorial();
        button_next.show();
        button_start.hide();
        Time.update_tutorial_previous();
    });
    button_start.mousePressed(() => {
        button_previous.hide();
        button_start.hide();
        // add_hide_cursor_class();
        Params = new ParameterManager();
        Params.pra_initialize();
        Time.start();
    });
}

function create_start_button() {
    button_start = createButton(text_button_start);
    button_start.size(size_start_w, size_start_h);
    button_start.style('font-size', size_start_text + 'px');
    button_start.position(x_start, y_start);
    button_start.hide();
}

function scene_tutorial5() {
    draw_character(researcher_2, pos_researcher_x, pos_researcher_y, researcher_width, researcher_width);

    //text
    push();
    fill(col_tutorialtext);
    textSize(size_tutorialtext3);
    textAlign(CENTER);
    text(text_tutorial_4_0, pos_tutorialtext_x3, pos_tutorialtext_y3);
    pop();

    //buttons
    button_start.mousePressed(() => {
        button_start.position(x_start, y_start*1.25);
        button_start.hide();
        // add_hide_cursor_class();
        Params = new ParameterManager();
        Params.num_rep = num_rep_main;
        flag_practice = false;
        flag_break = true;
        Time.start();
    });
}

function scene_break() {
    //text
    draw_character(researcher_2, pos_researcher_x, pos_researcher_y, researcher_width, researcher_width);
    draw_background_bubble(Pos.center_x, pos_bubble_y, size_bubble_x, size_bubble_y);

    //text
    push();
    fill(col_tutorialtext);
    textSize(size_tutorialtext3);
    textAlign(CENTER);
    text(text_tutorial_5_0, pos_tutorialtext_x3, pos_tutorialtext_y3);
    pop();

    push();
    fill(col_tutorialtext);
    textSize(size_tutorialtext);
    textAlign(CENTER);
    textFont(text_font);
    text(text_tutorial_6_1, pos_tutorialtext_x, pos_tutorialtext_y2 - shift_text);
    text(text_tutorial_6_2, pos_tutorialtext_x, pos_tutorialtext_y2);
    pop();

    push();
    fill(col_tutorialtext);
    textSize(size_tutorialtext);
    textAlign(CENTER);
    textFont(text_font);
    text(text_tutorial_6_3 + (max_break - (count_break + 1)) + text_tutorial_6_4, pos_tutorialtext_x, pos_tutorialtext_y2 + shift_text);
    pop();


    //buttons
    button_start.mousePressed(() => {
        button_start.hide();
        // add_hide_cursor_class();
        tmp_save();
        Params = new ParameterManager();
        tmp_connect();
        Params.num_rep = num_rep_main;
        flag_practice = false;
        count_break++;
        if (count_break == max_break - 1) {
            flag_break = false;
        } else {
            flag_break = true;
        }
        Time.start();
    });
}

let tmp1 = [];
let tmp2 = [];
let tmp4 = [];
let tmp5 = [];
let tmp6 = [];
let tmp7 = [];

function tmp_save() {
    tmp1 = Params.results_responses;
    tmp2 = Params.results_rt;
    tmp4 = Params.results_speed_stim;
    tmp5 = Params.results_correct;
    tmp6 = Params.results_num_target;
    tmp7 = Params.results_ind_condition;
}

function tmp_connect() {
    Params.results_responses.push(tmp1);
    Params.results_rt.push(tmp2);
    Params.results_speed_stim.push(tmp4);
    Params.results_correct.push(tmp5);
    Params.results_num_target.push(tmp6);
    Params.results_ind_condition.push(tmp7);
}

// function show_button_tutorial(){
//     function getRndInteger(min, max) {
//       return (Math.random() * (max - min) ) + min;
//     }
//     for (let i=0; i < num_totaldot; ++i){
//       var x = getRndInteger(Pos.center_x - Pos.size_bkg_x/4, Pos.center_x +Pos.size_bkg_x/4);
//       var y = getRndInteger(size_obj/2, Pos.center_y - shift_text);
//       Button[i].show();
//       Button[i].position(x,y);
//     }
// }