$(function() {
    var $ = jQuery;
    var handler = StripeCheckout.configure({
        key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
        image: '/img/documentation/checkout/marketplace.png',
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
        var expiration = $('#expires-at').data("DateTimePicker").date();
        var today = moment();

        var seconds = expiration.diff(today, 'seconds');
        var days = Math.round(seconds * (1 / 86400.0));
        var num_weeks = days / 7.0;

        var charge = (num_weeks * 100.0).toFixed(2);
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