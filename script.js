
$(document).ready(function () {
    //when frosting selected, the cake background img change
    //add class for backgrond image depends on selected frosting
    $('fieldset.frosting').on('click', 'label', function() {
        //create variable for select and unselected classes
        const bgClass = $("input[type=radio][name=frosting]:checked").attr('id');
        const unBgClass = [];
        $.each($("input[type=radio][name=frosting]:not(:checked)"), function() {
            unBgClass.push($(this).attr('id'));
        });
        
        //add selected class
        $('div.cakeImg').addClass(bgClass);
        //remove all unselected classes
        $.each(unBgClass, function(index) {
            $('div.cakeImg').removeClass(unBgClass[index]);
        });
    });



    //limit checkbox allownce maximum=3 and display toppings image on checked ones
    $('input[type=checkbox]').on('change', function (e) {
        if ($('input[type=checkbox]:checked').length <= 3) {
            if (this.checked) {
                $(`div.cakeImg .${this.id}`).addClass('display');
            } else {
                $(`div.cakeImg .${this.id}`).removeClass('display');
            }
        }

        if ($('input[type=checkbox]:checked').length > 3) {
            $(this).prop('checked',false);
            alert ('Only 3 toppings & decotations allowed');
        }
    });

    //when typing msg on cake, div show the msg 
    $('input[type=text][id=yourMsg').keyup(function(e){
        const typingText = e.target.value;
        $('p.cakeWrite').text(typingText);
    });

    //input form and when submit it replace the span, and calculate price
    $('form').on('submit', function(e){
        e.preventDefault();
        //create variable for each input
        const name = $('input[type=text][name=name]').val();
        if (name === '') {
            alert('Please input your name');
        }

        const sizeLabel = $('input[type=radio][name=size]:checked').parent().text();
        const size = parseInt($('input[type=radio][name=size]:checked').val());
        if ($('input[type=radio][name=size]:checked').length === 0 ) {
            alert('Please select your cake size');
        }

        const baseLabel = $('input[type=radio][name=base]:checked').parent().text();
        const base = parseInt($('input[type=radio][name=base]:checked').val());
        if ($('input[type=radio][name=base]:checked').length === 0) {
            alert('Please select your cake base');
        }

        const frostingLabel = $('input[type=radio][name=frosting]:checked').parent().text();
        const frosting = parseInt($('input[type=radio][name=frosting]:checked').val());
        if ($('input[type=radio][name=frosting]:checked').length === 0) {
            alert('Please select your frosting');
        }

        const top = [];
        $.each($('input[type=checkbox]:checked'), function(){
            top.push(parseInt($(this).val()));  
        });
        const topLabel = [];
        $.each($('input[type=checkbox]:checked'), function() {
                topLabel.push($(this).parent().text());
        });
        

        const message = $('input[type=text][name=message]').val();


        //display on screen
        if( top.length === 0) {
            $('p.summary').text(`${name}, your Build-A-Cake is ${sizeLabel} ${baseLabel} cake with ${frostingLabel} frosting without any toppings.`);
        } else {$('p.summary').text(`${name}, your Build-A-Cake is ${sizeLabel} ${baseLabel} cake with ${frostingLabel} frosting, topped with ${topLabel.join(",")}.`);
        }
        
        //display message on cake
        $('p.cakeWrite').text(`${message}`);
        
        //calculate price of cake
        //total for topping
        // console.log(size,base,frosting,top[0],top[1],top[2]);
        // console.log(top);
        function sum(numInArr) {
            const x = numInArr.reduce(function (a,b) {
                return a + b;
            },0);
            return x;
        }
        // console.log(sum(top));
        const sumTop = sum(top);

        //subtotal = size * (cakebase + frosting + toppings)
        const   subtotal =  size * (base + frosting + sumTop);
        
        //sale tax in dollar
        const saletax = 0.13 * subtotal;
        //total = subtotal + tax
        const total = subtotal + saletax;
        //display number
        $('span.subTotal').text(subtotal.toFixed(2));
        $('span.tax').text(saletax.toFixed(2));
        $('span.total').text(total.toFixed(2));
        
    });


});