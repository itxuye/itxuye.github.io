var pow_widgets = new Array;
var pow_opened = '';
var pow_mouse_is_inside = false;
var trigger_on = false;
var trigger_lunched = false;

if(typeof powVars != 'undefined'){

    //hiding widgets that should be pullouts from loading on the screen
    //otherwise they will show on the screen and then relocate to their pullout positions
    //in a split secont.. kinda lame :)    
    for(i in powVars){            
        document.getElementById(i).style.display = 'none';
    }    
    
    //important to do on window load, otherwise can't get the true height of some elements
    jQuery(window).load(function(){
    //jQuery(document).ready(function(){
        var opposits = { 'top' : 'bottom', 'bottom' : 'top', 'left' : 'right', 'right' : 'left' };                    
        var IE = false;
        if ( jQuery.browser.msie )
            IE = true;
        
        var pullouts = document.createElement('div');
        pullouts.setAttribute('id', 'pullouts');

        var n = 0;
        for(i in powVars){
            n++;
            
            var widget = jQuery('#' + i );                        

            var widget_width = false;
            var pullout_width = false;
            var pullout_height = false;
            var position = false;
            var label_open = label_close = '';
            

            //display hidden widget
            widget.css('display', 'block');              

            if( !powVars[i]['style']['no_label'] || !powVars[i]['style']['icon'] ){
                //default tab labels
                label_open = powVars[i]['style']['label'] ? powVars[i]['style']['label'] : 'Open';
                label_close = powVars[i]['style']['label'] ? powVars[i]['style']['label'] : 'Close';                 
            }

            //first set pullout width, because content flow depends on it so as pullout's height
                //get width of the original widget in the sidebar
                widget_width = widget.outerWidth(true);
            //if the width was defined explicitly
            if(powVars[i]['style']['width']){
                pullout_width = parseInt(powVars[i]['style']['width']);
                widget.css('width', '100%');                
            }else{                
                //set widget width explicitly via css so it doesn't change
                widget.css('width', widget_width+'px');
            }

            //wrap widget into pullout wrapper
            widget.wrap('<div id="pullout-' + n + '" class="pullouts"><div class="pullout-content clearfix">');
            var pullout_id = '#pullout-' + n;
            var pullout = jQuery('#pullout-' + n);
            
            if(!pullout_width){                                
                pullout_width = pullout.outerWidth(true);                
            }
            pullout.css('width', pullout_width+'px');
//console.log(widget_id+': '+widget_width+ ' - '+pullout_width);

            //get side
            var side = powVars[i]['position']['side'];   
            pullout.addClass('side_' + side);

            //set styles if they were selected
            if( powVars[i]['style']['rounded'] ){
                pullout.addClass('rounded');
            }
            if( powVars[i]['style']['borders'] ){
                pullout.addClass('borders');
            }

            //set scrollable widgets except the bottom one
            if( powVars[i]['position']['scroll'] && 'bottom' != side ){
                pullout.css( 'position', 'absolute');
            }        

            //define anchor
            if( powVars[i]['position']['anchor'] == '0' ){            
                var v_anchor = 'top';
                var h_anchor = 'left';
            }else{
                var v_anchor = 'bottom';
                var h_anchor = 'right';
            }
            
            //hide the newly rendered pullout
            //pullout.css(side, '-999999px');
            
            //add open/close tab 
            var pullout_button = jQuery('<div class="pullout-button"><span>'+ label_open + '</span></div>');
            pullout.append(pullout_button);            

            //check if tab icon set
            if( powVars[i]['style']['icon'] ){
                var icon = powVars[i]['style']['icon'];
                var coord = icon.split('_');
                var grid = 36;
                var x = grid * parseInt(coord[0]);
                var y = grid * parseInt(coord[1]);                
                pullout_button.prepend('<div class="icon ' + icon + '"></div>');
                jQuery(pullout_id + ' .icon.'+icon).css({                    
                    'background-position' : '-'+x + 'px ' + ' -' +y+'px'
                });
            }
            if(label_open.length < 1){
                jQuery(pullout_id + ' .pullout-button span').remove();
                jQuery(pullout_id + ' .icon').css('margin', '10px');
            }
            
            
            //after adding borders class, we need to recalculate the width,
            //unfortunately outerWidth executes too soon and doesn't include the width of the border
            //so we calculate it separately
            var border_width = {
                'top': 0,
                'right': 0,
                'bottom': 0,
                'left': 0
            };
            border_width.left = parseInt(pullout_button.css('border-left-width'));
            border_width.right = parseInt(pullout_button.css('border-right-width'));
            border_width.top = parseInt(pullout_button.css('border-top-width'));
            border_width.bottom = parseInt(pullout_button.css('border-bottom-width'));

            var pullout_button_width = pullout_button.outerWidth(false);
            var pullout_button_height = pullout_button.outerHeight(false);            
            //Some themes like Gesis and Twenty Eleven need width of the borders to be added
            //to the width of the tab.
            //We need to get only 2 borders, but don't know which ones defined, 
            //because tabs could be vertical and borders switch sides.
            //We know that in any case only 3 borders will be defined.
            var _two_borders_width = (border_width.left + border_width.right + border_width.top + border_width.bottom) / 3 * 2;
            //pullout_button_width = pullout_button_width + _two_borders_width;            
            pullout_button.css('min-width', pullout_button_width + 'px');  
            //console.log(_two_borders_width);
                                  
            //get and set the height after the width has been set so we aquire the correct height            
            pullout_height = pullout.outerHeight(true);            
            
            //define position based on the side
            //according to width/height the pullouts will slide within the same dimensions            
            if( side == 'left' || side == 'right' ){
                //set min-height on the side so it could expand if needed
                pullout.css('min-height', pullout_height+'px');

                position = pullout_width + border_width[opposits[side]];
                var btn_dimensions = pullout_button_width + border_width[opposits[side]];
                //specify positioning of the pullout button
                pullout_button.css(opposits[side], '-' + btn_dimensions + 'px')
                .css('top', '-' + border_width.top + 'px');
            }else{            
                //set static height on top and buttom since min-height will affect the hiding effect
                //and the content will be sticking out more than needed when in hidden/closed state
                pullout.css('height', pullout_height+'px');

                position = pullout_height + border_width[opposits[side]];                
                var btn_dimensions = pullout_button_height;
                //specify positioning of the pullout button        
                pullout_button.css(opposits[side], '-' + btn_dimensions + 'px')
                .css('left', '-' + border_width.left + 'px');
            }                                                            
            


            if( !IE && powVars[i]['style']['rotate'] && ('left' == side || 'right' == side) ){
                pullout_button.addClass('rotate');
                
                pullout_button.css(opposits[side], '-' + (pullout_button_height - border_width[opposits[side]]) + 'px')
                .css('top', '-' + (pullout_button_height) + 'px');   
                
            }

            //position anchor via css
            if( side == 'left' || side == 'right' ){            
                pullout.css( v_anchor, powVars[i]['position']['distance'] );            
            }else{
                pullout.css( h_anchor, powVars[i]['position']['distance'] );            
            }            

            //re-position widget on selected side - hide it and add class closed
            pullout.css(side, '-' + position + 'px').addClass('pullout-closed');

            //set color
            if(powVars[i]['style']['color']){
                pullout.css('background-color', powVars[i]['style']['color']);
                pullout_button.css('background-color', powVars[i]['style']['color']);
            }
                                    
            pow_widgets.push( { 
                id: 'pullout-' + n,
                position: position, 
                side: side,
                label_open: label_open,
                label_close: label_close,
                trigger_on: powVars[i]['style']['show_on'],
                speed: powVars[i]['style']['speed']
            } );

            //get pullout element
            var pullout = document.getElementById('pullout-' + n);
            var parentNode = pullout.parentNode;
            //remove pullout from the sidebar
            parentNode.removeChild(pullout);
            //append to pullouts wrapper
            pullouts.appendChild(pullout);
        }                              
        //append pullouts to the bottom of the body
        jQuery('body').append(pullouts);

        //mouse location listener
        jQuery('.pullouts').mouseenter(function(){
            pow_mouse_is_inside = true;
            
            //reset trigger bindings
            pow_reset_trigger();
            //get current id
            var current_id = jQuery(this).attr('id');
            var widget = get_pow(current_id);    
            var trigger_on = widget['trigger_on'];
            
            //alert(current_id);
            
            //bind respective behaviours
            if( 'click' == trigger_on ){                
                pow_click(widget['id']);
            }else if( 'mouseover' == trigger_on ){
                pow_mouseover(widget['id']);
            }            
            

        }).mouseleave(function(){
            pow_mouse_is_inside = false;   
        });        


        //if click outside of pullout area - close pullout            
        jQuery('body').mouseup(function(){    
            if( !pow_mouse_is_inside ){
                pow_close(pow_opened);
            }                     
        });        
        

    });

}


