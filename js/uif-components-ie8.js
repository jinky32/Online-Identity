$(function () {
    /* -----------IE7 Table Striping----------- */
    //$('tr').not(':odd').css('background-color', '#ffffff');
    $('table tr:even').addClass('int-striped');
    // Table Stripping fix for Sortable Tables
    function intStriped() {
        setTimeout(function(){
            $('table.int-sortableTable tr:even').addClass('int-striped');
        }, 1);
    }
    $('table.int-sortableTable th.header').click(function () {
        $('table.int-sortableTable tr').removeClass('int-striped');
        intStriped();
    });
    // Paul: 
    // beacause the click event on th.header is used to execute the table sort AND the adding of the class int-striped
    // I have added a delay of 1 milisecond before int-striped is added so the table sort executes first. 
    // This prevents the class being added before the table sort which would put the zebra stripping in the wrong order.
    /* -----------End IE7 Table Striping----------- */


    //Fix pre tag display issues in ie8 and ie7 
    $('pre').css('padding', '20px');
    $('pre.int-toggleCode').css('height', '50px');

    

});