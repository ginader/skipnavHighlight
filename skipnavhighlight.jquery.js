/**
 * skip link highlight - jQuery plugin for accessible, unobtrusive highglighting of skip link targets
 * Inspired by http://stockholm.se/
 * @requires jQuery v1.2.6
 * Usage:
 * $("a").skipnavHighlight();
 *
 * http://blog.ginader.de
 *
 * Copyright (c) 2007 Dirk Ginader (ginader.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 1.0
 */
(function($) {
    $.fn.extend({
        showSkipTargetHighlight : function(o){
            var el = $( $(o).attr('href') );
            var pos = el.offset();
            this.targetOverlay.css({top:pos.top,left:pos.left,width:el.width(),height:el.height()}).show();
        },
        skipnavHighlight: function(conf) {
            var defaults = {
                targetClass: 'skiptarget' // Classname to apply to the element the anchor points to
            };
            var options = $.extend(defaults, conf);
            var o = this;
            if(!this.targetOverlay){
                this.targetOverlay = document.createElement('div');
                this.targetOverlay.className = options.targetClass;
                $('body').append(this.targetOverlay);
                this.targetOverlay = $(this.targetOverlay).hide();
                this.targetOverlay.mousedown(function(){
                    o.targetOverlay.hide();
                });
            }
            return this.each(function() {
                $(this).hover(
                    function() {
                        o.showSkipTargetHighlight($(this));
                    }, 
                    function() {
                        o.targetOverlay.hide();
                    }
                );
                $(this).focus(function () {
                    o.showSkipTargetHighlight($(this));
                });
                $(this).blur(function () {
                    o.targetOverlay.hide();
                });  
                $(this).click(function () {
                    o.targetOverlay.hide();
                    $( $($(this)).attr('href') ).attr('tabindex', -1).focus();
                });                
            });
        }
    });
})(jQuery);