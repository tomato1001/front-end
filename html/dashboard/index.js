$(function () {
    $('.sidebar-menu li').click(function (e) {
        e.stopPropagation();
        var $li = $(this),
            $sidebarMenu = $('.sidebar-menu'),
            $submenu = $li.children('.submenu'),
            isCompactSidebar = $sidebarMenu.parent().hasClass('sidebar-compact'),
            hasSubMenu = $submenu.length > 0;
            
        // Add class open to parent li
        if (isCompactSidebar) {
            // $li.parentsUntil('.sidebar-menu', '.submenu').parent().first().addClass('open');
        }
        
        var $parents = $li.parents('.sidebar-menu > li.open');
        if (isCompactSidebar && $li.parent('.sidebar-menu').length > 0 && hasSubMenu) {
            return;
        }
        if ($parents.has($li).length > 0) {
            // in self menu
            if (hasSubMenu) {
                $parents.find('li.open').not($li).find('.submenu').slideUp('fast').parent().removeClass('open');
            }
        }
        else {
            $sidebarMenu.find('li.open').not($li).find('.submenu').slideUp('fast').parent().removeClass('open');
        }
        
        if (hasSubMenu) {
            $li.toggleClass('open');
            $submenu.slideToggle('fast');
        }
        else {
            $sidebarMenu.find('.active').removeClass('active');
            $li.addClass('active');
            
            if (isCompactSidebar) {
                $sidebarMenu.find('li:not(.open) li.open').removeClass('open').find('.submenu').hide();
            }
        }

    });
    
    $('.sidebar-collapse').click(function () {
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $('.sidebar-menu > li > .submenu').css('display', '');
        }
        else {
            $('.sidebar-menu li.open .submenu').first().show();
        }
        $this.toggleClass('active');
        $('.sidebar').toggleClass('sidebar-compact');
    });
    
    $('body').on('mouseenter mouseleave', '.sidebar-compact > .sidebar-menu > li', function () {
        var $this = $(this);
        $(".sidebar-menu > li.open").not($this).removeClass('open');
        if (!$this.hasClass('open')) {
            $this.addClass('open');
        }
    });
});