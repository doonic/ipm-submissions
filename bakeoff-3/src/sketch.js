// Bakeoff #3 - Escrita em Smartwatches
// IPM 2020-21, Semestre 2
// Entrega: até dia 4 de Junho às 23h59 através do Fenix
// Bake-off: durante os laboratórios da semana de 31 de Maio

// p5.js reference: https://p5js.org/reference/

// Database (CHANGE THESE!)
const GROUP_NUMBER   = 19;      // add your group number here as an integer (e.g., 2, 3)
const BAKE_OFF_DAY   = false;  // set to 'true' before sharing during the simulation and bake-off days

let PPI, PPCM;                 // pixel density (DO NOT CHANGE!)
let second_attempt_button;     // button that starts the second attempt (DO NOT CHANGE!)

// Finger parameters (DO NOT CHANGE!)
let finger_img;                // holds our finger image that simules the 'fat finger' problem
let FINGER_SIZE, FINGER_OFFSET;// finger size and cursor offsett (calculated after entering fullscreen)

// Arm parameters (DO NOT CHANGE!)
let arm_img;                   // holds our arm/watch image
let ARM_LENGTH, ARM_HEIGHT;    // arm size and position (calculated after entering fullscreen)

// Study control parameters (DO NOT CHANGE!)
let draw_finger_arm  = false;  // used to control what to show in draw()
let phrases          = [];     // contains all 501 phrases that can be asked of the user
let current_trial    = 0;      // the current trial out of 2 phrases (indexes into phrases array above)
let attempt          = 0       // the current attempt out of 2 (to account for practice)
let target_phrase    = "";     // the current target phrase
let currently_typed  = "";     // what the user has typed so far
let entered          = new Array(2); // array to store the result of the two trials (i.e., the two phrases entered in one attempt)
let CPS              = 0;      // add the characters per second (CPS) here (once for every attempt)

let chars_entered = 0;         // running number of chars entered (for final CPS computation)

// Metrics
let attempt_start_time, attempt_end_time; // attempts start and end times (includes both trials)
let trial_end_time;            // the timestamp of when the lastest trial was completed
let letters_entered  = 0;      // running number of letters entered (for final WPM computation)
let letters_expected = 0;      // running number of letters expected (from target phrase)
let errors           = 0;      // a running total of the number of errors (when hitting 'ACCEPT')
let database;                  // Firebase DB

// Keyboard 9-grid values
let X0, X1, X2, X3;
let Y0, Y1, Y2, Y3;
let seg_w, seg_h;

// Other keyboard selection grid values
let sX0, sX1, sX2;
let sY0, sY1;

// Output screen coordinates
let outX0;
let outY0;
let output_w, output_h;

// General values
let input_w, input_h;

// placeholder for letters to be typed
let to_be_typed;

// boolean for keyboard selection
let _9grid = true;

// Images
let backArrow;
let spacebar;
let backspace;


// predict word
let possible_words;            // contains all the possible words
let currently_typed_word = ""; //currently typed word
let word_prediction = "";        // currently_typed_word's prediction

function predict()
{
  currently_typed_word = currently_typed.split(" ")[currently_typed.split(" ").length - 1];
  
  for (let _line = 0; _line < possible_words.length; _line++)
  {
    // checks if it finds what has been typed in count_1w.txt
    if (possible_words[_line].split("\t")[0].substr(0, currently_typed_word.length) === currently_typed_word)
    {
      word_prediction = possible_words[_line].split("\t")[0];
      //_line++;
      return;
    }
  }

}

function clicked_other_grid(letter)
{
  _9grid = true; // going back to the 9-grid keyboard
  
  // hit space
  if (letter == '_')
  {
    currently_typed += ' ';
  }
  // hit backspace
  else if (letter == '`' && currently_typed.length > 0)
  {
    currently_typed = currently_typed.substring(0, currently_typed.length - 1);
  }
  // hit a letter
  else if (letter != '`')
  {
    currently_typed += letter;
  }
  
  predict();
  
}