function pow_click(id){        
    jQuery('.pullout-button').click(function(){
       do_pullout(id); 
    });
        
}

function pow_mouseover(id){      
    //preventing slide on/off on tab hover
    if( pow_opened != id ){
        do_pullout(id);
    }

    //if mouse moves outside of pullout area - close pullout
    jQuery('#'+id).bind('mouseleave', function(){        
       var t = setTimeout("pow_delay_mouseout_close()", 400);
    });
}


//when widget closes on mouseleave, we set delay so it doesn't
//go all crazy on multiple mouse-in/out.
function pow_delay_mouseout_close(){
    if(!pow_mouse_is_inside)
        pow_close(pow_opened);
}

function pow_reset_trigger(){
    jQuery('.pullout-button').unbind('click');
    jQuery('.pullout-button').unbind('mouseover');
}


function get_pow(id){
    for(i in pow_widgets){
        if(pow_widgets[i].id == id){            
            return pow_widgets[i];                    
        }
    }
    return false;
}

function do_pullout(id){
        
    if( jQuery('#' + id).is('.pullout-opened') ){        
        pow_close(id);
    }else{    
        pow_open(id);                
    }                
}

function pow_open(id){

    var widget = get_pow(id);    
    if(!widget)
        return;

    //check if there is opened widget
    if( pow_opened.length > 0 && pow_opened != id ){
        pow_close(pow_opened); //close opened widget        
    }
    
    var pullout_id = '#' + widget.id;
    jQuery(pullout_id).removeClass('pullout-closed');
    jQuery(pullout_id).addClass('pullout-opened');
    jQuery(pullout_id + ' .pullout-button span').html(widget.label_close);

    pow_slide(widget, '+');
    pow_opened = id; // assign new id to opened global
}

function pow_close(id){

    var widget = get_pow(id);

    if(!widget)
        return;
    
    //check if there is opened widget
    if( pow_opened.length > 0 && pow_opened == id ){
        pow_opened = ''; //close opened widget        
    }

    var pullout_id = '#' + widget.id;            
    jQuery(pullout_id).removeClass('pullout-opened');
    jQuery(pullout_id).addClass('pullout-closed');
    jQuery(pullout_id + ' .pullout-button span').html(widget.label_open);

    pow_slide(widget, '-');    
}

function pow_slide(widget, direction){

    var properties = new Array;
    properties[widget.side] = direction + '=' + widget.position + 'px';
        
    var options = new Array;    
    options.duration    = parseInt(widget.speed); //widget.speed;    

    jQuery('#' + widget.id).animate(properties, options);

}