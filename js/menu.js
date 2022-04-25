$(function(){

    var _body = $('body, html');
    var _window = $(window);
    var _header = $('.topZone');
  
    var ww = _window.width();
    var wh = _window.height();
    var wwNew = ww;
    var wwMedium = 700; //此值以下是手機
    var wwWide = 1000;  //此值以上是電腦
    var wwMaximum = 1300;
    var wwSlim = 500;
  
    // .multi level menu
    var _menuItem = _menu.find('li');
    var _menuItem_A = _menuItem.children('a');
  
    _menuItem_A.click(function(){
      var _thisLi = $(this).parent('li');
      if( !_menu.hasClass('hidden')){
        if(_thisLi.hasClass('activated')){
          _thisLi.removeClass('activated');
          if (_thisLi.hasClass('hasChild')) {
            _thisLi.children('ul').stop(true,true).slideUp();
          }
        } else {
          _thisLi.addClass('activated');
          if (_thisLi.hasClass('hasChild')){
            _thisLi.children('ul').stop(true,true).slideDown();
          }
          _thisLi.siblings().removeClass('activated').children('ul').stop(true,true).slideUp().find('li').removeClass('activated');      
        }
      } else {
        _thisLi.children('ul').show();
        _thisLi.siblings().children('ul').hide();
      }
    });
    
    _menuItem_A.mouseenter(
      function(){
        if (_menu.hasClass('hidden')){
          $(this).parent('li').children('ul').stop(true,true).fadeIn(300);
          $(this).parent('li').siblings().children('ul').stop(true,true).fadeOut(300);
        }
      }
    )
    _menu.mouseleave(
      function(){
        if (_menu.hasClass('hidden')){$(this).find('li').find('ul').fadeOut(300);}
      }
    )
  
  
    // topMenu clone for mobile **********************************************************/
    console.debug('find old _topMenuClone:'+_topMenuClone.length);
    if(_topMenuClone.length<=0){
        _topMenuClone = _topMenu.clone().addClass('topMenuClone hidden').removeClass('topMenu');
      console.debug('clone new _topMenuClone:'+_topMenuClone.length);
    }else{
      _topMenuClone.addClass('topMenuClone hidden').removeClass('topMenu');
    }
    var _topCart = _topMenuClone.find('.top-cart');
  
    $('.webHeader').after(_topMenuClone);
    _topMenuClone.find('.hasSignIn').prependTo(_topMenuClone);
    var _topMenuCtrl = $('.topMenuCtrl');
    var _hasChildItemC = _topMenuClone.find('li').has('ul').addClass('hasChild');
    _topMenuClone.find('.msgCount').appendTo('.topZone');
  
    _topMenuClone.addClass('hidden');
    _topMenuCtrl.click(function(){
      console.debug('on click _topMenuClone:'+_topMenuClone.length
          +',hasClass hidden:'+_topMenuClone.hasClass('hidden')
          +',is hidden:'+_topMenuClone.is(':hidden')
          +',_topCart is visible:'+_topCart.is(':visible')
          +',_menu hasClass hidden:'+_menu.hasClass('hidden')
          +',_menu is hidden:'+_menu.is(':hidden')
          +',_menuMask is visible:'+_menuMask.is(':visible')
      );
      if (_topMenuClone.hasClass('hidden')){
        _topMenuClone.stop(true,true).slideDown().removeClass('hidden');
        _menuMask.show();
        _topMenuCtrl.addClass('closeIt');
      } else {
        _topMenuClone.stop(true,true).slideUp().addClass('hidden');
        _topMenuCtrl.removeClass('closeIt');
        if(_menu.hasClass('hidden')){
          _menuMask.fadeOut();
          if( _topCart.is(':visible')){
            _topCart.removeAttr('style');
         }  
        }
      }
    });
  
    _hasChildItemC.filter('.hello').addClass('activated');
    _hasChildItemC.click(function(){
      console.debug('on click _hasChildItemC ul is:'+$(this).children('ul').is(':hidden')+",hasClass activated:"+$(this).hasClass('activated'));
      if ($(this).children('ul').is(':hidden')) {
        _hasChildItemC.removeClass('activated').children('ul').slideUp();
        $(this).addClass('activated').children('ul').stop(true,true).slideDown();
      } else {
        $(this).removeClass('activated').children('ul').stop(true,true).slideUp();
      }
    });
  
  // ------------------------------------------------
 
    rwdTable();
    
    // window resize *************
    var winResizeTimer;
    _window.resize(function(){
      clearTimeout(winResizeTimer);
      winResizeTimer = setTimeout(function(){
        wwNew = _window.width();
        // console.log(ww, wwNew);
        if(wwNew>=wwWide){
          _topMenuClone.removeAttr('style').addClass('hidden');
          _topMenuCtrl.removeClass('closeIt');
          _menuMask.hide();
        }
        if( ww<wwWide && wwNew>=wwWide ){
          resetSidebar();
          _menu.removeClass('hidden');
          _menuCtrl.addClass('closeIt');
  
          // _relInfoCard.removeAttr('style');
        }
        if( ww>=wwWide && wwNew<wwWide ){
          resetSidebar();
          _menu.addClass('hidden');
          _menuCtrl.removeClass('closeIt');
          // infoCardShowHide();
        }
        if( ww<wwMedium && wwNew>=wwMedium && wwNew<wwWide ){
          resetSidebar();
          _menu.addClass('hidden');
          _menuCtrl.removeClass('closeIt');
        }
        if( ww>=wwMedium && wwNew<wwMedium ){
          resetSidebar();
          _menu.addClass('hidden');
          _menuCtrl.removeClass('closeIt');
        }
        if(wwNew>=wwMaximum){
          resetSidebar();
          _menu.removeClass('hidden');
          _menuCtrl.addClass('closeIt');
        }
        // .toggleDrawer
        if( ww<wwMedium && wwNew>=wwMedium ){
          _togSlide.not('.always').removeClass('hidden').find('.toggleArea').removeAttr('style');
          _togSlide.not('.always').find('.toggleCtrl').removeClass('closeIt');
  
          _hiddenFieldRow.removeAttr('style');
          _filterBy.find('.filterOptions').removeAttr('style');
  
          // $('.hiddenRow').filter('[style="display:block"]').attr('style','display:table-row');
  
          if(_topMenuClone.is(':hidden')){
            _menuMask.hide();// 隱藏由側欄選單開啟的遮罩
          }
  
        }
        if( ww>=wwMedium && wwNew<wwMedium ){
          _togSlide.not('.always').addClass('hidden').find('.toggleArea').removeAttr('style');
          // _togSlide.find('.toggleCtrl').removeClass('closeIt').text(textShow);
          _togSlide.not('.always').find('.toggleCtrl').removeClass('closeIt').text(textShow);// 10/04暫時
  
          // $('.hiddenRow').filter('[style="display:table-row"]').attr('style','display:block');
          
          getRowHeight();
        }
  
        ww = wwNew;
        tabSet();
        infoCardShowHide();
        fixThisCompanyNow();
  
        _nationsOpt.stop().animate({scrollTop: 0}, 300, function(){
           getOffsetTop();
        }); 
       
        // 20210507
        if ( _slideinBox.filter('.in').find('.smartModule').length > 0) {
          setFrViewHeight();
        }
  
      }, 250);
    });
  
    function resetSidebar() {
      _menu.add(_main).add(_menu).removeAttr('style');
      _menu.find('.hasChild').removeClass('activated').find('ul').removeAttr('style');
    }
  
    // 加 loading animation 的圓點元件
    $('.loadingAni').append('<span></span><span></span><span></span><span></span>');
  
      $('.btnDv input[type="reset"]').click(function() {
          selectedType = [];
    });
    
  // 避免手機虛擬鍵盤擋住輸入欄位
  $('input[type="text"], textarea, input[type="date"], input[type="email"], input[type="file"], input[type="number"], input[type="password"], input[type="tel"], input[type="time"], input[type="url"], input[type="week"]' ).on('click', function () {
      var _target = $(this);
      setTimeout(function() {
          try {
              _target.scrollIntoViewIfNeeded();
              console.log('scrollIntoViewIfNeeded');
          } catch (e) {
          }
      }, 400);
  });
  
  });