// Evoked when the mouse button was pressed
function mousePressed()
{  
  // Only look for mouse presses during the actual test
  if (draw_finger_arm)
  {                   
    // Check if mouse click happened within the touch input area
    if(mouseClickWithin(width/2 - 2.0*PPCM, height/2 - 1.0*PPCM, 4.0*PPCM, 3.0*PPCM))  
    { 
      // Check if we're on the 9-grid keyboard
      if (_9grid)
      {
        // top-left
        if (mouseClickWithin(X0, Y0, seg_w, seg_h))
        {
           clicked_9grid("abcd");
          
        }
        // top-center
        if (mouseClickWithin(X1, Y0, seg_w, seg_h))
        {
            clicked_9grid("efgh");
        
        }
        // top-right
        if (mouseClickWithin(X2, Y0, seg_w, seg_h))
        {
            clicked_9grid("ijkl");
        }
        // middle-left
        if (mouseClickWithin(X0, Y1, seg_w, seg_h))
        {
            clicked_9grid("mnop");
        }
        // middle-center
        if (mouseClickWithin(X1, Y1, seg_w, seg_h))
        {
            clicked_9grid("qrst");
        }
        // middle-right
        if (mouseClickWithin(X2, Y1, seg_w, seg_h))
        {
            clicked_9grid("uvwxyz");
            
        }
        // down-left: suggestion
        if (mouseClickWithin(X0, Y2, seg_w, seg_h))
        {
          //remove currently_typed_word and add word_prediction
          currently_typed = currently_typed.substring(0, currently_typed.length - currently_typed_word.length);
          currently_typed += word_prediction;
            
          word_prediction = "";
          predict();
        }
        // down-center: spacebar
        if (mouseClickWithin(X1, Y2, seg_w, seg_h))
        {
            currently_typed += ' ';
            word_prediction = "";
            predict();
        }
        // down-right: backspace
        if (mouseClickWithin(X2, Y2, seg_w, seg_h))
        {
            currently_typed = currently_typed.substring(0, currently_typed.length - 1);
            predict();
        }
      }
      // We're on the other grid
      else
      {
        let len = to_be_typed.length;
        let div1 = len/2
        let div2 = ceil(len/2);
        let div2_i = 0;
  
        // goes through the to_be_typed zones
        for (let i = 0; i < len; i++)
        {
          if (i < div2)
          {
            if (mouseClickWithin(X0 + i*input_w*(1/div1), Y0, input_w*(1/div1), input_h*(1/2)))
            {
              clicked_other_grid(to_be_typed[i]);
            }
          }
          else
          {
            if (mouseClickWithin(X0 + div2_i*input_w*(1/div2), Y0 + input_h*(1/2), input_w*(1/div2), input_h*(1/2)))
            {
              clicked_other_grid(to_be_typed[i]);
            }
            div2_i++;
          }
        }
        
        // checks if clicked on back arrow
        if (mouseClickWithin(sX0, sY1, input_w*(1/5), input_h*(1/4)))
        {
          _9grid = true;
        }
      }
    }  
    
    // Check if mouse click happened within 'ACCEPT' 
    // (i.e., submits a phrase and completes a trial)
    else if (mouseClickWithin(width/2 - 2*PPCM, height/2 - 5.1*PPCM, 4.0*PPCM, 2.0*PPCM))
    {
      // Saves metrics for the current trial
      letters_expected += target_phrase.trim().length;
      letters_entered += currently_typed.trim().length;
      chars_entered += currently_typed.length; // we need to take in account whitespace when calculating the CPS
      errors += computeLevenshteinDistance(currently_typed.trim(), target_phrase.trim());
      entered[current_trial] = currently_typed;
      trial_end_time = millis();
   

      current_trial++;
      
      // Check if the user has one more trial/phrase to go
      if (current_trial < 2)                                           
      {
        // Prepares for new trial
        currently_typed = "";
        target_phrase = phrases[current_trial];  
        word_prediction = "";
        predict();
      }
      else
      {
        // The user has completed both phrases for one attempt
        draw_finger_arm = false;
        attempt_end_time = millis();
        
        printAndSavePerformance();        // prints the user's results on-screen and sends these to the DB
        attempt++;

        // Check if the user is about to start their second attempt
        if (attempt < 2)
        {
          second_attempt_button = createButton('START 2ND ATTEMPT');
          second_attempt_button.mouseReleased(startSecondAttempt);
          second_attempt_button.position(width/2 - second_attempt_button.size().width/2, height/2 + 200);
        }
      }
    }
  }
}

