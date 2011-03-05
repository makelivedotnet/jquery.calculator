/*-------------------------------------------------------------------- 
* jQuery plugin: radioTrueFalse()
* by Keith Lawler, http://www.mrlawler.com
* Requires math.js
--------------------------------------------------------------------*/

(function($) {
	$.fn.calculator = function() {
		return this.each(function() {
			$(this).html('<div class="calculator"><div class="handle">::::::</div> \
			<div class="close" onclick="$(this).parent().parent().fadeOut(\'fast\');">Close</div> \
			<div class="clear"></div> \
			<div class="result"></div>  \
			<div class="modify"> \
				<ul><li class="backspace" rel="backspace">&larr;</li><li rel="clear">clear</li></ul> \
				<div class="clear"></div> \
			</div> \
			<div class="extra_functions"> \
				<ul class="button"><li rel="(">(</li><li rel=")">)</li><li rel="sqrt">&radic;x</li><li rel="^">^</li></ul> \
				<div class="clear"></div> \
			</div> \
			<div class="digits"> \
				<ul class="button"> \
					<li rel="7">7</li><li rel="8">8</li><li rel="9">9</li> \
					<li rel="4">4</li><li rel="5">5</li><li rel="6">6</li> \
					<li rel="1">1</li><li rel="2">2</li><li rel="3">3</li> \
					<li rel="0">0</li><li rel=".">.</li> \
				</ul>  \
			</div> \
			<div class="main_functions"> \
				<ul class="button"> \
					<li rel="/">&divide;</li> \
					<li rel="*">&times;</li> \
					<li rel="-">&minus;</li> \
					<li rel="+">+</li> \
					<li class="calculate" rel="=">=</li> \
				</ul>  \
				<div class="clear"></div> \
			</div>  \
			<div class="clear"></div></div>')
			
			
			
			var calculator = { expression: '', display: '', result: '' };
			var display = $(this).find('.result')
			var max_digits = 15;

			calculate = function() {
				try {
					calculator.result = eval("f = function(x){ with(Math) return " + mathjs(calculator.expression) + " }");
					
					if (calculator.result.length > max_digits) {
						// FIXME: needs to be round correctly
						calculator.result = calculator.result.slice(0, max_digits);
					}
					$(display).text(calculator.result);
					calculator.display = calculator.expression = $(display).text();
				} catch(err) {
					$(display).text('ERROR');
					calculator.display = calculator.expression = calculator.result = '';
				}
				
			}

			isOperator = function(key) {
				var ops = '*/-+';
				var op = false;
				if(ops.indexOf(key) != -1)
				op = true;
				return op;
			}

			isDigit = function(key) {
				var digits = "0123456789";
				var digit = false;
				if(digits.indexOf(key) != -1)
				digit = true;
				return digit;
			}
		
			$(this).find('ul li').click(function() {
				var key = $(this).attr('rel');
				var display_key = $(this).text();
				if (key == '=') {
					calculate();
				} else if (key == 'clear') {
					calculator.expression = '';
					calculator.display = '';
					$(display).text('');
				} else if (key == 'sqrt') {
					// check to see if there is an operator preceeding this
					if (isOperator(calculator.expression.split(" ").pop())) {
						calculator.expression += " Math.sqrt (";
						calculator.display += " &radic; (";
					} else {
						calculator.expression += "* Math.sqrt (";
						calculator.display += "&times; &radic; (";
					}
					$(display).html(calculator.display.replace(/\s/g, ""));
				} else if (key == 'backspace') {
					calculator.expression = calculator.expression.split(" ").slice(0, -1).join(" ") + " ";
					calculator.display = calculator.display.split(" ").slice(0, -1).join(" ") + " ";
					$(display).html(calculator.display);
				} else {
					if (calculator.expression == '0') { 
						calculator.expression = '';
						calculator.display = '';
					}
					calculator.expression += " " + key.toString();
					calculator.display += " " + display_key.toString();
					$(display).html(calculator.display.replace(/\s/g, ""));
				}
			});
		});
		
	}
})(jQuery);



