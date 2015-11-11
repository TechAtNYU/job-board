$(function() {
    var $ = jQuery;
    var handler = StripeCheckout.configure({
        key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
        image: '/logos/techatnyu-extra.png',
        locale: 'auto',
        token: function(token) {
            // Use the token to create the charge with a server-side script.
            // You can access the token ID with `token.id`
            var $form = $('#form');
            $form.append($('<input>').attr({
                type: 'hidden',
                name: 'stripeToken',
                value: token.id
            })).submit();
        }
    });

    $('#stripe-button').on('click', function(e) {
        var num_weeks = 4;
        var charge = (num_weeks * 25.0).toFixed(2);
        var charge_cents = charge * 100.0;

        var $form = $('#form');
        $form.append($('<input>').attr({
            type: 'hidden',
            name: 'charge',
            value: charge
        }));

        // Open Checkout with further options
        handler.open({
            name: 'Tech@NYU',
            description: 'Listing',
            amount: charge_cents
        });
        e.preventDefault();
    });

    // Close Checkout on page navigation
    $(window).on('popstate', function() {
        handler.close();
    });
});