function load_segment_values()
{
  X0 =  width/2 - 2.0*PPCM;
  X1 = (width/2 - 2.0*PPCM) + 1.0*(4/3)*PPCM;
  X2 = (width/2 - 2.0*PPCM) + 2.0*(4/3)*PPCM;
  X3 = (width/2 - 2.0*PPCM) + 3.0*(4/3)*PPCM;
  
  Y0 =  height/2 - 1.0*PPCM;
  Y1 = (height/2 - 1.0*PPCM) + 1.0*PPCM;
  Y2 = (height/2 - 1.0*PPCM) + 2.0*PPCM;
  Y3 = (height/2 - 1.0*PPCM) + 3.0*PPCM;
  
  seg_w = (4/3)*PPCM;
  seg_h = 1.0*PPCM;
  
  input_w = 4.0*PPCM;
  input_h = 3.0*PPCM
  
  output_w = input_w;
  output_h = 1.0*PPCM;
  
  outX0 = width/2 - 2.0*PPCM;
  outY0 = height/2 - 2.0*PPCM
  
  sX0 = X0;
  sX1 = sX0 + input_w*(1/3);
  sX2 = sX1 + input_w*(1/3);
  
  sY0 = Y0 + input_h*(1/4);
  sY1 = sY0 + input_h*(2/4)
}

// Runs once before the setup() and loads our data (images, phrases)
function preload()
{    
  // Loads simulation images (arm, finger) -- DO NOT CHANGE!
  arm = loadImage("data/arm_watch.png");
  fingerOcclusion = loadImage("data/finger.png");
    
  // Loads the target phrases (DO NOT CHANGE!)
  phrases = loadStrings("data/phrases.txt");
  
  
  // Loads words used to predict the user input
  possible_words = loadStrings("assets/count_1w.txt");
  
  // Loads UI elements for our keyboard
  backArrow = loadImage("data/backArrow.png");
  spacebar = loadImage("data/space_bar.png");
  backspace = loadImage("data/backspace.png");
  
  
}

// Runs once at the start
function setup()
{
  createCanvas(700, 500);   // window size in px before we go into fullScreen()
  frameRate(60);            // frame rate (DO NOT CHANGE!)
  
  // DO NOT CHANGE THESE!
  shuffle(phrases, true);   // randomize the order of the phrases list (N=501)
  target_phrase = phrases[current_trial];
  
  drawUserIDScreen();       // draws the user input screen (student number and display size)
  
  predict();
 
}

function draw()
{
  load_segment_values();
    
  if(draw_finger_arm)
  {
    background(255);           // clear background
    noCursor();                // hides the cursor to simulate the 'fat finger'
    
    drawArmAndWatch();         // draws arm and watch background
    writeTargetAndEntered();   // writes the target and entered phrases above the watch
    drawACCEPT();              // draws the 'ACCEPT' button that submits a phrase and completes a trial
    
    // Draws the non-interactive screen area (4x1cm) -- DO NOT CHANGE SIZE!
    noStroke();
    fill(125);
    rect(width/2 - 2.0*PPCM, height/2 - 2.0*PPCM, 4.0*PPCM, 1.0*PPCM);
    textAlign(CENTER, CENTER); 
    textFont("Arial", 20);
    fill(0);
    text(word_prediction, outX0, outY0, output_w, output_h);

    // Draws the touch input area (4x3cm) -- DO NOT CHANGE SIZE!
    stroke(0, 255, 0);
    noFill();
    rect(width/2 - 2.0*PPCM, height/2 - 1.0*PPCM, 4.0*PPCM, 3.0*PPCM);
    
    draw2Dkeyboard();       // draws our basic 2D keyboard UI

    drawFatFinger();        // draws the finger that simulates the 'fat finger' problem
  }
}


