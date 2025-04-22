class TimeManager{
    constructor() {
      this.scene = 0;
      this.starttime_exp = Date.now();
      this.starttime_block = null;
      this.activetime_block = null;

        
      this.scene_start = 0;
      //for main experiment
      this.scene_mainstart = 1;
      this.scene_key1 = 3;
      this.scene_key2 = 2;
      this.scene_back = 1;
      this.end_scene = 4;

      //for tutorial
      this.scene_tutorialstart = 6;
      this.tutorial_end = 10;
      this.scene_break = 11;      
    }

    show(){
        if(Time.scene==0){
            scene_instruction();
          }else if(Time.scene==1){
            scene_fixation();
          }else if(Time.scene==2){
            scene_stim(scene_targ);
          }else if(Time.scene==3){
            scene_response();
          }else if(Time.scene==4){
            scene_end();
          }else if(this.scene==6){
            //tutorial
            scene_tutorial1();
          }else if(this.scene==7){
            scene_tutorial2();
          }else if(this.scene==8){
            scene_tutorial3();
          }else if(this.scene==9){
            scene_tutorial4();
          }else if(this.scene==10){
            scene_tutorial5();
          }else if(this.scene==11){
            scene_break();
          }
    }
  
    update(){
      if (this.scene==this.scene_start){
        this.scene = this.scene_tutorialstart;
        button_next.show();
        this.starttime_block = Date.now(); 
      }else if(this.scene==this.scene_key1){
        for (let i=0; i < array_stimcond.length; ++i) {
          Button[i].hide();
        }
        add_hide_cursor_class();
        this.repeat();
        this.starttime_block = Date.now();      
      }else if (this.scene==this.scene_key2) {
        show_button();
        this.scene ++;
        this.starttime_block = Date.now();
      }else{
        this.scene ++;
        this.starttime_block = Date.now();
      }
    }

    update_tutorial_next(){
      if(this.scene==this.scene_tutorialstart){
        this.scene ++;
        this.starttime_block = Date.now(); 
      }else{
        this.scene ++;
        this.starttime_block = Date.now();
      }
    }

    update_tutorial_previous(){
      if(this.scene==this.scene_tutorialstart){
        this.scene --;
        this.starttime_block = Date.now();      
      }else{
        this.scene --;
        this.starttime_block = Date.now();
      }
    }

    start(){
      this.scene = this.scene_mainstart;
      this.starttime_block = Date.now();
      // here we need to reset Params error count and stimulus counter
      Params.count_errors = 0;
      Params.count_nb_pres_stim = 0;
      Params.next_block_stopping_criterion = false;
    }
  
    repeat(){
      if (Params.flag_block ==true){
        Params.next_block();
        if (Params.repetition == Params.num_rep){
          if (flag_practice==true){
            this.scene = this.tutorial_end;
            button_start.show();
            remove_hide_cursor_class();
          }else{
            if (flag_break==true){
              this.scene = this.scene_break;
              remove_hide_cursor_class();
              button_start.show();
            }else{
              this.scene = this.scene_end;
              button_end.show();
              remove_hide_cursor_class();
            }
          }
        }else{
          this.scene = this.scene_back;
        }
      }else{
        // The block has not finished yet, get next_trial
        Params.next_trial();
        // Params.next_trial() might have trigger a block stopping criterion
        if(Params.next_block_stopping_criterion){
           // In that case, we need to call right now the Params.next_block()
          Params.next_block();
          // Here we check if the nb of blocks finished equals num_rep 
          if (Params.repetition == Params.num_rep){
            // If it's the case, it means
            if (flag_practice==true){
              // In practice we should never enter here
              // This is only reached during tutorial
              this.scene = this.tutorial_end;
              button_start.show();
              remove_hide_cursor_class();
            }else{
              // However we should enter here
              if (flag_break==true){
                // The flag_break is true if and only if the number of blocks has been reached
                // This flag is define when the button start is pressed (beginning of previous block)
                this.scene = this.scene_break;
                remove_hide_cursor_class();
                button_start.show();
              }else{
                this.scene = this.scene_end;
                button_end.show();
                remove_hide_cursor_class();
              }
            }
          }else{
            this.scene = this.scene_back;
          } 
        }else{
          this.scene = this.scene_back; 
        }
      }
    }
    
    count(){
      // Calculate the duration since the target scene (block) started
      this.activetime_block = (Date.now() - this.starttime_block);
    }
  
    count_response(){
      // Calculate the reaction time of the participant
      Params.tmp_rt = (Date.now() - this.starttime_block);
    }
  
    blockstart(){
      this.starttime_block = Date.now();
    }
   }
  