// Draws 2D keyboard UI (current letter and left and right arrows)
function draw2Dkeyboard()
{ 
  noStroke();
  
  // Draws 9-grid keyboard
  if (_9grid)
  {
    // background
    fill(0);
    rect(X0, Y0, 3.0*seg_w, 3.0*seg_h);
    draw_elements();
    draw_lines();
  }
  // Draws other keyboard
  else
  {
    // background
    fill(0);
    rect(X0, Y0, input_w, input_h);
    otherkb_draw_elements();
    //otherkb_draw_lines();
    //otherkb_draw_back_arrow();
  }
  
  stroke(0, 255, 0);
  
}

// other keyboard's back arrow
function otherkb_draw_back_arrow()
{
  noFill();
  imageMode(CORNER);
  image(backArrow, sX0, sY1, input_w*(1/5), input_h*(1/4));
}

// 9-grid keyboard's elements, letters and icons
function draw_elements()
{
  // text attributes
  textFont("Arial", 14);
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  
  // top-left
  text("abcd", X0, Y0, seg_w, seg_h);
  
  // top-center
  text("efgh", X1, Y0, seg_w, seg_h);
  
  // top-right
  text("ijkl", X2, Y0, seg_w, seg_h);
  
  // middle-left
  text("mnop", X0, Y1, seg_w, seg_h);
  
  // middle-center
  text("qrst", X1, Y1, seg_w, seg_h);
  
  // middle-right
  text("uvwxyz", X2, Y1, seg_w, seg_h);
  
  // down-left: suggestions
  textStyle(ITALIC);
  text("sugest.", X0, Y2, seg_w, seg_h);
  textStyle(NORMAL);
  
  // icons
  noFill();
  imageMode(CORNER);
  // down-center: space bar
  image(spacebar, X1, Y2, seg_w, seg_h);
  
  // down-right: delete
  //image(backspace, X2, Y2, seg_w, seg_h);
  image(backspace, X2 + ((1/6)*seg_w), Y2 + ((1/10)*seg_h), seg_w - ((2/6)*seg_w), seg_h - ((1/6)*seg_h));
  
}

// 9-grid keyboard's lines
function draw_lines()
{
  stroke(255);
  
  // vertical left
  line(X1, Y0, X1, Y3);
  
  // vertical right
  line(X2, Y0, X2, Y3);
  
  // horizontal top
  line(X0, Y1, X3, Y1);
  
  // horizontal down
  line(X0, Y2, X3, Y2);
  
  noStroke();
}

function clicked_9grid(letters)
{
  to_be_typed = letters;
  _9grid = false; // going to transition to the other keyboard
}



// other keyboard's elements, letters and lines
function otherkb_draw_elements()
{
  // text attributes
  textFont("Arial", 24);
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  
  // line atributes
  stroke(255);
  
  let len = to_be_typed.length;
  let div1 = len/2
  let div2 = ceil(len/2);
  let div2_i = 0;
  
  for (let i = 0; i < len; i++)
  {
    
    // upper
    if (i < div2)
    {
      text(to_be_typed[i], X0 + i*input_w*(1/div1), Y0, input_w*(1/div1), input_h*(1/2));
      if (i != 0)
        line(X0 + i*input_w*(1/div1), Y0, X0 + i*input_w*(1/div1), Y0 + input_h*(1/2)); 
    }
    // lower
    else
    {
      text(to_be_typed[i], X0 + div2_i*input_w*(1/div2), Y0 + (1/2)*input_h, input_w*(1/div2), input_h*(2/4));
      if (div2_i != 0)
        line(X0 + div2_i*input_w*(1/div2),
           Y0 + input_h*(1/2),
           X0 + div2_i*input_w*(1/div2),
           Y3); 
      div2_i++;
    }
  }
  
  line(X0, Y0 + input_h*(1/2), X3, Y0 + input_h*(1/2));
  
  noStroke();
}

// Resets variables for second attempt
function startSecondAttempt()
{
  // Re-randomize the trial order (DO NOT CHANG THESE!)
  shuffle(phrases, true);
  current_trial        = 0;
  target_phrase        = phrases[current_trial];
  
  // Resets performance variables (DO NOT CHANG THESE!)
  letters_expected     = 0;
  letters_entered      = 0;
  errors               = 0;
  currently_typed      = "";
  CPS                  = 0;
  
  // OUR new variables
  _9grid = true;
  chars_entered        = 0;
  
  // Show the watch and keyboard again
  second_attempt_button.remove();
  draw_finger_arm      = true;
  attempt_start_time   = millis();  
}

// Print and save results at the end of 2 trials
function printAndSavePerformance()
{
  // DO NOT CHANGE THESE
  let attempt_duration = (attempt_end_time - attempt_start_time) / 60000;          // 60K is number of milliseconds in minute
  let wpm              = (letters_entered / 5.0) / attempt_duration;      
  let freebie_errors   = letters_expected * 0.05;                                  // no penalty if errors are under 5% of chars
  let penalty          = max(0, (errors - freebie_errors) / attempt_duration); 
  let wpm_w_penalty    = max((wpm - penalty),0);                                   // minus because higher WPM is better: NET WPM
  let timestamp        = day() + "/" + month() + "/" + year() + "  " + hour() + ":" + minute() + ":" + second();
  
  // variables associated with the additional metric (CPS)
  let attempt_duration_in_seconds = (attempt_duration * 60000/1000) ; // 10k, number of milliseconds in a second
  CPS              = chars_entered /attempt_duration_in_seconds;
  
  background(color(0,0,0));    // clears screen
  cursor();                    // shows the cursor again
  
  textFont("Arial", 16);       // sets the font to Arial size 16
  fill(color(255,255,255));    //set text fill color to white
  text(timestamp, 100, 20);    // display time on screen 
  
  text("Finished attempt " + (attempt + 1) + " out of 2!", width / 2, height / 2); 
  
  // For each trial/phrase
  let h = 20;
  for(i = 0; i < 2; i++, h += 40 ) 
  {
    text("Target phrase " + (i+1) + ": " + phrases[i], width / 2, height / 2 + h);
    text("User typed " + (i+1) + ": " + entered[i], width / 2, height / 2 + h+20);
  }
  
  text("Raw WPM: " + wpm.toFixed(2), width / 2, height / 2 + h+20);
  text("Freebie errors: " + freebie_errors.toFixed(2), width / 2, height / 2 + h+40);
  text("Penalty: " + penalty.toFixed(2), width / 2, height / 2 + h+60);
  text("WPM with penalty: " + wpm_w_penalty.toFixed(2), width / 2, height / 2 + h+80);
  text("Raw CPS:  " + CPS.toFixed(2),width / 2, height / 2 + h+100);

  // Saves results (DO NOT CHANGE!)
  let attempt_data = 
  {
        project_from:         GROUP_NUMBER,
        assessed_by:          student_ID,
        attempt_completed_by: timestamp,
        attempt:              attempt,
        attempt_duration:     attempt_duration,
        raw_wpm:              wpm,      
        freebie_errors:       freebie_errors,
        penalty:              penalty,
        wpm_w_penalty:        wpm_w_penalty,
        cps:                  CPS
  }
  
  // Send data to DB (DO NOT CHANGE!)
  if (BAKE_OFF_DAY)
  {
    // Access the Firebase DB
    if (attempt === 0)
    {
      firebase.initializeApp(firebaseConfig);
      database = firebase.database();
    }
    
    // Add user performance results
    let db_ref = database.ref('G' + GROUP_NUMBER);
    db_ref.push(attempt_data);
  }
}

// Is invoked when the canvas is resized (e.g., when we go fullscreen)
function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
  let display    = new Display({ diagonal: display_size }, window.screen);
  
  // DO NO CHANGE THESE!
  PPI           = display.ppi;                        // calculates pixels per inch
  PPCM          = PPI / 2.54;                         // calculates pixels per cm
  FINGER_SIZE   = (int)(11   * PPCM);
  FINGER_OFFSET = (int)(0.8  * PPCM)
  ARM_LENGTH    = (int)(19   * PPCM);
  ARM_HEIGHT    = (int)(11.2 * PPCM);
  
  ARROW_SIZE    = (int)(2.2 * PPCM);
  
  // Starts drawing the watch immediately after we go fullscreen (DO NO CHANGE THIS!)
  draw_finger_arm = true;
  attempt_start_time = millis();
}